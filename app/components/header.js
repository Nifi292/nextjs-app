import React from 'react';
import { FaSearch, FaChartBar, FaUserCircle } from 'react-icons/fa';

export default function Header() {
  return (
    <nav className="bg-gray-800 flex flex-wrap items-center justify-between h-16 px-4">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto mr-4" />
      </div>
      <div className="flex-grow"></div>
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-300 rounded px-8 py-1 pr-10 w-48 md:w-64 lg:w-96"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className="flex items-center ml-2">
          <FaChartBar className="text-red-500 bg-blue-500 rounded-full p-2 text-2xl" />
          <FaUserCircle className="text-purple-500 ml-2 text-2xl" />
        </div>
        <button className="button-create">+ Create</button>
      </div>
    </nav>
  );
}
