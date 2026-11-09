// Next.js API Route for AI Director
import { NextRequest, NextResponse } from 'next/server';
import { generateHeuristicProject } from '@/lib/ai/directorAgent';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, targetDurationSeconds = 15.0, apiKey } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Generate project using heuristic director engine
    const project = generateHeuristicProject(prompt, targetDurationSeconds);

    return NextResponse.json({ success: true, project });
  } catch (err: any) {
    console.error('AI Director error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate animation project' },
      { status: 500 }
    );
  }
}
