import { NextResponse } from 'next/server';
import { profiles } from './data';

export async function GET() {
  return NextResponse.json(profiles);
}