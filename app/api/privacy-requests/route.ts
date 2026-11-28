import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type PrivacyRequestPayload = {
  name: string;
  email: string;
  requestType: string;
  details: string;
  captchaToken: string;
};

const requestTypes = new Set(["access", "correction", "deletion"]);

export async function POST(request: Request) {
  let payload: PrivacyRequestPayload | null;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const details = typeof payload.details === "string" ? payload.details.trim() : "";
  const requestType = typeof payload.requestType === "string"
    ? payload.requestType
    : "";
  const captchaToken = typeof payload.captchaToken === "string"
    ? payload.captchaToken
    : "";

  if (
    !name
    || name.length > 120
    || !email
    || email.length > 254
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || !requestTypes.has(requestType)
    || !details
    || details.length < 10
    || details.length > 2000
    || captchaToken.length > 2048
  ) {
    return Response.json({ error: "Please complete every field with valid information." }, { status: 400 });
  }

  const captchaSecret = process.env.TURNSTILE_SECRET || process.env.TURNSTILE_SECRET_KEY;
  if (!captchaSecret || !captchaToken) {
    return Response.json({ error: "Security verification is not configured." }, { status: 503 });
  }

  let captchaResult: {
    success?: boolean;
    action?: string;
    hostname?: string;
  };

  try {
    const captchaResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(10_000),
        body: new URLSearchParams({
          secret: captchaSecret,
          response: captchaToken,
          ...(request.headers.get("cf-connecting-ip")
            ? { remoteip: request.headers.get("cf-connecting-ip") as string }
            : request.headers.get("x-forwarded-for")
              ? { remoteip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "" }
              : {}),
        }),
      },
    );

    if (!captchaResponse.ok) {
      return Response.json({ error: "The security check could not be completed." }, { status: 502 });
    }
    captchaResult = await captchaResponse.json();
  } catch {
    return Response.json({ error: "The security check could not be completed." }, { status: 502 });
  }

  const approvedHostnames = (process.env.TURNSTILE_HOSTNAMES || "")
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  if (
    !captchaResult.success
    || captchaResult.action !== "privacy_request"
    || !captchaResult.hostname
    || approvedHostnames.length === 0
    || !approvedHostnames.includes(captchaResult.hostname)
  ) {
    return Response.json({ error: "The security check failed. Please try again." }, { status: 403 });
  }

  const supabaseUrl =
    process.env.SUPABASE_URL
    || process.env.SUPABASE_PROJECT_URL
    || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return Response.json({ error: "The privacy request database is not configured." }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("privacy_requests").insert({
    name,
    email,
    request_type: requestType,
    details,
    status: "pending",
  });

  if (error) {
    console.error("Failed to insert privacy request:", error);
    return Response.json({ error: "Your request could not be saved." }, { status: 500 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
