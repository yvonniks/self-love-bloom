import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { quotes } from './quotes';

const TopDecorations = () => {
  const decorations = [
    { emoji: '💖', left: '5%', top: '5%', size: '1.2rem', delay: 0 },
    { emoji: '✨', left: '15%', top: '12%', size: '0.8rem', delay: 1 },
    { emoji: '💗', left: '25%', top: '8%', size: '1rem', delay: 2 },
    { emoji: '🌸', left: '35%', top: '15%', size: '1.1rem', delay: 0.5 },
    { emoji: '💕', left: '45%', top: '6%', size: '0.9rem', delay: 1.5 },
    { emoji: '✨', left: '55%', top: '10%', size: '1rem', delay: 2.5 },
    { emoji: '💖', left: '65%', top: '18%', size: '0.8rem', delay: 0.8 },
    { emoji: '💗', left: '75%', top: '10%', size: '1.2rem', delay: 1.2 },
    { emoji: '✨', left: '85%', top: '12%', size: '0.9rem', delay: 1.8 },
    { emoji: '🌸', left: '95%', top: '5%', size: '1.1rem', delay: 0.3 },
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-48 pointer-events-none overflow-hidden opacity-25">
      {decorations.map((dec, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, 8, 0], x: [0, 2, 0] }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            delay: dec.delay,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{ left: dec.left, top: dec.top, fontSize: dec.size }}
        >
          {dec.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const HeartIcon = ({ style, emoji, delay }) => (
  <motion.div
    initial={{ y: 0, opacity: 0, scale: 0.5 }}
    animate={{ y: -500, opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1.2, 1] }}
    transition={{ duration: 4, ease: "easeOut", delay: delay }}
    className="absolute pointer-events-none text-xl md:text-2xl"
    style={style}
  >
    {emoji}
  </motion.div>
);

function App() {
  const [quote, setQuote] = useState("Tap the button below for your affirmation ✨");
  const [hearts, setHearts] = useState([]);
  const [isInitial, setIsInitial] = useState(true);

  const getNewQuote = useCallback(() => {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === quote);

    setQuote(newQuote);
    setIsInitial(false);

    // Add floating hearts
    const heartEmojis = ['💖', '💗', '💓', '💝', '💕', '❤️'];
    const newHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}%`,
      bottom: '10%',
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      delay: Math.random() * 0.5,
    }));

    setHearts(prev => [...prev, ...newHearts]);

    // Clean up hearts after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.includes(h)));
    }, 4000);
  }, [quote]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-cream">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blush rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pastel-pink rounded-full blur-3xl opacity-50" />

      <TopDecorations />

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 text-2xl md:text-3xl opacity-70 pointer-events-none select-none">🌸</div>
      <div className="absolute top-8 right-8 text-2xl md:text-3xl opacity-70 pointer-events-none select-none">💕</div>
      <div className="absolute bottom-8 left-8 text-2xl md:text-3xl opacity-70 pointer-events-none select-none">✨</div>
      <div className="absolute bottom-8 right-8 text-2xl md:text-3xl opacity-70 pointer-events-none select-none">💗</div>

      {/* Floating Hearts Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map(heart => (
          <HeartIcon
            key={heart.id}
            emoji={heart.emoji}
            delay={heart.delay}
            style={{
              left: heart.left,
              bottom: heart.bottom
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <main className="z-10 w-full max-w-2xl flex flex-col items-center gap-6 md:gap-8 text-center mt-20 mb-8">
        {/* Header Section */}
        <header className="flex flex-col gap-1 md:gap-2 mb-2">
          <p className="text-soft-rose font-serif uppercase tracking-[0.3em] text-xs md:text-sm">
            Happy Valentine's Day
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#740505] leading-tight">
            Love Yourself First
          </h1>
          <p className="text-soft-rose font-body text-base md:text-lg lg:text-xl">
            A little reminder that you are worthy of your own love 💗
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/40 backdrop-blur-lg border border-white/40 p-8 md:p-12 rounded-[2rem] shadow-soft w-full"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={quote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="min-h-[150px] flex items-center justify-center"
            >
              <p className={`text-2xl md:text-3xl lg:text-4xl text-deep-rose leading-relaxed ${isInitial ? 'font-body italic' : 'font-serif'}`}>
                {quote}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={getNewQuote}
          className="group relative bg-deep-rose hover:opacity-90 text-white px-10 py-4 rounded-full text-xl font-serif shadow-button transition-all duration-500 flex items-center gap-2 overflow-hidden"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-white/10 transition-opacity duration-500"
          />
          Give me some love
          <Heart className="w-5 h-5 fill-current" />
        </motion.button>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-soft-rose font-body text-sm md:text-base text-center z-10 space-y-1">
        <p>Made with love, for you 🌹</p>
        <p className="text-xs opacity-80">By Yvonne So</p>
      </footer>
    </div>
  );
}

export default App;
