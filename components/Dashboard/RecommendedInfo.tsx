import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function RecommendedInfo() {
  return (
    <div className="rounded-xl bg-[#262626] p-5">
      <h3 className="mb-5 text-lg font-bold text-[#f9f9f9]">
        Start your workout
      </h3>

      <div className="space-y-5">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f9f9f9]">
            <span className="text-lg font-bold text-[#1f1f1f]">1</span>
          </div>
          <p className="text-sm text-[#686868]">
            <span className="text-[#f9f9f9]">Create a personal library:</span>{' '}
            add the books you intend to read to it.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f9f9f9]">
            <span className="text-lg font-bold text-[#1f1f1f]">2</span>
          </div>
          <p className="text-sm text-[#686868]">
            <span className="text-[#f9f9f9]">Create your first workout:</span>{' '}
            define a goal, choose a period, start training.
          </p>
        </div>
      </div>

      <Link
        href="/library"
        className="mt-5 flex items-center gap-1 text-sm text-[#686868] underline transition-colors hover:text-[#f9f9f9]"
      >
        My library
        <ArrowRight size={20} />
      </Link>
    </div>
  );
}
