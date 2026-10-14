import React, { useMemo } from 'react';
import {
  Compass,
  Play,
  Pause,
  RotateCcw,
  FastForward
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SchematicTrackingMap = ({ order, height = '300px', showControls = true }) => {
  const {
    toggleSimulationPlay,
    stepSimulation,
    resetOrderSimulation,
    simulationSpeed,
    setSimulationSpeed
  } = useApp();

  const simulation = order?.trackingSimulation || {
    progress: 50,
    etaMinutes: 6,
    currentStreet: 'En route',
    isPlaying: false
  };

  const progress = Math.min(100, Math.max(0, simulation.progress || 0));
  const isDelivered = order?.status === 'Delivered' || progress >= 100;
  const isCancelled = order?.status === 'Cancelled';

  const waypoints = useMemo(() => [
    { x: 70, y: 320, label: 'Dark Store 01' },
    { x: 140, y: 320, label: 'Dock Exit' },
    { x: 140, y: 220, label: 'S.V. Road Junction' },
    { x: 260, y: 220, label: 'Linking Road Intersection' },
    { x: 260, y: 140, label: '14th Road Turn' },
    { x: 420, y: 140, label: 'Khar Police Lane' },
    { x: 420, y: 80, label: 'Sea Green Avenue' },
    { x: 520, y: 80, label: 'Customer Residence' }
  ], []);

  const pathData = useMemo(() => {
    return waypoints.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');
  }, [waypoints]);

  const riderPosition = useMemo(() => {
    const totalSegments = waypoints.length - 1;
    const currentFraction = progress / 100;
    const targetSegment = Math.min(totalSegments - 1, Math.floor(currentFraction * totalSegments));
    const segmentFraction = (currentFraction * totalSegments) - targetSegment;

    const p1 = waypoints[targetSegment];
    const p2 = waypoints[targetSegment + 1] || p1;

    const x = p1.x + (p2.x - p1.x) * segmentFraction;
    const y = p1.y + (p2.y - p1.y) * segmentFraction;

    return { x, y };
  }, [waypoints, progress]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl select-none">
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 shadow-lg flex items-center space-x-2 pointer-events-auto">
          <div className={`w-2.5 h-2.5 rounded-full ${isDelivered ? 'bg-emerald-500' : isCancelled ? 'bg-red-500' : 'bg-amber-400 animate-ping'}`} />
          <div className="text-xs">
            <span className="font-bold text-white">
              {isDelivered ? 'Delivered safely' : isCancelled ? 'Order Cancelled' : `ETA: ${simulation.etaMinutes} mins`}
            </span>
            <span className="text-slate-400 text-[10px] ml-1.5">
              ({progress.toFixed(0)}% reached)
            </span>
          </div>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/60 text-[10px] text-slate-300 font-medium flex items-center space-x-1 pointer-events-auto">
          <Compass className="w-3 h-3 text-brand-400 animate-pulse" />
          <span>Bandra West Grid</span>
        </div>
      </div>

      <div style={{ height }} className="w-full relative flex items-center justify-center">
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="m-blocks" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="#090d16" />
              <rect x="2" y="2" width="36" height="36" rx="4" fill="#0f172a" />
            </pattern>
            <linearGradient id="m-route-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <filter id="m-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="600" height="400" fill="url(#m-blocks)" />

          <line x1="0" y1="80" x2="600" y2="80" stroke="#1e293b" strokeWidth="18" />
          <line x1="0" y1="140" x2="600" y2="140" stroke="#1e293b" strokeWidth="22" />
          <line x1="0" y1="220" x2="600" y2="220" stroke="#1e293b" strokeWidth="24" />
          <line x1="0" y1="320" x2="600" y2="320" stroke="#1e293b" strokeWidth="20" />

          <line x1="140" y1="0" x2="140" y2="400" stroke="#1e293b" strokeWidth="22" />
          <line x1="260" y1="0" x2="260" y2="400" stroke="#1e293b" strokeWidth="24" />
          <line x1="420" y1="0" x2="420" y2="400" stroke="#1e293b" strokeWidth="20" />
          <line x1="520" y1="0" x2="520" y2="400" stroke="#1e293b" strokeWidth="16" />

          <text x="30" y="214" fill="#475569" fontSize="9" fontWeight="600">S.V. ROAD</text>
          <text x="30" y="134" fill="#475569" fontSize="9" fontWeight="600">LINKING ROAD</text>
          <text x="270" y="180" fill="#475569" fontSize="9" fontWeight="600">14TH ROAD</text>

          <path
            d={pathData}
            fill="none"
            stroke="#334155"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={pathData}
            fill="none"
            stroke="url(#m-route-gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 6"
            className="animate-pulse"
            filter="url(#m-glow)"
          />

          <g transform="translate(70, 320)">
            <circle r="16" fill="#7C3AED" fillOpacity="0.25" className="animate-ping" />
            <circle r="12" fill="#7C3AED" />
            <circle r="4" fill="#ffffff" />
            <text x="-40" y="24" fill="#c4b5fd" fontSize="9" fontWeight="bold">LAX Dark Store #1</text>
          </g>

          <g transform="translate(520, 80)">
            <circle r="16" fill="#10B981" fillOpacity="0.25" className="animate-ping" />
            <circle r="12" fill="#10B981" />
            <circle r="4" fill="#ffffff" />
            <text x="-40" y="24" fill="#6ee7b7" fontSize="9" fontWeight="bold">Customer Home</text>
          </g>

          <g transform={`translate(${riderPosition.x}, ${riderPosition.y})`}>
            <circle r="20" fill="#F97316" fillOpacity="0.25" className="animate-ping" />
            <circle r="13" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2" filter="url(#m-glow)" />
            <circle r="3.5" fill="#FFFFFF" />
            <line x1="-5" y1="0" x2="5" y2="0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>

        <div className="absolute bottom-3 left-3 right-3 z-20 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-full bg-brand-600/30 border border-brand-500 flex items-center justify-center text-brand-300 font-bold text-xs">
              ⚡
            </div>
            <div>
              <div className="text-[11px] font-bold text-white">
                {simulation.currentStreet || 'Navigating neighborhood route'}
              </div>
              <div className="text-[10px] text-slate-400">
                Partner: {order?.deliveryPartner?.name || 'Vikram Sharma'}
              </div>
            </div>
          </div>

          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold">
            Live Route
          </span>
        </div>
      </div>

      {showControls && (
        <div className="bg-slate-900 px-3 py-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleSimulationPlay(order.id)}
              disabled={isDelivered || isCancelled}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg font-semibold transition ${
                simulation.isPlaying
                  ? 'bg-amber-600 text-white'
                  : 'bg-emerald-600 text-white'
              } disabled:opacity-40`}
            >
              {simulation.isPlaying ? (
                <>
                  <Pause className="w-3 h-3 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isDelivered ? 'Delivered' : 'Simulate'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => stepSimulation(order.id)}
              disabled={isDelivered || isCancelled}
              className="flex items-center space-x-1 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 disabled:opacity-40"
            >
              <FastForward className="w-3 h-3" />
              <span>Step</span>
            </button>

            <button
              onClick={() => resetOrderSimulation(order.id)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center space-x-1">
            <span className="text-[10px] text-slate-400">Speed:</span>
            {[1, 2, 5].map(spd => (
              <button
                key={spd}
                onClick={() => setSimulationSpeed(spd)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  simulationSpeed === spd
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
