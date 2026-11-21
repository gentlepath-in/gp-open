import type { Metadata } from "next";
import { LegalShell } from "../components/legal-shell";

export const metadata: Metadata = {
  title: "Terms & Conditions | GentlePath",
  description: "Terms for using the GentlePath wellness coaching application.",
};

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[#3A383E] py-8 first:border-0 first:pt-0">
      <div className="grid gap-3 sm:grid-cols-[56px_minmax(0,1fr)]">
        <span className="text-sm font-bold text-[#81D4FA]">{number}</span>
        <div>
          <h2 className="mb-4 text-xl font-semibold tracking-tight text-[#E6E1E5] sm:text-2xl">{title}</h2>
          <div className="space-y-4 text-[15px] leading-7 text-[#C7C1C8]">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <LegalShell
      eyebrow="Terms & conditions"
      title="Clear terms for a supportive experience."
      description="Please read these terms before using GentlePath or booking coaching. They explain the service, its limits, and your responsibilities."
      updated="November 21, 2026"
      activeHref="/tnc"
    >
      <Section number="01" title="Agreement">
        <p>
          These Terms &amp; Conditions (“Terms”) govern your use of the GentlePath app and related services operated by <strong>[Business Legal Name]</strong>. By creating an account, booking a coach, or using a feature, you agree to these Terms and the Privacy Policy.
        </p>
        <p>If you do not agree, do not use the Service. If you use the Service for an organization, you confirm that you are authorized to accept these Terms for that organization.</p>
      </Section>

      <Section number="02" title="Nature of the service">
        <p>
          GentlePath offers wellbeing tools and professional coaching services intended to support goal setting, self-awareness, habits, resilience, and personal or professional growth.
        </p>
        <p>
          Coaching is not psychotherapy, counseling, diagnosis, crisis care, medical advice, or a substitute for care from a licensed healthcare professional. Coaches do not provide prescriptions, treatment plans, or emergency interventions unless they hold a separate license that applies.
        </p>
      </Section>

      <Section number="03" title="ICF credentialed coaches">
        <p>
          Coaches may hold or maintain credentials from the International Coaching Federation (ICF) or may represent that status in their profile. Credential, identity, background, and professional good-standing claims are verified where reasonably possible, but you should review a coach’s profile and confirm any credential directly before relying on it.
        </p>
        <p>ICF coaching credentials do not transform coaching into a medical or mental health license and do not guarantee a particular result.</p>
      </Section>

      <Section number="04" title="Eligibility and account responsibility">
        <p>
          You must be at least 18, or the age of digital consent in your jurisdiction, and able to enter a binding agreement. Accounts cannot be created for another person without that person’s informed consent.
        </p>
        <p>You are responsible for keeping sign-in details confidential, providing accurate information, and notifying us promptly of unauthorized account activity. We may suspend accounts to protect users or investigate suspected misuse.</p>
      </Section>

      <Section number="05" title="Coaching sessions and expectations">
        <p>
          Before beginning, you and your coach should discuss goals, schedule, fees, confidentiality limits, communication methods, and what coaching will not cover. A coach should explain applicable professional standards and any conflict of interest.
        </p>
        <p>
          Coaching outcomes depend on many factors, including your participation. We do not promise specific personal, professional, or health outcomes. You remain responsible for decisions and actions taken before, during, or after coaching.
        </p>
      </Section>

      <Section number="06" title="Emergency and medical situations">
        <p>
          GentlePath is not monitored continuously and must not be used to seek urgent help. If you face immediate danger, attempt or plan self-harm, or may harm another person, contact local emergency services or a crisis service now.
        </p>
        <p>Consult a licensed clinician for symptoms, diagnoses, medication decisions, trauma, severe distress, or changes in mental health. You should not delay professional care because of content or tools in the app.</p>
      </Section>

      <Section number="07" title="Subscriptions, fees, and cancellations">
        <p>
          Subscription and coaching fees, billing periods, renewal terms, taxes, refunds, and cancellation rules will be shown before purchase. Subscriptions may renew automatically where permitted and through the payment method you authorize.
        </p>
        <p>
          You may cancel through your account or applicable app-store settings. Cancellation may stop future renewal but does not automatically refund a completed or charged period, except as required by law or as stated at purchase.
        </p>
      </Section>

      <Section number="08" title="Acceptable use">
        <ul className="list-disc space-y-2 pl-5">
          <li>Use the Service lawfully and respect other users and coaches.</li>
          <li>Do not harass, threaten, impersonate, discriminate against, exploit, or sexually or physically abuse anyone.</li>
          <li>Do not upload malware, attempt unauthorized access, scrape data, reverse engineer, or interfere with operations.</li>
          <li>Do not upload content you lack the right to share or that is intended to cause harm.</li>
          <li>Do not use a coach account or coaching session to provide unauthorized clinical, legal, financial, or emergency services.</li>
        </ul>
      </Section>

      <Section number="09" title="Content and intellectual property">
        <p>
          The app, branding, software, educational materials, and platform content are owned by us or our licensors and are protected by intellectual property laws. We grant you a limited, revocable, non-transferable license to use the Service for personal, permitted purposes.
        </p>
        <p>
          You retain rights to information you submit. You grant us a limited license to host, process, and display that information to operate and improve the Service, provide support, and comply with law. Do not submit third-party confidential information without permission.
        </p>
      </Section>

      <Section number="10" title="Privacy and confidentiality">
        <p>
          Our collection and use of personal information is described in the Privacy Policy. Session confidentiality is important, but neither GentlePath nor every coach can guarantee complete confidentiality where systems, third-party communications, law, professional duties, or imminent safety risks apply.
        </p>
        <p>You should avoid entering highly sensitive information, passwords, financial details, or identifying information about others unless it is necessary and appropriate.</p>
      </Section>

      <Section number="11" title="Suspension and termination">
        <p>
          We may suspend or terminate access for a serious or repeated violation, safety concern, fraud, unlawful conduct, nonpayment, or where reasonably necessary to protect users or comply with law. We may allow lawful export or deletion of your data, subject to applicable retention duties.
        </p>
        <p>You may stop using the Service and request account deletion at any time through your data controls or support channel.</p>
      </Section>

      <Section number="12" title="Disclaimers and liability">
        <p>
          To the extent permitted by law, the Service is provided “as is” and “as available.” We disclaim implied warranties of merchantability, fitness for a particular purpose, accuracy, availability, and non-infringement.
        </p>
        <p>
          To the extent permitted by law, we are not liable for indirect, incidental, special, punitive, or consequential damages, or for lost opportunities or data. Our total liability for a claim will not exceed the amount you paid us for the Service in the three months before the event giving rise to the claim. These limits do not apply where prohibited or to liability that cannot legally be excluded.
        </p>
      </Section>

      <Section number="13" title="Changes, governing law, and contact">
        <p>
          We may update these Terms and will provide notice of material changes where required. Continued use after the effective date means you accept the revised Terms, unless applicable law requires renewed consent.
        </p>
        <p>
          These Terms are governed by the laws of <strong>[Jurisdiction]</strong>, without regard to conflict-of-law rules, subject to mandatory local protections. Disputes will be handled by <strong>[Court or Arbitration Clause]</strong>.
        </p>
        <p>Questions: <strong>[Support Email]</strong>. Legal notices: <strong>[Legal Notice Address]</strong>.</p>
      </Section>

      <div className="mt-2 rounded-2xl border border-[#004D68] bg-[#003549] px-5 py-4 text-sm leading-6 text-[#BFE9FF]">
        <strong>Important:</strong> This page is a starting point and should be reviewed by counsel before public or Android Store launch. Replace every bracketed placeholder and tailor jurisdiction, refunds, age limits, and coach agreements to the actual service.
      </div>
    </LegalShell>
  );
}
