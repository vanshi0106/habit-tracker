"use client";
import { useState, useEffect } from "react";

const HABITS = [
  { id: 1, name: "Drink 8 glasses of water", icon: "💧" },
  { id: 2, name: "Exercise for 30 mins", icon: "🏃" },
  { id: 3, name: "Read for 20 mins", icon: "📚" },
  { id: 4, name: "Meditate", icon: "🧘" },
  { id: 5, name: "Sleep 8 hours", icon: "😴" },
];

export default function Home() {
  const [completed, setCompleted] = useState({});
  const [customHabit, setCustomHabit] = useState("");
  const [habits, setHabits] = useState(HABITS);
  const today = new Date().toDateString();

  const toggle = (id) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addHabit = () => {
    if (!customHabit.trim()) return;
    const newHabit = { id: Date.now(), name: customHabit, icon: "⭐" };
    setHabits((prev) => [...prev, newHabit]);
    setCustomHabit("");
  };

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const completedCount = habits.filter((h) => completed[h.id]).length;
  const progress = habits.length ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-1">HabitFlow 🌟</h1>
        <p className="text-center text-gray-500 mb-6">{today}</p>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-4 shadow mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Daily Progress</span>
            <span className="text-sm font-bold text-indigo-600">{completedCount}/{habits.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-indigo-600 font-bold mt-2">{progress}% Complete</p>
        </div>

        {/* Habits List */}
        <div className="space-y-3 mb-6">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`flex items-center justify-between p-4 rounded-2xl shadow transition-all ${
                completed[habit.id] ? "bg-indigo-500 text-white" : "bg-white text-gray-700"
              }`}
            >
              <button onClick={() => toggle(habit.id)} className="flex items-center gap-3 flex-1 text-left">
                <span className="text-2xl">{habit.icon}</span>
                <span className={`font-medium ${completed[habit.id] ? "line-through opacity-80" : ""}`}>
                  {habit.name}
                </span>
              </button>
              <div className="flex items-center gap-2">
                <span>{completed[habit.id] ? "✅" : "⬜"}</span>
                <button onClick={() => deleteHabit(habit.id)} className="text-xs opacity-60 hover:opacity-100">❌</button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Habit */}
        <div className="bg-white rounded-2xl p-4 shadow">
          <p className="text-sm font-medium text-gray-600 mb-2">Add Custom Habit</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={customHabit}
              onChange={(e) => setCustomHabit(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addHabit()}
              placeholder="e.g. Journal writing..."
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button
              onClick={addHabit}
              className="bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}