"use client"

import React, { useState, useEffect, useMemo, useRef, createContext, useContext, useReducer } from 'react';
import { 
  Activity, 
  Zap, 
  Rocket, 
  Search, 
  Filter, 
  Clock,
  DollarSign,
  BarChart3,
  Info,
  X,
  ChevronDown,
  Copy,
  ExternalLink,
  Wallet,
  RefreshCw,
  Settings,
  Menu,
  Flame,
  Globe,
  Twitter,
  Send,
  TrendingUp,
  Lock,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Users,
  Trophy,
  Layout,
  Monitor,
  Wifi,
  FileText,
  Check,
  AlertCircle,
  Bell,
  Star,
  Clipboard,
  AlignJustify,
  Keyboard,
  Volume2,
  Bookmark,
  Crosshair,
  HelpCircle,
  Box,
  MoreVertical,
  User,
  Ghost,
  Hexagon,
  ChefHat,
  CandlestickChart,
  Droplets,
  Link,
  Palette,
  Fuel,
  Disc,
  Radar,
  ArrowLeftRight,
  Folder,
  List,
  QrCode,
  ArrowUpDown,
  ArrowDown,
  Sparkles,
  Hammer,
  ShoppingBag,
  Coins,
  GraduationCap,
  History,
  Sun,
  Hash,
  Eye,
  EyeOff,
  Circle,
  BarChart2,
  LayoutGrid,
  Play
} from 'lucide-react';

/**
 * ==================================================================================
 * 1. UTILS & CONFIGURATION
 * ==================================================================================
 */

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

const formatMoney = (amount: number, compact = true) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: amount < 0.01 ? 6 : 2,
    notation: compact && amount > 1000 ? 'compact' : 'standard'
  }).format(amount);
};

// Formats number like 0.0031 -> 0.0₂31 for floor price
const formatFloor = (val: number) => {
    if (val === 0) return '0';
    const s = val.toFixed(10);
    const match = s.match(/^0\.0+/);
    if (!match) return val.toFixed(3);
    const zeros = match[0].length - 2;
    if (zeros === 0) return val.toFixed(3);
    const rest = s.substring(match[0].length, match[0].length + 2);
    const subscript = ['₀','₁','₂','₃','₄','₅','₆','₇','₈','₉'];
    return `0.0${subscript[zeros] || zeros}${rest}`;
};

// Custom Icon Components
const SolLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="12" fill="url(#sol_gradient)" />
    <path d="M4.5 14.5L1.5 11.5L3.5 9.5H21.5L24.5 12.5L22.5 14.5H4.5ZM4.5 8.5L1.5 5.5L3.5 3.5H21.5L24.5 6.5L22.5 8.5H4.5ZM4.5 20.5L1.5 17.5L3.5 15.5H21.5L24.5 18.5L22.5 20.5H4.5Z" fill="white" transform="scale(0.5) translate(12,12)"/>
    <defs>
      <linearGradient id="sol_gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#9945FF"/>
        <stop offset="1" stopColor="#14F195"/>
      </linearGradient>
    </defs>
  </svg>
);

const BnbLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 12L12 22" stroke="currentColor" strokeWidth="2" />
        <path d="M12 12L2 7" stroke="currentColor" strokeWidth="2" />
        <path d="M12 12L22 7" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const BtcLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z" fill="#F7931A"/>
        <path d="M17.448 10.13c.33-2.223-1.362-3.417-3.682-4.213l.753-3.02-1.842-.46-.733 2.94c-.482-.12-1.982-.456-1.982-.456l-.402 1.613s1.12.257 1.097.272c.613.153.723.56.804.884l-1.228 4.923-.16-.04.23.917c.018.458-.13.802-.626.926l-1.096-.273.002.006-1.53.382-.99 3.96 1.87.466c.35.087 1.383.36 1.383.36l-.737 2.955 1.843.458.736-2.95c.504.137 2.41.572 2.41.572l1.435-5.746c.096-.382.01-.662-.308-.835 2.467.528 4.327-.376 4.832-2.676.397-1.81-.034-2.83-1.334-3.527z" fill="#FFF"/>
    </svg>
);

const EthLogo = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11.944 24L12 24 12 0 11.944 0 6 9.877z" fill="#627EEA"/>
        <path d="M12 24.001L12.056 24.001 18 9.878 12.056 0 12 0z" fill="#3C3C3D"/>
        <path d="M11.944 17.597L6 9.877 11.944 0z" fill="#627EEA" fillOpacity=".6"/>
        <path d="M12 17.597L18 9.877 12 0z" fill="#3C3C3D" fillOpacity=".6"/>
        <path d="M11.944 24L6 16.538 11.944 17.596z" fill="#627EEA" fillOpacity=".45"/>
        <path d="M12 24.001L18 16.539 12 17.597z" fill="#3C3C3D" fillOpacity=".45"/>
    </svg>
);

const TargetGearIcon = ({ className }: { className?: string }) => (
    <div className={cn("relative flex items-center justify-center", className)}>
        <Crosshair size={18} className="text-slate-400" />
        <Settings size={10} className="absolute -bottom-1 -right-1 text-slate-300 bg-black rounded-full" />
    </div>
);

const UsdcLogo = ({ className }: { className?: string }) => (
  <div className={cn("rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-[8px]", className)}>
    $
  </div>
);

// Pump Pill Icon on Avatar
const PumpPill = ({ className }: { className?: string }) => (
    <div className={cn("bg-[#13141b] rounded-full p-[1px]", className)}>
        <div className="w-full h-full bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/50">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
        </div>
    </div>
);

const DiscordIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
);

const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

type TokenStatus = 'new' | 'final_stretch' | 'migrated';

interface Token {
  id: string;
  symbol: string;
  name: string;
  price: number;
  mcap: number;
  volume: number;
  floor: number;
  txCount: number;
  created: number;
  status: TokenStatus;
  imageUrl: string;
  holders: number;
  address: string;
  bondingCurveProgress: number;
  timer: string;
  socials: { twitter: boolean; telegram: boolean; website: boolean };
  security: {
    dev: number; // percentage
    insider: number; // percentage
    sniper: number; // percentage
    bundles: number; // percentage
    smart: number; // percentage
  };
  metrics: {
    buys: number;
    sells: number;
    topHolder: string; // e.g. "0/7"
  };
}

/**
 * ==================================================================================
 * 2. STATE & REDUCERS
 * ==================================================================================
 */

interface AppState {
  tokens: Record<string, Token>;
  loading: boolean;
  filter: string;
  activeModal: 'deposit' | 'quickBuy' | 'settings' | 'watchlist' | 'search' | 'display' | null;
  selectedTokenId: string | null;
  activeDropdown: string | null;
  activeMobileTab: 'New Pairs' | 'Final Stretch' | 'Migrated';
  activeFooterTab: 'Trending' | 'Track' | 'Pulse' | 'Perpetuals' | 'Account'; // For Mobile Footer
  showIntro: boolean; // NEW: State for Intro Modal
  uiFilters: {
    locked: boolean;
    monitored: boolean;
    wifi: boolean;
    text: boolean;
  };
  notifications: Array<{id: string, text: string, type: 'success' | 'info'}>;
}

type Action = 
  | { type: 'SET_TOKENS'; payload: Token[] }
  | { type: 'UPDATE_PRICES'; payload: Record<string, Partial<Token>> }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_MODAL'; payload: { type: AppState['activeModal']; tokenId?: string } }
  | { type: 'SET_DROPDOWN'; payload: string | null }
  | { type: 'SET_MOBILE_TAB'; payload: AppState['activeMobileTab'] }
  | { type: 'SET_FOOTER_TAB'; payload: AppState['activeFooterTab'] }
  | { type: 'SET_INTRO'; payload: boolean }
  | { type: 'TOGGLE_UI_FILTER'; payload: keyof AppState['uiFilters'] }
  | { type: 'ADD_NOTIFICATION'; payload: string }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const initialState: AppState = {
  tokens: {},
  loading: true,
  filter: '',
  activeModal: null,
  selectedTokenId: null,
  activeDropdown: null,
  activeMobileTab: 'New Pairs',
  activeFooterTab: 'Pulse',
  showIntro: true, // Default to showing intro
  uiFilters: { locked: false, monitored: false, wifi: false, text: false },
  notifications: []
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_TOKENS':
      return { ...state, tokens: action.payload.reduce((acc, t) => ({ ...acc, [t.id]: t }), {}), loading: false };
    case 'UPDATE_PRICES':
       const newTokens = { ...state.tokens };
       Object.entries(action.payload).forEach(([id, updates]) => {
         if (newTokens[id]) newTokens[id] = { ...newTokens[id], ...updates };
       });
       return { ...state, tokens: newTokens };
    case 'SET_FILTER': return { ...state, filter: action.payload };
    case 'SET_MODAL': 
        return { 
            ...state, 
            activeModal: action.payload.type, 
            selectedTokenId: action.payload.tokenId || state.selectedTokenId,
            activeDropdown: null
        };
    case 'SET_DROPDOWN': 
        return { ...state, activeDropdown: state.activeDropdown === action.payload ? null : action.payload };
    case 'SET_MOBILE_TAB':
        return { ...state, activeMobileTab: action.payload };
    case 'SET_FOOTER_TAB':
        return { ...state, activeFooterTab: action.payload };
    case 'SET_INTRO':
        return { ...state, showIntro: action.payload };
    case 'TOGGLE_UI_FILTER':
        return { 
            ...state, 
            uiFilters: { ...state.uiFilters, [action.payload]: !state.uiFilters[action.payload] } 
        };
    case 'ADD_NOTIFICATION':
        return { 
            ...state, 
            notifications: [...state.notifications, { id: Date.now().toString(), text: action.payload, type: 'success' }] 
        };
    case 'REMOVE_NOTIFICATION':
        return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    default: return state;
  }
};

const StoreContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error("useStore must be used within Provider");
    return context;
};

// Simulation Hook
const useMarketSimulation = (dispatch: React.Dispatch<Action>) => {
  useEffect(() => {
    const tokens = Array.from({ length: 45 }).map((_, i) => ({
        id: `t-${i}`,
        symbol: i % 3 === 0 ? 'MORK' : i % 3 === 1 ? 'VISNER' : 'PEPE',
        name: i % 3 === 0 ? 'Mork Mork' : i % 3 === 1 ? 'Visner The Candle Dog' : 'Official 2025 Coin',
        price: Math.random() * 0.05,
        mcap: (i < 15 ? 3000 : 50000) + Math.random() * 50000,
        volume: Math.random() * 2000,
        floor: Math.random() * 0.005,
        txCount: Math.floor(Math.random() * 300),
        created: Date.now() - Math.random() * 100000,
        status: i < 15 ? 'new' : i < 30 ? 'final_stretch' : 'migrated',
        imageUrl: `https://api.dicebear.com/7.x/shapes/svg?seed=${i}&backgroundColor=1e1b4b`,
        holders: Math.floor(Math.random() * 500),
        address: '0x' + Math.random().toString(16).substr(2, 40),
        bondingCurveProgress: Math.random() * 100,
        timer: `${Math.floor(Math.random()*23)}:${Math.floor(Math.random()*59)}:${Math.floor(Math.random()*59)}`,
        socials: { twitter: Math.random() > 0.5, telegram: Math.random() > 0.5, website: Math.random() > 0.5 },
        security: {
            dev: Math.floor(Math.random() * 5),
            insider: Math.floor(Math.random() * 10),
            sniper: Math.floor(Math.random() * 50),
            bundles: 0,
            smart: Math.floor(Math.random() * 20)
        },
        metrics: {
            buys: Math.floor(Math.random() * 20),
            sells: Math.floor(Math.random() * 20),
            topHolder: `0/${Math.floor(Math.random() * 10)}`
        }
    })) as Token[];

    setTimeout(() => dispatch({ type: 'SET_TOKENS', payload: tokens }), 1000);

    const interval = setInterval(() => {
        const updates: Record<string, Partial<Token>> = {};
        for(let i=0; i<5; i++) {
            const id = `t-${Math.floor(Math.random()*45)}`;
            updates[id] = { price: Math.random() * 0.05, txCount: Math.floor(Math.random() * 300) };
        }
        dispatch({ type: 'UPDATE_PRICES', payload: updates });
    }, 800);
    return () => clearInterval(interval);
  }, [dispatch]);
};

/**
 * ==================================================================================
 * 3. REUSABLE UI COMPONENTS
 * ==================================================================================
 */

const Dropdown = ({ 
    id, 
    trigger, 
    children, 
    align = 'left' 
}: { 
    id: string; 
    trigger: React.ReactNode; 
    children: React.ReactNode; 
    align?: 'left' | 'right' 
}) => {
    const { state, dispatch } = useStore();
    const isOpen = state.activeDropdown === id;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                if (isOpen) dispatch({ type: 'SET_DROPDOWN', payload: null });
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, dispatch]);

    return (
        <div className="relative" ref={ref}>
            <div onClick={() => dispatch({ type: 'SET_DROPDOWN', payload: id })}>{trigger}</div>
            {isOpen && (
                <div className={cn(
                    "absolute bottom-full mb-2 z-50 min-w-[200px] bg-[#13141b] border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100",
                    align === 'right' ? 'right-0' : 'left-0'
                )}>
                    {children}
                </div>
            )}
        </div>
    );
};

const Modal = ({ title, onClose, children, width = 'max-w-[420px]', hideHeader = false, className, absolute = false, position = {} }: { title?: string, onClose: () => void, children: React.ReactNode, width?: string, hideHeader?: boolean, className?: string, absolute?: boolean, position?: React.CSSProperties }) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    return (
        <div 
            ref={overlayRef}
            onClick={handleOverlayClick}
            className={cn(
                "fixed inset-0 z-[100] flex",
                absolute ? "" : "items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
            )}
        >
            <div 
                style={position}
                className={cn(
                    `bg-[#0b0c10] border border-white/10 rounded-xl shadow-2xl overflow-hidden`, 
                    absolute ? "absolute" : `w-full ${width} animate-in zoom-in-95 duration-200`,
                    className
                )}
            >
                {!hideHeader && (
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#13141b]">
                        <h3 className="text-white font-bold text-sm">{title}</h3>
                        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-md transition-colors">
                            <X size={16} className="text-slate-400" />
                        </button>
                    </div>
                )}
                <div className="p-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

const ToastContainer = () => {
    const { state, dispatch } = useStore();
    return (
        <div className="fixed bottom-16 md:bottom-10 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
            {state.notifications.map(n => (
                <div 
                    key={n.id}
                    onAnimationEnd={() => setTimeout(() => dispatch({ type: 'REMOVE_NOTIFICATION', payload: n.id }), 2000)}
                    className="bg-[#13141b] border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in slide-in-from-right-full fade-in duration-300 pointer-events-auto"
                >
                    <Check size={16} />
                    <span className="text-sm font-mono">{n.text}</span>
                </div>
            ))}
        </div>
    );
};

const IntroOverlay = () => {
    const { dispatch } = useStore();

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-[600px] bg-[#0b0c10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* Media Area - Video */}
                <div className="h-72 bg-black relative flex items-center justify-center group overflow-hidden">
                     {/* User requested autoplayable video. Using a placeholder src but adding standard autoplay attributes */}
                    <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                        poster="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop"
                    >
                        <source src="https://axiom-videos.sfo3.cdn.digitaloceanspaces.com/update-26/vanish.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    {/* Overlay Gradient to fade video into content */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0c10]" />
                </div>

                {/* Content */}
                <div className="px-8 pb-8 pt-2 text-center relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-2">Vanish on Axiom</h2>
                    <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                        Trade privately on Solana, powered by Vanish! <br/>
                        <span className="text-slate-500 text-xs block mt-1">Enable this feature in portfolio.</span>
                    </p>
                    
                    <div className="flex flex-col items-center gap-4">
                        <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">See previous updates</a>
                    </div>

                    {/* Footer Actions Row */}
                    <div className="flex items-center justify-between mt-8 w-full">
                         {/* Toast Notification within Intro - Bottom Left */}
                        <div className="flex items-center gap-3 bg-[#13141b] border border-white/10 pl-2 pr-4 py-1.5 rounded-lg shadow-xl">
                            <div className="w-6 h-6 bg-indigo-500/20 rounded-md flex items-center justify-center text-indigo-400">
                                <Rocket size={12} />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[10px] font-bold text-white">Axiom just Updated!</span>
                            </div>
                        </div>

                        {/* Finish Button - Bottom Right */}
                        <button 
                            onClick={() => dispatch({ type: 'SET_INTRO', payload: false })}
                            className="px-8 py-2.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold cursor-pointer rounded-full shadow-lg shadow-indigo-500/20 transition-all active:scale-95 text-sm"
                        >
                            Finish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * ==================================================================================
 * 4. SPECIFIC UI COMPONENTS
 * ==================================================================================
 */

const NavLink = ({ active, children }: { active?: boolean, children: React.ReactNode }) => (
    <button className={cn("text-sm font-medium px-3 py-1.5 transition-colors hover:text-white", active ? "text-indigo-400 font-bold" : "text-slate-400")}>
        {children}
    </button>
);

const TokenCard = React.memo(({ token }: { token: Token }) => {
    const { dispatch } = useStore();
    const secondsAgo = Math.floor((Date.now() - token.created) / 1000);
    const timeString = secondsAgo < 60 ? `${secondsAgo}s` : `${Math.floor(secondsAgo/60)}m`;

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch({ type: 'ADD_NOTIFICATION', payload: 'Address Copied' });
    };

    return (
        <div className="bg-[#0b0c10] hover:bg-[#13141b] border-b border-white/5 p-2 grid grid-cols-[56px_1fr_auto] gap-3 group cursor-pointer transition-colors relative overflow-hidden h-[100px]">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative w-14 h-14">
                <img src={token.imageUrl} className="w-full h-full rounded-md object-cover bg-slate-800" />
                <div className="absolute -bottom-1 -right-1 z-10">
                   <PumpPill className="w-4 h-4" />
                </div>
            </div>

            <div className="flex flex-col justify-between min-w-0 py-0.5">
                <div className="flex items-center gap-1.5 group/title cursor-pointer" onClick={handleCopy}>
                    <span className="text-white font-bold text-xs truncate uppercase tracking-tight">{token.symbol}</span>
                    <span className="text-slate-500 text-[10px] truncate max-w-[80px]">{token.name}</span>
                    <Copy size={10} className="text-slate-600 group-hover/title:text-slate-400" />
                </div>

                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-emerald-400 text-[10px] font-mono leading-none font-bold">{timeString}</span>
                    <div className="flex items-center gap-1 text-slate-500">
                        {token.socials.twitter && <Twitter size={10} className="hover:text-blue-400" />}
                        {token.socials.telegram && <Send size={10} className="hover:text-blue-400" />}
                        {token.socials.website && <Globe size={10} className="hover:text-blue-400" />}
                        <Search size={10} className="hover:text-white" />
                    </div>
                    <div className="flex items-center gap-0.5 text-slate-400 text-[10px]">
                        <User size={10} />
                        <span>1</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-slate-500 text-[10px] border-l border-white/10 pl-1">
                        <CandlestickChart size={10} />
                        <span className="font-mono text-[9px]">{token.metrics.buys}|{token.metrics.sells}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500/80 text-[10px] ml-1">
                        <Trophy size={10} />
                        <span className="font-mono text-[9px]">{token.metrics.topHolder}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono">
                     <div className="flex items-center gap-0.5 text-emerald-500"><User size={9} /><span>{token.security.dev}%</span></div>
                     <div className="flex items-center gap-0.5 text-emerald-500"><ChefHat size={9} /><span>{token.security.insider}%</span></div>
                     <div className="flex items-center gap-0.5 text-red-500"><Crosshair size={9} /><span>{token.security.sniper}%</span></div>
                     <div className="flex items-center gap-0.5 text-emerald-500"><Ghost size={9} /><span>0%</span></div>
                     <div className="flex items-center gap-0.5 text-emerald-500"><Hexagon size={9} /><span>0%</span></div>
                </div>
            </div>

            <div className="flex flex-col items-end justify-between min-w-[80px] py-0.5">
                <div className="text-right leading-tight">
                    <div className="flex items-center justify-end gap-1.5 text-xs font-bold">
                        <span className="text-slate-600 text-[9px] font-normal uppercase">MC</span>
                        <span className="text-cyan-400 font-mono tracking-tight">{formatMoney(token.mcap)}</span>
                    </div>
                    <div className="flex items-center justify-end gap-1.5 text-[10px] mt-0.5">
                         <span className="text-slate-600 text-[9px] font-normal uppercase">V</span>
                         <span className="text-white font-mono tracking-tight">{formatMoney(token.volume)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2 text-[9px] text-slate-500 font-mono my-1 w-full">
                    <div className="flex items-center gap-0.5">
                        <span className="text-indigo-400 font-bold">F</span>
                        <span className="text-slate-300">{formatFloor(token.floor)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-slate-500">TX</span>
                        <span className="text-white">{token.txCount}</span>
                        <div className="w-4 h-1 bg-slate-800 rounded-full overflow-hidden flex">
                            <div className="h-full bg-emerald-500 w-2/3" />
                            <div className="h-full bg-red-500 w-1/3" />
                        </div>
                    </div>
                </div>

                <button 
                    onClick={(e) => { e.stopPropagation(); dispatch({ type: 'SET_MODAL', payload: { type: 'quickBuy', tokenId: token.id } }); }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-[4px] flex items-center gap-1 transition-colors w-full justify-center active:scale-95 shadow shadow-indigo-900/50"
                >
                    <Zap size={10} className="fill-current" />
                    0 SOL
                </button>
            </div>
        </div>
    );
});

/**
 * ==================================================================================
 * 5. LAYOUT COMPONENTS
 * ==================================================================================
 */

const TopBar = () => {
    const { dispatch, state } = useStore();

    return (
        <div className="h-16 md:h-14 bg-[#05060a] border-b border-white/5 flex items-center px-4 justify-between shrink-0 z-50 relative">
            {/* Left Section: Logo & Nav */}
            <div className="flex items-center gap-4 lg:gap-6">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                   <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[36px] h-[36px] sm:w-[36px] sm:h-[36px] text-textPrimary"><g clipPath="url(#clip0_88_28967)"><path d="M24.1384 17.3876H11.8623L18.0001 7.00012L24.1384 17.3876Z" fill="currentColor"></path><path d="M31 29.0003L5 29.0003L9.96764 20.5933L26.0324 20.5933L31 29.0003Z" fill="currentColor"></path></g><defs><clipPath id="clip0_88_28967"><rect width="26" height="22" fill="white" transform="translate(5 7)"></rect></clipPath></defs></svg>
                    <span className="hidden md:inline">AXIOM <span className="text-slate-500 font-normal">Pro</span></span>
                </div>
                <nav className="hidden xl:flex items-center gap-1">
                    <NavLink>Discover</NavLink>
                    <NavLink active>Pulse</NavLink>
                    <NavLink>Trackers</NavLink>
                    <NavLink>Perpetuals</NavLink>
                    <NavLink>Yield</NavLink>
                    <NavLink>Vision</NavLink>
                    <NavLink>Portfolio</NavLink>
                    <NavLink>Rewards</NavLink>
                </nav>
            </div>

            {/* Right Section: Actions & Wallet */}
            <div className="flex items-center gap-2 md:gap-3">
                {/* Search - Desktop */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                    <input 
                        type="text" 
                        onClick={() => dispatch({ type: 'SET_MODAL', payload: { type: 'search' } })}
                        readOnly
                        placeholder="Search by token or CA..." 
                        className="bg-[#0b0c10] border border-white/10 rounded-full pl-9 pr-8 py-1.5 text-xs text-slate-300 w-48 lg:w-64 focus:outline-none focus:border-indigo-500/50 placeholder:text-slate-600 transition-all hover:bg-[#13141b] cursor-pointer"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600 border border-white/10 px-1 rounded bg-[#13141b]">/</div>
                </div>

                {/* Mobile: Paste CA Button */}
                <button className="md:hidden flex items-center gap-1.5 bg-[#13141b] border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-white hover:bg-white/5 active:scale-95 transition-all">
                    <Copy size={12} />
                    <span>Paste CA</span>
                </button>

                {/* Mobile: Search Icon */}
                <button 
                    onClick={() => dispatch({ type: 'SET_MODAL', payload: { type: 'search' } })}
                    className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-[#13141b] border border-white/10 text-slate-300 hover:text-white active:scale-95"
                >
                    <Search size={16} />
                </button>

                <Dropdown 
                    id="network" 
                    trigger={
                        <button className="hidden md:flex items-center gap-2 bg-[#0b0c10] border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-white hover:bg-[#13141b] transition-colors">
                            <SolLogo className="w-3 h-3 text-emerald-400" /> SOL <ChevronDown size={12} className="text-slate-500" />
                        </button>
                    }
                >
                    <div className="p-1">
                        <button className="w-full text-left px-3 py-2 hover:bg-white/5 rounded flex items-center gap-2 text-xs text-white">
                            <SolLogo className="w-3 h-3" /> Solana
                        </button>
                    </div>
                </Dropdown>

                <button 
                    onClick={() => dispatch({ type: 'SET_MODAL', payload: { type: 'deposit' } })}
                    className="hidden md:block bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors active:scale-95 shadow-lg shadow-indigo-600/20"
                >
                    Deposit
                </button>

                <button 
                    onClick={() => dispatch({ type: 'SET_MODAL', payload: { type: 'watchlist' } })}
                    className="w-9 h-9 hidden md:flex items-center justify-center rounded-full bg-[#0b0c10] border border-white/10 text-slate-400 hover:text-white transition-colors"
                >
                    <Star size={16} />
                </button>
                <button className="w-9 h-9 hidden md:flex items-center justify-center rounded-full bg-[#0b0c10] border border-white/10 text-slate-400 hover:text-white transition-colors">
                    <Bell size={16} />
                </button>

                <div className="flex items-center bg-[#13141b] border border-white/5 rounded-full pl-1 pr-3 py-1 gap-2 cursor-pointer hover:border-white/20 transition-colors">
                    <div className="w-7 h-7 bg-[#0b0c10] rounded-full flex items-center justify-center border border-white/5 text-slate-400">
                        <Wallet size={14} />
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono font-medium">
                        <div className="flex items-center gap-1.5">
                            <SolLogo className="w-3 h-3 text-[#9945FF]" />
                            <span className="text-white">0</span>
                        </div>
                        <div className="w-px h-3 bg-white/10" />
                        <div className="flex items-center gap-1.5">
                            <UsdcLogo className="w-3 h-3" />
                            <span className="text-white">0</span>
                        </div>
                    </div>
                    <ChevronDown size={12} className="text-slate-500 ml-1" />
                </div>

                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0b0c10] border border-white/10 text-slate-400 hover:text-white transition-colors" onClick={() => dispatch({ type: 'SET_MODAL', payload: { type: 'settings' } })}>
                     <div className="relative">
                        <Users size={16} />
                        <div className="absolute -bottom-1 -right-1 bg-[#0b0c10] rounded-full p-[1px]">
                             <Settings size={8} className="text-slate-300" />
                        </div>
                     </div>
                </button>

                <button className="xl:hidden w-9 h-9 flex items-center justify-center rounded-full bg-[#13141b] border border-white/10 text-slate-300 hover:text-white">
                    <AlignJustify size={16} />
                </button>
            </div>
        </div>
    );
};

const SubHeader = () => {
    const { state, dispatch } = useStore();
    const tabs: Array<AppState['activeMobileTab']> = ['New Pairs', 'Final Stretch', 'Migrated'];

    // Reference for the "Display" button to position the modal relatively
    const displayBtnRef = useRef<HTMLDivElement>(null);
    const [displayModalPosition, setDisplayModalPosition] = useState<{top: number, left: number} | null>(null);

    const handleDisplayClick = () => {
        if (displayBtnRef.current) {
            const rect = displayBtnRef.current.getBoundingClientRect();
            // Calculate position: slightly below and aligned to the left of the button
            setDisplayModalPosition({
                top: rect.bottom + 8,
                left: rect.left
            });
            dispatch({ type: 'SET_MODAL', payload: { type: 'display' } });
        }
    };

    return (
        <div className="h-12 bg-[#05060a] border-b border-white/5 flex items-center justify-between z-40 relative">
            {/* Desktop View */}
            <div className="hidden md:flex flex-1 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-white font-bold text-xl tracking-tight">Pulse</h1>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full bg-[#13141b] flex items-center justify-center hover:bg-white/5 transition-colors"><SolLogo className="w-5 h-5" /></button>
                        <button className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center text-yellow-500 hover:bg-white/5 transition-colors"><Box className="w-4 h-4 text-yellow-600" /></button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="w-8 h-8 rounded-full bg-transparent text-slate-500 flex items-center justify-center hover:text-white transition-colors"><HelpCircle size={18} /></button>
                    
                    {/* Display Button triggering Modal */}
                    <div 
                        ref={displayBtnRef}
                        onClick={handleDisplayClick}
                        className="flex items-center gap-2 bg-[#13141b] px-3 py-1.5 rounded-full border border-white/10 cursor-pointer hover:border-white/20 transition-colors"
                    >
                        <List size={14} className="text-white" />
                        <span className="text-xs font-bold text-white">Display</span>
                        <ChevronDown size={14} className="text-white" />
                    </div>

                    <div className="flex items-center gap-4 text-slate-400">
                        <Bookmark size={16} className="hover:text-white cursor-pointer" />
                        <Keyboard size={16} className="hover:text-white cursor-pointer" />
                        <Volume2 size={16} className="hover:text-white cursor-pointer" />
                        <TargetGearIcon className="hover:text-white cursor-pointer" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-3 bg-[#0b0c10] border border-white/10 rounded-full px-3 py-1.5">
                            <div className="flex items-center gap-1 text-slate-400"><Wallet size={12} /><span className="text-xs font-mono font-bold text-white">1</span></div>
                            <div className="flex items-center gap-1"><SolLogo className="w-3 h-3" /><span className="text-xs font-mono font-bold text-white">0</span></div>
                            <ChevronDown size={12} className="text-slate-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="flex md:hidden flex-1 items-center justify-between px-3 w-full overflow-x-hidden">
                <div className="flex items-center gap-2 shrink-0">
                    <button className="w-8 h-8 rounded-full bg-[#13141b] border border-white/10 flex items-center justify-center"><SolLogo className="w-5 h-5" /></button>
                    <button className="w-8 h-8 rounded-full bg-[#13141b] border border-white/10 flex items-center justify-center text-yellow-500"><BnbLogo className="w-4 h-4" /></button>
                </div>
                <div className="flex-1 flex items-center justify-center gap-1 overflow-x-auto px-2 scrollbar-none">
                    <div className="flex bg-[#13141b] border border-white/10 rounded-full p-1">
                        {tabs.map(tab => (
                            <button 
                                key={tab}
                                onClick={() => dispatch({ type: 'SET_MOBILE_TAB', payload: tab })}
                                className={cn("px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all", state.activeMobileTab === tab ? "bg-slate-700/50 text-white shadow-sm" : "text-slate-500 hover:text-slate-300")}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <button className="text-slate-500 font-mono text-xs">||</button>
                </div>
                <div className="flex items-center shrink-0">
                    <button className="flex items-center gap-1 bg-[#13141b] border border-white/10 px-3 py-1.5 rounded-full">
                        <span className="text-xs font-bold text-white">P1</span>
                        <Settings size={12} className="text-slate-400" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// ======================= FOOTER COMPONENTS =======================

const DesktopFooter = () => (
    <div className="hidden md:flex h-9 bg-[#08090b] border-t border-white/5 items-center px-3 justify-between shrink-0 text-[10px] font-mono select-none z-50 relative">
        {/* Left: Controls & Navigation */}
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <Dropdown
                    id="preset"
                    trigger={
                        <div className="flex items-center gap-1.5 bg-[#1e2030] hover:bg-[#25283d] px-2.5 py-1 rounded text-blue-400 border border-blue-500/20 cursor-pointer transition-colors">
                            <Settings size={12} />
                            <span className="font-bold text-xs">PRESET 1</span>
                        </div>
                    }
                >
                    <div className="p-1">
                        {['Scalping', 'Swing', 'Day Trade'].map(p => (<button key={p} className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-white/5 rounded">{p}</button>))}
                    </div>
                </Dropdown>
                <div className="flex items-center gap-3 bg-[#0b0c10] border border-white/10 rounded-full px-3 py-1">
                    <div className="flex items-center gap-1 text-slate-400"><Wallet size={12} /><span className="font-bold text-white">1</span></div>
                    <div className="flex items-center gap-1"><SolLogo className="w-3 h-3" /><span className="font-bold text-white">0</span></div>
                    <ChevronDown size={12} className="text-slate-500" />
                </div>
                <Settings size={14} className="text-slate-500 hover:text-white cursor-pointer" />
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-5 text-slate-400 font-medium">
                <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors relative">
                    <Wallet size={14} /> Wallet
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 absolute -top-0.5 -right-1.5" />
                </div>
                <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors relative">
                    <XIcon className="w-3 h-3" /> Twitter
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 absolute -top-0.5 -right-1.5" />
                </div>
                <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors relative">
                    <Globe size={14} /> Discover
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 absolute -top-0.5 -right-1.5" />
                </div>
                <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors relative">
                    <Activity size={14} /> Pulse
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 absolute -top-0.5 -right-1.5" />
                </div>
                <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                    <BarChart3 size={14} /> PnL
                </div>
            </div>
        </div>

        {/* Right: Market Data & Status */}
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-[#0b0c10] border border-white/10 rounded-full px-2 py-0.5">
                <div className="flex -space-x-1">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                </div>
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-4 font-bold text-xs">
                <div className="flex items-center gap-1.5 text-orange-400"><BtcLogo className="w-3 h-3" /> $83.6K</div>
                <div className="flex items-center gap-1.5 text-blue-400"><EthLogo className="w-3 h-3" /> $2709</div>
                <div className="flex items-center gap-1.5 text-emerald-400"><SolLogo className="w-3 h-3" /> $126.01</div>
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-3 text-slate-500">
                <span className="text-blue-400">$51.8K</span>
                <div className="flex items-center gap-1"><Fuel size={12} /> 0.0₂27</div>
                <div className="flex items-center gap-1"><Disc size={12} /> 0.003</div>
            </div>

            <div className="bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded flex items-center gap-1.5 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold">Connection is stable</span>
            </div>

            <Dropdown 
                id="global" 
                align="right"
                trigger={<div className="text-slate-400 flex items-center gap-1 cursor-pointer hover:text-white font-bold">GLOBAL <ChevronDown size={10} /></div>}
            >
                <div className="p-1">
                    {['Global', 'North America', 'Asia', 'Europe'].map(r => (<button key={r} className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-white/5 rounded">{r}</button>))}
                </div>
            </Dropdown>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-3 text-slate-400">
                <Layout size={14} className="hover:text-white cursor-pointer" />
                <Bell size={14} className="hover:text-white cursor-pointer" />
                <Palette size={14} className="hover:text-white cursor-pointer" />
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-3 text-slate-400">
                <DiscordIcon className="w-3 h-3 hover:text-white cursor-pointer" />
                <XIcon className="w-3 h-3 hover:text-white cursor-pointer" />
                <div className="flex items-center gap-1 hover:text-white cursor-pointer"><FileText size={12} /> Docs</div>
            </div>
        </div>
    </div>
);

const MobileTabBar = () => {
    const { state, dispatch } = useStore();
    const tabs: { id: AppState['activeFooterTab']; icon: any; label: string }[] = [
        { id: 'Trending', icon: Flame, label: 'Trending' },
        { id: 'Track', icon: Radar, label: 'Track' },
        { id: 'Pulse', icon: Activity, label: 'Pulse' },
        { id: 'Perpetuals', icon: ArrowLeftRight, label: 'Perpetuals' },
        { id: 'Account', icon: Folder, label: 'Account' }
    ];

    return (
        <div className="md:hidden h-16 bg-[#05060a] border-t border-white/5 flex items-center justify-around px-2 z-50 relative">
            {tabs.map(tab => {
                const isActive = state.activeFooterTab === tab.id;
                return (
                    <button 
                        key={tab.id}
                        onClick={() => dispatch({ type: 'SET_FOOTER_TAB', payload: tab.id })}
                        className="flex flex-col items-center gap-1 p-2 min-w-[60px]"
                    >
                        <tab.icon 
                            size={20} 
                            strokeWidth={isActive ? 2.5 : 1.5}
                            className={cn(isActive ? "text-white" : "text-slate-500")} 
                        />
                        <span className={cn("text-[10px] font-medium", isActive ? "text-white" : "text-slate-500")}>
                            {tab.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

/**
 * ==================================================================================
 * 6. MODALS CONTENT
 * ==================================================================================
 */

const ModalsLayer = () => {
    const { state, dispatch } = useStore();
    const close = () => dispatch({ type: 'SET_MODAL', payload: { type: null } });
    
    const [activeTab, setActiveTab] = useState<'convert' | 'deposit' | 'buy'>('deposit');

    // Effect to handle closing on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close();
            }
        };

        if (state.activeModal) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [state.activeModal, close]);

    useEffect(() => {
        if (state.activeModal === 'deposit') {
            setActiveTab('deposit');
        }
    }, [state.activeModal]);

    if (!state.activeModal) return null;

    if (state.activeModal === 'display') {
        return (
            <Modal 
                title="Display Settings" 
                onClose={close} 
                width="max-w-[280px]" 
                hideHeader 
                className="fixed top-24 right-24 origin-top-right z-[100]" 
                absolute
            >
                <div className="flex flex-col text-xs font-medium text-slate-300">
                    {/* Metrics Section */}
                    <div className="p-3 border-b border-white/5">
                        <div className="text-[10px] text-slate-500 mb-2">Metrics</div>
                        <div className="flex bg-[#13141b] rounded p-0.5 border border-white/5">
                            <button className="flex-1 py-1.5 bg-[#2a2d3e] text-white rounded text-center shadow-sm border border-white/10">MC 77K<br/>Small</button>
                            <button className="flex-1 py-1.5 text-slate-500 text-center hover:text-slate-300">MC 77K<br/>Large</button>
                        </div>
                    </div>

                    {/* Quick Buy Section */}
                    <div className="p-3 border-b border-white/5">
                        <div className="text-[10px] text-slate-500 mb-2">Quick Buy</div>
                        <div className="grid grid-cols-4 gap-1 mb-3">
                            {['Small', 'Large', 'Mega', 'Ultra'].map((l, i) => (
                                <div key={l} className={cn("flex flex-col items-center gap-1 p-1.5 rounded cursor-pointer hover:bg-white/5 transition-colors", i === 0 ? "bg-[#13141b] border border-blue-500/50 text-blue-400" : "border border-transparent text-slate-500")}>
                                    <Zap size={12} className={i === 0 ? "fill-blue-400" : ""} />
                                    <span className="text-[9px] font-bold">{l}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:text-white text-slate-400">
                            <Sun size={14} /> <span>Grey</span>
                        </div>
                    </div>

                    {/* Layout Tabs */}
                    <div className="p-3 border-b border-white/5">
                        <div className="flex bg-[#13141b] rounded p-0.5 border border-white/5 mb-3">
                            {['Layout', 'Metrics', 'Row', 'Extras'].map((t, i) => (
                                <button key={t} className={cn("flex-1 py-1 text-center rounded hover:text-white text-[10px] font-bold", i === 0 ? "bg-[#2a2d3e] text-white shadow-sm border border-white/10" : "text-slate-500")}>{t}</button>
                            ))}
                        </div>
                        
                        <div className="space-y-3">
                            {[
                                { icon: Search, label: 'Show Search Bar', active: true },
                                { icon: Hash, label: 'No Decimals', active: true },
                                { icon: EyeOff, label: 'Show Hidden Tokens', active: true },
                                { icon: Eye, label: 'Unhide on Migrated', active: true },
                                { icon: Circle, label: 'Circle Images', active: false },
                                { icon: BarChart2, label: 'Progress Bar', active: false },
                                { icon: LayoutGrid, label: 'Spaced Tables', active: false }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 cursor-pointer group">
                                    {item.active ? (
                                        <div className="w-3 h-3 rounded-full bg-white border-2 border-white shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
                                    ) : (
                                        <div className="w-3 h-3 border border-slate-600 rounded-sm group-hover:border-slate-400" />
                                    )}
                                    <span className={item.active ? "text-white" : "text-slate-500 group-hover:text-slate-400"}>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customize Rows */}
                    <div className="p-3 bg-[#0b0c10]">
                        <div className="text-[10px] text-slate-500 mb-2">Customize rows</div>
                        <div className="flex flex-wrap gap-1.5">
                            {[
                                'Image Reuse', 'Market Cap', 'Volume', 'Fees', 
                                'TX', 'Socials', 'Holders', 'Pro Traders', 'KOLs',
                                'Dev Migrations', 'Dev Creations', 'Top 10 Holders'
                            ].map(tag => (
                                <span key={tag} className="px-2 py-1 bg-[#13141b] border border-white/10 rounded text-[10px] text-slate-400 cursor-pointer hover:bg-white/5 hover:text-white hover:border-white/20 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    if (state.activeModal === 'search') {
        return (
            <Modal title="" onClose={close} width="max-w-2xl" hideHeader className="h-[500px] flex flex-col">
                <div className="p-3 border-b border-white/10 flex gap-2 overflow-x-auto">
                    {[
                        { icon: Sparkles, label: 'Pump', color: 'text-emerald-400', border: 'border-emerald-500/30 bg-emerald-500/10' },
                        { icon: Hammer, label: 'Bonk', color: 'text-orange-400', border: 'border-orange-500/30 bg-orange-500/10' },
                        { icon: ShoppingBag, label: 'Bags', color: 'text-emerald-400', border: 'border-emerald-500/30 bg-emerald-500/10' },
                        { icon: Coins, label: 'USD1', color: 'text-yellow-400', border: 'border-yellow-500/30 bg-yellow-500/10' },
                        { icon: Shield, label: 'OG Mode', color: 'text-purple-400', border: 'border-purple-500/30 bg-purple-500/10' },
                        { icon: GraduationCap, label: 'Graduated', color: 'text-blue-400', border: 'border-blue-500/30 bg-blue-500/10' },
                    ].map((tag, i) => (
                        <button key={i} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors", tag.border, tag.color)}>
                            <tag.icon size={12} />
                            {tag.label}
                        </button>
                    ))}
                </div>
                
                <div className="p-4 border-b border-white/10 relative">
                    <input 
                        autoFocus
                        type="text" 
                        placeholder="Search by name, ticker, or CA..." 
                        className="w-full bg-transparent text-xl text-white placeholder:text-slate-500 focus:outline-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={close}>
                        <span className="text-xs text-slate-500 font-mono border border-white/10 px-1.5 py-0.5 rounded bg-[#13141b] hover:bg-white/5 hover:text-slate-300 transition-colors">Esc</span>
                    </div>
                </div>

                <div className="flex-1 p-6">
                    <div className="text-xs text-slate-500 font-medium mb-4">History</div>
                    {/* Empty state or history list could go here */}
                </div>
            </Modal>
        );
    }

    if (state.activeModal === 'watchlist') {
        return (
            <Modal title="Watchlist" onClose={close} width="max-w-3xl">
                <div className="min-h-[300px] flex flex-col">
                    <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_0.5fr] gap-4 px-6 py-3 border-b border-white/5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        <div>Token</div>
                        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-300">Market Cap <ArrowDown size={10} /></div>
                        <div>1h Volume</div>
                        <div>Liquidity</div>
                        <div className="text-right">Actions</div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 gap-4">
                        <Star size={48} className="text-slate-600 stroke-1" />
                        <div className="space-y-1">
                            <h3 className="text-white font-bold text-sm">Your watchlist is empty</h3>
                            <p className="text-slate-500 text-xs max-w-xs mx-auto">
                                Add tokens to your watchlist by clicking the star icon on any token page
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }

    if (state.activeModal === 'deposit') {
        return (
            <Modal title="Exchange" onClose={close}>
                <div className="flex flex-col bg-[#0b0c10] overflow-hidden min-h-[320px]">
                    <div className="px-4 pt-4 pb-2">
                        <div className="flex bg-[#13141b] rounded-lg p-1 border border-white/5">
                            {(['convert', 'deposit', 'buy'] as const).map(tab => (
                                <button 
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "flex-1 py-1.5 text-xs font-medium rounded-md transition-all capitalize",
                                        activeTab === tab 
                                            ? "bg-[#2a2d3e] text-white shadow-sm font-bold" 
                                            : "text-slate-400 hover:text-slate-200"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* DEPOSIT TAB CONTENT */}
                    {activeTab === 'deposit' && (
                        <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="flex gap-2">
                                <div className="w-1/2 bg-[#13141b] border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
                                    <SolLogo className="w-5 h-5" />
                                    <span className="text-sm font-bold text-white">Solana</span>
                                </div>
                                <div className="flex-1 bg-[#13141b] border border-white/10 rounded-lg px-3 py-2 flex flex-col items-end justify-center">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold">Balance</div>
                                    <div className="text-xs text-white font-mono">0 SOL</div>
                                </div>
                            </div>

                            <p className="text-[10px] text-slate-500 leading-relaxed px-1">
                                Only deposit Solana through the Solana network for this address.
                            </p>

                            <div className="flex gap-3 bg-[#13141b] border border-white/10 rounded-xl p-3">
                                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                                    <QrCode size={80} className="text-black" />
                                    <div className="absolute bg-white p-1 rounded-full">
                                        <SolLogo className="w-4 h-4 text-black" />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                                    <div className="space-y-1">
                                        <span className="text-[10px] text-slate-500 font-bold uppercase">Deposit Address</span>
                                        <div className="text-xs text-slate-300 font-mono break-all leading-relaxed">
                                            G28BTfLr3ahqWyQyEumaoBCYWVUDCNLByZ5u3NDWZFE4
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={() => dispatch({ type: 'ADD_NOTIFICATION', payload: 'Address Copied' })} className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors">
                                            <Copy size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="text-center text-[10px] text-slate-500">
                                    Don't have any Solana? <span className="text-blue-400 cursor-pointer hover:underline">Buy through Onramper.</span>
                                </div>
                                <button 
                                    onClick={() => dispatch({ type: 'ADD_NOTIFICATION', payload: 'Address Copied' })}
                                    className="w-full py-3 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-indigo-900/20"
                                >
                                    Copy Address
                                </button>
                            </div>
                        </div>
                    )}

                    {/* CONVERT TAB CONTENT */}
                    {activeTab === 'convert' && (
                        <div className="p-4 space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="text-[10px] text-slate-500 mb-2 font-medium">Swap SOL for BNB</div>
                            
                            <div className="bg-[#13141b] border border-white/10 rounded-t-xl p-3 pb-8 relative">
                                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                    <span>Converting</span>
                                    <span>Balance: 0</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <input type="text" placeholder="0.0" className="bg-transparent text-xl font-bold text-white w-full focus:outline-none placeholder:text-slate-600" />
                                    <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-white/5 shrink-0">
                                        <SolLogo className="w-4 h-4" /><span className="text-xs font-bold text-white">SOL</span><ChevronDown size={10} className="text-slate-500"/>
                                    </div>
                                </div>
                                <div className="text-[10px] text-slate-600 mt-1">($0.00)</div>

                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-8 h-8 bg-[#1e2030] border border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#25283d] text-slate-400 hover:text-white">
                                        <ArrowUpDown size={14} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#13141b] border border-white/10 border-t-0 rounded-b-xl p-3 pt-6">
                                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                                    <span>Gaining</span>
                                    <span>Balance: 0</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <input type="text" placeholder="0.0" className="bg-transparent text-xl font-bold text-white w-full focus:outline-none placeholder:text-slate-600" readOnly />
                                    <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-white/5 shrink-0">
                                        <BnbLogo className="w-4 h-4 text-yellow-500" /><span className="text-xs font-bold text-white">BNB</span><ChevronDown size={10} className="text-slate-500"/>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-1">
                                <span className="text-[9px] text-slate-500">1 SOL ≈ 0.1531 BNB</span>
                            </div>

                            <button className="w-full py-3 mt-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-indigo-900/20">
                                Confirm
                            </button>
                        </div>
                    )}

                    {/* BUY TAB CONTENT */}
                    {activeTab === 'buy' && (
                        <div className="p-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <div className="flex gap-2">
                                <div className="w-1/2 bg-[#13141b] border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
                                    <SolLogo className="w-5 h-5" />
                                    <span className="text-sm font-bold text-white">Solana</span>
                                </div>
                                <div className="flex-1 bg-[#13141b] border border-white/10 rounded-lg px-3 py-2 flex flex-col items-end justify-center">
                                    <div className="text-[10px] text-slate-500 uppercase font-bold">Balance</div>
                                    <div className="text-xs text-white font-mono">0 SOL</div>
                                </div>
                            </div>

                            <div className="bg-[#13141b] border border-white/10 rounded-xl p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="text-xs text-slate-500 font-medium">Buying</div>
                                    <div className="text-xs text-slate-500 font-mono">SOL Price: 126.16</div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <input 
                                        type="text" 
                                        placeholder="0.0" 
                                        className="bg-transparent text-2xl font-bold text-white w-full focus:outline-none placeholder:text-slate-700"
                                    />
                                    <div className="flex items-center gap-1.5">
                                        <SolLogo className="w-4 h-4" />
                                        <span className="text-lg font-bold text-white">SOL</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-[10px] text-red-500 font-medium">Minimum: 20 USD</span>
                                    <span className="text-[10px] text-slate-600 font-mono">≈ 0 USD</span>
                                </div>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex justify-end items-center gap-1 text-[10px] text-slate-500">
                                    powered by <span className="font-bold text-white">onramper</span>
                                </div>
                                
                                <button className="w-full py-3 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-indigo-900/20">
                                    Buy
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        );
    }

    if (state.activeModal === 'quickBuy') {
        const token = state.tokens[state.selectedTokenId || ''];
        return (
            <Modal title={`Quick Buy: ${token?.symbol || 'Unknown'}`} onClose={close}>
                <div className="space-y-6 p-4">
                    <div className="flex items-center gap-4 bg-[#13141b] p-3 rounded-xl border border-white/5">
                        <img src={token?.imageUrl} className="w-12 h-12 rounded-lg" />
                        <div>
                            <div className="font-bold text-white text-lg">{token?.name}</div>
                            <div className="text-xs text-slate-500 font-mono">{token?.id}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {[0.1, 0.5, 1.0].map(amt => (
                            <button key={amt} className="py-2.5 bg-[#13141b] hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/50 rounded-lg text-sm text-white font-mono transition-all font-bold">
                                {amt} SOL
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                        <span>Balance</span>
                        <span className="text-white font-mono">14.52 SOL</span>
                    </div>
                    <button 
                        onClick={() => { dispatch({ type: 'ADD_NOTIFICATION', payload: 'Transaction Sent' }); close(); }}
                        className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
                    >
                        <Zap size={16} className="fill-black" />
                        Confirm Buy
                    </button>
                </div>
            </Modal>
        );
    }

    if (state.activeModal === 'settings') {
        return (
            <Modal title="Preferences" onClose={close}>
                <div className="space-y-4 p-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                        <span className="text-sm text-slate-300 font-medium">Sound Effects</span>
                        <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer transition-colors hover:bg-indigo-500"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" /></div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                        <span className="text-sm text-slate-300 font-medium">Notifications</span>
                         <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer transition-colors hover:bg-indigo-500"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" /></div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                        <span className="text-sm text-slate-300 font-medium">Expert Mode</span>
                         <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer transition-colors hover:bg-slate-600"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" /></div>
                    </div>
                </div>
            </Modal>
        );
    }

    return null;
};

/**
 * ==================================================================================
 * 7. APP ROOT
 * ==================================================================================
 */

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useMarketSimulation(dispatch);

  // Group tokens & Filter
  const groups = useMemo(() => {
    const all = Object.values(state.tokens).filter(t => 
        t.name.toLowerCase().includes(state.filter.toLowerCase()) || 
        t.symbol.toLowerCase().includes(state.filter.toLowerCase())
    );
    return {
        'New Pairs': all.filter(t => t.status === 'new').sort((a,b) => b.created - a.created),
        'Final Stretch': all.filter(t => t.status === 'final_stretch'),
        'Migrated': all.filter(t => t.status === 'migrated')
    };
  }, [state.tokens, state.filter]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
        {state.showIntro && <IntroOverlay />}
        
        <div className={cn("flex flex-col h-screen bg-black text-slate-300 font-sans overflow-hidden", state.showIntro ? "blur-[2px]" : "")}>
            <TopBar />
            <SubHeader />
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-w-0 md:min-w-[768px] p-[15px] lg:min-w-[1024px] overflow-hidden divide-x divide-white/5 bg-[#05060a]">
                {[
                    { title: "New Pairs", data: groups['New Pairs'] },
                    { title: "Final Stretch", data: groups['Final Stretch'] },
                    { title: "Migrated", data: groups['Migrated'] }
                ].map((col, i) => (
                    <div 
                        key={i} 
                        className={cn(
                            "flex-col min-w-0 h-full", 
                            // Mobile Logic: Only show the column that matches activeMobileTab
                            state.activeMobileTab === col.title ? "flex" : "hidden",
                            // Desktop Logic: Always show all columns on medium+ screens
                            "md:flex"
                        )}
                    >
                        <div className="sticky top-0 z-10 bg-[#05060a] border-b border-white/10 px-3 py-2 flex items-center justify-between h-10 shrink-0">
                            <div className="flex items-center gap-2"><h2 className="text-slate-200 text-xs font-bold uppercase tracking-wider">{col.title}</h2></div>
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1 text-[9px] font-mono text-slate-600 font-bold"><span className="text-indigo-400">P1</span><span>P2</span><span>P3</span></div>
                                <Settings size={12} className="text-slate-600 hover:text-slate-400 cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800">
                            {col.data.map(token => <TokenCard key={token.id} token={token} />)}
                        </div>
                    </div>
                ))}
            </main>
            
            {/* Desktop Footer (Hidden on Mobile) */}
            <DesktopFooter />
            
            {/* Mobile Bottom Tab Bar (Hidden on Desktop) */}
            <MobileTabBar />

            <ModalsLayer />
            <ToastContainer />
        </div>
    </StoreContext.Provider>
  );
};

export default App;
