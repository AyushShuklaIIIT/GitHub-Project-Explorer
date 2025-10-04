import React, { useState } from 'react'

const NotesModal = ({ repo, initialNote, onSave, onClose }) => {
  const [note, setNote] = useState(initialNote);

  const handleSave = () => {
    onSave(note);
  };

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in'>
      <div className='bg-slate-900 rounded-xl p-6 w-full max-w-md border border-slate-800'>
        <h3 className='text-lg font-semibold mb-4'>Add Note for <span className='text-teal-400'>{repo.name}</span></h3>
        <textarea placeholder='Add your notes about this repository...' value={note} onChange={(e) => setNote(e.target.value)} className='w-full h-32 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none' />
        <div className='flex justify-end gap-3 mt-4'>
          <button onClick={onClose} className='px-4 py-2 text-slate-400 hover:text-white transition-colors rounded-lg'>
            Cancel
          </button>
          <button onClick={handleSave} className='px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors'>
            Save Note
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotesModal
