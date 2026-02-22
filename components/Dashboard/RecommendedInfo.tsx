import Link from 'next/link';

export default function RecommendedInfo() {
  return (
    <div className="rounded-[12px] bg-[#262626]" style={{ padding: '20px' }}>
      <h3
        className="font-bold text-[#f9f9f9]"
        style={{ fontSize: '18px', marginBottom: '20px', lineHeight: '1.1' }}
      >
        Start your workout
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="flex gap-3">
          <div
            className="flex shrink-0 items-center justify-center rounded-full bg-[#f9f9f9]"
            style={{ width: '40px', height: '40px' }}
          >
            <span className="text-lg font-bold text-[#1f1f1f]">1</span>
          </div>
          <p className="text-sm leading-[1.4] text-[#686868]">
            <span className="text-[#f9f9f9]">Create a personal library:</span>{' '}
            add the books you intend to read to it.
          </p>
        </div>

        <div className="flex gap-3">
          <div
            className="flex shrink-0 items-center justify-center rounded-full bg-[#f9f9f9]"
            style={{ width: '40px', height: '40px' }}
          >
            <span className="text-lg font-bold text-[#1f1f1f]">2</span>
          </div>
          <p className="text-sm leading-[1.4] text-[#686868]">
            <span className="text-[#f9f9f9]">Create your first workout:</span>{' '}
            define a goal, choose a period, start training.
          </p>
        </div>
      </div>

      <Link
        href="/library"
        className="group mt-5 flex items-center gap-1 text-sm text-[#686868] no-underline transition-colors hover:text-[#f9f9f9] hover:underline"
      >
        My library
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          className="stroke-[#686868] transition-colors group-hover:stroke-[#f9f9f9]"
          fill="none"
        >
          <use href="/sprite.svg#icon-arrow-right" />
        </svg>
      </Link>
    </div>
  );
}
