import { Match } from '../types';
import { LCK_TEAMS } from '../constants';

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Generate some upcoming matches
const generateMatches = (): Match[] => {
  const shuffledTeams = shuffleArray(LCK_TEAMS);
  const matches: Match[] = [];
  const now = Date.now();
  let matchIdCounter = 1;

  for (let i = 0; i < shuffledTeams.length; i += 2) {
    if (shuffledTeams[i + 1]) {
      const matchTime = new Date(now + (matchIdCounter * 30 + Math.random() * 10) * 60 * 1000); // Stagger matches by ~30 mins
      
      matches.push({
        id: matchIdCounter++,
        game: 'lol',
        teamA: shuffledTeams[i],
        teamB: shuffledTeams[i+1],
        matchTime: matchTime,
        status: 'upcoming',
        streamUrl: 'https://chzzk.naver.com/live/3c146d37a28b61c1206d4e8b3f271253',
        comments: [
            { id: 1, text: `${shuffledTeams[i].name} 화이팅!`, predictedTeam: shuffledTeams[i].name },
            { id: 2, text: `무조건 ${shuffledTeams[i+1].name}이 이기지`, predictedTeam: shuffledTeams[i+1].name },
        ]
      });
    }
  }

  // Add one more match for tomorrow for variety
  const tomorrowTeams = shuffleArray(LCK_TEAMS);
  if(tomorrowTeams.length >= 2) {
    matches.push({
        id: matchIdCounter++,
        game: 'lol',
        teamA: tomorrowTeams[0],
        teamB: tomorrowTeams[1],
        matchTime: new Date(now + 24 * 60 * 60 * 1000), // ~24 hours from now
        status: 'upcoming',
        streamUrl: 'https://chzzk.naver.com/live/3c146d37a28b61c1206d4e8b3f271253',
        comments: []
      });
  }

  return matches.sort((a, b) => a.matchTime.getTime() - b.matchTime.getTime());
};

const MOCK_MATCHES = generateMatches();

export const fetchLckMatches = (): Promise<Match[]> => {
  return new Promise(resolve => {
    // Simulate network delay
    setTimeout(() => {
      // The line below was causing an error by trying to serialize React elements (team logos).
      // resolve(JSON.parse(JSON.stringify(MOCK_MATCHES)));
      
      // The fix is to perform a deep copy that preserves these elements.
      const copiedMatches = MOCK_MATCHES.map(match => ({
        ...match,
        teamA: { ...match.teamA },
        teamB: { ...match.teamB },
        comments: match.comments ? match.comments.map(c => ({ ...c })) : undefined,
      }));
      resolve(copiedMatches);
    }, 1500);
  });
};
