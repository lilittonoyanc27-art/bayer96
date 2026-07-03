import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Volume2, Award, ShieldQuestion } from 'lucide-react';

interface QuizProps {
  activePlayerName: string;
  onFinishGame: () => void;
  awardPoints: (player: 'gor' | 'gayane', points: number) => void;
  activePlayerKey: 'gor' | 'gayane';
  setActivePlayerKey: (player: 'gor' | 'gayane') => void;
  gorName: string;
  gayaneName: string;
}

interface Question {
  id: number;
  questionEs: string;
  questionHy: string;
  options: { key: string; text: string; labelHy?: string }[];
  correctKey: string;
  explanationHy: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    questionEs: '¿Qué significa la palabra "viajar" en armenio?',
    questionHy: 'Ի՞նչ է նշանակում իսպաներեն «viajar» բառը հայերենում:',
    options: [
      { key: 'A', text: 'ճամպրուկ' },
      { key: 'B', text: 'ճանապարհորդել' },
      { key: 'C', text: 'տոմս' }
    ],
    correctKey: 'B',
    explanationHy: 'Viajar թարգմանվում է որպես «ճանապարհորդել»:'
  },
  {
    id: 2,
    questionEs: '¿Cómo se dice "чемодан" en español?',
    questionHy: 'Ինչպե՞ս է իսպաներեն «ճամպրուկ»-ը:',
    options: [
      { key: 'A', text: 'la mesa', labelHy: 'սեղան' },
      { key: 'B', text: 'el pasaporte', labelHy: 'անձնագիր' },
      { key: 'C', text: 'la maleta', labelHy: 'ճամպրուկ' }
    ],
    correctKey: 'C',
    explanationHy: 'Ճամպրուկը իսպաներեն կլինի la maleta:'
  },
  {
    id: 3,
    questionEs: 'Si estás en casa y vas a ir al aeropuerto, ¿что ты скажешь про чемоданы?',
    questionHy: 'Եթե տանն եք և պատրաստվում եք գնալ օդանավակայան, ո՞ր բայը կընտրեք ճամպրուկների համար:',
    options: [
      { key: 'A', text: 'Voy a llevar mis maletas.', labelHy: 'Ես կտանեմ իմ ճամպրուկները:' },
      { key: 'B', text: 'Voy a traer mis maletas.', labelHy: 'Ես կբերեմ իմ ճամպրուկները:' },
      { key: 'C', text: 'Voy a comer mis maletas.', labelHy: 'Ես կուտեմ իմ ճամպրուկները:' }
    ],
    correctKey: 'A',
    explanationHy: 'Օգտագործվում է llevar, քանի որ ճամպրուկները տնից (այստեղից) տանում են օդանավակայան (այնտեղ):'
  },
  {
    id: 4,
    questionEs: '¿Qué tiempo hace si necesitas un paraguas (зонтик)?',
    questionHy: 'Ի՞նչ եղանակ է դրսում, եթե ձեզ անձրևանոց է անհրաժեշտ:',
    options: [
      { key: 'A', text: 'Está soleado', labelHy: 'Արևոտ է' },
      { key: 'B', text: 'Está lloviendo', labelHy: 'Անձրև է գալիս' },
      { key: 'C', text: 'Hace frío', labelHy: 'Ցուրտ է' }
    ],
    correctKey: 'B',
    explanationHy: 'Անձրևանոցն անհրաժեշտ է, երբ անձրև է գալիս՝ Está lloviendo:'
  },
  {
    id: 5,
    questionEs: '¿Cómo se dice "солнцезащитный крем" en español?',
    questionHy: 'Ինչպե՞ս է իսպաներեն «արևապաշտպան քսուք»-ը:',
    options: [
      { key: 'A', text: 'las gafas de sol', labelHy: 'արևային ակնոցներ' },
      { key: 'B', text: 'la toalla', labelHy: 'սրբիչ' },
      { key: 'C', text: 'el protector solar', labelHy: 'արևապաշտպան քսուք' }
    ],
    correctKey: 'C',
    explanationHy: 'Արևապաշտպան քսուքը իսպաներեն կլինի el protector solar:'
  },
  {
    id: 6,
    questionEs: 'Si vas a la montaña y hace frío, ¿qué tipo de ropa necesitas?',
    questionHy: 'Եթե գնում եք սարեր և այնտեղ ցուրտ է, ինչպիսի՞ հագուստ է ձեզ անհրաժեշտ:',
    options: [
      { key: 'A', text: 'ropa de baño', labelHy: 'լողազգեստ' },
      { key: 'B', text: 'ropa de abrigo', labelHy: 'տաք հագուստ' },
      { key: 'C', text: 'una camiseta fina', labelHy: 'բարակ շապիկ' }
    ],
    correctKey: 'B',
    explanationHy: 'Ցուրտ եղանակին անհրաժեշտ է տաք հագուստ՝ ropa de abrigo:'
  },
  {
    id: 7,
    questionEs: '¿Qué означает испанская фраза "Hace buen tiempo"?',
    questionHy: 'Ի՞նչ է նշանակում իսպաներեն «Hace buen tiempo» արտահայտությունը:',
    options: [
      { key: 'A', text: 'Լավ եղանակ է' },
      { key: 'B', text: 'Վատ եղանակ է' },
      { key: 'C', text: 'Անձրև է գալիս' }
    ],
    correctKey: 'A',
    explanationHy: 'Hace buen tiempo նշանակում է «Լավ եղանակ է»:'
  },
  {
    id: 8,
    questionEs: 'En el aeropuerto, para subir al avión necesitas el pasaporte y...',
    questionHy: 'Օդանավակայանում ինքնաթիռ նստելու համար ձեզ անհրաժեշտ է անձնագիր և...',
    options: [
      { key: 'A', text: 'el billete', labelHy: 'տոմս' },
      { key: 'B', text: 'la bolsa', labelHy: 'տոպրակ' },
      { key: 'C', text: 'la nieve', labelHy: 'ձյուն' }
    ],
    correctKey: 'A',
    explanationHy: 'Թռիչքի համար պարտադիր է տոմսը՝ el billete:'
  },
  {
    id: 9,
    questionEs: '¿Cómo dices "Я хочу купить воду" en español?',
    questionHy: 'Ինչպե՞ս կասեք «Ես ուզում եմ ջուր գնել» իսպաներեն:',
    options: [
      { key: 'A', text: '¿Tiene agua?', labelHy: 'Ջուր ունե՞ք:' },
      { key: 'B', text: 'Quiero comprar agua.', labelHy: 'Ես ուզում եմ ջուր գնել:' },
      { key: 'C', text: '¿Cuánto cuesta el agua?', labelHy: 'Ինչքա՞ն արժե ջուրը:' }
    ],
    correctKey: 'B',
    explanationHy: 'Ես ուզում եմ ջուր գնել՝ Quiero comprar agua:'
  },
  {
    id: 10,
    questionEs: '¿Cómo preguntas "¿Можно оплатить картой?" en el supermercado?',
    questionHy: 'Ինչպե՞ս հարցնել դրամարկղի մոտ. «Կարո՞ղ եմ վճարել քարտով»:',
    options: [
      { key: 'A', text: '¿Cuánto cuesta?', labelHy: 'Ինչքա՞ն արժե:' },
      { key: 'B', text: '¿Tiene una bolsa?', labelHy: 'Տոպրակ ունե՞ք:' },
      { key: 'C', text: '¿Puedo pagar con tarjeta?', labelHy: 'Կարո՞ղ եմ վճարել քարտով:' }
    ],
    correctKey: 'C',
    explanationHy: 'Քարտով վճարելու հարցը՝ ¿Puedo pagar con tarjeta?:'
  },
  {
    id: 11,
    questionEs: '¿Qué significa la palabra "la montaña" en armenio?',
    questionHy: 'Ի՞նչ է նշանակում իսպաներեն «la montaña» բառը հայերենում:',
    options: [
      { key: 'A', text: 'սար' },
      { key: 'B', text: 'լողափ' },
      { key: 'C', text: 'հյուրանոց' }
    ],
    correctKey: 'A',
    explanationHy: 'La montaña հայերեն թարգմանվում է որպես «սար»:'
  },
  {
    id: 12,
    questionEs: 'Si alguien te pregunta: "¿Qué necesitas llevar a la playa?", tú respondes:',
    questionHy: 'Եթե ձեզ հարցնեն. «Ի՞նչ է քեզ անհրաժեշտ վերցնել լողափ», ի՞նչ կպատասխանեք:',
    options: [
      { key: 'A', text: 'La toalla y las gafas de sol.', labelHy: 'Սրբիչ և արևային ակնոցներ:' },
      { key: 'B', text: 'La nieve y el frío.', labelHy: 'Ձյուն և ցուրտ:' },
      { key: 'C', text: 'El pasaporte y el billete.', labelHy: 'Անձնագիր և տոմս:' }
    ],
    correctKey: 'A',
    explanationHy: 'Լողափին անհրաժեշտ են սրբիչն ու ակնոցները՝ la toalla y las gafas de sol:'
  },
  {
    id: 13,
    questionEs: '¿Qué significa la frase "Está nublado" en armenio?',
    questionHy: 'Ի՞նչ է նշանակում իսպաներեն «Está nublado» արտահայտությունը հայերենում:',
    options: [
      { key: 'A', text: 'Անձրև է գալիս' },
      { key: 'B', text: 'Ամպամած է' },
      { key: 'C', text: 'Արևոտ է' }
    ],
    correctKey: 'B',
    explanationHy: 'Está nublado նշանակում է «Ամպամած է»:'
  },
  {
    id: 14,
    questionEs: 'Si tu hermano está en la cocina y le pides agua desde tu accommodation, ¿что скажешь?',
    questionHy: 'Եթե ձեր եղբայրը խոհանոցում է, իսկ դուք սենյակում եք և խնդրում եք բերել մի բաժակ ջուր, ո՞ր բայը կընտրեք:',
    options: [
      { key: 'A', text: '¿Puedes traer un vaso de agua?', labelHy: 'Կարո՞ղ ես մի բաժակ ջուր բերել:' },
      { key: 'B', text: '¿Puedes llevar un vaso de agua?', labelHy: 'Կարո՞ղ ես մի բաժակ ջուր տանել:' },
      { key: 'C', text: '¿Puedes pagar un vaso de agua?', labelHy: 'Կարո՞ղ ես վճարել մի բաժակ ջրի համար:' }
    ],
    correctKey: 'A',
    explanationHy: 'Օգտագործվում է traer, քանի որ ջուրը խնդրում են բերել ԱՅՍՏԵՂ (խոհանոցից դեպի խոսողը):'
  },
  {
    id: 15,
    questionEs: '¿Cómo se dice "спасибо" en español?',
    questionHy: 'Ինչպե՞ս է իսպաներեն «շնորհակալություն»-ը:',
    options: [
      { key: 'A', text: 'Hola' },
      { key: 'B', text: 'Gracias' },
      { key: 'C', text: 'Adiós' }
    ],
    correctKey: 'B',
    explanationHy: 'Շնորհակալությունը իսպաներեն կլինի Gracias:'
  }
];

export default function FinalQuiz({
  activePlayerName,
  onFinishGame,
  awardPoints,
  activePlayerKey,
  setActivePlayerKey,
  gorName,
  gayaneName,
}: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];

  const playFeedbackSound = (correct: boolean) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (correct) {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.4);
      } else {
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }
    } catch (e) {}
  };

  const handleOptionClick = (key: string) => {
    if (showFeedback) return;
    setSelectedKey(key);
    const correct = key === currentQuestion.correctKey;
    setIsCorrect(correct);
    playFeedbackSound(correct);
    setShowFeedback(true);

    if (correct) {
      awardPoints(activePlayerKey, 1);
    }
  };

  const speakQuestion = (text: string) => {
    try {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {}
  };

  const handleNext = () => {
    setSelectedKey(null);
    setShowFeedback(false);

    // Alternate active player automatically for the quiz to keep it fully competitive!
    const nextPlayer = activePlayerKey === 'gor' ? 'gayane' : 'gor';
    setActivePlayerKey(nextPlayer);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinishGame();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Stage Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-sm font-display text-blue-600 uppercase tracking-wider font-bold">
            Վերջնական փուլ
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-800 flex items-center gap-2 uppercase tracking-tight">
            🏆 Վերջնական վիկտորինա
          </h2>
        </div>
        <div className="bg-white border-2 border-slate-200 shadow-sm rounded-2xl px-4 py-2.5 flex items-center gap-2">
          <span className="text-sm text-slate-500 font-medium">Պատասխանում է՝</span>
          <span className={`text-base font-black uppercase tracking-wider ${activePlayerKey === 'gor' ? 'text-blue-500' : 'text-pink-500'}`}>
            {activePlayerName}
          </span>
        </div>
      </div>

      {/* Competitive split notice */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 mb-8 shadow-sm text-base text-slate-700 flex items-center gap-3">
        <ShieldQuestion className="w-6 h-6 text-blue-500 shrink-0" />
        <div>
          <p className="font-display font-black text-slate-800 text-lg mb-1 uppercase tracking-wide">
            Խաղացողները պատասխանում են հերթով: Յուրաքանչյուր ճիշտ պատասխանի համար տրվում է +1 միավոր:
          </p>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 md:p-10 mb-8 relative overflow-hidden shadow-sm">
        <div className="absolute top-4 right-4 text-sm font-display font-black text-slate-400">
          Հարց {currentIndex + 1} / {QUESTIONS.length}
        </div>

        {/* Player avatar for current question */}
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl shadow-md border-2 ${
            activePlayerKey === 'gor' ? 'bg-blue-50 border-blue-200' : 'bg-pink-50 border-pink-200'
          }`}>
            {activePlayerKey === 'gor' ? '👦' : '👧'}
          </div>
        </div>

        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-2.5">
            <h3 className="text-2xl md:text-3xl font-display font-black text-slate-800 uppercase tracking-tight">
              {currentQuestion.questionEs}
            </h3>
            <button
              onClick={() => speakQuestion(currentQuestion.questionEs)}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition border border-slate-200/50 shrink-0 cursor-pointer"
              title="Լսել արտասանությունը"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <div>
            <p className="text-lg md:text-xl text-slate-700 font-bold leading-relaxed">
              🇦🇲 {currentQuestion.questionHy}
            </p>
          </div>
        </div>

        {/* Option Grid */}
        <div className="space-y-4 max-w-xl mx-auto">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedKey === opt.key;
            const isCorrectOpt = opt.key === currentQuestion.correctKey;

            let optionStyle = 'bg-white hover:bg-slate-100/60 border-slate-200 text-slate-700';
            if (showFeedback) {
              if (isSelected) {
                optionStyle = isCorrectOpt
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-black shadow-sm'
                  : 'bg-rose-50 border-rose-500 text-rose-800 font-black shadow-sm';
              } else if (isCorrectOpt) {
                optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-black';
              } else {
                optionStyle = 'bg-slate-50/50 opacity-40 border-slate-200/50 text-slate-300';
              }
            }

            return (
              <button
                key={opt.key}
                disabled={showFeedback}
                onClick={() => handleOptionClick(opt.key)}
                className={`w-full p-5 rounded-2xl border-2 flex items-center text-left transition cursor-pointer ${optionStyle}`}
              >
                <span className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center font-mono text-sm font-black text-slate-500 shrink-0 mr-4">
                  {opt.key}
                </span>
                <div>
                  <span className="font-display font-black text-slate-800 text-base md:text-lg block uppercase tracking-wide">{opt.text}</span>
                  {opt.labelHy && (
                    <span className="text-xs md:text-sm text-slate-500 block mt-1 font-bold">
                      🇦🇲 {opt.labelHy}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback explanation alert */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
          >
            <div className={`p-6 rounded-2xl border-2 text-base ${
              isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <h4 className="font-display font-black text-lg md:text-xl uppercase mb-1.5">
                {isCorrect ? `✓ Գերազանց է: +1 միավոր ${activePlayerName}-ի համար:` : `✘ Սխալ է: Ճիշտ պատասխանն է՝ ${currentQuestion.correctKey}`}
              </h4>
              <p className="font-bold text-slate-700 leading-relaxed text-sm md:text-base">🇦🇲 {currentQuestion.explanationHy}</p>
            </div>

            <div className="text-right">
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-display font-bold uppercase tracking-wider text-xs md:text-sm transition-all shadow-md shadow-slate-800/10 group cursor-pointer"
              >
                {currentIndex < QUESTIONS.length - 1 ? (
                  <>
                    Հաջորդ հարցը ({activePlayerKey === 'gor' ? gayaneName : gorName}-ն է պատասխանում) <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                ) : (
                  <>
                    Տեսնել վերջնական արդյունքները! 🎉 <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
