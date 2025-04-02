// This file would be placed in your React components folder
// For example: src/React/GitHubStats.tsx or src/React/GitHubStats.jsx

import { useState, useEffect } from 'react';

const GitHubStats = ({ username = "Kanishk3813" }) => {
  const [stats, setStats] = useState({
    loading: true,
    error: null,
    data: null
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // User info
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposResponse.json();
        
        // Process languages
        const languagesMap = {};
        let totalSize = 0;
        
        reposData.forEach(repo => {
          const language = repo.language;
          if (language) {
            if (!languagesMap[language]) {
              languagesMap[language] = 0;
            }
            languagesMap[language] += repo.size;
            totalSize += repo.size;
          }
        });
        
        // Convert to percentage
        const languages = Object.entries(languagesMap).map(([name, size]) => {
          const percentage = Math.round((Number(size) / totalSize) * 100);
          // Assign colors based on language
          const colorMap = {
            JavaScript: '#f7df1e',
            TypeScript: '#3178c6',
            HTML: '#e34c26',
            CSS: '#563d7c',
            Python: '#3572A5',
            Java: '#b07219',
            C: '#555555',
            'C++': '#f34b7d',
            'C#': '#178600',
            PHP: '#4F5D95',
            Ruby: '#701516',
            Go: '#00ADD8',
            Swift: '#ffac45',
            Kotlin: '#A97BFF',
            Rust: '#dea584',
            Dart: '#00B4AB'
          };
          
          return {
            name,
            percentage,
            color: colorMap[name] || '#8b8b8b' // Default color
          };
        }).sort((a, b) => b.percentage - a.percentage).slice(0, 5); // Top 5 languages
        
        // Top repos by stars
        const topRepos = reposData
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 3)
          .map(repo => ({
            name: repo.name,
            stars: repo.stargazers_count
          }));
        
        setStats({
          loading: false,
          error: null,
          data: {
            repos: userData.public_repos,
            stars: reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0),
            followers: userData.followers,
            contributions: 0, // GitHub API doesn't provide this directly
            languages,
            topRepos
          }
        });
      } catch (error) {
        setStats({
          loading: false,
          error: 'Error fetching GitHub data',
          data: null
        });
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchGitHubStats();
  }, [username]);

  return stats;
};

export default GitHubStats;