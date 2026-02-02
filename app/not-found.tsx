import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#141414] p-4">
      <div className="text-center">
        <div className="mb-6 text-8xl">📚</div>
        <h1 className="mb-2 text-4xl font-bold text-[#f9f9f9]">404</h1>
        <h2 className="mb-4 text-xl text-[#686868]">Page Not Found</h2>
        <p className="mb-8 max-w-md text-[#686868]">
          Oops! The page you&apos;re looking for seems to have wandered off.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-[30px] border border-[#f9f9f9]/20 px-7 py-3 text-[#f9f9f9] transition-colors hover:bg-[#f9f9f9]/10"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
