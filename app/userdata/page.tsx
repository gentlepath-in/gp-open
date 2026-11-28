import type { Metadata } from "next";
import { LegalShell } from "../components/legal-shell";
import { UserDataPanel } from "./user-data-panel";

export const metadata: Metadata = {
  title: "Your Data | GentlePath",
  description: "Request deletion of server-side data.",
};

export default function UserDataPage() {
  return (
    <LegalShell
      eyebrow="Data controls"
      title="Manage your data"
      description="Submit an access, correction, or deletion request for data held by GentlePath."
      updated="November 28, 2026"
      activeHref="/userdata"
    >
      <UserDataPanel />
    </LegalShell>
  );
}
