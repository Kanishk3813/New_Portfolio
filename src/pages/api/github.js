// export const GET = async ({ params, request }) => {
//   const url = new URL(request.url);
//   const username = url.searchParams.get('username');

//   try {
//     // Fetch all stats in parallel
//     const [mainStats, streakStats, profileViews] = await Promise.all([
//       fetch(`https://github-readme-stats.vercel.app/api?username=${username}&json=true`),
//       fetch(`https://streak-stats.demolab.com?user=${username}&json=true`),
//       fetch(`https://profile-counter.glitch.me/${username}/count.json`)
//     ]);

//     // Parse responses
//     const statsData = {
//       main: await mainStats.json(),
//       streak: await streakStats.json(),
//       views: await profileViews.json()
//     };

//     return new Response(JSON.stringify({
//       stars: statsData.main.stars,
//       commits: statsData.main.totalCommits,
//       contributions: statsData.main.contributions,
//       currentStreak: statsData.streak.currentStreak,
//       longestStreak: statsData.streak.longestStreak,
//       profileViews: statsData.views.count,
//       languages: statsData.main.languages,
//       repos: statsData.main.repos
//     }), {
//       status: 200,
//       headers: { 
//         'Content-Type': 'application/json',
//         'Cache-Control': 'public, max-age=3600'
//       }
//     });

//   } catch (error) {
//     console.error('Error fetching stats:', error);
//     return new Response(
//       JSON.stringify({ error: 'Failed to fetch GitHub stats' }),
//       { status: 500 }
//     );
//   }
// };














// // // This file would be placed in your Astro project's API routes
// // // For example: src/pages/api/github.js

// // export const GET = async ({ params, request }) => {
// //   const url = new URL(request.url);
// //   const username = url.searchParams.get('username');
    
// //     if (!username) {
// //       return new Response(
// //         JSON.stringify({ error: 'Username parameter is required' }),
// //         { status: 400, headers: { 'Content-Type': 'application/json' } }
// //       );
// //     }
    
// //     try {
// //       const headers = {};
// //       if (import.meta.env.GITHUB_TOKEN) {
// //         headers.Authorization = `token ${import.meta.env.GITHUB_TOKEN}`;
// //       }
      
// //       // Fetch GitHub user data
// //       const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers });
      
// //       // Check if we hit rate limits
// //       if (userResponse.status === 403) {
// //         return new Response(
// //           JSON.stringify({ error: 'GitHub API rate limit exceeded. Try again later.' }),
// //           { status: 429, headers: { 'Content-Type': 'application/json' } }
// //         );
// //       }
      
// //       if (!userResponse.ok) {
// //         return new Response(
// //           JSON.stringify({ error: `GitHub API error: ${userResponse.status} ${userResponse.statusText}` }),
// //           { status: userResponse.status, headers: { 'Content-Type': 'application/json' } }
// //         );
// //       }
      
// //       const userData = await userResponse.json();
      
// //       // Fetch repositories with caching
// //       const cacheControl = 'max-age=3600'; // Cache for 1 hour
// //       const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { 
// //         headers: { ...headers, 'Cache-Control': cacheControl } 
// //       });
      
// //       if (!reposResponse.ok) {
// //         throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
// //       }
      
// //       const reposData = await reposResponse.json();
      
// //       // Fetch contribution data by scraping GitHub profile page
// //       const contributionsResponse = await fetch(`https://github.com/${username}`);
      
// //       if (!contributionsResponse.ok) {
// //         throw new Error(`Failed to fetch contributions: ${contributionsResponse.status}`);
// //       }
      
// //       const contributionsHtml = await contributionsResponse.text();
      
// //       // Parse contribution count with improved regex
// //       const contributionsMatch = contributionsHtml.match(/(\d+(?:,\d+)*)\s+contributions\s+in\s+the\s+last\s+year/);
// //       let contributionsCount = 0;
      
// //       if (contributionsMatch && contributionsMatch[1]) {
// //         contributionsCount = parseInt(contributionsMatch[1].replace(/,/g, ''), 10);
// //       }
      
// //       // Process languages
// //       const languagesMap = {};
// //       let totalSize = 0;
      
// //       reposData.forEach(repo => {
// //         const language = repo.language;
// //         if (language) {
// //           if (!languagesMap[language]) {
// //             languagesMap[language] = 0;
// //           }
// //           languagesMap[language] += repo.size;
// //           totalSize += repo.size;
// //         }
// //       });
      
// //       // Convert to percentage
// //       const languages = Object.entries(languagesMap).map(([name, size]) => {
// //         const percentage = Math.round((Number(size) / totalSize) * 100);
// //         // Assign colors based on language
// //         const colorMap = {
// //           JavaScript: '#f7df1e',
// //           TypeScript: '#3178c6',
// //           HTML: '#e34c26',
// //           CSS: '#563d7c',
// //           Python: '#3572A5',
// //           Java: '#b07219',
// //           C: '#555555',
// //           'C++': '#f34b7d',
// //           'C#': '#178600',
// //           PHP: '#4F5D95',
// //           Ruby: '#701516',
// //           Go: '#00ADD8',
// //           Swift: '#ffac45',
// //           Kotlin: '#A97BFF',
// //           Rust: '#dea584',
// //           Dart: '#00B4AB'
// //         };
        
// //         return {
// //           name,
// //           percentage,
// //           color: colorMap[name] || '#8b8b8b'
// //         };
// //       }).sort((a, b) => b.percentage - a.percentage).slice(0, 5);
      
// //       // Top repos
// //       const topRepos = reposData
// //         .sort((a, b) => b.stargazers_count - a.stargazers_count)
// //         .slice(0, 3)
// //         .map(repo => ({
// //           name: repo.name,
// //           stars: repo.stargazers_count,
// //           url: repo.html_url
// //         }));
      
// //       // Return consolidated data with cache headers
// //       return new Response(
// //         JSON.stringify({
// //           repos: userData.public_repos,
// //           stars: reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0),
// //           followers: userData.followers,
// //           contributions: contributionsCount,
// //           languages,
// //           topRepos,
// //           lastUpdated: new Date().toISOString()
// //         }),
// //         { 
// //           status: 200,
// //           headers: { 
// //             'Content-Type': 'application/json',
// //             'Cache-Control': 'public, max-age=1800'
// //           } 
// //         }
// //       );
// //     } catch (error) {
// //       console.error('Error fetching GitHub data:', error);
// //       return new Response(
// //         JSON.stringify({ error: 'Failed to fetch GitHub data: ' + error.message }),
// //         { status: 500, headers: { 'Content-Type': 'application/json' } }
// //       );
// //     }
// //   }



