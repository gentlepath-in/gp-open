import type { Metadata } from "next";
import { LegalShell } from "../components/legal-shell";
import { UserDataPanel } from "./user-data-panel";

export const metadata: Metadata = {
  title: "Your Data | GentlePath",
  description: "Review and delete your saved GentlePath demo profile data.",
};

export default function UserDataPage() {
  return (
    <LegalShell
      eyebrow="Data controls"
      title="See what is saved. Choose what stays."
      description="This demo begins with sample wellness data stored only in your browser. You can review it and permanently remove it below."
      updated="November 21, 2026"
      activeHref="/userdata"
    >
      <UserDataPanel />
    </LegalShell>
  );
}
