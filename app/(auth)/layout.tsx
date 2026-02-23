import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: '#141414',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          maxWidth: '1280px',
          margin: '0 auto',

          height: 'calc(100dvh - 40px)',
          minHeight: '700px',
        }}
      >
        <div
          style={{
            width: '600px',
            minWidth: '600px',
            backgroundColor: '#1f1f1f',
            borderRadius: '30px',

            padding: '40px 64px',
            display: 'flex',
            flexDirection: 'column',

            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/logo.svg"
              alt=""
              width={42}
              height={17}
              priority
              style={{ display: 'block', flexShrink: 0 }}
            />
            <span
              style={{
                color: '#f9f9f9',
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: 1,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Read Journey
            </span>
          </Link>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',

              minHeight: 0,
            }}
          >
            {children}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: '#1f1f1f',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <picture>
            <source
              srcSet="/images/iphone@1x.webp 1x, /images/iphone@2x.webp 2x"
              type="image/webp"
            />
            <img
              src="/images/iphone@1x.webp"
              alt="Read Journey App"
              style={{ height: '88%', width: 'auto', display: 'block' }}
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
