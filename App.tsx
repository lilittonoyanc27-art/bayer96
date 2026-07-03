import React, { useState, useEffect } from 'react';
import { Player, GameStage } from './types';
import ScoreBoard from './ScoreBoard';
import GameIntro from './GameIntro';
import Game1Dialogue from './Game1Dialogue';
import Game2Dialogue from './Game2Dialogue';
import Game3Dialogue from './Game3Dialogue';
import Game4Dialogue from './Game4Dialogue';
import Game5Dialogue from './Game5Dialogue';
import FinalQuiz from './FinalQuiz';
import GameResults from './GameResults';
import { Landmark, Compass } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState<GameStage>('intro');
  const [gor, setGor] = useState<Player>({ name: 'Գոռ', score: 0, avatar: '👦' });
  const [gayane, setGayane] = useState<Player>({ name: 'Գայանե', score: 0, avatar: '👧' });
  const [activePlayer, setActivePlayer] = useState<'gor' | 'gayane'>('gor');

  // Load state from localStorage on startup
  useEffect(() => {
    try {
      const savedGor = localStorage.getItem('span_game_gor');
      const savedGayane = localStorage.getItem('span_game_gayane');
      const savedStage = localStorage.getItem('span_game_stage');
      const savedActive = localStorage.getItem('span_game_active_player');

      if (savedGor) setGor(JSON.parse(savedGor));
      if (savedGayane) setGayane(JSON.parse(savedGayane));
      if (savedStage) setStage(savedStage as GameStage);
      if (savedActive) setActivePlayer(savedActive as 'gor' | 'gayane');
    } catch (e) {
      // Ignored
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('span_game_gor', JSON.stringify(gor));
      localStorage.setItem('span_game_gayane', JSON.stringify(gayane));
      localStorage.setItem('span_game_stage', stage);
      localStorage.setItem('span_game_active_player', activePlayer);
    } catch (e) {
      // Ignored
    }
  }, [gor, gayane, stage, activePlayer]);

  const handleStartGame = (gorName: string, gayaneName: string) => {
    setGor({ name: gorName || 'Գոռ', score: 0, avatar: '👦' });
    setGayane({ name: gayaneName || 'Գայանե', score: 0, avatar: '👧' });
    setActivePlayer('gor');
    setStage('stage1');
  };

  const handleUpdateScore = (playerKey: 'gor' | 'gayane', amount: number) => {
    if (playerKey === 'gor') {
      setGor(prev => ({ ...prev, score: Math.max(0, prev.score + amount) }));
    } else {
      setGayane(prev => ({ ...prev, score: Math.max(0, prev.score + amount) }));
    }
  };

  const handleResetGame = () => {
    setGor(prev => ({ ...prev, score: 0 }));
    setGayane(prev => ({ ...prev, score: 0 }));
    setActivePlayer('gor');
    setStage('intro');
    try {
      localStorage.removeItem('span_game_gor');
      localStorage.removeItem('span_game_gayane');
      localStorage.removeItem('span_game_stage');
      localStorage.removeItem('span_game_active_player');
    } catch (e) {}
  };

  const getStageIndex = (current: GameStage): number => {
    const list: GameStage[] = [
      'intro',
      'stage1',
      'stage2',
      'stage3',
      'stage4',
      'stage5',
      'quiz',
      'results',
    ];
    return list.indexOf(current);
  };

  const STAGES_METADATA: { stage: GameStage; label: string; emoji: string }[] = [
    { stage: 'intro', label: 'Մեկնարկ', emoji: '🏠' },
    { stage: 'stage1', label: 'Ճամպրուկ', emoji: '🧳' },
    { stage: 'stage2', label: 'Եղանակ', emoji: '🌦️' },
    { stage: 'stage3', label: 'Հյուրանոց', emoji: '🏨' },
    { stage: 'stage4', label: 'Զանգ', emoji: '📞' },
    { stage: 'stage5', label: 'Շուկա', emoji: '🛒' },
    { stage: 'quiz', label: 'Թեստ', emoji: '🏆' },
    { stage: 'results', label: 'Արդյունքներ', emoji: '🎉' },
  ];

  const currentStageIndex = getStageIndex(stage);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-blue-500 selection:text-white font-sans">
      {/* Dynamic Header Scoreboard */}
      {stage !== 'intro' && (
        <ScoreBoard
          gor={gor}
          gayane={gayane}
          activePlayer={activePlayer}
          setActivePlayer={setActivePlayer}
          updateScore={handleUpdateScore}
          resetGame={handleResetGame}
        />
      )}

      {/* Main Container */}
      <main className="flex-grow flex flex-col py-6">
        {/* Horizontal Progress Map */}
        {stage !== 'intro' && (
          <div className="max-w-4xl mx-auto w-full px-4 mb-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2 overflow-x-auto shadow-sm">
              {STAGES_METADATA.map((meta, i) => {
                const isActive = stage === meta.stage;
                const isCompleted = currentStageIndex > i;

                return (
                  <button
                    key={meta.stage}
                    onClick={() => {
                      setStage(meta.stage);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-sans font-bold transition duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-slate-800 border-slate-800 text-white font-black shadow-md shadow-slate-800/10'
                        : isCompleted
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                        : 'bg-slate-50/50 border-slate-200/60 text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <span>{meta.emoji}</span>
                    <span className="hidden sm:inline">{meta.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Stage Render */}
        <div className="flex-grow">
          {stage === 'intro' && (
            <GameIntro onStart={handleStartGame} />
          )}

          {stage === 'stage1' && (
            <Game1Dialogue
              activePlayerName={activePlayer === 'gor' ? gor.name : gayane.name}
              activePlayerKey={activePlayer}
              awardPoints={handleUpdateScore}
              onNextStage={() => setStage('stage2')}
            />
          )}

          {stage === 'stage2' && (
            <Game2Dialogue
              activePlayerName={activePlayer === 'gor' ? gor.name : gayane.name}
              activePlayerKey={activePlayer}
              awardPoints={handleUpdateScore}
              onNextStage={() => setStage('stage3')}
            />
          )}

          {stage === 'stage3' && (
            <Game3Dialogue
              activePlayerName={activePlayer === 'gor' ? gor.name : gayane.name}
              activePlayerKey={activePlayer}
              awardPoints={handleUpdateScore}
              onNextStage={() => setStage('stage4')}
            />
          )}

          {stage === 'stage4' && (
            <Game4Dialogue
              activePlayerName={activePlayer === 'gor' ? gor.name : gayane.name}
              activePlayerKey={activePlayer}
              awardPoints={handleUpdateScore}
              onNextStage={() => setStage('stage5')}
            />
          )}

          {stage === 'stage5' && (
            <Game5Dialogue
              activePlayerName={activePlayer === 'gor' ? gor.name : gayane.name}
              activePlayerKey={activePlayer}
              awardPoints={handleUpdateScore}
              onNextStage={() => setStage('quiz')}
            />
          )}

          {stage === 'quiz' && (
            <FinalQuiz
              activePlayerName={activePlayer === 'gor' ? gor.name : gayane.name}
              activePlayerKey={activePlayer}
              setActivePlayerKey={setActivePlayer}
              awardPoints={handleUpdateScore}
              onFinishGame={() => setStage('results')}
              gorName={gor.name}
              gayaneName={gayane.name}
            />
          )}

          {stage === 'results' && (
            <GameResults
              gor={gor}
              gayane={gayane}
              resetGame={handleResetGame}
            />
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="py-6 border-t border-slate-200 bg-white text-center text-[11px] text-slate-500 font-sans tracking-tight shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 font-semibold text-slate-600">
            <Landmark className="w-4 h-4 text-blue-500" />
            <span>Creado para Gor y Gayane • Գոռի և Գայանեի համար</span>
          </div>
          <div className="text-slate-400 font-medium">
            A1 Գործնական Իսպաներեն՝ հայերեն թարգմանությամբ
          </div>
        </div>
      </footer>
    </div>
  );
}
