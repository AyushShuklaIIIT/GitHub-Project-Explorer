import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faEdit } from '@fortawesome/free-regular-svg-icons'

const RepoCard = ({ repo, onSelectRepo, onToggleBookmark, onShowNotes, isBookmarked, note }) => {
  return (
    <div className='bg-slate-900/50 rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors'>
      <div className='flex justify-between items-start gap-4'>
        <div className='flex-1'>
          <div className='flex items-center gap-3 mb-2'>
            <button onClick={() => onSelectRepo(repo)} className='text-lg font-semibold text-teal-400 hover:text-teal-300 transition-colors'>
              {repo.full_name}
            </button>
            {repo.language && (
              <span className='px-2 py-1 bg-slate-800 text-xs rounded-full text-slate-300'>
                {repo.language}
              </span>
            )}
          </div>
          <p className='text-slate-300 mb-3 text-sm'>{repo.description}</p>
          <div className='flex items-center gap-4 text-sm text-slate-400'>
            <span>⭐ {repo.stars.toLocaleString()}</span>
            <span>Forks: {repo.forks.toLocaleString()}</span>
            <span>Updated {new Date(repo.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className='flex flex-wrap gap-2 mt-3'>
            {repo.topics.slice(0, 5).map(topic => (
              <span key={topic} className='px-2 py-1 bg-slate-800 text-xs rounded text-slate-400'>
                {topic}
              </span>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2 ml-4'>
          <button onClick={onShowNotes} className='p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-indigo-400' title='Add note'>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => onToggleBookmark(repo.id)} className={`p-2 rounded-lg transition-colors ${isBookmarked ? 'text-yellow-400 hover:text-yellow-300'
              : 'text-slate-400 hover:text-yellow-400'
            }`}
            title='Bookmark'>
            <FontAwesomeIcon icon={faBookmark} />
          </button>
        </div>
      </div>
      {note && (
        <div className='w-full mt-3 pt-3 border-t border-slate-800'>
          <p className='text-xs text-slate-400 mb-1 font-semibold'>Your Note:</p>
          <p className='text-sm text-slate-300 whitespace-pre-wrap'>{note}</p>
        </div>
      )}
    </div>
  );
};

export default RepoCard;