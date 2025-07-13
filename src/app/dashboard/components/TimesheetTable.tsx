// // app/dashboard/components/TimesheetTable.tsx
'use client';
// import { useState } from 'react';
// import Link from 'next/link';

interface TimesheetEntry {
  id: number;
  week: string;
  dateRange: string;
  status: string;
  totalHours: number;
}

// export default function TimesheetTable({ timesheets }: { timesheets: TimesheetEntry[] }) {
//   return (
//     <div className="border-2 border-gray-50 bg-white rounded-lg py-6 px-4">
//       <h2 className="text-2xl font-bold mb-4">Your Timesheets</h2>
//       <table className="min-w-full rounded-lg border-2 border-gray-50 border-collapse table-auto">
//         <thead>
//           <tr className="bg-gray-100 text-left">
//             <th className="px-4 py-2">WEEK #</th>
//             <th className="px-4 py-2">DATE</th>
//             <th className="px-4 py-2">STATUS</th>
//             <th className="px-4 py-2">ACTIONS</th>
//           </tr>
//         </thead>
//         <tbody>
//           {timesheets.map((sheet) => (
//             <tr key={sheet.id} className="border-t hover:bg-gray-50">
//               <td className="px-4 py-2">{sheet.week}</td>
//               <td className="px-4 py-2">{sheet.dateRange}</td>
//               <td className="px-4 py-2">
//                 <span
//                   className={`inline-block px-2 py-1 rounded text-xs ${
//                     sheet.status === 'COMPLETED'
//                       ? 'bg-green-100 text-green-800'
//                       : sheet.status === 'INCOMPLETE'
//                       ? 'bg-yellow-100 text-yellow-800'
//                       : 'bg-red-100 text-red-800'
//                   }`}
//                 >
//                   {sheet.status}
//                 </span>
//               </td>
//               <td className="px-4 py-2">
//                 <Link
//                   href={{
//                     pathname: `/dashboard/week/${sheet.id}`,
//                     query: {
//                       range: sheet.dateRange,
//                     },
//                   }}
//                   className="text-blue-600 hover:underline"
//                 >
//                   {sheet.status === 'MISSING' ? 'Create' : 'View'}
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import React from 'react';
import Link from 'next/link';

const TimesheetTable = ({ timesheets }: { timesheets: TimesheetEntry[] }) => {
  // const timesheets = [
  //   {
  //     id: 1,
  //     week: 1,
  //     dateRange: '1 - 5 January, 2024',
  //     status: 'COMPLETED'
  //   },
  //   {
  //     id: 2,
  //     week: 2,
  //     dateRange: '8 - 12 January, 2024',
  //     status: 'COMPLETED'
  //   },
  //   {
  //     id: 3,
  //     week: 3,
  //     dateRange: '15 - 19 January, 2024',
  //     status: 'INCOMPLETE'
  //   },
  //   {
  //     id: 4,
  //     week: 4,
  //     dateRange: '22 - 26 January, 2024',
  //     status: 'COMPLETED'
  //   },
  //   {
  //     id: 5,
  //     week: 5,
  //     dateRange: '29 January - 1 February, 2024',
  //     status: 'MISSING'
  //   }
  // ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'INCOMPLETE':
        return 'bg-yellow-100 text-yellow-800';
      case 'MISSING':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionText = (status: string) => {
    return status === 'MISSING' ? 'Create' : status === 'INCOMPLETE' ? 'Update' : 'View';
  };

  return (
    <div className="border-2 border-gray-50 bg-white rounded-lg py-6 px-4">
      <h2 className="text-2xl font-bold mb-4">Your Timesheets</h2>
      <table className="min-w-full rounded-lg border-2 border-gray-50 border-collapse table-auto rounded-tl-xl rounded-br-lg">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="px-3 py-4 text-sm font-medium text-gray-700 uppercase tracking-wider">WEEK #</th>
            <th className="px-4 py-4 text-sm font-medium text-gray-700 uppercase tracking-wider">DATE</th>
            <th className="px-4 py-4 text-sm font-medium text-gray-700 uppercase tracking-wider">STATUS</th>
            <th className="px-4 py-4 text-sm font-medium text-gray-700 uppercase tracking-wider">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((sheet) => (
            <tr key={sheet.id} className="border-t-2 border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="px-3 py-4 text-sm text-gray-900 bg-gray-50">{sheet.week}</td>
              <td className="px-4 py-4 text-sm text-gray-900">{sheet.dateRange}</td>
              <td className="px-4 py-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(sheet.status)}`}
                >
                  {sheet.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <Link
                  href={{
                    pathname: `/dashboard/week/${sheet.id}`,
                    query: {
                      range: sheet.dateRange,
                    },
                  }}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm transition-colors"
                >
                  {getActionText(sheet.status)}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimesheetTable;