import type { Metadata } from "next";
import { LegalShell } from "../components/legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | GentlePath",
  description: "How GentlePath collects, uses, shares, and protects mental health and wellness information.",
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

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      eyebrow="Privacy policy"
      title="Your wellbeing information deserves care."
      description="This policy explains what GentlePath collects, why we collect it, and the choices you have when using the app or working with a coach."
      updated="November 21, 2026"
      activeHref="/privacypolicy"
    >
      <Section number="01" title="Who this policy applies to">
        <p>
          This Privacy Policy applies to the GentlePath mobile application and related services (collectively, the “Service”), operated by <strong>[Business Legal Name]</strong>, <strong>[Address]</strong>, and <strong>[Privacy Contact Email]</strong> (the “Controller”).
        </p>
        <p>
          GentlePath provides mental health and wellbeing coaching tools and may connect users with independent or contracted coaches who hold recognized credentials, including International Coaching Federation (ICF) credentials. Coaching is not psychotherapy or medical care.
        </p>
      </Section>

      <Section number="02" title="Information we collect">
        <p><strong>Account details:</strong> name, email address, profile information, age range, preferred language, and account identifiers.</p>
        <p><strong>Wellness information:</strong> goals, journal entries, mood check-ins, session notes you choose to provide, and responses to questionnaires or assessments.</p>
        <p><strong>Coach-related information:</strong> booking details, messages, session summaries, coach feedback, and consent preferences. Coaches are instructed not to include unnecessary clinical or highly sensitive details in session records.</p>
        <p><strong>Device and technical data:</strong> device and app version, operating system, approximate region, crash logs, diagnostic events, notification settings, and security logs.</p>
        <p><strong>Support information:</strong> messages sent to our support team and the information needed to resolve a request.</p>
      </Section>

      <Section number="03" title="Health and sensitive data">
        <p>
          Mood, journal, wellbeing, and similar information may reveal sensitive information about physical or mental health. We collect this information only for the purposes described in this policy, with your consent where required, or where another valid legal basis applies.
        </p>
        <p>
          Do not enter emergency details or information you are not comfortable sharing with your coach. GentlePath is not monitored continuously and cannot provide emergency intervention.
        </p>
      </Section>

      <Section number="04" title="How we use information">
        <ul className="list-disc space-y-2 pl-5">
          <li>Create and secure your account and deliver app features.</li>
          <li>Provide coaching, scheduling, messaging, progress tracking, and reminders you request.</li>
          <li>Personalize suggested exercises and content while avoiding harmful or unsupported automated decisions.</li>
          <li>Operate, monitor, troubleshoot, and improve the Service.</li>
          <li>Prevent fraud, abuse, self-harm misuse, unauthorized access, and other harmful activity.</li>
          <li>Meet legal, regulatory, audit, credentialing, and recordkeeping obligations.</li>
        </ul>
      </Section>

      <Section number="05" title="Permissions and Android features">
        <p>
          The app requests permissions only when needed for a visible feature. Notifications may be used for reminders and session updates; you can manage them in Android settings. Camera or photo access may support profile or document uploads and remains optional. Calendar access may assist with scheduling only after your consent.
        </p>
        <p>We do not access contacts, microphone, location, camera, or files unless a feature explicitly requires it and permission is granted.</p>
      </Section>

      <Section number="06" title="Coaches and professional boundaries">
        <p>
          Coaches use GentlePath to support coaching goals you choose. Coaches may access account and session information necessary to deliver services and comply with ICF professional standards, applicable law, and contractual confidentiality requirements.
        </p>
        <p>
          A coach may need to break confidentiality to address an imminent risk of harm, suspected abuse, a legal requirement, or a professional duty. They should explain limits of confidentiality before or at the start of coaching where possible.
        </p>
      </Section>

      <Section number="07" title="Sharing and processors">
        <p>
          We share data only with hosting, communications, analytics, payment, identity verification, and support providers who need it to provide the Service; with coaches for requested coaching; when you direct us to share it; or where required by law or necessary to protect people and rights.
        </p>
        <p>
          Vendors must provide appropriate security and may process data only under our instructions. We do not sell or rent personal information. We may share de-identified or aggregated information that cannot reasonably identify you.
        </p>
      </Section>

      <Section number="08" title="Retention and deletion">
        <p>
          We retain information for only as long as needed to provide the Service, maintain safety and security, resolve disputes, meet contracts and legal duties, and maintain required coaching or financial records.
        </p>
        <p>
          You can request deletion through the <strong>in-app data controls</strong> or by emailing <strong>[Privacy Contact Email]</strong>. We may retain limited records when the law requires, or delete them on a documented schedule. Backups and provider copies may remain for a limited recovery period.
        </p>
      </Section>

      <Section number="09" title="Security">
        <p>
          We use administrative, technical, and organizational safeguards appropriate to the sensitivity of the data, such as encryption in transit, access controls, authentication, logging, vendor reviews, and incident response procedures. No digital system is completely secure, and we cannot guarantee absolute security.
        </p>
      </Section>

      <Section number="10" title="Your privacy choices and rights">
        <p>
          Depending on your location, you may request access, correction, deletion, restriction, data portability, or withdrawal of consent, and you may object to certain processing. You may also opt out of optional communications and manage device permissions.
        </p>
        <p>
          To submit a request, use <strong>Settings → Privacy &amp; Data</strong> or contact <strong>[Privacy Contact Email]</strong>. We may ask for information necessary to verify your identity. Authorized agents may submit requests where permitted.
        </p>
      </Section>

      <Section number="11" title="Children and minors">
        <p>
          The Service is intended for adults. It is not directed to children under 13, and we do not knowingly collect their personal information. The minimum age may be higher in some jurisdictions or when coaching is provided through an organization. If we learn that a minor’s data was collected improperly, we will take appropriate action.
        </p>
      </Section>

      <Section number="12" title="International transfers">
        <p>
          If information is transferred outside the country where you live, we use appropriate safeguards required by applicable law, such as standard contractual clauses or equivalent transfer mechanisms.
        </p>
      </Section>

      <Section number="13" title="Changes and contact">
        <p>
          We may update this policy to reflect changes to our Service or legal obligations. Material changes will be communicated through the app or another appropriate channel. The “Updated” date shows the latest revision.
        </p>
        <p>
          Privacy questions or complaints: <strong>[Privacy Contact Email]</strong>. You may also have the right to lodge a complaint with a local data protection authority.
        </p>
      </Section>

      <div className="mt-2 rounded-2xl border border-[#004D68] bg-[#003549] px-5 py-4 text-sm leading-6 text-[#BFE9FF]">
        <strong>Crisis support:</strong> if you may hurt yourself or someone else, or are in immediate danger, contact local emergency services now. In the U.S. or Canada, call or text 988; elsewhere, use a local crisis service.
      </div>
    </LegalShell>
  );
}
