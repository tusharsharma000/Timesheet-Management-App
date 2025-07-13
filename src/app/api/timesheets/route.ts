// app/api/timesheets/route.ts
import { NextRequest } from 'next/server';
import { timesheets } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  return Response.json(timesheets);
}