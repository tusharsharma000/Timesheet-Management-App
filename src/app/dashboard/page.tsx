// app/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import TimesheetTable from './components/TimesheetTable';

interface TimesheetEntry {
  id: number;
  week: string;
  dateRange: string;
  status: string;
  totalHours: number;
}

export default function DashboardPage() {
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const res = await fetch('/api/timesheets');
        if (res.ok) {
          const data = await res.json();
          setTimesheets(data);
        }
      } catch (error) {
        console.error('Failed to fetch timesheets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimesheets();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <TimesheetTable timesheets={timesheets} />
    </>
  );
}