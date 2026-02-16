import Image from 'next/image';

export default function Quote() {
  return (
    <div
      className="flex gap-3 rounded-[12px] bg-[#262626]"
      style={{ padding: '20px' }}
    >
      <div className="shrink-0" style={{ width: '40px', height: '40px' }}>
        <Image
          src="/window.svg"
          alt="Book"
          width={40}
          height={40}
        />
      </div>
      <p className="text-sm text-[#686868]">
        "Books are <span className="text-[#f9f9f9]">windows</span> to the world,
        and reading is a journey into the unknown."
      </p>
    </div>
  );
}
