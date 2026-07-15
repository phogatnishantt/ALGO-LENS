export const mockStats = [
  { id: 1, title: "Problems Solved", value: "342", change: "+12% this week", type: "up" },
  { id: 2, title: "Current Rating", value: "1,845", change: "Expert Max: 1,910", type: "neutral" },
  { id: 3, title: "Global Rank", value: "#1,240", change: "Top 2.5% globally", type: "up" },
  { id: 4, title: "Coding Streak", value: "18 Days", change: "Personal Best: 32", type: "up" },
];

export const mockPerformanceData = [
  { name: "Mon", Submissions: 4, Rating: 1720, Accuracy: 68 },
  { name: "Tue", Submissions: 7, Rating: 1745, Accuracy: 75 },
  { name: "Wed", Submissions: 5, Rating: 1740, Accuracy: 70 },
  { name: "Thu", Submissions: 12, Rating: 1790, Accuracy: 82 },
  { name: "Fri", Submissions: 8, Rating: 1810, Accuracy: 80 },
  { name: "Sat", Submissions: 15, Rating: 1835, Accuracy: 88 },
  { name: "Sun", Submissions: 9, Rating: 1845, Accuracy: 85 },
];

export const mockHeatmapData = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  value: Math.floor(Math.random() * 6), 
}));

export const mockSessions = [
  { id: 1, problem: "1024D - Xor-Subsequence", outcome: "Accepted", lang: "C++20", time: "2 hrs ago", memory: "4.2 MB", runtime: "45 ms" },
  { id: 2, problem: "892C - GCD Operations", outcome: "Wrong Answer", lang: "C++20", time: "5 hrs ago", memory: "2.1 MB", runtime: "12 ms" },
  { id: 3, problem: "1600E - Array Game (MEX)", outcome: "Accepted", lang: "Python 3", time: "1 day ago", memory: "12.4 MB", runtime: "120 ms" },
  { id: 4, problem: "451B - Segment Sort", outcome: "Time Limit Exceeded", lang: "C++20", time: "2 days ago", memory: "8.9 MB", runtime: "2000 ms" },
];

export const mockAiInsights = [
  { id: 1, type: "strength", message: "Your implementation speed on Bitwise XOR operations is 24% faster than your current tier average." },
  { id: 2, type: "warning", message: "Accuracy drops by 15% on Multi-Pointer Array problems when attempting them past 11:00 PM." },
  { id: 3, type: "action", message: "Target 3 'Dynamic Programming + GCD' problems to bypass your current 1850 rating bottleneck." },
];

export const mockLeaderboard = [
  { rank: 1, name: "alpha_coder", rating: 2450, solved: 892 },
  { rank: 2, name: "byte_wizard", rating: 2310, solved: 754 },
  { rank: 3, name: "code_runner", rating: 2180, solved: 690 },
  { rank: 1240, name: "you (user)", rating: 1845, solved: 342, isUser: true },
];