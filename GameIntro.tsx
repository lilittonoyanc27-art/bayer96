import React, { useState } from 'react';
import { Compass, Sparkles, User, Play, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface GameIntroProps {
  onStart: (gorName: string, gayaneName: string) => void;
}

export default function GameIntro({ onStart }: GameIntroProps) {
  const [gorName, setGorName] = useState('Գոռ');
  const [gayaneName, setGayaneName] = useState('Գայանե');

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-pink-500 rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden mb-8 text-white text-center"
      >
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/10 flex items-center justify-center"
        >
          <Compass className="w-32 h-32 text-white/5" />
        </motion.div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-4 text-white uppercase tracking-wider border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-pink-200" /> ¡Bienvenido a España!
        </span>

        <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-4 uppercase">
          Գոռի և Գայանեի արկածը!
        </h1>
        <p className="text-lg md:text-2xl text-indigo-50 font-sans max-w-xl mx-auto leading-relaxed font-medium">
          Բարի գալուստ իսպաներենի ինտերակտիվ դաս-խաղ: Սովորենք միասին 5 հետաքրքիր թեմատիկ երկխոսությունների միջոցով:
        </p>
      </motion.div>
 
       {/* Main Story & Motivation */}
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.2 }}
         className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-8 shadow-sm"
       >
         <h2 className="text-2xl font-display font-extrabold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-tight">
           🗺️ Դաս-խաղի սյուժեն
         </h2>
 
         <div className="space-y-4 text-slate-600 leading-relaxed font-sans text-base md:text-lg">
           <p className="text-slate-700 font-bold bg-slate-50 p-5 rounded-xl border border-slate-100">
             Մասնակցեք 5 տարբեր ճանապարհորդական թեմաներով երկխոսությունների և լրացրեք բաց թողնված բառերը: Սա կօգնի ձեզ հեշտությամբ հաղորդակցվել Իսպանիայում:
           </p>
           <p className="text-slate-700 font-medium text-base md:text-lg">
             🏆 Յուրաքանչյուր ճիշտ պատասխանի համար տրվում են միավորներ: Նա, ով կհավաքի ամենաշատ միավորները, կդառնա <span className="text-blue-600 font-bold">ընտանիքի Գլխավոր օգնականը</span> ճանապարհորդության ընթացքում:
           </p>
           <p className="text-slate-500 text-sm font-semibold">
             Յուրաքանչյուր ճիշտ լրացված երկխոսությունը ձեզ կբերի +2 միավոր:
           </p>
         </div>
       </motion.div>

      {/* Name Input Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm"
      >
        <h3 className="text-base font-display font-extrabold text-slate-800 mb-4 flex items-center gap-2 uppercase tracking-tight">
          👤 Մասնակիցների անունները
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Gor Name Input */}
          <div className="space-y-2">
            <label className="text-xs text-slate-500 flex items-center gap-1.5 uppercase font-bold">
              <span className="text-lg">👦</span> Աշակերտ 1
            </label>
            <div className="relative">
              <input
                type="text"
                value={gorName}
                onChange={(e) => setGorName(e.target.value)}
                placeholder="Գոռի անունը"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-medium transition"
              />
            </div>
          </div>

          {/* Gayane Name Input */}
          <div className="space-y-2">
            <label className="text-xs text-slate-500 flex items-center gap-1.5 uppercase font-bold">
              <span className="text-lg">👧</span> Աշակերտ 2
            </label>
            <div className="relative">
              <input
                type="text"
                value={gayaneName}
                onChange={(e) => setGayaneName(e.target.value)}
                placeholder="Գայանեի անունը"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-pink-500 focus:bg-white font-medium transition"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <button
          onClick={() => onStart(gorName, gayaneName)}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:to-pink-600 text-white font-display font-black text-lg transition shadow-lg shadow-blue-500/10 group uppercase tracking-wider"
        >
          ¡Adelante! • Սկսել ճանապարհորդությունը <Play className="w-5 h-5 fill-white text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}
