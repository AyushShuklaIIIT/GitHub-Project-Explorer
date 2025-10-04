import { useState, useEffect, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import FiltersPanel from './components/FiltersPanel'
import RepoCard from './components/RepoCard'
import RepoDetailDrawer from './components/RepoDetailDrawer'
import NotesModal from './components/NotesModal'
import { fetchTrendingRepos } from './api/github'
import { useDebounce } from './hooks/useDebounce'
import LanguageDoughnut from './components/charts/LanguageDoughnut'
import StarTrendLine from './components/charts/StarTrendLine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [currentNoteRepo, setCurrentNoteRepo] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedRepos, setBookmarkedRepos] = useState(() => new Set(JSON.parse(localStorage.getItem('github-bookmarks') || '[]')));
  const [repoNotes, setRepoNotes] = useState(() => JSON.parse(localStorage.getItem('github-notes') || '{}'));

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [language, setLanguage] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [timeRange, setTimeRange] = useState('week');
  const [activeView, setActiveView] = useState('explore');

  const getRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTrendingRepos({
        q: debouncedSearchQuery,
        sort: sortBy,
        language: language,
        timeRange: timeRange
      });
      setRepos(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchQuery, sortBy, language, timeRange]);

  useEffect(() => {
    getRepos();
  }, [getRepos]);

  const toggleBookmark = (repoId) => {
    const newBookmarks = new Set(bookmarkedRepos);
    if (newBookmarks.has(repoId)) {
      newBookmarks.delete(repoId);
    } else {
      newBookmarks.add(repoId);
    }
    setBookmarkedRepos(newBookmarks);
    localStorage.setItem('github-bookmarks', JSON.stringify([...newBookmarks]));
  };

  const displayedRepos = (() => {
    switch(activeView) {
      case 'bookmarked':
        return repos.filter(repo => bookmarkedRepos.has(repo.id));
      case 'notes':
        return repos.filter(repo => Object.keys(repoNotes).includes(String(repo.id)) && repoNotes[repo.id]);
      case 'explore':
      default:
        return repos;
    }
  })();

  const addNote = (repoId, note) => {
    const newNotes = { ...repoNotes, [repoId]: note };
    setRepoNotes(newNotes);
    localStorage.setItem('github-notes', JSON.stringify(newNotes));
  }

  const totalRepos = repos.length;
  const avgStars = Math.round(repos.reduce((sum, repo) => sum + repo.stars, 0) / totalRepos) || 0;

  return (
    <div className='flex h-screen bg-slate-950 font-inter text-white'>
      <Sidebar sidebarOpen={sidebarOpen} activeView={activeView} setActiveView={setActiveView} />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          language={language}
          setLanguage={setLanguage}
          sortBy={sortBy}
          setSortBy={setSortBy}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          onRefresh={getRepos}
        />
        <div className='flex-1 flex overflow-hidden'>
          <FiltersPanel
            language={language}
            filtersOpen={filtersOpen}
            setFiltersOpen={setFiltersOpen}
            setLanguage={setLanguage}
          />
          <main className='flex-1 overflow-auto p-6 space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div className='bg-slate-900/50 rounded-xl p-4 border border-slate-800'>
                <p className='text-sm text-slate-400'>Total Found</p>
                <p className='text-2xl font-bold'>{totalRepos.toLocaleString()}</p>
              </div>
              <div className='bg-slate-900/50 rounded-xl p-4 border border-slate-800'>
                <p className='text-sm text-slate-400'>Average Stars</p>
                <p className='text-2xl font-bold'>{avgStars.toLocaleString()}</p>
              </div>
              <div className='bg-slate-900/50 rounded-xl p-4 border border-slate-800'>
                <p className='text-sm text-slate-400'>Language</p>
                <p className='text-2xl font-bold'>{language || 'Any'}</p>
              </div>
              <div className='bg-slate-900/50 rounded-xl p-4 border border-slate-800'>
                <p className='text-sm text-slate-400'>Trending</p>
                <p className='text-2xl font-bold capitalize'>{timeRange}</p>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <div className='bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800'>
                <h3 className='font-semibold mb-4'>Top 10 by Stars</h3>
                <div className='h-64'><StarTrendLine data={repos.slice(0, 10)} /></div>
              </div>
              <div className='bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-800'>
                <h3 className='font-semibold mb-4'>Language Distribution</h3>
                <div className='h-64'><LanguageDoughnut data={repos} /></div>
              </div>
            </div>

            <div>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-semibold mb-4'>Repositories</h2>
              {loading && <p>Loading repositories...</p>}
              {error && <p className='text-red-400'>Error: {error}</p>}
              {!filtersOpen && (
                <button onClick={() => setFiltersOpen(true)} className='flex items-center gap-2 px-3 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors'>
                  <FontAwesomeIcon icon={faFilter} className='w-4 h-4' />
                  <span>Filters</span>
                </button>
              )}
            </div>
              <div className='grid gap-4'>
                {!loading && !error && displayedRepos.map(repo => (
                  <RepoCard
                    key={repo.id}
                    repo={repo}
                    onSelectRepo={setSelectedRepo}
                    onToggleBookmark={toggleBookmark}
                    onShowNotes={() => {
                      setCurrentNoteRepo(repo);
                      setShowNotesModal(true);
                    }}
                    isBookmarked={bookmarkedRepos.has(repo.id)}
                    note={repoNotes[repo.id]}
                  />
                ))}
                {displayedRepos.length === 0 && !loading && (
                  <div className='text-center py-10 text-slate-500'>
                    <p>No repositories to display.</p>
                    {activeView !== 'explore' && <p>Try adding some bookmarks or notes!</p>}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {selectedRepo && (
        <RepoDetailDrawer repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
      )}

      {showNotesModal && currentNoteRepo && (
        <NotesModal
          repo={currentNoteRepo}
          initialNote={repoNotes[currentNoteRepo.id] || ''}
          onSave={(note) => {
            addNote(currentNoteRepo.id, note);
            setShowNotesModal(false);
          }}
          onClose={() => setShowNotesModal(false)}
        />
      )}
    </div>
  )
}

export default App
