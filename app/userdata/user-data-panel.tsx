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
        <div className="mb-8 rounded-2xl border border-[#004D68] bg-[#003549] px-5 py-5">
          <p className="font-semibold text-[#BFE9FF]">Your demo data has been deleted.</p>
          <p className="mt-1 text-sm leading-6 text-[#81D4FA]">
            The saved browser record was removed. This demonstration does not send or erase server-side records.
          </p>
          <button
            type="button"
            onClick={restoreDemoData}
            className="mt-4 rounded-full border border-[#29B6F6] bg-[#252429] px-4 py-2 text-sm font-semibold text-[#81D4FA] transition hover:bg-[#004D68]"
          >
            Restore demo data
          </button>
        </div>
      ) : null}

      {savedData ? (
        <>
          <div className="mb-8 flex items-start justify-between gap-4 border-b border-[#3A383E] pb-7">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#81D4FA]">Saved profile</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#E6E1E5]">{savedData.name}</h2>
              <p className="mt-1 text-sm text-[#AFA8B0]">{savedData.email}</p>
            </div>
            <span className="rounded-full bg-[#004D68] px-3 py-1.5 text-xs font-semibold text-[#BFE9FF]">Demo</span>
          </div>

          <dl className="grid gap-px overflow-hidden rounded-2xl border border-[#3A383E] bg-[#3A383E] sm:grid-cols-2">
            {[
              ["Age range", savedData.ageRange],
              ["Account created", savedData.accountCreated],
              ["Assigned coach", savedData.coach],
              ["Wellness goal", savedData.wellnessGoal],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#252429] px-5 py-4">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[#81D4FA]">{label}</dt>
                <dd className="mt-2 text-sm leading-6 text-[#C7C1C8]">{value}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-6 rounded-2xl border border-[#3A383E] bg-[#252429] p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#E6E1E5]">Latest check-in</h3>
              <span className="text-xs text-[#AFA8B0]">{savedData.recentCheckIn.date}</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#004D68] text-lg text-[#BFE9FF]" aria-hidden="true">◡</span>
              <div>
                <p className="text-sm font-semibold text-[#C7C1C8]">{savedData.recentCheckIn.mood}</p>
                <p className="mt-1 text-sm leading-6 text-[#AFA8B0]">{savedData.recentCheckIn.note}</p>
              </div>
            </div>
          </section>

          <section className="mt-10 border-t border-[#3A383E] pt-8">
            <h2 className="text-xl font-semibold text-[#E6E1E5]">Delete my data</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#AFA8B0]">
              This will erase the dummy profile from this browser and clear locally saved wellness information. Legal recordkeeping or backup retention may apply in the production service.
            </p>

            <form onSubmit={deleteData} className="mt-5 max-w-xl rounded-2xl border border-[#68443B] bg-[#2D2928] p-5">
              <label className="flex gap-3 text-sm leading-6 text-[#C7C1C8]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#29B6F6]"
                />
                <span>I understand that deleting this data is permanent and cannot be undone.</span>
              </label>

              <label className="mt-5 block text-sm font-semibold text-[#E6E1E5]" htmlFor="delete-confirmation">
                Type <span className="rounded bg-[#003549] px-1.5 py-0.5 font-mono text-[#BFE9FF]">DELETE</span> to confirm
              </label>
              <input
                id="delete-confirmation"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                autoComplete="off"
                className="mt-2 w-full rounded-xl border border-[#4A4850] bg-[#1C1B1F] px-4 py-3 text-sm text-[#E6E1E5] outline-none transition placeholder:text-[#AFA8B0] focus:border-[#29B6F6] focus:ring-2 focus:ring-[#29B6F6]/20"
              />

              <button
                type="submit"
                disabled={!consent || confirmation !== "DELETE"}
                className="mt-4 rounded-full bg-[#29B6F6] px-5 py-2.5 text-sm font-semibold text-[#FFFFFF] transition hover:bg-[#81D4FA] hover:text-[#003549] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Permanently delete demo data
              </button>
            </form>
          </section>
        </>
      ) : (
        <div className="grid min-h-72 place-items-center rounded-2xl border border-dashed border-[#4A4850] bg-[#252429] text-center">
          <div>
            <p className="text-2xl text-[#81D4FA]">◇</p>
            <p className="mt-2 font-semibold text-[#E6E1E5]">No saved data</p>
            <p className="mt-1 text-sm text-[#AFA8B0]">The demo profile is not currently stored.</p>
          </div>
        </div>
      )}
    </div>
  );
}
