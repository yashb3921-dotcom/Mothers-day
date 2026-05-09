import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Stars, Sparkles, Sun, Coffee, BookHeart, Shield, Music, Pause, Copy, CheckCircle2, ChevronRight } from 'lucide-react';

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

    body {
      margin: 0;
      font-family: 'Outfit', sans-serif;
      overflow-x: hidden;
      background-color: #0f0c29;
      color: #fff;
      touch-action: manipulation; /* Prevents double-tap zoom on mobile */
      min-height: 100dvh;
    }

    .font-display {
      font-family: 'Playfair Display', serif;
    }

    /* Mesh Gradient Background */
    .bg-mesh {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      background: radial-gradient(circle at 15% 50%, rgba(229, 46, 113, 0.15), transparent 50%),
                  radial-gradient(circle at 85% 30%, rgba(255, 138, 0, 0.15), transparent 50%),
                  radial-gradient(circle at 50% 80%, rgba(138, 43, 226, 0.15), transparent 50%);
      background-color: #0f0c29;
      animation: shift 20s ease-in-out infinite alternate;
    }

    @keyframes shift {
      0% { transform: scale(1); }
      50% { transform: scale(1.1) translate(2%, 2%); }
      100% { transform: scale(1) translate(-2%, -2%); }
    }

    /* Glassmorphism Panel */
    .glass-panel {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    }

    /* Heart Intro Animation */
    .crystal-heart {
      filter: drop-shadow(0 0 20px rgba(229, 46, 113, 0.5));
      animation: float 3s ease-in-out infinite, pulse 2s ease-in-out infinite alternate;
      cursor: pointer;
      transition: all 0.3s ease;
      touch-action: manipulation;
    }
    
    .crystal-heart:hover {
      filter: drop-shadow(0 0 40px rgba(229, 46, 113, 0.8));
      transform: scale(1.05);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-15px) scale(1.02); }
    }

    @keyframes pulse {
      0% { filter: drop-shadow(0 0 15px rgba(229, 46, 113, 0.4)); }
      100% { filter: drop-shadow(0 0 35px rgba(229, 46, 113, 0.8)); }
    }

    .shatter {
      animation: shatterAnim 0.8s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes shatterAnim {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5) rotate(15deg); opacity: 0.8; filter: brightness(2); }
      100% { transform: scale(0) rotate(-15deg); opacity: 0; }
    }

    /* Floating Particles */
    .particle {
      position: fixed;
      pointer-events: none;
      z-index: 50;
      animation: floatUp 2.5s ease-out forwards;
      will-change: transform, opacity;
    }

    @keyframes floatUp {
      0% { transform: translateY(0) scale(0.5); opacity: 1; }
      100% { transform: translateY(-120px) scale(1.5) rotate(45deg); opacity: 0; }
    }

    /* Transitions */
    .fade-enter {
      animation: fadeIn 1s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* 3D Flip Cards */
    .flip-card-container {
      perspective: 1000px;
      touch-action: pan-y; /* Allow scrolling over cards on mobile */
    }

    .flip-card {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
      transform-style: preserve-3d;
    }

    .flip-card-container:hover .flip-card,
    .flip-card-container:active .flip-card {
      transform: rotateY(180deg);
    }

    .flip-card-front, .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .flip-card-front {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .flip-card-back {
      transform: rotateY(180deg);
      background: linear-gradient(135deg, rgba(229, 46, 113, 0.15), rgba(138, 43, 226, 0.15));
      border: 1px solid rgba(229, 46, 113, 0.3);
    }

    /* Customizing Typewriter cursor */
    .cursor::after {
      content: '|';
      animation: blink 1s step-start infinite;
    }
    @keyframes blink { 50% { opacity: 0; } }
  `}} />
);

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isShattering, setIsShattering] = useState(false);
  const [particles, setParticles] = useState([]);
  
  // Customization State
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  
  // Content State
  const [recipient, setRecipient] = useState("Mom");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("Thank you for being the guiding light in my life. Your love, strength, and endless patience mean everything to me. Today is all about you!");
  
  // Custom Input State
  const [customTo, setCustomTo] = useState("");
  const [customFrom, setCustomFrom] = useState("");
  const [customMsg, setCustomMsg] = useState("");

  // Typewriter State
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageRef = useRef(message);

  useEffect(() => {
    // Read parameters from URL to make it shareable without a DB
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    const from = params.get('from');
    const msg = params.get('msg');

    if (to) { setRecipient(to); setCustomTo(to); }
    if (from) { setSender(from); setCustomFrom(from); }
    if (msg) { 
      setMessage(msg); 
      setCustomMsg(msg); 
      messageRef.current = msg;
    } else {
      setCustomMsg(message);
    }
    
    // Set base URL for sharing
    setShareUrl(window.location.origin + window.location.pathname);
  }, []);

  useEffect(() => {
    if (isOpened && !isTyping && displayedMessage.length < messageRef.current.length) {
      setIsTyping(true);
      let i = 0;
      const timer = setInterval(() => {
        setDisplayedMessage(messageRef.current.substring(0, i + 1));
        i++;
        if (i === messageRef.current.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 50); // Speed of typing
      return () => clearInterval(timer);
    }
  }, [isOpened, displayedMessage.length, isTyping]);

  const createParticle = useCallback((x, y) => {
    const id = Date.now() + Math.random();
    const isHeart = Math.random() > 0.5;
    const color = isHeart ? 'text-pink-400' : 'text-purple-400';
    
    setParticles(prev => [...prev, { id, x, y, isHeart, color }]);
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 2500);
  }, []);

  // Spawn particles on click, but not on buttons or inputs to avoid annoying users
  const handleScreenClick = useCallback((e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    createParticle(e.clientX, e.clientY);
  }, [createParticle]);

  const handleShatter = () => {
    setIsShattering(true);
    // Big explosion of particles from center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    for(let i=0; i<15; i++) {
      setTimeout(() => {
        createParticle(
          centerX + (Math.random() - 0.5) * 200, 
          centerY + (Math.random() - 0.5) * 200
        );
      }, i * 50);
    }
    
    setTimeout(() => {
      setIsOpened(true);
    }, 800);
  };

  const generateLink = () => {
    const params = new URLSearchParams();
    if (customTo) params.set('to', customTo);
    if (customFrom) params.set('from', customFrom);
    if (customMsg) params.set('msg', customMsg);
    
    const newUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    setShareUrl(newUrl);
    
    // Update current view immediately
    setRecipient(customTo || "Mom");
    setSender(customFrom);
    setMessage(customMsg || messageRef.current);
    messageRef.current = customMsg || messageRef.current;
    
    // Reset typing effect
    setDisplayedMessage("");
    setIsTyping(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { icon: <Sun className="w-8 h-8 text-yellow-400" />, title: "Your Warmth", desc: "You bring light and comfort to every single day." },
    { icon: <Shield className="w-8 h-8 text-blue-400" />, title: "Your Strength", desc: "The fiercest protector and our biggest supporter." },
    { icon: <BookHeart className="w-8 h-8 text-emerald-400" />, title: "Your Wisdom", desc: "Always knowing the right thing to say." },
    { icon: <Coffee className="w-8 h-8 text-amber-500" />, title: "Your Comfort", desc: "Making every house feel truly like a home." }
  ];

  return (
    <div 
      className="relative min-h-[100dvh] w-full overflow-hidden font-sans"
      onClick={handleScreenClick}
    >
      <GlobalStyles />
      <div className="bg-mesh"></div>

      {/* Interactive Particles Layer */}
      {particles.map(p => (
        <div 
          key={p.id} 
          className={`particle ${p.color}`}
          style={{ left: p.x - 12, top: p.y - 12 }}
        >
          {p.isHeart ? <Heart className="fill-current w-6 h-6" /> : <Stars className="fill-current w-6 h-6" />}
        </div>
      ))}

      {!isOpened ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-12 font-bold tracking-wider opacity-90">
            For {recipient}
          </h1>
          
          <div 
            className={`relative flex items-center justify-center p-12 ${isShattering ? 'shatter' : 'crystal-heart'}`}
            onClick={handleShatter}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-purple-500 blur-2xl opacity-40 rounded-full"></div>
            <Heart className="w-32 h-32 md:w-40 md:h-40 text-pink-300 drop-shadow-2xl z-10" fill="currentColor" strokeWidth={1} />
            <Sparkles className="absolute top-8 right-8 w-8 h-8 text-yellow-300 animate-pulse z-20" />
            <Sparkles className="absolute bottom-8 left-8 w-6 h-6 text-white animate-pulse z-20" />
          </div>
          
          <p className="mt-12 text-pink-200 text-lg md:text-xl font-light tracking-widest uppercase animate-pulse">
            Tap to open
          </p>
        </div>
      ) : (
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center fade-enter">
          
          { }
          <div className="glass-panel rounded-3xl p-8 md:p-12 w-full text-center relative overflow-hidden mb-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-50"></div>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300 mb-8">
              Happy Mother's Day, {recipient}!
            </h1>
            
            <div className="text-xl md:text-2xl text-pink-50 leading-relaxed font-light max-w-2xl mx-auto min-h-[100px]">
              "<span className="cursor">{displayedMessage}</span>"
            </div>
            
            {sender && (
              <p className="mt-8 text-right text-lg md:text-xl text-purple-200 font-display italic">
                With all my love,<br/>
                <span className="font-bold text-2xl text-pink-300">{sender}</span>
              </p>
            )}
          </div>

          { }
          <div className="w-full mb-16">
            <h2 className="text-center text-2xl text-white font-light tracking-widest uppercase mb-8 opacity-80">
              Why you're the best
            </h2>
            {/* Note the explicit height (h-56/h-64) to prevent mobile layout collapse */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {features.map((item, idx) => (
                <div key={idx} className="flip-card-container h-56 md:h-64 w-full">
                  <div className="flip-card">
                    <div className="flip-card-front">
                      <div className="bg-white/5 p-4 rounded-full mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white/90">{item.title}</h3>
                      <p className="text-sm text-white/50 mt-2">Tap to flip</p>
                    </div>
                    <div className="flip-card-back">
                      <p className="text-lg text-center text-white/90 font-medium px-4">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          { }
          <button 
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="group glass-panel rounded-full px-8 py-4 flex items-center gap-3 hover:bg-white/10 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 text-pink-300 group-hover:animate-spin" />
            <span className="font-semibold tracking-wide">Create Your Own Greeting</span>
          </button>

          {isCustomizing && (
            <div className="mt-8 glass-panel rounded-2xl p-6 md:p-8 w-full max-w-lg fade-enter">
              <h3 className="text-2xl font-display mb-6 text-center text-pink-200">Personalize Your Link</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Mom's Name (or Nickname)</label>
                  {/* Using text-base prevents iOS Safari Auto-zoom */}
                  <input 
                    type="text" 
                    value={customTo} 
                    onChange={e => setCustomTo(e.target.value)}
                    placeholder="e.g. Mum, Mommy, Sarah"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    value={customFrom} 
                    onChange={e => setCustomFrom(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-pink-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Custom Message</label>
                  <textarea 
                    value={customMsg} 
                    onChange={e => setCustomMsg(e.target.value)}
                    rows={3}
                    placeholder="Write a heartfelt message..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-pink-500 transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  onClick={generateLink}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg mt-4 flex justify-center items-center gap-2"
                >
                  Generate Share Link <ChevronRight className="w-5 h-5" />
                </button>

                {shareUrl && (
                  <div className="mt-6 p-4 bg-black/30 rounded-xl border border-white/5">
                    <p className="text-xs text-white/50 mb-2 uppercase tracking-wider">Your unique link:</p>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={shareUrl}
                        className="flex-1 bg-transparent border-none text-sm text-pink-200 outline-none truncate"
                      />
                      <button 
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-white/70" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
}

/* 
=============================================================================================
                                 🚀 VERCEL DEPLOYMENT FILES & GUIDE
=============================================================================================
To deploy this project to Vercel via GitHub, you need a standard Vite project structure. 
You can either use a terminal to generate this (Option 1) or manually create the files 
in your GitHub repository (Option 2).

---------------------------------------------------------------------------------------------
OPTION 1: THE FAST WAY (Using Terminal)
---------------------------------------------------------------------------------------------
1. Open your terminal and run: npm create vite@latest mothers-day -- --template react
2. Enter the new folder: cd mothers-day
3. Install base dependencies: npm install
4. Install Tailwind & Icons: npm install -D tailwindcss postcss autoprefixer && npm install lucide-react
5. Initialize Tailwind: npx tailwindcss init -p
6. Copy the entire React code from the top of this file and replace the contents of src/App.jsx.
7. Replace the contents of tailwind.config.js with:
   export default { content: ["./index.html", "./src/App.jsx", "./src/main.jsx"], theme: { extend: {} }, plugins: [] }
8. Replace the contents of src/index.css with:
   @tailwind base; @tailwind components; @tailwind utilities;
9. Push the folder to a GitHub repository, then log into Vercel and import that repository!


---------------------------------------------------------------------------------------------
OPTION 2: MANUAL FILE CREATION (Drag & Drop into GitHub)
---------------------------------------------------------------------------------------------
If you are creating files manually directly on the GitHub website, your repository needs 
exactly these files. Create them and paste the content provided below:

1. [src/App.jsx] 
-> (Copy and paste all the React code located above this comment box)


2. [package.json]
{
  "name": "mothers-day",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.378.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "vite": "^5.2.0"
  }
}


3. [vite.config.js]
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})


4. [tailwind.config.js]
export default {
  content: [
    "./index.html",
    "./src/App.jsx",
    "./src/main.jsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


5. [postcss.config.js]
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


6. [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Happy Mother's Day</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>


7. [src/main.jsx]
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


8. [src/index.css]
@tailwind base;
@tailwind components;
@tailwind utilities;


=============================================================================================
FINAL STEP:
Once these files are in your GitHub repository, simply log in to https://vercel.com, click 
"Add New Project", select your new repository, and click "Deploy". Vercel will automatically 
detect the Vite setup and deploy your site in seconds!
=============================================================================================
*/
