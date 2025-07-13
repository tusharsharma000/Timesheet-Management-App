// app/dashboard/layout.tsx

import { ReactNode } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" bg-gray-50">
      <header className="flex justify-between items-center px-8 py-4 bg-white mb-6">
  {/* Left Section: Logo and Subtext */}
  <div className="flex items-center space-x-3">
    <h1 className="text-xl font-bold">ticktock</h1>
    <p className="text-sm text-gray-600">Timesheets</p>
  </div>

  {/* Right Section: User Name + Icon */}
  <div className="flex items-center space-x-1 text-sm text-gray-800">
    <span>John Doe</span>
    <ChevronDownIcon className="w-4 h-4" />
  </div>
</header>

      <div className='bg-gray-50'>
      <div className='max-w-7xl mx-auto '>
      {children}
      </div>
</div>
      <footer className="text-center bg-gray-50 mt-4 text-gray-500 text-sm bg-white  max-w-7xl rounded-lg px-4 py-6 mx-auto">
        © 2024 tentwenty. All rights reserved.
      </footer>
    </div>
  );
}
