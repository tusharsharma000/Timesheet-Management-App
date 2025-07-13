// app/api/week/[id]/route.ts
import { NextRequest } from 'next/server';
import { timesheets, weeklyEntries } from '@/lib/mockData';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Await params before accessing its properties
  const { id } = await params;

  const weekId = parseInt(id, 10);
   const entries = weeklyEntries[weekId];
  const timesheetMeta = timesheets.find(sheet => parseInt(sheet.week) === weekId);

  if (!entries || !timesheetMeta) {
    return Response.json({ error: 'Week not found' }, { status: 404 });
  }

  return Response.json(entries);
}