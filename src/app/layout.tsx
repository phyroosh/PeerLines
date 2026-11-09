import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PeerLines Playground — Viral 2D Stickman & Line-Art Explainer Studio',
  description:
    'Agentic web-based creative studio and animation engine designed to generate viral, minimalist 2D stickman and line-art explanation videos in 9:16 vertical format.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0C0C0E] text-[#F4F4F6]">
        {children}
      </body>
    </html>
  );
}
