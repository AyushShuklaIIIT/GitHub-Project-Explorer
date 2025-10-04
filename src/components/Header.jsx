import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBars, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

const timeRanges = ["day", "week", "month"];
const sortOptions = ["stars", "forks", "updates"];

const Header = ({sidebarOpen, setSidebarOpen, searchQuery, setSearchQuery, sortBy, setSortBy, timeRange, setTimeRange, onRefresh}) => {
  return (
    <header className='bg-slate-900/50 backdrop-blur-sm border-b border-slate-800 p-4'>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className='p-2 rounded-lg hover:bg-slate-800 transition-colors'>
            <FontAwesomeIcon icon={faBars} className='w-5 h-5' />
          </button>
          <div className='relative'>
            <input type="text" placeholder='Search repositories...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-80 px-4 py-2 pl-10 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent' />
            <div className='absolute left-3 top-2.5 text-slate-400'>
              <FontAwesomeIcon icon={faMagnifyingGlass} className='w-5 h-5' />
            </div>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className='px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'>
            {timeRanges.map(range => (
              <option key={range} value={range} className='capitalize'>{range.charAt(0).toUpperCase() + range.slice(1)}</option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'>
            {sortOptions.map(opt => (
              <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
            ))}
          </select>

          <button onClick={onRefresh} className='p-2 rounded-lg bg-teal-500 hover:bg-teal-600 transition-colors'>
            <FontAwesomeIcon icon={faArrowsRotate} className='w-5 h-5' />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
