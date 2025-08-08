// src/components/TimeCapsuleApp.tsx
import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import CreatePage from "./CreatePage";
import ViewPage from "./ViewPage";
import type { Capsule, Page } from "../types";

const API_URL = "http://localhost:8000"; // change when deployed

const TimeCapsuleApp: React.FC = () => {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [newCapsule, setNewCapsule] = useState<Omit<Capsule, "id" | "createdAt" | "isLocked">>({
    title: "",
    message: "",
    openDate: "",
    mood: "hopeful",
    color: "blue",
  });

  // Format dates for UI
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  // fetch all capsules from backend
  const fetchCapsules = async () => {
    try {
      const res = await fetch(`${API_URL}/capsules`);
      if (!res.ok) throw new Error("Failed to fetch capsules");
      const data = await res.json();
      setCapsules(data);
    } catch (err) {
      console.error("Error fetching capsules:", err);
    }
  };

  // create capsule
  const createCapsule = async () => {
    if (!newCapsule.title || !newCapsule.message || !newCapsule.openDate) return;
    try {
      const res = await fetch(`${API_URL}/capsules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCapsule),
      });
      if (!res.ok) throw new Error("Failed to create capsule");
      const created = await res.json();
      setCapsules((prev) => [...prev, created]);
      setNewCapsule({ title: "", message: "", openDate: "", mood: "hopeful", color: "blue" });
      setCurrentPage("home");
    } catch (err) {
      console.error("Error creating capsule:", err);
    }
  };

  // delete capsule (backend + local)
  const deleteCapsule = async (id: string) => {
    try {
      await fetch(`${API_URL}/capsules/${id}`, { method: "DELETE" });
    } catch (err) {
      // backend might not be present — still remove locally
      console.warn("Delete request failed (maybe backend offline):", err);
    } finally {
      setCapsules((prev) => prev.filter((c) => String(c.id) !== id));
      setSelectedCapsule((s) => (s && String(s.id) === id ? null : s));
      setCurrentPage("home");
    }
  };

  // open a capsule (mark as opened locally and try to PATCH backend)
  const openCapsule = async (capsule: Capsule) => {
    const openedAt = new Date().toISOString();
    const updated = capsules.map((c) =>
      String(c.id) === String(capsule.id) ? { ...c, isLocked: false, openedAt } : c
    );
    setCapsules(updated);
    setSelectedCapsule({ ...capsule, isLocked: false, openedAt });
    // try backend update if route exists
    try {
      await fetch(`${API_URL}/capsules/${capsule.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isLocked: false, openedAt }),
      });
    } catch (err) {
      // ignore if backend doesn't support PATCH
    }
    setCurrentPage("view");
  };

  // helpers
  const getMoodEmoji = (mood: Capsule["mood"]) => {
    const map: Record<Capsule["mood"], string> = {
      hopeful: "🌟",
      grateful: "💖",
      excited: "🎉",
      nostalgic: "🌙",
      dreamy: "✨",
      happy: "😊",
      sad: "😢",
    };
    return map[mood] ?? "💫";
  };

  const getColorClasses = (color: Capsule["color"]) => {
    const map: Record<Capsule["color"], string> = {
      blue: "from-blue-400 to-purple-600",
      pink: "from-pink-400 to-rose-600",
      green: "from-green-400 to-teal-600",
      orange: "from-orange-400 to-red-600",
      purple: "from-purple-400 to-indigo-600",
    };
    return map[color] ?? map.blue;
  };

  useEffect(() => {
    fetchCapsules();
  }, []);

  return (
    <>
      {currentPage === "home" && (
        <HomePage
          capsules={capsules}
          setSelectedCapsule={(capsule) => {
            setSelectedCapsule(capsule);
            setCurrentPage("view");
          }}
          setCurrentPage={setCurrentPage}
          deleteCapsule={deleteCapsule}
          getMoodEmoji={getMoodEmoji}
          getColorClasses={getColorClasses}
          formatDate={formatDate}
        />
      )}

      {currentPage === "create" && (
        <CreatePage
          newCapsule={newCapsule}
          setNewCapsule={setNewCapsule}
          createCapsule={createCapsule}
          setCurrentPage={setCurrentPage}
          getMoodEmoji={getMoodEmoji}
          getColorClasses={getColorClasses}
        />
      )}

      {currentPage === "view" && selectedCapsule && (
        <ViewPage
          capsule={selectedCapsule}
          setCurrentPage={setCurrentPage}
          openCapsule={openCapsule}
          deleteCapsule={deleteCapsule}
          formatDate={formatDate}
          getMoodEmoji={getMoodEmoji}
          getColorClasses={getColorClasses}
        />
      )}
    </>
  );
};

export default TimeCapsuleApp;
