import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const languages = ["JavaScript", "TypeScript", "Python", "Java", "Go", "Rust", "C++"];

const FiltersPanel = ({filtersOpen, setFiltersOpen, language, setLanguage}) => {
  if(!filtersOpen) return null;
  return (
    <aside className='w-80 transition-all duration-300 bg-slate-900/30 border-r border-slate-800 overflow-y-auto'>
      <div className='p-4 space-y-6'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold'>Filters</h3>
          <button onClick={() => setFiltersOpen(false)} className='p-1 rounded hover:bg-slate-800 transition-colors'>
            <FontAwesomeIcon icon={faXmark} className='w-4 h-4' />
          </button>
        </div>

        <div>
          <label className='block text-sm font-medium mb-2'>Languages</label>
          <div className='flex flex-wrap gap-2'>
            <button onClick={() => setLanguage("")} className={`px-3 py-1 rounded-full text-sm transition-colors ${language === "" ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}>All</button>
            {languages.map(lang => (
              <button key={lang} onClick={() => setLanguage(lang)} className={`px-3 py-1 rounded-full text-sm transition-colors ${language === lang ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}>
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default FiltersPanel
