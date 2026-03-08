import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Heart,
  ChevronDown,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Quote,
  Sparkles,
  Music,
  Star,
  Send,
  MessageCircleHeart,
  Calendar,
  Clock,
  Infinity,
  Flame,
  X
} from 'lucide-react';

// --- SVG EMOJI COMPONENTS ---
const HeartEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ff6b9d"/>
  </svg>
);

const MoonEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#ffd93d" stroke="#ffc107" strokeWidth="1.5"/>
    <circle cx="16" cy="8" r="1" fill="#fff9c4"/>
  </svg>
);

const RibbonEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8L12 2Z" fill="#ff8fab" stroke="#ff6b9d" strokeWidth="1.5"/>
    <rect x="10" y="6" width="4" height="8" rx="1" fill="#ffb3c6"/>
  </svg>
);

const FlowerEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" fill="#ffd93d"/>
    <circle cx="12" cy="7" r="2.5" fill="#ffb3d9"/>
    <circle cx="17" cy="12" r="2.5" fill="#ffb3d9"/>
    <circle cx="12" cy="17" r="2.5" fill="#ffb3d9"/>
    <circle cx="7" cy="12" r="2.5" fill="#ffb3d9"/>
    <circle cx="15" cy="9" r="2.5" fill="#ffc9e8"/>
    <circle cx="15" cy="15" r="2.5" fill="#ffc9e8"/>
    <circle cx="9" cy="15" r="2.5" fill="#ffc9e8"/>
    <circle cx="9" cy="9" r="2.5" fill="#ffc9e8"/>
  </svg>
);

const SparkleEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="#ffd93d"/>
    <path d="M18 4L18.5 6.5L21 7L18.5 7.5L18 10L17.5 7.5L15 7L17.5 6.5L18 4Z" fill="#fff59d"/>
    <path d="M6 14L6.5 16.5L9 17L6.5 17.5L6 20L5.5 17.5L3 17L5.5 16.5L6 14Z" fill="#fff59d"/>
  </svg>
);

const ButterflyEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 8C6 6 4 7 4 9C4 11 6 12 8 10L8 8Z" fill="#a78bfa"/>
    <path d="M16 8C18 6 20 7 20 9C20 11 18 12 16 10L16 8Z" fill="#a78bfa"/>
    <path d="M8 16C6 18 4 17 4 15C4 13 6 12 8 14L8 16Z" fill="#c4b5fd"/>
    <path d="M16 16C18 18 20 17 20 15C20 13 18 12 16 14L16 16Z" fill="#c4b5fd"/>
    <rect x="11" y="8" width="2" height="8" rx="1" fill="#6b21a8"/>
  </svg>
);

const CakeEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="12" width="12" height="8" rx="1" fill="#ffb3c6"/>
    <rect x="6" y="16" width="12" height="4" fill="#ff8fab"/>
    <path d="M12 8L12 12" stroke="#ffd93d" strokeWidth="1.5"/>
    <circle cx="12" cy="7" r="1.5" fill="#ff6b9d"/>
  </svg>
);

const RainbowEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 18C4 11 8 6 12 6C16 6 20 11 20 18" stroke="#ff6b9d" strokeWidth="2" fill="none"/>
    <path d="M6 18C6 12 8.5 8.5 12 8.5C15.5 8.5 18 12 18 18" stroke="#ffd93d" strokeWidth="2" fill="none"/>
    <path d="M8 18C8 13 9.5 11 12 11C14.5 11 16 13 16 18" stroke="#a78bfa" strokeWidth="2" fill="none"/>
  </svg>
);

const HandshakeEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 12L10 10L14 14L16 12" stroke="#ffd93d" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <rect x="6" y="10" width="4" height="6" rx="1" fill="#ffb3c6"/>
    <rect x="14" y="10" width="4" height="6" rx="1" fill="#a78bfa"/>
  </svg>
);

const EarEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 4C9 4 7 6 7 9C7 12 8 14 10 15L10 18C10 19 11 20 12 20C13 20 14 19 14 18L14 15C16 14 17 12 17 9C17 6 15 4 12 4Z" fill="#ffd1b3" stroke="#ffb088" strokeWidth="1.5"/>
    <path d="M11 9C11 8 11.5 7 12 7C12.5 7 13 8 13 9C13 10 12.5 11 12 11C11.5 11 11 10 11 9Z" fill="#ffb088"/>
  </svg>
);

const SmileEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" fill="#ffd93d" stroke="#ffc107" strokeWidth="1.5"/>
    <circle cx="9" cy="10" r="1.5" fill="#6b21a8"/>
    <circle cx="15" cy="10" r="1.5" fill="#6b21a8"/>
    <path d="M8 14C8 14 10 16 12 16C14 16 16 14 16 14" stroke="#6b21a8" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ShieldEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4 6L4 12C4 16 8 20 12 22C16 20 20 16 20 12L20 6L12 2Z" fill="#a78bfa" stroke="#7c3aed" strokeWidth="1.5"/>
    <path d="M9 12L11 14L15 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SeedlingEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 20L12 12" stroke="#8b5e3c" strokeWidth="2"/>
    <path d="M12 12C12 8 14 6 16 6C16 9 14 11 12 12Z" fill="#86efac"/>
    <path d="M12 12C12 8 10 6 8 6C8 9 10 11 12 12Z" fill="#4ade80"/>
  </svg>
);

const InfinityEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 12C8 9 6 7 4 7C2 7 1 9 1 11C1 13 2 15 4 15C6 15 8 13 8 11C8 13 10 15 12 15C14 15 16 13 16 11C16 13 18 15 20 15C22 15 23 13 23 11C23 9 22 7 20 7C18 7 16 9 16 12" stroke="#ff6b9d" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

const BouquetEmoji = ({ size = 32, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="12" r="3" fill="#ffd93d"/>
    <circle cx="16" cy="7" r="2.5" fill="#ff8fab"/>
    <circle cx="21" cy="12" r="2.5" fill="#ffb3d9"/>
    <circle cx="16" cy="17" r="2.5" fill="#ffc9e8"/>
    <circle cx="11" cy="12" r="2.5" fill="#ffb3d9"/>
    <circle cx="13" cy="9" r="2" fill="#ff6b9d"/>
    <circle cx="19" cy="9" r="2" fill="#ff6b9d"/>
    <path d="M14 18L12 26L20 26L18 18" fill="#86efac" stroke="#4ade80" strokeWidth="1"/>
  </svg>
);

const LetterEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="6" width="18" height="12" rx="2" fill="#ffb3c6" stroke="#ff8fab" strokeWidth="1.5"/>
    <path d="M3 8L12 13L21 8" stroke="#ff6b9d" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="17" cy="10" r="1.5" fill="#ff6b9d"/>
  </svg>
);

const RocketEmoji = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L14 8L12 12L10 8L12 2Z" fill="#ff8fab"/>
    <rect x="10" y="8" width="4" height="8" rx="1" fill="#ffb3c6"/>
    <path d="M8 14L10 18L10 14L8 14Z" fill="#ffd93d"/>
    <path d="M16 14L14 18L14 14L16 14Z" fill="#ffd93d"/>
    <circle cx="12" cy="10" r="1.5" fill="#a78bfa"/>
  </svg>
);

// --- CUSTOM STYLES & ANIMATIONS ---
const globalStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-25px); }
  }
  @keyframes pulse-soft {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 1; }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1); }
    42% { transform: scale(1.3); }
    70% { transform: scale(1); }
  }
  @keyframes confetti-fall {
    0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes ripple {
    0% { transform: scale(0); opacity: 0.6; }
    100% { transform: scale(4); opacity: 0; }
  }
  @keyframes star-twinkle {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  @keyframes slide-up {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
  .animate-float-slow {
    animation: float-slow 7s ease-in-out infinite;
  }
  .animate-pulse-soft {
    animation: pulse-soft 2s ease-in-out infinite;
  }
  .animate-heartbeat {
    animation: heartBeat 1.5s ease-in-out infinite;
  }
  .animate-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  }
  .animate-star-twinkle {
    animation: star-twinkle 2s ease-in-out infinite;
  }
  .glass-panel {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 32px 0 rgba(136, 152, 206, 0.15);
  }
  .glass-panel-dark {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(136, 152, 206, 0.2);
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .text-gradient {
    background: linear-gradient(135deg, #a855f7, #ec4899, #f43f5e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hover-lift {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(136, 152, 206, 0.25);
  }
  .confetti-piece {
    position: fixed;
    top: -10px;
    animation: confetti-fall linear forwards;
    pointer-events: none;
    z-index: 9999;
  }
`;

// --- SCROLL REVEAL COMPONENT ---
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- PARALLAX STARS ---
const ParallaxStars = () => {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-pink-300/30 animate-star-twinkle"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// --- CONFETTI ---
const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; color: string; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    if (active) {
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: ['#ec4899', '#a855f7', '#3b82f6', '#f59e0b', '#10b981', '#f43f5e'][Math.floor(Math.random() * 6)],
        size: Math.random() * 8 + 4,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 1,
      }));
      setPieces(newPieces);
      const timer = setTimeout(() => setPieces([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </>
  );
};

// --- LOVE COUNTER ---
const LoveCounter = () => {
  const [elapsed, setElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startDate = new Date('2025-11-22T00:00:00');
    const update = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      if (diff < 0) {
        setElapsed({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setElapsed({ days, hours, minutes, seconds });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = [
    { label: 'Days', value: elapsed.days, icon: <Calendar size={16} /> },
    { label: 'Hours', value: elapsed.hours, icon: <Clock size={16} /> },
    { label: 'Minutes', value: elapsed.minutes, icon: <Flame size={16} /> },
    { label: 'Seconds', value: elapsed.seconds, icon: <Heart size={16} /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {blocks.map((block, idx) => (
        <Reveal key={block.label} delay={idx * 100}>
          <div className="glass-panel p-6 rounded-3xl text-center hover-lift cursor-default group">
            <div className="flex items-center justify-center gap-1 text-pink-400 mb-2 group-hover:text-pink-500 transition-colors">
              {block.icon}
            </div>
            <div className="text-4xl md:text-5xl font-black text-gradient mb-1 tabular-nums">
              {String(block.value).padStart(block.label === 'Days' ? 1 : 2, '0')}
            </div>
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 group-hover:text-slate-600 transition-colors">
              {block.label}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
};

// --- REASONS I LOVE YOU ---
const reasons = [
  { emoji: <HeartEmoji size={48} />, text: "Senyum kamu tuh beneran bikin hari aku langsung cerah." },
  { emoji: <MoonEmoji size={48} />, text: "Kamu selalu jadi orang pertama yg pengen aku ceritain semuanya." },
  { emoji: <RibbonEmoji size={48} />, text: "Cara kamu ketawa tuh lucu banget sampe aku ikut ketawa." },
  { emoji: <FlowerEmoji size={48} />, text: "Kamu ngertiin aku tanpa harus aku jelasin panjang lebar." },
  { emoji: <SparkleEmoji size={48} />, text: "Vibe kamu tuh wholesome banget, bikin aku tenang." },
  { emoji: <ButterflyEmoji size={48} />, text: "Kamu bikin aku pengen jadi versi terbaik dari diriku." },
  { emoji: <CakeEmoji size={48} />, text: "Tiap momen sama kamu tuh semanis cupcake." },
  { emoji: <RainbowEmoji size={48} />, text: "Kamu warnain hari-hari aku yg tadinya abu-abu." },
];

const ReasonsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reasons.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <div className="relative">
      <div
        className="glass-panel rounded-3xl p-8 md:p-10 min-h-[200px] flex flex-col items-center justify-center text-center cursor-pointer hover-lift"
        onClick={() => {
          setIsAutoPlay(false);
          setCurrentIndex((prev) => (prev + 1) % reasons.length);
          setTimeout(() => setIsAutoPlay(true), 8000);
        }}
      >
        <div className="mb-4 transition-all duration-500 transform hover:scale-110" key={currentIndex}>
          {reasons[currentIndex].emoji}
        </div>
        <p className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed max-w-lg transition-all duration-500" key={`t-${currentIndex}`}>
          "{reasons[currentIndex].text}"
        </p>
        <div className="flex gap-2 mt-6">
          {reasons.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
                setIsAutoPlay(false);
                setTimeout(() => setIsAutoPlay(true), 8000);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'bg-pink-500 w-6' : 'bg-pink-200 hover:bg-pink-300'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-center text-sm text-slate-400 mt-3 flex items-center justify-center gap-2">
        Tap untuk lihat alasan lainnya <HeartEmoji size={16} />
      </p>
    </div>
  );
};

// --- LOVE LETTER MODAL ---
const LoveLetterModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="relative glass-panel rounded-[2rem] p-8 md:p-10 max-w-lg w-full max-h-[80vh] overflow-y-auto hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slide-up 0.5s ease-out' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/60 hover:bg-white text-slate-500 hover:text-slate-700 transition-all"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 mb-4 shadow-lg">
            <MessageCircleHeart size={28} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
            Secret Love Letter <LetterEmoji size={28} />
          </h3>
        </div>

        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p className="italic">Dear aqilaaaa sayangku,</p>
          <p>
            Aku gatau harus mulai dari mana, tapi yang pasti setiap hari aku bersyukur banget bisa punya kamu di hidup aku. Kamu tuh spesial banget, tau gak?
          </p>
          <p>
            Dari pertama kali ketemu di SMP, aku udah ngerasa ada sesuatu yang beda. Dan sekarang, akhirnya kita bisa bareng, aku ngerasa ini tuh kayak mimpi yang jadi kenyataan.
          </p>
          <p>
            Aku janji bakal selalu usaha jadi yang terbaik buat kamu. Bakal selalu dengerin cerita kamu, bakal selalu ada pas kamu butuh, dan bakal selalu sayang sama kamu, no matter what.
          </p>
          <p>
            Kamu tuh bukan cuma pacar aku, tapi kamu juga best friend aku, support system aku, dan alasan aku senyum setiap hari.
          </p>
          <p className="font-semibold text-pink-600 flex items-center gap-2">
            I love you to the moon and back, sayang. Forever and always. <MoonEmoji size={20} /> <HeartEmoji size={20} />
          </p>
          <p className="text-right italic mt-6">
            Love,<br />
            <span className="font-bold flex items-center justify-end gap-2">
              Putramu yang mwah mwah <SparkleEmoji size={20} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- COMPATIBILITY METER ---
const CompatibilityMeter = () => {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), 500);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const traits = [
    { label: "Chemistry", value: 98 },
    { label: "Humor Match", value: 95 },
    { label: "Vibe Sync", value: 100 },
    { label: "Cuteness Overload", value: 97 },
    { label: "Forever Potential", value: 100 },
  ];

  return (
    <div ref={ref} className="glass-panel rounded-3xl p-8 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <Flame size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Compatibility Score</h3>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            ENTP × ENFP = <Flame size={14} className="text-orange-400" />
          </p>
        </div>
      </div>
      {traits.map((trait, idx) => (
        <div key={trait.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-600">{trait.label}</span>
            <span className="font-bold text-pink-500">{animated ? trait.value : 0}%</span>
          </div>
          <div className="w-full h-3 bg-white/40 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 transition-all duration-[2000ms] ease-out"
              style={{
                width: animated ? `${trait.value}%` : '0%',
                transitionDelay: `${idx * 200}ms`,
              }}
            />
          </div>
        </div>
      ))}
      <div className="text-center pt-4">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-pink-600 font-bold text-sm">
          <Infinity size={16} />
          Soulmate Level: INFINITE
        </span>
      </div>
    </div>
  );
};

// --- MINI MUSIC PLAYER COMPONENT ---
const MusicPlayer = ({ title, artist, coverUrl }: { title: string; artist: string; coverUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="glass-panel p-4 rounded-3xl flex items-center space-x-4 hover:bg-white/50 transition-colors duration-300 hover-lift">
      <div className="relative w-16 h-16 flex-shrink-0">
        <img
          src={coverUrl}
          alt={title}
          className={`w-full h-full object-cover rounded-full shadow-md transition-all duration-700 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}
        />
        <div className="absolute inset-0 rounded-full border border-white/40"></div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-slate-800 font-semibold truncate">{title}</h4>
        <p className="text-slate-500 text-sm truncate">{artist}</p>
        <div className="w-full h-1 bg-white/50 rounded-full mt-2 overflow-hidden">
          <div className={`h-full bg-pink-400 rounded-full ${isPlaying ? 'w-2/3 transition-all duration-[10000ms] ease-linear' : 'w-1/3'}`}></div>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-slate-600">
        <button className="hover:text-pink-500 transition-colors hidden sm:block">
          <SkipBack size={18} />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 flex items-center justify-center bg-white/60 rounded-full hover:bg-white hover:text-pink-500 shadow-sm transition-all"
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
        <button className="hover:text-pink-500 transition-colors hidden sm:block">
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
};

// --- PROMISE CARDS ---
const promises = [
  { icon: <HandshakeEmoji size={32} />, title: "Always Be There", text: "Kapanpun kamu butuh, aku bakal selalu ada." },
  { icon: <EarEmoji size={32} />, title: "Listen to You", text: "Cerita apapun, aku bakal selalu dengerin." },
  { icon: <SmileEmoji size={32} />, title: "Make You Smile", text: "Setiap hari aku usahain bikin kamu senyum." },
  { icon: <ShieldEmoji size={32} />, title: "Protect Your Heart", text: "Hati kamu bakal selalu aku jaga baik-baik." },
  { icon: <SeedlingEmoji size={32} />, title: "Grow Together", text: "Kita bakal berkembang bareng jadi versi terbaik." },
  { icon: <InfinityEmoji size={32} />, title: "Love You Forever", text: "Sayang aku ke kamu itu gak ada expirednya." },
];

// --- MAIN APP COMPONENT ---
export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleHeartClick = useCallback((e: React.MouseEvent) => {
    setHeartCount((prev) => prev + 1);
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);

    if ((heartCount + 1) % 10 === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
    }
  }, [heartCount]);

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden bg-[#fbf8fc] text-slate-800 selection:bg-pink-200 selection:text-pink-900">
      <style>{globalStyles}</style>

      <Confetti active={showConfetti} />
      <LoveLetterModal isOpen={showLetter} onClose={() => setShowLetter(false)} />
      <ParallaxStars />

      {/* Floating hearts from clicks */}
      {floatingHearts.map((h) => (
        <div
          key={h.id}
          className="fixed pointer-events-none z-50"
          style={{
            left: h.x - 10,
            top: h.y - 10,
            animation: 'float 1.5s ease-out forwards',
            opacity: 0.8,
          }}
        >
          <Heart size={20} fill="#ff6b9d" className="text-pink-500" />
        </div>
      ))}

      {/* --- AESTHETIC BACKGROUND BLOB ELEMENTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f3e7e9] via-[#e3eeff] to-[#fce4ec] opacity-60"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/40 rounded-full blur-[100px] animate-float-slow"></div>
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-pink-200/40 rounded-full blur-[80px] animate-float"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] bg-blue-200/40 rounded-full blur-[100px] animate-float-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[50%] right-[10%] w-[25%] h-[25%] bg-rose-200/30 rounded-full blur-[90px] animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10">

        {/* 1. HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
          <Reveal className="text-center max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel mb-6 animate-float text-sm text-pink-600 font-medium">
              <Sparkles size={16} />
              <span>Welcome to our little space</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 mb-6 drop-shadow-sm">
              Our Universe
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto mb-8">
              "Dari jaman SMP sampe sekarang, cuma kamu yang selalu ada di pikiranku."
            </p>

            {/* Interactive Heart Button */}
            <button
              onClick={handleHeartClick}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Heart size={20} className="group-hover:animate-heartbeat" fill="currentColor" />
              <span>Kirim Love ({heartCount})</span>
              <Sparkles size={16} className="opacity-70" />
            </button>
          </Reveal>

          <div className="absolute bottom-12 flex flex-col items-center animate-bounce text-slate-400">
            <span className="text-sm font-medium mb-2 tracking-widest uppercase">Scroll ke bawah ya sayang</span>
            <ChevronDown size={28} className="text-pink-400" />
          </div>
        </section>

        {/* 2. LOVE COUNTER */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
                Berapa Lama Kita? <HeartEmoji size={40} />
              </h2>
              <p className="text-slate-500 text-lg">Sejak 22 November 2025</p>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-300 to-pink-300 mx-auto rounded-full mt-4"></div>
            </div>
          </Reveal>
          <LoveCounter />
        </section>

        {/* 3. THE DUO (PROFILE CARDS) */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">The Duo</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-300 to-pink-300 mx-auto rounded-full"></div>
            </div>
          </Reveal>

          <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-24">
            {/* Heart Center */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 glass-panel rounded-full items-center justify-center animate-pulse-soft shadow-[0_0_30px_rgba(236,72,153,0.3)] border-pink-200">
              <Heart size={32} className="text-pink-500 fill-pink-500" />
            </div>

            {/* Boy Card */}
            <Reveal delay={100} className="w-full md:w-[400px]">
              <div className="glass-panel p-8 rounded-[2.5rem] flex flex-col items-center text-center hover-lift group">
                <div className="w-40 h-40 rounded-full p-2 bg-gradient-to-tr from-blue-300 to-purple-300 mb-6 shadow-xl">
                  <img
                    src="https://i.postimg.cc/pdByvndS/40a4580b822e6c835216f79b50b9e452.jpg"
                    alt="Putra"
                    className="w-full h-full object-cover rounded-full border-4 border-white"
                  />
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">putraaa</h3>
                <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                  The Debater
                </span>
                <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 glass-panel rounded-full text-xs font-medium text-slate-500">♒ Aquarius</span>
                  <span className="px-3 py-1 glass-panel rounded-full text-xs font-medium text-slate-500">ENTP</span>
                </div>
                <p className="text-slate-600 leading-relaxed italic relative">
                  <Quote className="absolute -top-3 -left-2 text-blue-200/50 rotate-180" size={32} />
                  "Si ENTP yang selalu punya sejuta ide di kepalanya, tapi ide terbaiknya ya cuma buat bikin kamu seneng."
                </p>
              </div>
            </Reveal>

            {/* Mobile Heart */}
            <div className="flex md:hidden w-16 h-16 glass-panel rounded-full items-center justify-center animate-pulse-soft shadow-[0_0_20px_rgba(236,72,153,0.3)] border-pink-200 z-20 -my-4 relative">
              <Heart size={28} className="text-pink-500 fill-pink-500" />
            </div>

            {/* Girl Card */}
            <Reveal delay={300} className="w-full md:w-[400px]">
              <div className="glass-panel p-8 rounded-[2.5rem] flex flex-col items-center text-center hover-lift group">
                <div className="w-40 h-40 rounded-full p-2 bg-gradient-to-tr from-pink-300 to-rose-300 mb-6 shadow-xl">
                  <img
                    src="https://i.postimg.cc/vBqBgFf7/0e19c4cf5a856980f4b148b9b4ba9d49-0.jpg"
                    alt="Aqila"
                    className="w-full h-full object-cover rounded-full border-4 border-white"
                  />
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">aqilaaaa sayangkuuuuu</h3>
                <span className="px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
                  The Campaigner
                </span>
                <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 glass-panel rounded-full text-xs font-medium text-slate-500">♈ Aries</span>
                  <span className="px-3 py-1 glass-panel rounded-full text-xs font-medium text-slate-500">ENFP</span>
                </div>
                <p className="text-slate-600 leading-relaxed italic relative">
                  <Quote className="absolute -top-3 -left-2 text-pink-200/50 rotate-180" size={32} />
                  "Si Aries yang selalu penuh energi dan semangat. Senyum kamu tuh beneran candu banget buat aku."
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 4. COMPATIBILITY METER + REASONS */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
                Why Us? <SparkleEmoji size={40} />
              </h2>
              <p className="text-slate-500 text-lg">Karena kita emang match banget</p>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-300 to-pink-300 mx-auto rounded-full mt-4"></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Reveal delay={100}>
              <CompatibilityMeter />
            </Reveal>
            <Reveal delay={200}>
              <div>
                <div className="flex items-center gap-2 mb-4 text-pink-500 font-semibold px-2">
                  <Star size={20} />
                  <span>Reasons I Love You</span>
                </div>
                <ReasonsCarousel />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 5. OUR JOURNEY */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Journey</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-300 to-pink-300 mx-auto rounded-full"></div>
            </div>
          </Reveal>

          <div className="relative border-l-2 border-pink-200/60 ml-4 md:ml-8 pl-8 space-y-16">
            <Reveal delay={100} className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full border-4 border-white shadow-sm"></div>
              <div className="glass-panel p-6 rounded-2xl hover:bg-white/50 transition-colors hover-lift">
                <span className="text-sm font-bold tracking-wider text-pink-500 uppercase mb-1 block">Awal Masuk SMP</span>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  First Met <SparkleEmoji size={24} />
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  "Awal cerita kita dimulai di sini. Gak nyangka dari jaman SMP bisa sampai sejauh ini."
                </p>
              </div>
            </Reveal>

            <Reveal delay={200} className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full border-4 border-white shadow-sm"></div>
              <div className="glass-panel p-6 rounded-2xl hover:bg-white/50 transition-colors hover-lift">
                <span className="text-sm font-bold tracking-wider text-purple-500 uppercase mb-1 block">Momen Lucu</span>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  Buket Bunga Buat Ayang <BouquetEmoji size={28} />
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  "Momen paling lucu dan berkesan buat aku tuh pas ngasih kamu buket bunga. Liat ekspresi kamu tuh sesuatu banget hehe."
                </p>
              </div>
            </Reveal>

            <Reveal delay={300} className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full border-4 border-white shadow-[0_0_15px_rgba(244,63,94,0.5)]"></div>
              <div className="glass-panel p-6 rounded-2xl border-pink-200 bg-white/50 hover:bg-white/70 transition-colors hover-lift">
                <span className="text-sm font-bold tracking-wider text-rose-500 uppercase mb-1 block">22 November 2025</span>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  Official Day! <HeartEmoji size={24} />
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  "Hari di mana akhirnya kita beneran jadian. Tanggal yang bakal selalu aku inget."
                </p>
              </div>
            </Reveal>

            <Reveal delay={400} className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full border-4 border-white shadow-sm animate-pulse-soft"></div>
              <div className="glass-panel p-6 rounded-2xl hover:bg-white/50 transition-colors hover-lift">
                <span className="text-sm font-bold tracking-wider text-amber-500 uppercase mb-1 block">The Future</span>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  To Infinity & Beyond <RocketEmoji size={24} />
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  "Masih banyak cerita yang belum kita tulis bareng. Dan aku gak sabar buat ngejalanin semuanya sama kamu."
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. MY PROMISES */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
                My Promises <HandshakeEmoji size={40} />
              </h2>
              <p className="text-slate-500 text-lg">Janji-janji aku buat kamu</p>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-300 to-pink-300 mx-auto rounded-full mt-4"></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promises.map((promise, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="glass-panel p-6 rounded-3xl hover-lift group cursor-default">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{promise.icon}</div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{promise.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{promise.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 7. OUR PLAYLIST & LOVE NOTE */}
        <section className="py-24 px-6 max-w-6xl mx-auto mb-12">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Playlist & Love Note</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-300 to-pink-300 mx-auto rounded-full mb-4"></div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Music Players */}
            <div className="lg:col-span-2 space-y-6">
              <Reveal delay={100}>
                <div className="flex items-center gap-2 mb-4 text-pink-500 font-semibold px-2">
                  <Music size={20} />
                  <span>Laguku</span>
                </div>
                <MusicPlayer
                  title="Marry You"
                  artist="Bruno Mars"
                  coverUrl="https://i.postimg.cc/NM3078Cd/85fe1843181c00f213f520d915b9ae5c.jpg"
                />
              </Reveal>

              <Reveal delay={200}>
                <div className="flex items-center gap-2 mb-4 text-purple-500 font-semibold px-2 mt-8">
                  <Music size={20} />
                  <span>Vibe Dia</span>
                </div>
                <MusicPlayer
                  title="Lana Del Rey Vibes"
                  artist="Lana Del Rey"
                  coverUrl="https://i.postimg.cc/Vs2tDn0p/a3630ef14a6c49db209505d66e01fe8f.jpg"
                />
              </Reveal>

              {/* Secret Letter Button */}
              <Reveal delay={300}>
                <button
                  onClick={() => {
                    setShowLetter(true);
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 100);
                  }}
                  className="w-full mt-6 glass-panel p-5 rounded-3xl flex items-center gap-4 hover:bg-white/50 transition-all hover-lift group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center flex-shrink-0 group-hover:animate-heartbeat shadow-lg">
                    <MessageCircleHeart size={22} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      Secret Love Letter <LetterEmoji size={20} />
                    </h4>
                    <p className="text-sm text-slate-500">Tap untuk buka surat rahasia...</p>
                  </div>
                </button>
              </Reveal>
            </div>

            {/* Love Note */}
            <Reveal delay={300} className="lg:col-span-3 h-full">
              <div className="glass-panel h-full p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 text-pink-100/40 transform rotate-12 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110">
                  <Heart size={200} fill="currentColor" />
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <Quote className="text-pink-300 mb-6" size={40} />

                  <div className="space-y-6 text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                    <p>
                      "halo aqilaaa sayangkuuu, ini aku buatin spesial buat kamu. gatau mau ngetik apaan panjang-panjang, tapi intinya aku sayang bgt sama dia, ralat, aku sayang banget sama KAMU."
                    </p>
                    <p>
                      "dari jaman smp sampe sekarang akhirnya kita bisa barengan. jangan capek-capek ya sama aku. MWAH MWAH MWAH MWAH pokonya gituuu."
                    </p>
                  </div>

                  <div className="mt-10 flex items-center gap-4 border-t border-pink-200/50 pt-6">
                    <img
                      src="https://i.postimg.cc/pdByvndS/40a4580b822e6c835216f79b50b9e452.jpg"
                      alt="Putra"
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Pengirim:</p>
                      <p className="font-bold text-slate-800 tracking-wide text-sm md:text-base">putraaa (cowokmu yg mwah mwah)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 8. FOOTER */}
        <footer className="py-10 border-t border-white/40 glass-panel rounded-t-[3rem] mt-auto">
          <div className="text-center px-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart size={20} className="text-pink-500 fill-pink-500 animate-heartbeat" />
              <Infinity size={20} className="text-purple-400" />
              <Heart size={20} className="text-pink-500 fill-pink-500 animate-heartbeat" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-slate-600 flex items-center justify-center gap-2 mb-2 font-medium">
              Built with <Heart size={16} className="text-pink-500 fill-pink-500 animate-pulse-soft" /> just for aqilaaaa.
            </p>
            <p className="text-sm text-slate-500 font-semibold tracking-wider">
              © 22 November 2025 - Forever & Beyond
            </p>
            <p className="text-xs text-slate-400 mt-2 flex items-center justify-center gap-1">
              Total love sent: {heartCount} <HeartEmoji size={14} />
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
