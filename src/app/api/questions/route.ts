import { NextResponse } from 'next/server';
import questionsData from '@/data/questions.json';

/**
 * GET /api/questions
 * Returns the questions bank from JSON file
 * This simulates loading from a backend/database
 */
export async function GET() {
  try {
    // Simulate slight delay as if fetching from database
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Return questions with proper headers
    return NextResponse.json(questionsData, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error loading questions:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to load questions',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Handle invalid methods
 */
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

