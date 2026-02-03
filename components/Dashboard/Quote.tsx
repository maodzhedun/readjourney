// import Image from 'next/image';

export default function Quote() {
  return (
    <div className="flex gap-3 rounded-xl bg-[#262626] p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f9f9f9]">
        <span className="text-xl">📖</span>
      </div>
      <p className="text-sm text-[#686868]">
        "Books are the ships of thoughts, wandering through the waves of time."
      </p>
    </div>
  );
}
