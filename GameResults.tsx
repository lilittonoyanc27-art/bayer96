import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Trophy, Compass, ArrowRight, RotateCcw, Share2, Star, Sparkles } from 'lucide-react';
import { Player } from './types';

interface ResultsProps {
  gor: Player;
  gayane: Player;
  resetGame: () => void;
}

export default function GameResults({ gor, gayane, resetGame }: ResultsProps) {
  const [showTravelWish, setShowTravelWish] = useState(false);

  const getBadgeInfo = (score: number) => {
    if (score <= 5) {
      return {
        levelEs: 'Necesitas practicar más',
        levelHy: 'Ավելի շատ է պետք պարապել',
        emoji: '📚',
        color: 'text-slate-600 border-slate-200 bg-slate-50',
      };
    } else if (score <= 10) {
      return {
        levelEs: 'Buen trabajo',
        levelHy: 'Լավ աշխատանք: Դու պատրաստ ես ուղևորությանը:',
        emoji: '👍',
        color: 'text-emerald-800 border-emerald-200 bg-emerald-50',
      };
    } else {
      return {
        levelEs: '¡Excelente viajero!',
        levelHy: 'Գերազանց ճանապարհորդ: Իսկական Իսպանիայի փորձագետ:',
        emoji: '👑',
        color: 'text-amber-800 border-amber-200 bg-amber-50 shadow-sm shadow-amber-500/5',
      };
    }
  };

  const gorBadge = getBadgeInfo(gor.score);
  const gayaneBadge = getBadgeInfo(gayane.score);

  const isGorWinner = gor.score > gayane.score;
  const isGayaneWinner = gayane.score > gor.score;
  const isTie = gor.score === gayane.score;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-center font-sans text-slate-800">
      {/* Celebration Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden mb-8 text-white"
      >
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        
        <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-display font-bold uppercase tracking-wider text-amber-200 mb-4 border border-white/10">
          <Trophy className="w-3.5 h-3.5 animate-bounce" /> ¡Fin del viaje!
        </span>

        <h1 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight mb-3">
          {isTie
            ? 'Ընկերական ոչ-ոքի՛: 🤝'
            : isGorWinner
            ? `Հաղթեց ${gor.name}-ը: 🏆`
            : `Հաղթեց ${gayane.name}-ն: 🏆`}
        </h1>
        <p className="text-xs text-blue-100 max-w-xl mx-auto leading-relaxed font-semibold">
          {isTie
            ? 'Երկու աշակերտներն էլ գերազանց գիտելիքներ ցուցաբերեցին: Դուք երկուսդ էլ կդառնաք ընտանիքի գլխավոր օգնականները Իսպանիայում:'
            : isGorWinner
            ? `Շնորհավորո՛ւմ ենք: ${gor.name}-ը հավաքեց ավելի շատ միավորներ և դառնում է ընտանիքի գլխավոր օգնականը Իսպանիայում:`
            : `Շնորհավորո՛ւմ ենք: ${gayane.name}-ը հավաքեց ավելի շատ միավորներ և դառնում է ընտանիքի գլխավոր օգնականը Իսպանիայում:`}
        </p>
      </motion.div>

      {/* Travel wish celebration overlay banner */}
      <AnimatePresence>
        {showTravelWish && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 text-amber-900 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl shrink-0 border border-amber-200">
                  ✈️
                </div>
                <div>
                  <h4 className="font-display font-black uppercase text-sm tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
                    ¡Buen viaje!
                  </h4>
                  <p className="text-xs text-amber-800 font-semibold leading-relaxed mt-0.5">
                    Մաղթում ենք ձեր ողջ ընտանիքին անմոռանալի և հրաշալի ճանապարհորդություն դեպի Իսպանիա: Թող իսպաներենը դառնա ձեր լավագույն օգնականը ուղևորության ընթացքում:
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTravelWish(false)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-display font-bold uppercase tracking-wider text-[10px] rounded-xl transition shadow-sm"
              >
                ¡Gracias!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Players Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
        {/* Gor Certificate */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-white border-2 rounded-2xl p-6 relative overflow-hidden shadow-sm ${
            isGorWinner ? 'border-amber-500 ring-4 ring-amber-500/10' : 'border-slate-200'
          }`}
        >
          {isGorWinner && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white font-display font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
              👑 Հաղթող
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl shadow-sm">
              👦
            </div>
            <div>
              <h3 className="font-display font-black text-slate-800 text-lg uppercase tracking-tight">{gor.name}</h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Աշակերտ 1</p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Հավաքած միավորներ՝</span>
              <span className="text-xl font-display font-black text-blue-600">{gor.score} մ.</span>
            </div>

            {/* Performance Card */}
            <div className={`border-2 rounded-xl p-4 space-y-2 ${gorBadge.color}`}>
              <div className="flex items-center gap-1.5 font-display font-black text-sm uppercase tracking-wide">
                <span>{gorBadge.emoji}</span>
                <span>{gorBadge.levelEs}</span>
              </div>
              <p className="text-[10px] leading-relaxed font-semibold">
                🇦🇲 {gorBadge.levelHy}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Gayane Certificate */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`bg-white border-2 rounded-2xl p-6 relative overflow-hidden shadow-sm ${
            isGayaneWinner ? 'border-amber-500 ring-4 ring-amber-500/10' : 'border-slate-200'
          }`}
        >
          {isGayaneWinner && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white font-display font-black text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
              👑 Հաղթող
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-3xl shadow-sm">
              👧
            </div>
            <div>
              <h3 className="font-display font-black text-slate-800 text-lg uppercase tracking-tight">{gayane.name}</h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Աշակերտ 2</p>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Հավաքած միավորներ՝</span>
              <span className="text-xl font-display font-black text-pink-600">{gayane.score} մ.</span>
            </div>

            {/* Performance Card */}
            <div className={`border-2 rounded-xl p-4 space-y-2 ${gayaneBadge.color}`}>
              <div className="flex items-center gap-1.5 font-display font-black text-sm uppercase tracking-wide">
                <span>{gayaneBadge.emoji}</span>
                <span>{gayaneBadge.levelEs}</span>
              </div>
              <p className="text-[10px] leading-relaxed font-semibold">
                🇦🇲 {gayaneBadge.levelHy}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action triggers */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
        <button
          onClick={resetGame}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-display font-bold uppercase tracking-wider text-slate-700 transition"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" /> Սկսել նոր խաղ
        </button>

        <button
          onClick={() => setShowTravelWish(true)}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-display font-black uppercase tracking-wider text-xs transition shadow-md shadow-blue-500/15"
        >
          ¡Buen viaje! <Compass className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
