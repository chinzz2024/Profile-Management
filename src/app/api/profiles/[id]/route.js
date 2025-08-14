import { NextResponse } from 'next/server';
import { profiles } from '../data';

export async function GET(request, { params }) {
  const profile = profiles.find(p => p.id === parseInt(params.id));

  if (!profile) {
    return new Response('Profile not found', { status: 404 });
  }

  return NextResponse.json(profile);
}