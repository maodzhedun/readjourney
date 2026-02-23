import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[#141414] p-5 md:p-8">
      <div
        className="
          mx-auto
          flex
          max-w-[1280px]
          flex-col
          gap-4
          min-h-[calc(100dvh-40px)]
          md:h-[calc(100dvh-64px)]
          2xl:flex-row
          2xl:gap-8
        "
      >
        <div
          className="
            flex w-full flex-col
            rounded-[30px] bg-[#1f1f1f]
            p-5
            md:h-full md:p-8
            2xl:w-[600px] 2xl:min-w-[600px]
          "
        >
          {/* LOGO */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 no-underline"
          >
            <Image
              src="/images/logo.svg"
              alt=""
              width={42}
              height={17}
              priority
              className="block shrink-0"
            />
            <span className="text-[18px] font-bold uppercase leading-none tracking-[0.05em] text-[#f9f9f9]">
              Read Journey
            </span>
          </Link>

          <div className="flex min-h-0 flex-1 flex-col justify-center">
            {children}
          </div>
        </div>

        <div
          className="
            hidden
            2xl:flex 2xl:h-full
            flex-1
            items-center
            justify-center
            overflow-hidden
            rounded-[30px]
            bg-[#1f1f1f]
          "
        >
          <picture>
            <source
              srcSet="/images/iphone@1x.webp 1x, /images/iphone@2x.webp 2x"
              type="image/webp"
            />
            <img
              src="/images/iphone@1x.webp"
              alt="Read Journey App"
              className="block"
              style={{ height: '88%', width: 'auto' }}
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
