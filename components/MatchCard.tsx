import React, { useState, useEffect } from 'react';
import { Match, Bet, Comment as CommentType } from '../types';
import { PlayIcon } from './icons/PlayIcon';

interface MatchCardProps {
  match: Match;
  onBet: (matchId: number, bet: Bet) => void;
  balance: number;
  onComment: (matchId: number, text: string, predictedTeam: string) => void;
}

const TeamDisplay: React.FC<{ team: Match['teamA']; isWinner?: boolean; side: 'left' | 'right' }> = ({ team, isWinner, side }) => (
  <div className={`flex items-center gap-4 ${side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
    {team.logo}
    <span className={`font-bold text-lg text-center truncate ${isWinner ? 'text-yellow-400' : 'text-white'}`}>{team.name}</span>
  </div>
);

const Comment: React.FC<{ comment: CommentType, teamAName: string, teamBName: string }> = ({ comment, teamAName, teamBName }) => {
    const isTeamA = comment.predictedTeam === teamAName;
    const teamColor = isTeamA ? 'bg-blue-500' : 'bg-red-500';
    
    return (
      <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-white/5">
        <div className="flex-1 flex items-center gap-2">
            <span className={`px-2 py-0.5 text-xs font-bold text-white rounded ${teamColor}`}>{comment.predictedTeam}</span>
            <p className="text-sm text-gray-300">{comment.text}</p>
        </div>
      </div>
    );
};

const formatTimeLeft = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}분 ${remainingSeconds.toString().padStart(2, '0')}초`;
};

export const MatchCard: React.FC<MatchCardProps> = ({ match, onBet, balance, onComment }) => {
  const [betAmount, setBetAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const [newComment, setNewComment] = useState('');
  const [predictedTeam, setPredictedTeam] = useState<string | null>(null);
  const [commentError, setCommentError] = useState('');

  const [timeLeft, setTimeLeft] = useState(() => (match.matchTime.getTime() - Date.now()) / 1000);

  useEffect(() => {
    if (match.status === 'finished') return;

    const timer = setInterval(() => {
      const secondsLeft = (match.matchTime.getTime() - Date.now()) / 1000;
      setTimeLeft(secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [match.matchTime, match.status]);

  const hasMatchStarted = timeLeft <= 0;
  const isBettingLocked = timeLeft <= 5 * 60; // 5 minutes

  const totalPredictions = match.comments?.length ?? 0;
  const teamAPredictions = match.comments?.filter(c => c.predictedTeam === match.teamA.name).length ?? 0;

  let teamAPercentage = 50;
  let teamBPercentage = 50;

  if (totalPredictions > 0) {
    teamAPercentage = (teamAPredictions / totalPredictions) * 100;
    teamBPercentage = 100 - teamAPercentage;
  }

  const handleBet = (teamName: string) => {
    const amount = parseInt(betAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      setError('유효한 금액을 입력하세요.');
      return;
    }
    if (amount > balance) {
      setError('잔액이 부족합니다.');
      return;
    }
    setError('');
    onBet(match.id, { teamName, amount });
    setBetAmount('');
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      setCommentError('댓글을 입력해주세요.');
      return;
    }
    if (!predictedTeam) {
      setCommentError('예측할 팀을 선택해주세요.');
      return;
    }
    onComment(match.id, newComment, predictedTeam);
    setNewComment('');
    setPredictedTeam(null);
    setCommentError('');
  };

  const getStatusComponent = () => {
    if (match.status === 'finished') return <span className="text-sm text-gray-400 font-bold">경기 종료</span>;
    if (match.status === 'predicting') return <span className="text-sm text-yellow-400 font-bold animate-pulse">예측 중...</span>;
    if (hasMatchStarted) return <span className="text-sm text-red-500 font-bold">진행 중</span>;
    return <span className="text-sm text-cyan-400 font-bold">{formatTimeLeft(timeLeft)}</span>;
  };

  const betResult = match.status === 'finished' && match.bet
    ? match.bet.teamName === match.winner
      ? `승리! +${Math.floor(match.bet.amount * (match.bet.teamName === match.teamA.name ? match.prediction!.oddsA : match.prediction!.oddsB)).toLocaleString()}`
      : '패배'
    : null;

  const betResultColor = betResult?.startsWith('승리') ? 'text-green-400' : 'text-red-400';
  const winnerSide = match.winner === match.teamA.name ? 'left' : 'right';

  return (
    <div className="bg-[#1c1c1f] rounded-lg overflow-hidden border border-gray-700/50 flex flex-col">
      <div className={`p-4 ${match.status === 'finished' ? (betResult?.startsWith('승리') ? 'bg-green-500/10' : 'bg-red-500/10') : ''}`}>
        <div className="flex justify-between items-center text-gray-400 text-xs mb-4">
          <div className="flex items-center gap-4">
            <span>{match.matchTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })} 시작</span>
            {match.streamUrl && match.status !== 'finished' && (
              <a 
                href={match.streamUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
              >
                <PlayIcon className="w-4 h-4" />
                <span>중계 보기</span>
              </a>
            )}
          </div>
          {getStatusComponent()}
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <TeamDisplay team={match.teamA} isWinner={match.winner === match.teamA.name} side="left" />
          <div className="text-center font-black text-2xl text-gray-500">VS</div>
          <TeamDisplay team={match.teamB} isWinner={match.winner === match.teamB.name} side="right" />
        </div>
        
        {match.prediction && (
          <div className="mt-4 space-y-3">
            {/* AI Prediction */}
            <div>
              <div className="flex items-center w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-l-full" style={{ width: `${match.prediction.winner === match.teamA.name ? match.prediction.confidence * 100 : (1 - match.prediction.confidence) * 100}%` }}></div>
                <div className="bg-red-500 h-2.5 rounded-r-full" style={{ width: `${match.prediction.winner === match.teamB.name ? match.prediction.confidence * 100 : (1 - match.prediction.confidence) * 100}%` }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="font-bold text-blue-400">
                  {`${((match.prediction.winner === match.teamA.name ? match.prediction.confidence : 1 - match.prediction.confidence) * 100).toFixed(0)}%`}
                  <span className="text-gray-400 font-normal ml-1">({match.prediction.oddsA.toFixed(2)}배)</span>
                </span>
                <span className="text-gray-400">AI 예측</span>
                <span className="font-bold text-red-400">
                  {`${((match.prediction.winner === match.teamB.name ? match.prediction.confidence : 1 - match.prediction.confidence) * 100).toFixed(0)}%`}
                  <span className="text-gray-400 font-normal ml-1">({match.prediction.oddsB.toFixed(2)}배)</span>
                </span>
              </div>
            </div>

            {/* Viewer Prediction */}
            <div>
              <div className={`flex items-center w-full rounded-full h-2.5 ${totalPredictions > 0 ? 'bg-gray-700' : 'bg-gray-800'}`}>
                <div 
                  className="bg-blue-500 h-2.5 rounded-l-full transition-all duration-500" 
                  style={{ width: `${teamAPercentage}%` }}
                ></div>
                <div 
                  className="bg-red-500 h-2.5 rounded-r-full transition-all duration-500" 
                  style={{ width: `${teamBPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="font-bold text-blue-400">{totalPredictions > 0 ? `${teamAPercentage.toFixed(0)}%` : '-%'}</span>
                <span className="text-gray-400">시청자 예측 ({totalPredictions}명)</span>
                <span className="font-bold text-red-400">{totalPredictions > 0 ? `${teamBPercentage.toFixed(0)}%` : '-%'}</span>
              </div>
            </div>
          </div>
        )}

        {!hasMatchStarted && match.status === 'upcoming' && match.prediction && (
          <div className="mt-4">
            {match.bet ? (
              <div className="text-center p-3 rounded-lg bg-gray-900/50">
                <p className="text-gray-200"><span className={`font-bold ${match.bet.teamName === match.teamA.name ? 'text-blue-400' : 'text-red-400'}`}>{match.bet.teamName}</span>에 <span className="font-bold text-yellow-400">{match.bet.amount.toLocaleString()}</span> 베팅 완료</p>
              </div>
            ) : isBettingLocked ? (
              <div className="text-center p-3 rounded-lg bg-gray-900/50">
                <p className="text-yellow-500 font-bold">경기 시작 5분 전 베팅이 마감되었습니다.</p>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => { setBetAmount(e.target.value); setError(''); }}
                  placeholder="베팅액"
                  className="w-1/3 bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition text-center"
                />
                <button onClick={() => handleBet(match.teamA.name)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                  {match.teamA.name} 승
                </button>
                <button onClick={() => handleBet(match.teamB.name)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
                  {match.teamB.name} 승
                </button>
              </div>
            )}
            {error && <p className="text-red-400 text-center mt-2 text-sm">{error}</p>}
          </div>
        )}

        {match.status === 'finished' && (
           <div className={`text-center mt-4 p-3 rounded-lg bg-gray-900/50 border-t-4 ${winnerSide === 'left' ? 'border-blue-500' : 'border-red-500'}`}>
             <p className="text-lg font-bold text-gray-200">승자: <span className="text-yellow-400">{match.winner}</span></p>
             {betResult && <p className={`mt-1 font-semibold ${betResultColor}`}>{betResult}</p>}
           </div>
        )}
      </div>

      <div className="bg-black/20 p-4 mt-auto border-t border-gray-700/50">
        <h3 className="font-bold text-sm mb-2 text-gray-300">실시간 응원 댓글</h3>
        <div className="max-h-40 overflow-y-auto space-y-1 pr-2 mb-3 custom-scrollbar">
          {match.comments && match.comments.length > 0 ? (
            match.comments.map(comment => <Comment key={comment.id} comment={comment} teamAName={match.teamA.name} teamBName={match.teamB.name} />)
          ) : (
            <p className="text-gray-500 text-center text-xs py-4">아직 댓글이 없습니다. 첫 응원을 남겨보세요!</p>
          )}
        </div>
        
        <div className="space-y-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="응원 댓글을 남겨주세요..."
            rows={2}
            className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition resize-none"
          />
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400">승리 예측:</span>
              <button onClick={() => setPredictedTeam(match.teamA.name)} className={`px-2 py-1 text-xs font-semibold rounded-md transition ${predictedTeam === match.teamA.name ? 'bg-blue-600 text-white ring-2 ring-blue-400' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                {match.teamA.name}
              </button>
              <button onClick={() => setPredictedTeam(match.teamB.name)} className={`px-2 py-1 text-xs font-semibold rounded-md transition ${predictedTeam === match.teamB.name ? 'bg-red-600 text-white ring-2 ring-red-400' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                {match.teamB.name}
              </button>
            </div>
            <button onClick={handleSubmitComment} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors flex-shrink-0 text-sm">
              등록
            </button>
          </div>
          {commentError && <p className="text-red-400 text-center mt-1 text-xs">{commentError}</p>}
        </div>
      </div>
    </div>
  );
};