'use client';

import dynamic from 'next/dynamic';

const StudioLayout = dynamic(
  () => import('@/components/studio/StudioLayout').then((mod) => mod.StudioLayout),
  {
    ssr: false,
    loading: () => (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#0C0C0E] text-chalk-white">
        <div className="w-10 h-10 rounded-xl bg-amber-500 text-black font-black flex items-center justify-center text-lg animate-pulse mb-4">
          PL
        </div>
        <div className="text-sm font-semibold tracking-wider text-chalk-white">
          Loading PeerLines Playground...
        </div>
        <div className="text-xs text-chalk-muted mt-1">
          Initializing Remotion 9:16 Canvas & Audio Engine
        </div>
      </div>
    ),
  }
);

export default function Home() {
  return <StudioLayout />;
}
