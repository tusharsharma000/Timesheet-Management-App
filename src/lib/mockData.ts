// lib/mockData.ts

export const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password',
  },
];

export const timesheets = [
  {
    id: 1,
    week: '1',
    dateRange: '1 - 5 January, 2024',
    status: 'COMPLETED',
  },
  {
    id: 2,
    week: '2',
    dateRange: '8 - 12 January, 2024',
    status: 'COMPLETED',
  },
  {
    id: 3,
    week: '3',
    dateRange: '15 - 19 January, 2024',
    status: 'INCOMPLETE',
  },
  {
    id: 4,
    week: '4',
    dateRange: '22 - 26 January, 2024',
    status: 'INCOMPLETE',
  },
  {
    id: 5,
    week: '5',
    dateRange: '28 January - 1 February, 2024',
    status: 'MISSING',
  },
];
type Entry = {
  id: number;
  task: string;
  hours: number;
  day: string;
};

export const weeklyEntries: Record<number, Entry[]> = {
  1: [
    { id: 1, task: 'Frontend Dev', hours: 8, day: 'Monday' },
    { id: 2, task: 'Bug Fixing', hours: 6, day: 'Tuesday' },
    { id: 3, task: 'Team Sync', hours: 2, day: 'Wednesday' },
    { id: 4, task: 'Frontend Dev23', hours: 8, day: 'Monday' },
    { id: 5, task: 'Bug Fixing Again', hours: 6, day: 'Tuesday' },
    { id: 6, task: 'Standup', hours: 6, day: 'Tuesday' },
    { id: 7, task: 'Worked on Feature', hours: 4, day: 'Friday' },
  ],
  2: [
    { id: 4, task: 'UI Design', hours: 5, day: 'Monday' },
    { id: 5, task: 'Code Review', hours: 3, day: 'Thursday' },
     { id: 1, task: 'Frontend Dev23', hours: 8, day: 'Monday' },
    { id: 2, task: 'Bug Fixing Again', hours: 6, day: 'Tuesday' },
    { id: 3, task: 'Standup', hours: 6, day: 'Tuesday' },
    { id: 8, task: 'Worked on Feature', hours: 4, day: 'Friday' },
    { id: 10, task: 'Frontend', hours: 8, day: 'Monday' },
  ],
  3: [
    { id: 4, task: 'UI Design', hours: 5, day: 'Monday' },
    { id: 5, task: 'Code Review', hours: 3, day: 'Thursday' },
  ],
  4: [
    { id: 4, task: 'UI Design', hours: 5, day: 'Monday' },
    { id: 5, task: 'Code Review', hours: 3, day: 'Thursday' },
  ],
  5: [
  ],
};