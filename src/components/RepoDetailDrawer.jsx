import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { fetchReadme } from '../api/github'
import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const RepoDetailDrawer = ({ repo, onClose }) => {
  const [readmeContent, setReadmeContent] = useState('');
  const [topContributors, setTopContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingContributors, setIsLoadingContributors] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setReadmeContent('');

    const getReadme = async () => {
      try {
        const content = await fetchReadme(repo.full_name);
        setReadmeContent(content);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const getTopContributors = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo.full_name}/contributors?per_page=3`);
        const data = await response.json();
        const finalData = data.length ? data.map(el => {
          return { login: el.login, avatar_url: el.avatar_url }
        }) : [];
        setTopContributors(finalData);
        console.log(finalData);
      } catch (err) {
        console.error('Failed to fetch contributors:', err.message);
        setError(err.message);
      }
      finally {
        setIsLoadingContributors(false);
      }
    }

    if (repo) {
      getReadme();
      getTopContributors();
    }
  }, [repo])

  const renderReadme = () => {
    if (isLoading) {
      return <p className='text-slate-400'>Loading README...</p>;
    }
    if (error) {
      return <p className='text-yellow-500'>{error}</p>;
    }

    return (
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {readmeContent}
      </Markdown>
    )
  }

  const renderContributors = () => {
    if (isLoadingContributors) {
      return <p className='text-slate-400'>Loading contributors...</p>;
    }
    if (error) {
      return <p className='text-yellow-500'>{error}</p>;
    }
    return topContributors.length ? topContributors.map((contributor, index) => (
      <div key={index} className='w-10 h-10 bg-gradient-to-br from-teal-400 to-indigo-500 rounded-full flex items-center justify-center' title={`${contributor.login}`}>
        <img src={contributor.avatar_url} alt={contributor.login} className='w-10 h-10 rounded-full' />
      </div>
    )) : <p className='text-slate-400'>No contributors found.</p>;
  }

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end animate-fade-in'>
      <div className='w-full max-w-2xl bg-slate-900 border-l border-slate-800 overflow-auto animate-slide-in-right'>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-teal-400'>{repo.full_name}</h2>
            <button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-800 transition-colors'>
              <FontAwesomeIcon icon={faXmark} className='w-5 h-5' />
            </button>
          </div>

          <div className='space-y-6'>
            <div>
              <h3 className='font-semibold mb-3'>README preview</h3>
              <div className='bg-slate-800 rounded-lg p-4 text-slate-300 max-h-96 overflow-y-auto'>
                <h1 className='text-xl font-bold mb-2 border-b border-slate-700 pb-2'>{repo.name}</h1>
                <p>{repo.description}</p>
                {renderReadme()}
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-3'>Top Contributors (Max. Top 3)</h3>
              <div className='flex gap-2'>
                {renderContributors()}
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-3'>Topics</h3>
              <div className='flex flex-wrap gap-2'>
                {Array.isArray(repo.topics) && repo.topics.length > 0 ? (
                  repo.topics.map(topic => (
                    <span key={topic} className="px-3 py-1 bg-slate-800 text-sm rounded-full text-slate-300">{topic}</span>
                  ))
                ) : (
                  <p className="text-slate-400">No topics available.</p>
                )}

              </div>
            </div>

            <button onClick={() => window.open(repo.url, '_blank')} className='w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-medium transition-colors'>Open on GitHub</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepoDetailDrawer;
