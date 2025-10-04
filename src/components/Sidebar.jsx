import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBookmark, faMagnifyingGlass, faPencil } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ sidebarOpen, activeView, setActiveView }) => {

  const getButtonClass = (viewName) => {
    return activeView === viewName ? 'bg-teal-500/20 text-teal-400': 'text-slate-400 hover:bg-slate-800 transition-colors';
  };

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-slate-900/50 border-r border-slate-800 flex flex-col`}>
      <div className='p-4 border-b border-slate-800'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-gradient-to-br from-teal-400 to-indigo-500 rounded-lg flex items-center justify-center'>
            <FontAwesomeIcon icon={faGithub} className='w-5 h-5 text-white' />
          </div>
          {sidebarOpen && <span className='font-semibold text-lg'>Explorer</span>}
        </div>
      </div>

      <nav className='flex-1 p-4 space-y-2'>
        <button onClick={() => setActiveView('explore')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${getButtonClass('explore')}`}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className='w-5 h-5' />
          {sidebarOpen && <span>Explore</span>}
        </button>
        <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${getButtonClass('bookmarked')}`} onClick={() => setActiveView('bookmarked')}>
          <FontAwesomeIcon icon={faBookmark} className='w-5 h-5' />
          {sidebarOpen && <span>Bookmarks</span>}
        </button>
        <button onClick={() => setActiveView('notes')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${getButtonClass('notes')}`}>
          <FontAwesomeIcon icon={faPencil} className='w-5 h-5' />
          {sidebarOpen && <span>Notes</span>}
        </button>
      </nav>

      <div className='p-4 border-t border-slate-800'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full'></div>
          {sidebarOpen && (
            <div>
              <p className='text-sm font-medium'>Developer</p>
              <p className='text-xs text-slate-400'>Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
