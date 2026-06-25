"use client";
import { useState, useEffect } from "react";

const DEFAULT_HABITS = [
  { id: 1, name: "Drink 8 glasses of water", icon: "💧", color: "from-blue-400 to-cyan-400" },
  { id: 2, name: "Exercise for 30 mins", icon: "🏃", color: "from-orange-400 to-red-400" },
  { id: 3, name: "Read for 20 mins", icon: "📚", color: "from-green-400 to-emerald-400" },
  { id: 4, name: "Meditate", icon: "🧘", color: "from-purple-400 to-violet-400" },
  { id: 5, name: "Sleep 8 hours", icon: "😴", color: "from-indigo-400 to-blue-400" },
  { id: 6, name: "Eat healthy meals", icon: "🥗", color: "from-lime-400 to-green-400" },
  { id: 7, name: "No social media 1hr before bed", icon: "📵", color: "from-pink-400 to-rose-400" },
];

const COLORS = [
  "from-blue-400 to-cyan-400",
  "from-orange-400 to-red-400",
  "from-green-400 to-emerald-400",
  "from-purple-400 to-violet-400",
  "from-pink-400 to-rose-400",
  "from-yellow-400 to-orange-400",
];

const QUOTES = [
  "Small steps every day lead to big results! 🌟",
  "You are doing amazing! Keep going! 💪",
  "Consistency is the key to success! 🔑",
  "Every habit counts! 🎯",
  "Build the life you want, one habit at a time! ✨",
];

export default function Home() {
  const [completed, setCompleted] = useState({});
  const [habits, setHabits] = useState(DEFAULT_HABITS);
  const [customHabit, setCustomHabit] = useState("");
  const [streak, setStreak] = useState(4);
  const [quote] = useState(QUOTES[0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const completedCount = habits.filter((h) => completed[h.id]).length;
  const progress = habits.length ? Math.round((completedCount / habits.length) * 100) : 0;

  useEffect(() => {
    if (progress === 100) setShowConfetti(true);
    else setShowConfetti(false);
  }, [progress]);

  const toggle = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addHabit = () => {
    if (!customHabit.trim()) return;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    setHabits((prev) => [...prev, { id: Date.now(), name: customHabit, icon: "⭐", color }]);
    setCustomHabit("");
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    setCompleted((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  const resetAll = () => {
    setCompleted({});
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-6xl animate-bounce">🎉</div>
        </div>
      )}

      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-1">
            HabitFlow ✨
          </h1>
          <p className="text-slate-400 text-sm">{today}</p>
          <p className="text-yellow-300 text-xs mt-2 italic">"{quote}"</p>
        </div>

        {/* Streak */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-white text-xs font-medium">Current Streak</p>
            <p className="text-white text-2xl font-black">{streak} Days 🔥</p>
          </div>
          <div className="text-5xl">🏆</div>
        </div>

        {/* Progress */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 shadow mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-slate-300">Daily Progress</span>
            <span className="text-sm font-bold text-purple-300">{completedCount}/{habits.length}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-700 shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-purple-300 font-bold">{progress}% Complete</p>
            {progress === 100 && <p className="text-yellow-300 font-bold">All done! 🎉</p>}
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-green-400">{completedCount}</p>
            <p className="text-xs text-slate-400">Done</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-red-400">{habits.length - completedCount}</p>
            <p className="text-xs text-slate-400">Remaining</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-purple-400">{habits.length}</p>
            <p className="text-xs text-slate-400">Total</p>
          </div>
        </div>

        {/* Habits List */}
        <div className="space-y-3 mb-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                completed[habit.id] ? "opacity-80 scale-98" : "hover:scale-101"
              }`}
            >
              <div className={`bg-gradient-to-r ${habit.color} p-px rounded-2xl`}>
                <div className={`flex items-center justify-between p-4 rounded-2xl ${
                  completed[habit.id] ? "bg-slate-800/80" : "bg-slate-800"
                }`}>
                  <button onClick={() => toggle(habit.id)} className="flex items-center gap-3 flex-1 text-left">
                    <span className="text-2xl">{habit.icon}</span>
                    <span className={`font-medium text-sm ${
                      completed[habit.id] ? "line-through text-slate-500" : "text-white"
                    }`}>
                      {habit.name}
                    </span>
                  </button>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      completed[habit.id] ? "bg-green-500 border-green-500" : "border-slate-500"
                    }`}>
                      {completed[habit.id] && <span className="text-xs text-white">✓</span>}
                    </div>
                    <button onClick={() => deleteHabit(habit.id)} className="text-slate-600 hover:text-red-400 text-xs">✕</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Habit */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-4">
          <p className="text-sm font-medium text-slate-300 mb-2">➕ Add Custom Habit</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={customHabit}
              onChange={(e) => setCustomHabit(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addHabit()}
              placeholder="e.g. Journal writing..."
              className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={addHabit}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:opacity-90"
            >
              Add
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetAll}
          className="w-full bg-slate-700 hover:bg-slate-600 text-slate-300 py-3 rounded-2xl text-sm font-medium transition-all"
        >
          🔄 Reset Today's Progress
        </button>

        <p className="text-center text-slate-600 text-xs mt-4">Built with ❤️ by Vanshika</p>
      </div>
    </main>
  );
}