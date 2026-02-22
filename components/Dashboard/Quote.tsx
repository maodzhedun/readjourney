export default function Quote() {
  return (
    <div
      className="flex items-start gap-[14px] rounded-[12px] bg-[#262626]"
      style={{ padding: '15px 20px' }}
    >
      <div className="shrink-0" style={{ width: '40px', height: '40px' }}>
        <picture>
          <source
            srcSet="/images/books@1x.webp 1x, /images/books@2x.webp 2x"
            type="image/webp"
          />
          <img src="/images/books@1x.webp" alt="Books" width={40} height={40} />
        </picture>
      </div>
      <p className="text-sm leading-[1.4] text-[#686868]">
        "Books are <span className="text-[#f9f9f9]">windows</span> to the world,
        and reading is a journey into the unknown."
      </p>
    </div>
  );
}
