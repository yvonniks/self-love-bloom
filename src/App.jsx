import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { quotes } from './quotes';

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
  const [quote, setQuote] = useState("A tiny generator for big self-love. Take a quote, keep the energy, and remember you’re the main character.");
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
      <main className="z-10 w-full max-w-2xl flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/40 backdrop-blur-lg border border-white/40 p-8 md:p-12 rounded-[2rem] shadow-xl w-full"
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={getNewQuote}
          className="group relative bg-soft-rose hover:bg-deep-rose text-white px-8 py-4 rounded-full text-xl font-serif shadow-lg transition-colors flex items-center gap-2 overflow-hidden"
        >
          <motion.span
            className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"
          />
          Give me some love
          <Heart className="w-5 h-5 fill-current" />
        </motion.button>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-soft-rose font-body text-sm md:text-base text-center z-10">
        <p>Don't forget to love yourself first.</p>
        <p>Built with love from Yvonne So, February 2026</p>
      </footer>
    </div>
  );
}

export default App;
