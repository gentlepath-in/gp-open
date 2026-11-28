"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function UserDataPanel() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReady, setCaptchaReady] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAGW4Y1vxLGRedh2G";

  useEffect(() => {
    if (!captchaReady || !siteKey || !widgetRef.current || widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile?.render(widgetRef.current, {
      sitekey: siteKey,
      action: "privacy_request",
      appearance: "interaction-only",
      callback: (token: string) => setCaptchaToken(token),
      "expired-callback": () => setCaptchaToken(""),
      "error-callback": () => setCaptchaToken(""),
      theme: "dark",
    });
  }, [captchaReady, siteKey]);

  function resetTurnstile() {
    const widgetId = widgetIdRef.current;
    if (widgetId && typeof window.turnstile?.reset === "function") {
      window.turnstile.reset(widgetId);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;

    if (!captchaToken) {
      setSubmitStatus("error");
      setSubmitMessage("Please complete the security check.");
      return;
    }

    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      requestType: String(form.get("requestType") ?? ""),
      details: String(form.get("details") ?? "").trim(),
      captchaToken,
    };

    setSubmitStatus("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/privacy-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 403 || response.status === 500) {
          setCaptchaToken("");
          resetTurnstile();
        }
        throw new Error(result.error || "Your request could not be submitted.");
      }

      formElement.reset();
      setCaptchaToken("");
      resetTurnstile();
      setSubmitStatus("success");
      setSubmitMessage("Your request has been submitted. We will verify your identity before processing it.");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(error instanceof Error ? error.message : "Your request could not be submitted.");
    }
  }

  return (
    <div className="space-y-10">
      {siteKey ? (
        <Script
          id="turnstile-script"
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={() => setCaptchaReady(true)}
          onError={() => {
            setCaptchaReady(false);
            setCaptchaToken("");
          }}
        />
      ) : null}

      <section>
        <h2 className="text-xl font-semibold text-[#E6E1E5]">Request access or deletion</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#AFA8B0]">
          Submit a privacy request for data held by GentlePath. Do not include journal entries,
          passwords, payment details, or other sensitive information.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#E6E1E5]" htmlFor="privacy-name">
              Name
              <input
                id="privacy-name"
                name="name"
                required
                minLength={2}
                maxLength={120}
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-[#4A4850] bg-[#1C1B1F] px-4 py-3 font-normal text-[#E6E1E5] outline-none focus:border-[#29B6F6]"
              />
            </label>
            <label className="block text-sm font-semibold text-[#E6E1E5]" htmlFor="privacy-email">
              Email used with GentlePath
              <input
                id="privacy-email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                className="mt-2 w-full rounded-xl border border-[#4A4850] bg-[#1C1B1F] px-4 py-3 font-normal text-[#E6E1E5] outline-none focus:border-[#29B6F6]"
              />
            </label>
          </div>

          <label className="block text-sm font-semibold text-[#E6E1E5]" htmlFor="privacy-request-type">
            Request type
            <select
              id="privacy-request-type"
              name="requestType"
              required
              className="mt-2 w-full rounded-xl border border-[#4A4850] bg-[#1C1B1F] px-4 py-3 font-normal text-[#E6E1E5] outline-none focus:border-[#29B6F6]"
              defaultValue=""
            >
              <option value="" disabled>Select a request</option>
              <option value="access">Access my data</option>
              <option value="correction">Correct my data</option>
              <option value="deletion">Delete my data</option>
            </select>
          </label>

          <label className="block text-sm font-semibold text-[#E6E1E5]" htmlFor="privacy-details">
            Details
            <textarea
              id="privacy-details"
              name="details"
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              className="mt-2 w-full resize-y rounded-xl border border-[#4A4850] bg-[#1C1B1F] px-4 py-3 font-normal text-[#E6E1E5] outline-none focus:border-[#29B6F6]"
              placeholder="Briefly describe the request. Do not include sensitive content."
            />
          </label>

          {siteKey ? (
            <div ref={widgetRef} />
          ) : (
            <p className="rounded-xl border border-[#68443B] bg-[#2D2928] px-4 py-3 text-sm text-[#C7C1C8]">
              CAPTCHA is not configured or unable to load. Please contact support if you need to submit a privacy request.
            </p>
          )}

          {submitMessage ? (
            <div
              role="status"
              className={`rounded-xl border px-4 py-3 text-sm ${
                submitStatus === "success"
                  ? "border-[#004D68] bg-[#003549] text-[#BFE9FF]"
                  : "border-[#68443B] bg-[#2D2928] text-[#C7C1C8]"
              }`}
            >
              {submitMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitStatus === "submitting" || !captchaToken}
            className="rounded-full bg-[#29B6F6] px-5 py-2.5 text-sm font-semibold text-[#FFFFFF] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitStatus === "submitting" ? "Submitting..." : "Submit privacy request"}
          </button>
        </form>
      </section>
    </div>
  );
}
