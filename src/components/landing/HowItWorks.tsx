"use client";

const STEPS = [
  {
    step: "01",
    title: "Declare Your Objective",
    description: "Write down the exact deliverable you are finishing. Single focus, no multitasking.",
    color: "bg-[#ffedd5] text-[#c2410c] border-[#fed7aa]",
  },
  {
    step: "02",
    title: "Activate Zen Lockdown",
    description: "Choose sprint duration, select procedural audio or paste a YouTube lofi link, and enter full screen.",
    color: "bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]",
  },
  {
    step: "03",
    title: "Execute Without Penalty",
    description: "Work uninterrupted. Switching tabs triggers +2 min penalties and enforces focus reflection.",
    color: "bg-[#f0fdf4] text-[#15803d] border-[#bbf7d0]",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto border-t border-neutral-200">
      <div className="text-left max-w-2xl mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-[#f85121] font-semibold">
          FLOW & WORKFLOW
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f172a] mt-2 mb-3">
          How Lock-In operates
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed text-pretty">
          A three-step protocol engineered to convert fragmented attention into deep momentum.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((item) => (
          <div
            key={item.step}
            className="p-8 bg-[#f8fafc] border border-neutral-200 rounded-3xl flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl font-mono text-sm font-bold border ${item.color}`}>
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-[#0f172a]">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
