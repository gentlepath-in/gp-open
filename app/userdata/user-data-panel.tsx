"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type SavedUserData = {
  name: string;
  email: string;
  ageRange: string;
  accountCreated: string;
  coach: string;
  wellnessGoal: string;
  recentCheckIn: {
    mood: string;
    date: string;
    note: string;
  };
};

const dummyUser: SavedUserData = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  ageRange: "25–34",
  accountCreated: "October 18, 2026",
  coach: "Jamie Rivera, ACC",
  wellnessGoal: "Build a calmer evening routine and reduce work stress",
  recentCheckIn: {
    mood: "Calm",
    date: "November 20, 2026",
    note: "A 10-minute reflection helped me notice what I need to delegate.",
  },
};

const STORAGE_KEY = "gentlepath-demo-user-data";

export function UserDataPanel() {
  const [savedData, setSavedData] = useState<SavedUserData | null>(dummyUser);
  const [confirmation, setConfirmation] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"ready" | "deleted">("ready");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "deleted") {
      setSavedData(null);
      setStatus("deleted");
    } else if (stored) {
      try {
        setSavedData(JSON.parse(stored) as SavedUserData);
      } catch {
        setSavedData(dummyUser);
      }
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyUser));
    }
  }, []);

  function deleteData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || confirmation !== "DELETE") return;

    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.setItem(STORAGE_KEY, "deleted");
    setSavedData(null);
    setStatus("deleted");
    setConfirmation("");
    setConsent(false);
  }

  function restoreDemoData() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyUser));
    setSavedData(dummyUser);
    setStatus("ready");
  }

  return (
    <div>
      {status === "deleted" ? (
        <div className="mb-8 rounded-2xl border border-[#bfd8ce] bg-[#edf7f2] px-5 py-5">
          <p className="font-semibold text-[#315b50]">Your demo data has been deleted.</p>
          <p className="mt-1 text-sm leading-6 text-[#60766e]">
            The saved browser record was removed. This demonstration does not send or erase server-side records.
          </p>
          <button
            type="button"
            onClick={restoreDemoData}
            className="mt-4 rounded-full border border-[#bdd1c6] bg-white px-4 py-2 text-sm font-semibold text-[#315b50] transition hover:bg-[#f7faf8]"
          >
            Restore demo data
          </button>
        </div>
      ) : null}

      {savedData ? (
        <>
          <div className="mb-8 flex items-start justify-between gap-4 border-b border-[#edf1ed] pb-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#91a098]">Saved profile</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#24473e]">{savedData.name}</h2>
              <p className="mt-1 text-sm text-[#75857f]">{savedData.email}</p>
            </div>
            <span className="rounded-full bg-[#edf4ef] px-3 py-1.5 text-xs font-semibold text-[#527064]">Demo</span>
          </div>

          <dl className="grid gap-px overflow-hidden rounded-2xl border border-[#e5ebe5] bg-[#e5ebe5] sm:grid-cols-2">
            {[
              ["Age range", savedData.ageRange],
              ["Account created", savedData.accountCreated],
              ["Assigned coach", savedData.coach],
              ["Wellness goal", savedData.wellnessGoal],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#fbfcfa] px-5 py-4">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[#91a098]">{label}</dt>
                <dd className="mt-2 text-sm leading-6 text-[#40564f]">{value}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-6 rounded-2xl border border-[#dfe7df] bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#24473e]">Latest check-in</h3>
              <span className="text-xs text-[#87958f]">{savedData.recentCheckIn.date}</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e4efe8] text-lg" aria-hidden="true">◡</span>
              <div>
                <p className="text-sm font-semibold text-[#40564f]">{savedData.recentCheckIn.mood}</p>
                <p className="mt-1 text-sm leading-6 text-[#718079]">{savedData.recentCheckIn.note}</p>
              </div>
            </div>
          </section>

          <section className="mt-10 border-t border-[#edf1ed] pt-8">
            <h2 className="text-xl font-semibold text-[#24473e]">Delete my data</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#697872]">
              This will erase the dummy profile from this browser and clear locally saved wellness information. Legal recordkeeping or backup retention may apply in the production service.
            </p>

            <form onSubmit={deleteData} className="mt-5 max-w-xl rounded-2xl border border-[#ecdcd6] bg-[#fffaf8] p-5">
              <label className="flex gap-3 text-sm leading-6 text-[#5f514c]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#9a5847]"
                />
                <span>I understand that deleting this data is permanent and cannot be undone.</span>
              </label>

              <label className="mt-5 block text-sm font-semibold text-[#4e4541]" htmlFor="delete-confirmation">
                Type <span className="rounded bg-[#f2e5df] px-1.5 py-0.5 font-mono">DELETE</span> to confirm
              </label>
              <input
                id="delete-confirmation"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                autoComplete="off"
                className="mt-2 w-full rounded-xl border border-[#d7deda] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#9a5847] focus:ring-2 focus:ring-[#9a5847]/10"
              />

              <button
                type="submit"
                disabled={!consent || confirmation !== "DELETE"}
                className="mt-4 rounded-full bg-[#9a5847] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#834839] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Permanently delete demo data
              </button>
            </form>
          </section>
        </>
      ) : (
        <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-[#d8e1da] bg-[#fbfcfa] text-center">
          <div>
            <p className="text-2xl">◇</p>
            <p className="mt-2 font-semibold text-[#40564f]">No saved data</p>
            <p className="mt-1 text-sm text-[#829087]">The demo profile is not currently stored.</p>
          </div>
        </div>
      )}
    </div>
  );
}
