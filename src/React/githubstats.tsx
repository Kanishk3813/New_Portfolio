// import { useState, useEffect } from 'react';

// const GitHubStats = ({ username = "Kanishk3813" }) => {
//   const [stats, setStats] = useState({
//     loading: true,
//     error: null,
//     data: null
//   });

//   useEffect(() => {
//     const fetchGitHubStats = async () => {
//       try {
//         // Get basic user info
//         const userResponse = await fetch(`https://api.github.com/users/${username}`);
//         const userData = await userResponse.json();
        
//         // Get repositories
//         const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
//         const reposData = await reposResponse.json();
        
//         // For PRs and Issues, we'll need to make additional requests
//         // Note: GitHub's API has rate limits, so in production you might want to
//         // implement caching or use a personal access token
        
//         // Count total stars
//         const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        
//         // Get PRs (note: this only gets PRs for the first 100 repos)
//         let totalPRs = 0;
//         let totalIssues = 0;
//         let totalCommits = 0;
        
//         // Due to API limitations, we'll estimate some values
//         // In production, you might want to use GitHub's GraphQL API for more accurate data
//         const prPromises = reposData.slice(0, 5).map(repo => 
//           fetch(`https://api.github.com/repos/${username}/${repo.name}/pulls?state=all&creator=${username}`)
//             .then(res => res.json())
//             .then(data => data.length)
//             .catch(() => 0)
//         );
        
//         const issuePromises = reposData.slice(0, 5).map(repo => 
//           fetch(`https://api.github.com/repos/${username}/${repo.name}/issues?state=all&creator=${username}`)
//             .then(res => res.json())
//             .then(data => data.length)
//             .catch(() => 0)
//         );
        
//         // For commits, we'll use a sample
//         const commitPromises = reposData.slice(0, 3).map(repo =>
//           fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}`)
//             .then(res => res.json())
//             .then(data => data.length)
//             .catch(() => 0)
//         );
        
//         // Wait for all promises to resolve
//         const prCounts = await Promise.all(prPromises);
//         const issueCounts = await Promise.all(issuePromises);
//         const commitCounts = await Promise.all(commitPromises);
        
//         totalPRs = prCounts.reduce((acc, count) => acc + count, 0);
//         // Issues API also returns PRs, so subtract PRs from issues
//         totalIssues = Math.max(0, issueCounts.reduce((acc, count) => acc + count, 0) - totalPRs);
//         totalCommits = commitCounts.reduce((acc, count) => acc + count, 0) * 10; // Estimate based on sample
        
//         // Calculate "grade" based on activity
//         const calculateGrade = () => {
//           const score = totalStars + totalCommits/100 + totalPRs*2 + totalIssues;
//           if (score > 500) return 'A+';
//           if (score > 400) return 'A';
//           if (score > 300) return 'A-';
//           if (score > 250) return 'B+';
//           if (score > 200) return 'B';
//           if (score > 150) return 'B-';
//           if (score > 100) return 'C+';
//           if (score > 50) return 'C';
//           return 'C-';
//         };
        
//         // Get contributions in the last year
//         // This is difficult with the REST API, so we'll estimate based on repo activity
//         const lastYearRepos = reposData.filter(repo => {
//           const updated = new Date(repo.updated_at);
//           const oneYearAgo = new Date();
//           oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
//           return updated > oneYearAgo;
//         });
        
//         const contributedLastYear = lastYearRepos.length;
        
//         setStats({
//           loading: false,
//           error: null,
//           data: {
//             totalStars,
//             totalCommits: totalCommits || 574, // Fallback to your screenshot value if API estimate fails
//             totalPRs: totalPRs || 35,
//             totalIssues: totalIssues || 7,
//             contributedLastYear: contributedLastYear || 4,
//             grade: calculateGrade()
//           }
//         });
//       } catch (error) {
//         console.error('Error fetching GitHub data:', error);
//         setStats({
//           loading: false,
//           error: 'Error fetching GitHub data',
//           data: null
//         });
//       }
//     };

//     fetchGitHubStats();
//   }, [username]);

//   if (stats.loading) {
//     return (
//       <div className="bg-[#0D1117] p-6 rounded-xl border border-[#30363D] max-w-md mx-auto">
//         <div className="animate-pulse flex flex-col space-y-4">
//           <div className="h-6 bg-gray-700 rounded w-3/4"></div>
//           <div className="space-y-2">
//             <div className="h-4 bg-gray-700 rounded"></div>
//             <div className="h-4 bg-gray-700 rounded"></div>
//             <div className="h-4 bg-gray-700 rounded"></div>
//             <div className="h-4 bg-gray-700 rounded"></div>
//             <div className="h-4 bg-gray-700 rounded"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (stats.error) {
//     return (
//       <div className="bg-[#0D1117] p-6 rounded-xl border border-[#30363D] max-w-md mx-auto">
//         <div className="text-red-400">
//           <p>{stats.error}</p>
//           <p className="mt-2">Displaying fallback data instead...</p>
//           {/* Fallback to hardcoded data similar to your screenshot */}
//           <div className="mt-4 space-y-2 text-white">
//             <div className="flex items-center">
//               <span className="text-[#F0DB4F] mr-2">★</span>
//               <span className="text-[#8B949E] mr-2">Total Stars Earned:</span>
//               <span>9</span>
//             </div>
//             <div className="flex items-center">
//               <span className="text-[#58A6FF] mr-2">↺</span>
//               <span className="text-[#8B949E] mr-2">Total Commits:</span>
//               <span>574</span>
//             </div>
//             <div className="flex items-center">
//               <span className="text-[#DA3633] mr-2">⑂</span>
//               <span className="text-[#8B949E] mr-2">Total PRs:</span>
//               <span>35</span>
//             </div>
//             <div className="flex items-center">
//               <span className="text-[#3FB950] mr-2">◯</span>
//               <span className="text-[#8B949E] mr-2">Total Issues:</span>
//               <span>7</span>
//             </div>
//             <div className="flex items-center">
//               <span className="text-[#58A6FF] mr-2">⊓</span>
//               <span className="text-[#8B949E] mr-2">Contributed to (last year):</span>
//               <span>4</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const { data } = stats;

//   return (
//     <div className="bg-[#0D1117] p-6 rounded-xl border border-[#30363D] max-w-md mx-auto">
//       <h3 className="text-xl text-[#FF79C6] mb-4">{username}'s GitHub Stats</h3>
      
//       <div className="flex flex-row">
//         <div className="flex-grow space-y-2">
//           <div className="flex items-center">
//             <span className="text-[#F0DB4F] mr-2">★</span>
//             <span className="text-[#8B949E] mr-2">Total Stars Earned:</span>
//             <span className="text-white">{data.totalStars}</span>
//           </div>
//           <div className="flex items-center">
//             <span className="text-[#58A6FF] mr-2">↺</span>
//             <span className="text-[#8B949E] mr-2">Total Commits:</span>
//             <span className="text-white">{data.totalCommits}</span>
//           </div>
//           <div className="flex items-center">
//             <span className="text-[#DA3633] mr-2">⑂</span>
//             <span className="text-[#8B949E] mr-2">Total PRs:</span>
//             <span className="text-white">{data.totalPRs}</span>
//           </div>
//           <div className="flex items-center">
//             <span className="text-[#3FB950] mr-2">◯</span>
//             <span className="text-[#8B949E] mr-2">Total Issues:</span>
//             <span className="text-white">{data.totalIssues}</span>
//           </div>
//           <div className="flex items-center">
//             <span className="text-[#58A6FF] mr-2">⊓</span>
//             <span className="text-[#8B949E] mr-2">Contributed to (last year):</span>
//             <span className="text-white">{data.contributedLastYear}</span>
//           </div>
//         </div>
        
//         <div className="flex items-center justify-center ml-4">
//           <div className="relative w-16 h-16">
//             <svg viewBox="0 0 120 120" className="w-full h-full">
//               <circle
//                 cx="60"
//                 cy="60"
//                 r="54"
//                 fill="none"
//                 stroke="#30363D"
//                 strokeWidth="12"
//               />
//               <circle
//                 cx="60"
//                 cy="60"
//                 r="54"
//                 fill="none"
//                 stroke="#FF79C6"
//                 strokeWidth="12"
//                 strokeDasharray="339.292"
//                 strokeDashoffset="135.717" // Approximately 40% filled for B- grade
//                 transform="rotate(-90 60 60)"
//               />
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
//               {data.grade}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* GitHub Visit Counter (displayed as in your image) */}
//       <div className="mt-8 flex justify-center">
//         <div className="flex">
//           {['0', '0', '0', '1', '5', '8', '8'].map((digit, index) => (
//             <div 
//               key={index} 
//               className="w-8 h-8 flex items-center justify-center text-[#3FB950] border border-[#30363D] mx-0.5"
//             >
//               {digit}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GitHubStats;