import React from 'react';
import { Award, User, RotateCcw, Volume2, Sparkles, Plus, Minus } from 'lucide-react';
import { Player } from './types';

interface ScoreBoardProps {
  gor: Player;
  gayane: Player;
  activePlayer: 'gor' | 'gayane';
  setActivePlayer: (player: 'gor' | 'gayane') => void;
  updateScore: (player: 'gor' | 'gayane', amount: number) => void;
  resetGame: () => void;
}

export default function ScoreBoard({
  gor,
  gayane,
  activePlayer,
  setActivePlayer,
  updateScore,
  resetGame,
}: ScoreBoardProps) {
  // Play sound for points
  const playWinSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      // Ignored
    }
  };

  const handleManualAdd = (player: 'gor' | 'gayane', amount: number) => {
    updateScore(player, amount);
    if (amount > 0) playWinSound();
  };

  return (
    <div className="bg-[#1E293B] border-b border-slate-800 sticky top-0 z-50 px-4 py-3 shadow-md text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇪🇸</span>
          <div>
            <h1 className="text-lg font-display font-black text-white tracking-tight flex items-center gap-1 uppercase">
              ¡A España! <span className="text-blue-400 text-xs font-semibold bg-white/10 px-2 py-0.5 rounded-full">A1</span>
            </h1>
            <p className="text-[11px] text-slate-300 font-sans font-medium">
              Գոռն ու Գայանեն մեկնում են Իսպանիա
            </p>
          </div>
        </div>

        {/* Players Area */}
        <div className="flex items-center gap-6">
          {/* Player Gor */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setActivePlayer('gor')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActivePlayer('gor');
              }
            }}
            className={`relative flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200 text-left cursor-pointer select-none ${
              activePlayer === 'gor'
                ? 'bg-blue-500/15 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.25)]'
                : 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700 text-slate-300'
            }`}
          >
            {activePlayer === 'gor' && (
              <span className="absolute -top-2 -right-1 bg-blue-500 text-white font-sans font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
                Հերթը
              </span>
            )}
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl">
              👦
            </div>
            <div>
              <div className="font-sans font-bold text-sm text-slate-100 flex items-center gap-1.5">
                {gor.name}
              </div>
              <div className="flex items-center gap-1 text-blue-400 font-mono font-bold text-base">
                🏆 {gor.score} <span className="text-xs text-slate-400 font-normal">մ.</span>
              </div>
            </div>
            {/* Quick adjust panel inside player button to avoid cluttering */}
            <div className="flex flex-col gap-1 pl-2 border-l border-slate-700/80" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => handleManualAdd('gor', 1)}
                className="hover:bg-slate-800 p-0.5 rounded text-emerald-400 hover:text-emerald-300 cursor-pointer"
                title="Ավելացնել 1 միավոր"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleManualAdd('gor', -1)}
                className="hover:bg-slate-800 p-0.5 rounded text-rose-400 hover:text-rose-300 cursor-pointer"
                title="Նվազեցնել 1 միավոր"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Versus symbol */}
          <div className="text-xs font-bold text-slate-500 font-mono tracking-wider">VS</div>

          {/* Player Gayane */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setActivePlayer('gayane')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActivePlayer('gayane');
              }
            }}
            className={`relative flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200 text-left cursor-pointer select-none ${
              activePlayer === 'gayane'
                ? 'bg-pink-500/15 border-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.25)]'
                : 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700 text-slate-300'
            }`}
          >
            {activePlayer === 'gayane' && (
              <span className="absolute -top-2 -right-1 bg-pink-500 text-white font-sans font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
                Հերթը
              </span>
            )}
            <div className="w-10 h-10 rounded-lg bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-2xl">
              👧
            </div>
            <div>
              <div className="font-sans font-bold text-sm text-slate-100 flex items-center gap-1.5">
                {gayane.name}
              </div>
              <div className="flex items-center gap-1 text-pink-400 font-mono font-bold text-base">
                🏆 {gayane.score} <span className="text-xs text-slate-400 font-normal">մ.</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 pl-2 border-l border-slate-700/80" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => handleManualAdd('gayane', 1)}
                className="hover:bg-slate-800 p-0.5 rounded text-emerald-400 hover:text-emerald-300 cursor-pointer"
                title="Ավելացնել 1 միավոր"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleManualAdd('gayane', -1)}
                className="hover:bg-slate-800 p-0.5 rounded text-rose-400 hover:text-rose-300 cursor-pointer"
                title="Նվազեցնել 1 միավոր"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex flex-col items-end text-right">
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Ազատ միավորներ
            </div>
            <div className="text-[10px] text-slate-300 max-w-[200px]">
              Սեղմեք խաղացողի վրա հերթը փոխելու համար: Օգտագործեք + / - կոճակները միավորների ձեռքով ավելացման համար:
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('Ցանկանու՞մ եք զրոյացնել խաղը:')) {
                resetGame();
              }
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/80 transition text-slate-300 hover:text-white"
            title="Սկսել նորից"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
