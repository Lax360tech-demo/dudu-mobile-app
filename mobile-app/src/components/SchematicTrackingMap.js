import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Circle, Path, G, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const SchematicTrackingMap = ({ order, height = 260 }) => {
  const { toggleSimulationPlay, stepSimulation, resetOrderSimulation } = useApp();

  const simulation = order?.trackingSimulation || {
    progress: 50,
    etaMinutes: 6,
    currentStreet: 'En route',
    isPlaying: false
  };

  const progress = Math.min(100, Math.max(0, simulation.progress || 0));
  const isDelivered = order?.status === 'Delivered' || progress >= 100;

  // Waypoints in 400x260 coordinate space
  const waypoints = useMemo(() => [
    { x: 50, y: 210 },
    { x: 100, y: 210 },
    { x: 100, y: 140 },
    { x: 180, y: 140 },
    { x: 180, y: 90 },
    { x: 280, y: 90 },
    { x: 280, y: 50 },
    { x: 350, y: 50 }
  ], []);

  const pathData = useMemo(() => {
    return waypoints.reduce((acc, pt, idx) => {
      return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');
  }, [waypoints]);

  const riderPos = useMemo(() => {
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
    <View style={[styles.container, { height }]}>
      {/* Top Map HUD */}
      <View style={styles.topHud}>
        <View style={styles.statusPill}>
          <View style={[styles.pingDot, { backgroundColor: isDelivered ? '#10B981' : '#F59E0B' }]} />
          <Text style={styles.statusPillText}>
            {isDelivered ? 'Delivered' : `ETA: ${simulation.etaMinutes || 4} mins (${progress.toFixed(0)}%)`}
          </Text>
        </View>

        <View style={styles.regionBadge}>
          <Text style={styles.regionText}>Bandra West Schematic</Text>
        </View>
      </View>

      {/* Vector Canvas */}
      <Svg width="100%" height={height - 50} viewBox="0 0 400 240">
        <Defs>
          <LinearGradient id="routeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#7C3AED" />
            <Stop offset="50%" stopColor="#A855F7" />
            <Stop offset="100%" stopColor="#10B981" />
          </LinearGradient>
        </Defs>

        {/* Map Background */}
        <Rect x="0" y="0" width="400" height="240" fill="#0B1329" />

        {/* Grid Blocks */}
        <Rect x="15" y="15" width="70" height="110" rx="8" fill="#131C38" />
        <Rect x="115" y="15" width="50" height="60" rx="8" fill="#131C38" />
        <Rect x="195" y="15" width="70" height="60" rx="8" fill="#131C38" />
        <Rect x="115" y="155" width="50" height="70" rx="8" fill="#131C38" />
        <Rect x="195" y="105" width="70" height="120" rx="8" fill="#131C38" />
        <Rect x="295" y="65" width="90" height="160" rx="8" fill="#131C38" />

        {/* Street Lines */}
        <Line x1="0" y1="50" x2="400" y2="50" stroke="#1E293B" strokeWidth="16" />
        <Line x1="0" y1="90" x2="400" y2="90" stroke="#1E293B" strokeWidth="16" />
        <Line x1="0" y1="140" x2="400" y2="140" stroke="#1E293B" strokeWidth="18" />
        <Line x1="0" y1="210" x2="400" y2="210" stroke="#1E293B" strokeWidth="18" />
        <Line x1="100" y1="0" x2="100" y2="240" stroke="#1E293B" strokeWidth="18" />
        <Line x1="180" y1="0" x2="180" y2="240" stroke="#1E293B" strokeWidth="18" />
        <Line x1="280" y1="0" x2="280" y2="240" stroke="#1E293B" strokeWidth="16" />

        {/* Street Name Texts */}
        <SvgText x="10" y="136" fill="#475569" fontSize="8" fontWeight="bold">LINKING ROAD</SvgText>
        <SvgText x="10" y="206" fill="#475569" fontSize="8" fontWeight="bold">S.V. ROAD</SvgText>
        <SvgText x="185" y="125" fill="#475569" fontSize="7" fontWeight="bold">14TH RD</SvgText>

        {/* Base Route */}
        <Path d={pathData} stroke="#334155" strokeWidth="6" fill="none" strokeLinecap="round" />

        {/* Active Animated Route */}
        <Path d={pathData} stroke="url(#routeGrad)" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="5, 5" />

        {/* Store Pin */}
        <G x={50} y={210}>
          <Circle r="10" fill="#7C3AED" />
          <Circle r="4" fill="#FFFFFF" />
          <SvgText x="-25" y="18" fill="#C4B5FD" fontSize="7" fontWeight="bold">Dark Store</SvgText>
        </G>

        {/* Customer Pin */}
        <G x={350} y={50}>
          <Circle r="10" fill="#10B981" />
          <Circle r="4" fill="#FFFFFF" />
          <SvgText x="-20" y="18" fill="#6EE7B7" fontSize="7" fontWeight="bold">Home</SvgText>
        </G>

        {/* Rider Bike Marker */}
        <G x={riderPos.x} y={riderPos.y}>
          <Circle r="12" fill="#EA580C" stroke="#FFFFFF" strokeWidth="1.5" />
          <Circle r="3" fill="#FFFFFF" />
        </G>
      </Svg>

      {/* Simulation Playback Controls */}
      <View style={styles.controlsBar}>
        <View style={styles.controlsLeft}>
          <Text style={styles.controlsLabel}>Simulation:</Text>
          <TouchableOpacity
            onPress={() => toggleSimulationPlay(order?.id)}
            style={[styles.playBtn, { backgroundColor: simulation.isPlaying ? '#D97706' : '#059669' }]}
          >
            <Ionicons name={simulation.isPlaying ? 'pause' : 'play'} size={12} color="#FFFFFF" />
            <Text style={styles.playBtnText}>{simulation.isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => stepSimulation(order?.id)}
            style={styles.stepBtn}
          >
            <Ionicons name="play-forward" size={12} color="#CBD5E1" />
            <Text style={styles.stepBtnText}>+20%</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => resetOrderSimulation(order?.id)}
          style={styles.resetBtn}
        >
          <Ionicons name="refresh" size={14} color="#94A3B8" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B1329',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E293B',
    position: 'relative',
    justifyContent: 'space-between'
  },
  topHud: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statusPill: {
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.8)'
  },
  pingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6
  },
  statusPillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700'
  },
  regionBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.6)'
  },
  regionText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '600'
  },
  controlsBar: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#1E293B'
  },
  controlsLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  controlsLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
    marginRight: 6
  },
  playBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 6
  },
  playBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 3
  },
  stepBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8
  },
  stepBtnText: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 3
  },
  resetBtn: {
    padding: 4
  }
});
