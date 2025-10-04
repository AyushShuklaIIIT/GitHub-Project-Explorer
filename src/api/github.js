import { sub, formatISO } from 'date-fns';

const getStartDate = (timeRange) => {
    const now = new Date();
    let startDate;
    switch (timeRange) {
        case 'day':
            startDate = sub(now, { days: 1 });
            break;
        case 'week':
            startDate = sub(now, { weeks: 1 });
            break;
        case 'month':
            startDate = sub(now, { months: 1 });
            break;
        default:
            startDate = sub(now, { weeks: 1 });
    }

    // GitHub API expects date in YYYY-MM-DD format
    return formatISO(startDate, { representation: 'date' });
};

export const fetchTrendingRepos = async (filters) => {
    const {q, sort = 'stars', order = 'desc', language, timeRange} = filters;
    const createdDate = getStartDate(timeRange);

    let query = `created:>${createdDate}`;
    if(language) {
        query += ` language:${language}`;
    }
    if(q) {
        query += ` ${q} in:name,description`;
    }

    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=${sort}&order=${order}`;

    console.log('Fetching URL: ', url);

    try {
        const response = await fetch(url);
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch repositories. Check your network or Github API rate limits.');
        }
        const data = await response.json();

        return data.items.map(item => ({
            id: item.id,
            name: item.name,
            full_name: item.full_name,
            description: item.description,
            language: item.language,
            stars: item.stargazers_count,
            forks: item.forks_count,
            updatedAt: item.updated_at,
            topics: item.topics || [],
            url: item.html_url
        }));
    } catch (error) {
        console.error('GitHub API Error:', error);
        throw error;
    }
};

export const fetchReadme = async (full_name) => {
    try {
        const response = await fetch(`https://api.github.com/repos/${full_name}/readme`);

        if(response.status === 404) {
            throw new Error('README.md not found in this repository.');
        }
        if(!response.ok) {
            throw new Error('Failed to fetch README.');
        }

        const data = await response.json();
        const binaryString = atob(data.content);
        const bytes = new Uint8Array(binaryString.length);
        for(let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const decoder = new TextDecoder('utf-8');
        const decodedContent = decoder.decode(bytes);
        return decodedContent;
    } catch(error) {
        console.error('README Fetch Error:', error);
        throw error;
    }
};