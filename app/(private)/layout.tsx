//app/(private)/layout.tsx

import Header from '@/components/Header/Header';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#141414]" style={{ padding: '32px' }}>
      <div className="mx-auto max-w-[1280px]">
        <Header />
        <div style={{ marginTop: '20px' }}>{children}</div>
      </div>
    </main>
  );
}
