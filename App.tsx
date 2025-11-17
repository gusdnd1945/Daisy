import React, { useState, useEffect, useCallback } from 'react';
import { Match, Bet, Comment } from './types';
import { Header } from './components/Header';
import { MatchCard } from './components/MatchCard';
import { getMatchPrediction } from './services/geminiService';
import { LoLIcon } from './components/icons/LoLIcon';
import { fetchLckMatches } from './services/lckDataService';

const App: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [balance, setBalance] = useState<number>(1000);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMatchesAndPredictions = useCallback(async () => {
    setLoading(true);
    const fetchedMatches = await fetchLckMatches();

    setMatches(fetchedMatches.map(m => ({ ...m, status: 'predicting' })));

    const predictionsPromises = fetchedMatches
      .filter(match => match.status === 'upcoming')
      .map(match => getMatchPrediction(match.teamA.name, match.teamB.name, match.game));
      
    const predictions = await Promise.all(predictionsPromises);
    
    setMatches(() => {
        let predictionIndex = 0;
        return fetchedMatches.map(match => {
            if (match.status === 'upcoming') {
                const prediction = predictions[predictionIndex++];
                if (prediction) {
                    return { ...match, status: 'upcoming', prediction };
                }
            }
            return { ...match, status: 'upcoming' };
        });
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMatchesAndPredictions();
  }, [fetchMatchesAndPredictions]);

  useEffect(() => {
    const matchSimulator = setInterval(() => {
      const now = new Date();
      setMatches(prevMatches => {
        let hasChanged = false;
        let balanceChange = 0;
        
        const updatedMatches = prevMatches.map((m): Match => {
          if (m.status !== 'finished' && now >= m.matchTime) {
            hasChanged = true;
            const winner = m.prediction 
              ? (Math.random() < m.prediction.confidence ? m.prediction.winner : (m.prediction.winner === m.teamA.name ? m.teamB.name : m.teamA.name))
              : (Math.random() > 0.5 ? m.teamA.name : m.teamB.name);

            if (m.bet && m.bet.teamName === winner && m.prediction) {
              const odds = winner === m.teamA.name ? m.prediction.oddsA : m.prediction.oddsB;
              balanceChange += Math.floor(m.bet.amount * odds);
            }
            return { ...m, status: 'finished', winner };
          }
          return m;
        });

        if (balanceChange > 0) {
          setBalance(prev => prev + balanceChange);
        }

        return hasChanged ? updatedMatches : prevMatches;
      });
    }, 1000);

    return () => clearInterval(matchSimulator);
  }, []);


  const handleBet = (matchId: number, bet: Bet) => {
    const matchToBet = matches.find(m => m.id === matchId);
    if (matchToBet && balance >= bet.amount) {
      setBalance(prev => prev - bet.amount);
      setMatches(prev =>
        prev.map(m =>
          m.id === matchId ? { ...m, bet: bet } : m
        )
      );
    }
  };

  const handleAddComment = (matchId: number, text: string, predictedTeam: string) => {
    setMatches(prev =>
      prev.map(m => {
        if (m.id === matchId) {
          const newComment: Comment = {
            id: Date.now(), // Use timestamp for unique ID
            text,
            predictedTeam,
          };
          const updatedComments = m.comments ? [...m.comments, newComment] : [newComment];
          return { ...m, comments: updatedComments };
        }
        return m;
      })
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-64">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400"></div>
          <p className="mt-4 text-lg font-semibold text-gray-300">경기 정보를 불러오는 중입니다...</p>
        </div>
      );
    }
    
    if (matches.length === 0) {
      return (
        <div className="text-center h-64 flex items-center justify-center">
          <p className="text-lg text-gray-500">예정된 경기가 없습니다.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {matches.map(match => (
          <MatchCard 
            key={match.id} 
            match={match} 
            onBet={handleBet} 
            balance={balance}
            onComment={handleAddComment}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 text-white min-h-screen font-sans">
      <Header balance={balance} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex justify-center border-b border-gray-700 mb-8">
            <div className="py-3 font-bold text-lg flex items-center justify-center gap-2 text-blue-500 border-b-4 border-blue-500">
                <LoLIcon className="w-6 h-6" /> 리그 오브 레전드
            </div>
        </div>
        
        {renderContent()}
      </main>
    </div>
  );
};

export default App;