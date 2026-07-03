import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Check, RotateCcw, Volume2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface Game1Props {
  activePlayerName: string;
  onNextStage: () => void;
  awardPoints: (player: 'gor' | 'gayane', points: number) => void;
  activePlayerKey: 'gor' | 'gayane';
}

interface DialogLine {
  id: number;
  speaker: 'gor' | 'gayane';
  textTemplate: string;
  gapId: string;
  correctWord: string;
  translationHy: string;
}

const BANK_WORDS = [
  { es: 'maleta', hy: 'ճամպրուկ' },
  { es: 'pasaporte', hy: 'անձնագիր' },
  { es: 'ropa', hy: 'հագուստ' },
  { es: 'gafas de sol', hy: 'արևային ակնոցներ' },
  { es: 'viajar', hy: 'ճանապարհորդել' }
];

const DIALOG_LINES: DialogLine[] = [
  {
    id: 1,
    speaker: 'gor',
    textTemplate: 'Gayane, ¿está lista tu {gap}?',
    gapId: 'maleta',
    correctWord: 'maleta',
    translationHy: 'Գայանե, քո ճամպրուկը պատրա՞ստ է:',
  },
  {
    id: 2,
    speaker: 'gayane',
    textTemplate: 'Sí, ya tengo mi maleta y también mi {gap}.',
    gapId: 'pasaporte',
    correctWord: 'pasaporte',
    translationHy: 'Այո, ես արդեն ունեմ իմ ճամպրուկը և նաև իմ անձնագիրը:',
  },
  {
    id: 3,
    speaker: 'gor',
    textTemplate: '¡Excelente! Yo necesito guardar mi {gap} de abrigo.',
    gapId: 'ropa',
    correctWord: 'ropa',
    translationHy: 'Գերազանց է: Ես պետք է տեղավորեմ իմ տաք հագուստը:',
  },
  {
    id: 4,
    speaker: 'gayane',
    textTemplate: 'Y para la playa no olvides llevar tus {gap}.',
    gapId: 'gafas de sol',
    correctWord: 'gafas de sol',
    translationHy: 'Իսկ լողափի համար չմոռանաս վերցնել արևային ակնոցներդ:',
  },
  {
    id: 5,
    speaker: 'gor',
    textTemplate: '¡Perfecto! Ya estamos listos para {gap}.',
    gapId: 'viajar',
    correctWord: 'viajar',
    translationHy: 'Կատարյալ է: Մենք արդեն պատրաստ ենք ճանապարհորդելու:',
  }
];

export default function Game1Dialogue({
  activePlayerName,
  onNextStage,
  awardPoints,
  activePlayerKey,
}: Game1Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedGap, setSelectedGap] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);

  const handleGapClick = (gapId: string) => {
    if (showResults) return;
    setSelectedGap(gapId);
  };

  const handleWordSelect = (word: string) => {
    if (!selectedGap) return;
    setAnswers(prev => ({
      ...prev,
      [selectedGap]: word
    }));
    setSelectedGap(null);
  };

  const checkDialogue = () => {
    let allCorrect = true;
    DIALOG_LINES.forEach(line => {
      if (answers[line.gapId] !== line.correctWord) {
        allCorrect = false;
      }
    });

    setIsAllCorrect(allCorrect);
    setShowResults(true);

    if (allCorrect) {
      awardPoints(activePlayerKey, 2);
    }
  };

  const resetDialogue = () => {
    setAnswers({});
    setSelectedGap(null);
    setShowResults(false);
    setIsAllCorrect(false);
  };

  const speakFullDialogue = () => {
    try {
      if ('speechSynthesis' in window) {
        const fullText = DIALOG_LINES.map(line => {
          const word = answers[line.gapId] || '...';
          return `${line.speaker === 'gor' ? 'Gor' : 'Gayane'}: ${line.textTemplate.replace('{gap}', word)}`;
        }).join('. ');
        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.lang = 'es-ES';
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {}
  };

  const speakSingleLine = (textTemplate: string, word: string) => {
    try {
      if ('speechSynthesis' in window) {
        const fullText = textTemplate.replace('{gap}', word || '...');
        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.lang = 'es-ES';
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {}
  };

  const allGapsFilled = DIALOG_LINES.every(line => !!answers[line.gapId]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-sm font-display text-blue-600 uppercase tracking-wider font-bold">
            Առաջադրանք 1-ը 5-ից
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-800 flex items-center gap-2 uppercase tracking-tight">
            🧳 Ճամպրուկ և Իրեր
          </h2>
        </div>
        <div className="bg-white border-2 border-slate-200 shadow-sm rounded-2xl px-4 py-2.5 flex items-center gap-2">
          <span className="text-sm text-slate-500 font-medium">Պատասխանում է՝</span>
          <span className={`text-base font-black uppercase tracking-wider ${activePlayerKey === 'gor' ? 'text-blue-500' : 'text-pink-500'}`}>
            {activePlayerName}
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 mb-8 shadow-sm text-base text-slate-700">
        <p className="font-display font-black text-slate-800 text-lg mb-2 uppercase tracking-wide">
          Գոռն ու Գայանեն հավաքում են իրերը ճանապարհորդության համար:
        </p>
        <p className="font-semibold text-slate-600 text-base">
          Տեղադրեք ճիշտ բառերը երկխոսության բաց թողնված տեղերում: Ճիշտ լրացնելու դեպքում կստանաք <strong className="text-blue-600 font-bold">+2 միավոր</strong>:
        </p>
      </div>

      {/* Main Dialogue Chat UI with Large Fonts */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-5 md:p-8 mb-8 space-y-6 shadow-inner">
        {DIALOG_LINES.map((line) => {
          const parts = line.textTemplate.split('{gap}');
          const filledWord = answers[line.gapId];
          const isSelected = selectedGap === line.gapId;
          const isGor = line.speaker === 'gor';

          let gapStyle = 'border-blue-300 hover:border-blue-500 text-blue-600 bg-white';
          if (isSelected) {
            gapStyle = 'border-blue-600 text-blue-700 bg-blue-50 scale-105 ring-2 ring-blue-500/20';
          } else if (filledWord) {
            if (showResults) {
              gapStyle = filledWord === line.correctWord
                ? 'border-emerald-500 text-emerald-800 bg-emerald-50 font-extrabold'
                : 'border-rose-500 text-rose-800 bg-rose-50 font-extrabold';
            } else {
              gapStyle = 'border-slate-300 text-slate-900 bg-white font-bold';
            }
          }

          return (
            <div
              key={line.id}
              className={`flex items-start gap-4 max-w-2xl ${isGor ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md ${
                isGor ? 'bg-blue-50 border-2 border-blue-200' : 'bg-pink-50 border-2 border-pink-200'
              }`}>
                {isGor ? '👦' : '👧'}
              </div>

              {/* Chat Bubble */}
              <div className="rounded-3xl p-5 border-2 shadow-md relative bg-white border-slate-100 text-left max-w-full">
                {/* Speaker tag */}
                <div className={`text-xs font-display font-black uppercase mb-1.5 ${isGor ? 'text-blue-500' : 'text-pink-500'}`}>
                  {isGor ? 'Gor • Գոռ' : 'Gayane • Գայանե'}
                </div>

                {/* Text with gap */}
                <div className="text-lg md:text-xl font-bold text-slate-800 flex flex-wrap items-center gap-x-2 gap-y-2 leading-relaxed">
                  <span>{parts[0]}</span>
                  <button
                    onClick={() => handleGapClick(line.gapId)}
                    className={`px-4 py-1.5 rounded-xl border-2 border-dashed font-display font-black transition duration-200 min-w-[120px] text-center text-base md:text-lg cursor-pointer ${gapStyle}`}
                  >
                    {filledWord ? filledWord : '...'}
                  </button>
                  <span>{parts[1]}</span>

                  <button
                    onClick={() => speakSingleLine(line.textTemplate, filledWord)}
                    className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition ml-auto border border-slate-200/50 cursor-pointer"
                    title="Լսել արտասանությունը"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Translation underneath */}
                <div className="mt-3 border-t border-slate-100 pt-2">
                  <p className="text-sm text-slate-500 font-semibold leading-relaxed">🇦🇲 {line.translationHy}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Word Bank Area with Large Fonts */}
      <AnimatePresence>
        {!showResults && selectedGap && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border-2 border-blue-100 rounded-3xl p-6 mb-8 shadow-sm"
          >
            <h4 className="text-base font-display font-black text-blue-600 uppercase tracking-wider mb-4 text-center">
              Ընտրեք բառը բաց թողնված տեղի համար՝
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {BANK_WORDS.map((word) => (
                <button
                  key={word.es}
                  onClick={() => handleWordSelect(word.es)}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border-2 border-slate-200 hover:border-blue-400 text-center transition group cursor-pointer"
                >
                  <span className="block font-display font-black text-slate-800 text-base md:text-lg group-hover:text-blue-600 transition-colors uppercase tracking-wide">
                    {word.es}
                  </span>
                  <span className="block text-xs md:text-sm font-bold text-slate-500 mt-1">
                    🇦🇲 {word.hy}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Box */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            {isAllCorrect ? (
              <div className="bg-emerald-50 border-2 border-emerald-200 p-6 rounded-2xl text-emerald-900 shadow-sm">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-black text-lg md:text-xl uppercase">¡Excelente! Բոլոր բառերը ճիշտ են դասավորված:</h4>
                    <p className="text-sm md:text-base text-slate-700 mt-2 font-semibold">
                      Երկխոսությունը կազմված է ճիշտ: Շնորհվում է <strong className="text-blue-600 font-bold">+2 միավոր</strong>:
                    </p>
                    <button
                      onClick={speakFullDialogue}
                      className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-display font-bold text-sm hover:bg-emerald-700 transition shadow-sm uppercase tracking-wider cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" /> Լսել ամբողջական երկխոսությունը
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border-2 border-rose-200 p-6 rounded-2xl text-rose-900 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-3xl mt-0.5">⚠️</span>
                  <div>
                    <h4 className="font-display font-black text-lg md:text-xl uppercase">Օյ, երկխոսության մեջ սխալներ կան:</h4>
                    <p className="text-sm md:text-base text-slate-700 mt-1.5 font-semibold">
                      Որոշ բառեր իրենց տեղում չեն: Փորձեք ևս մեկ անգամ:
                    </p>
                    <button
                      onClick={resetDialogue}
                      className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-display font-bold transition uppercase tracking-wider shadow-sm cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" /> Մաքրել և փորձել նորից
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={resetDialogue}
          className="px-5 py-3 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-xs md:text-sm font-display font-bold text-slate-500 hover:text-slate-700 transition uppercase tracking-wider cursor-pointer"
        >
          Մաքրել երկխոսությունը
        </button>

        {allGapsFilled && !showResults ? (
          <button
            onClick={checkDialogue}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-xs md:text-sm transition shadow-md shadow-emerald-600/10 uppercase tracking-wider cursor-pointer"
          >
            Ստուգել երկխոսությունը! 🔍
          </button>
        ) : showResults && isAllCorrect ? (
          <button
            onClick={onNextStage}
            className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-display font-bold uppercase tracking-wider text-xs md:text-sm transition-all shadow-md shadow-slate-800/10 flex items-center gap-2 cursor-pointer"
          >
            Անցնել Խաղ 2-ին <ArrowRight className="w-4 h-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
