//app/private/layout.tsx;

import Header from '@/components/Header/Header';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#141414] p-4 md:p-8">
      <div className="mx-auto max-w-[1280px]">
        <Header />
        <div className="mt-4">{children}</div>
      </div>
    </main>
  );
}