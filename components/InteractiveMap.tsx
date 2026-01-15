import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

// Heat data point for rail transit
interface HeatPoint {
  lat: number;
  lng: number;
  intensity: number; // 0-1 passenger density
}

// Rail line segment with heat data
interface RailSegment {
  id: string;
  name: string;
  points: [number, number][];
  passengerFlow: number; // passengers per hour
  lineColor: string;
}

interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'normal' | 'warning' | 'critical';
  line: string;
}

interface Train {
  id: string;
  lat: number;
  lng: number;
  direction: number;
}

interface InteractiveMapProps {
  stations?: Station[];
  trains?: Train[];
  center?: [number, number];
  zoom?: number;
  onStationClick?: (station: Station) => void;
  showControls?: boolean;
  showHeatmap?: boolean;
  showLines?: boolean;
  incidentMode?: boolean; // Special mode for incident command
}

// NYC-style rail transit heat data
const railHeatData: HeatPoint[] = [
  // Line A - Heavy traffic areas
  { lat: 40.7128, lng: -74.0060, intensity: 0.95 }, // Central Station
  { lat: 40.7200, lng: -74.0000, intensity: 0.85 },
  { lat: 40.7350, lng: -73.9950, intensity: 0.75 },
  { lat: 40.7505, lng: -73.9934, intensity: 0.90 }, // Union Station
  { lat: 40.7600, lng: -73.9900, intensity: 0.70 },
  { lat: 40.7831, lng: -73.9712, intensity: 0.65 }, // North Gate
  // Line B - Medium traffic
  { lat: 40.7580, lng: -73.9855, intensity: 0.80 },
  { lat: 40.7484, lng: -74.0358, intensity: 0.60 },
  { lat: 40.7350, lng: -74.0100, intensity: 0.55 },
  { lat: 40.7200, lng: -74.0200, intensity: 0.50 },
  { lat: 40.7000, lng: -74.0300, intensity: 0.45 },
  { lat: 40.6892, lng: -74.0445, intensity: 0.85 }, // South Park
  // Line C - Cross town
  { lat: 40.7650, lng: -73.9800, intensity: 0.70 },
  { lat: 40.7580, lng: -74.0000, intensity: 0.75 },
  { lat: 40.7500, lng: -74.0150, intensity: 0.65 },
  { lat: 40.7400, lng: -74.0250, intensity: 0.60 },
  { lat: 40.7300, lng: -74.0350, intensity: 0.55 },
  { lat: 40.7150, lng: -74.0400, intensity: 0.50 },
  // Transfer hubs - high intensity
  { lat: 40.7520, lng: -73.9920, intensity: 0.98 }, // Major transfer
  { lat: 40.7350, lng: -74.0050, intensity: 0.88 },
  { lat: 40.7100, lng: -74.0150, intensity: 0.78 },
];

const railSegments: RailSegment[] = [
  {
    id: 'line-a',
    name: 'Line A - Express',
    points: [
      [40.6892, -74.0445],
      [40.7000, -74.0300],
      [40.7150, -74.0200],
      [40.7350, -74.0100],
      [40.7505, -73.9934],
      [40.7600, -73.9850],
      [40.7831, -73.9712],
    ],
    passengerFlow: 45000,
    lineColor: '#3b82f6',
  },
  {
    id: 'line-b',
    name: 'Line B - Local',
    points: [
      [40.7831, -73.9712],
      [40.7700, -73.9800],
      [40.7580, -73.9855],
      [40.7500, -73.9900],
      [40.7400, -74.0000],
      [40.7300, -74.0100],
      [40.7150, -74.0250],
      [40.7000, -74.0350],
      [40.6892, -74.0445],
    ],
    passengerFlow: 32000,
    lineColor: '#8b5cf6',
  },
  {
    id: 'line-c',
    name: 'Line C - Cross Town',
    points: [
      [40.7831, -73.9712],
      [40.7750, -73.9750],
      [40.7650, -73.9800],
      [40.7550, -73.9850],
      [40.7450, -73.9900],
      [40.7350, -73.9950],
      [40.7250, -74.0000],
      [40.7150, -74.0050],
      [40.7050, -74.0100],
      [40.6950, -74.0150],
      [40.6850, -74.0200],
    ],
    passengerFlow: 28000,
    lineColor: '#ef4444',
  },
  {
    id: 'line-d',
    name: 'Line D - Airport Express',
    points: [
      [40.6892, -74.0445],
      [40.6950, -74.0350],
      [40.7050, -74.0250],
      [40.7150, -74.0150],
      [40.7250, -74.0050],
      [40.7350, -73.9950],
      [40.7484, -74.0358],
    ],
    passengerFlow: 38000,
    lineColor: '#10b981',
  },
];

const defaultStations: Station[] = [
  { id: 's1', name: 'Central Station', lat: 40.7128, lng: -74.0060, status: 'normal', line: 'Line A' },
  { id: 's2', name: 'Union Station', lat: 40.7505, lng: -73.9934, status: 'warning', line: 'Line A' },
  { id: 's3', name: 'North Gate', lat: 40.7831, lng: -73.9712, status: 'normal', line: 'Line B' },
  { id: 's4', name: 'West Terminal', lat: 40.7484, lng: -74.0358, status: 'critical', line: 'Line D' },
  { id: 's5', name: 'South Park', lat: 40.6892, lng: -74.0445, status: 'normal', line: 'Line B' },
];

const defaultTrains: Train[] = [
  { id: 'T101', lat: 40.7250, lng: -74.0000, direction: 45 },
  { id: 'T102', lat: 40.7350, lng: -73.9850, direction: 180 },
  { id: 'T103', lat: 40.7550, lng: -74.0100, direction: 270 },
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  stations = defaultStations,
  trains = defaultTrains,
  center = [40.73, -74.00],
  zoom = 12,
  onStationClick,
  showControls = true,
  showHeatmap = true,
  showLines = true,
  incidentMode = false,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const trainMarkers = useRef<Map<string, L.CircleMarker>>(new Map());
  const heatLayerRef = useRef<L.LayerGroup | null>(null);
  const lineLayerRef = useRef<L.LayerGroup | null>(null);
  const incidentZoneRef = useRef<L.LayerGroup | null>(null);
  const [heatmapEnabled, setHeatmapEnabled] = useState(showHeatmap);
  const [linesEnabled, setLinesEnabled] = useState(showLines);
  const [currentZoom, setCurrentZoom] = useState(zoom);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map with dark theme
    map.current = L.map(mapContainer.current, {
      center,
      zoom,
      zoomControl: true,
      dragging: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
    });

    // Update zoom state
    map.current.on('zoomend', () => {
      setCurrentZoom(map.current?.getZoom() || zoom);
    });

    // Use CartoDB Dark Matter tiles (free, dark theme)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map.current);

    // Initialize heat and line layers
    heatLayerRef.current = L.layerGroup().addTo(map.current);
    lineLayerRef.current = L.layerGroup().addTo(map.current);

    // Add heatmap circles
    railHeatData.forEach((point) => {
      const radius = 150 + point.intensity * 400; // Dynamic radius based on intensity
      const opacity = 0.1 + point.intensity * 0.4;

      const color = point.intensity > 0.8
        ? '#ef4444' // High - red
        : point.intensity > 0.5
          ? '#f59e0b' // Medium - yellow
          : '#2E5CFF'; // Low - blue

      const heatCircle = L.circle([point.lat, point.lng], {
        radius,
        fillColor: color,
        color: color,
        weight: 1,
        opacity,
        fillOpacity: opacity * 0.5,
        className: 'rail-heat-circle',
      });

      heatCircle.bindPopup(`
        <div style="font-family: Inter, sans-serif; padding: 8px;">
          <strong style="color: #2E5CFF; font-size: 13px;">Passenger Density</strong>
          <div style="margin-top: 6px; font-size: 12px; color: #64748b;">
            <div>Intensity: ${Math.round(point.intensity * 100)}%</div>
            <div>Lat: ${point.lat.toFixed(4)}, Lng: ${point.lng.toFixed(4)}</div>
          </div>
        </div>
      `);

      heatLayerRef.current?.addLayer(heatCircle);
    });

    // Add rail line segments
    railSegments.forEach((segment) => {
      // Main line
      const polyline = L.polyline(segment.points, {
        color: segment.lineColor,
        weight: 4,
        opacity: 0.8,
        className: 'rail-line',
      });

      polyline.bindPopup(`
        <div style="font-family: Inter, sans-serif; padding: 8px;">
          <strong style="color: ${segment.lineColor}; font-size: 13px;">${segment.name}</strong>
          <div style="margin-top: 6px; font-size: 12px; color: #64748b;">
            <div>Passenger Flow: ${segment.passengerFlow.toLocaleString()}/hr</div>
            <div>Stops: ${segment.points.length}</div>
          </div>
        </div>
      `);

      lineLayerRef.current?.addLayer(polyline);

      // Add glow effect line behind
      const glowLine = L.polyline(segment.points, {
        color: segment.lineColor,
        weight: 8,
        opacity: 0.2,
        className: 'rail-line-glow',
      });
      lineLayerRef.current?.addLayer(glowLine);
    });

    // Add stations
    stations.forEach((station) => {
      const color = station.status === 'critical' ? '#ef4444' : station.status === 'warning' ? '#f59e0b' : '#10b981';

      const marker = L.circleMarker([station.lat, station.lng], {
        radius: 8,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      });

      marker.bindPopup(`
        <div style="font-family: Inter, sans-serif; padding: 8px;">
          <strong style="color: #2E5CFF; font-size: 14px;">${station.name}</strong>
          <div style="margin-top: 4px; font-size: 12px; color: #64748b;">
            <span style="color: ${color};">●</span> ${station.status.toUpperCase()}
          </div>
          <div style="margin-top: 2px; font-size: 11px; color: #94a3b8;">${station.line}</div>
        </div>
      `);

      marker.on('click', () => onStationClick?.(station));
      marker.addTo(map.current!);
    });

    // Add trains
    trains.forEach((train) => {
      const marker = L.circleMarker([train.lat, train.lng], {
        radius: 5,
        fillColor: '#2E5CFF',
        color: '#fff',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      });
      marker.bindPopup(`
        <div style="font-family: Inter, sans-serif; padding: 8px;">
          <strong style="color: #2E5CFF;">Train ${train.id}</strong>
          <div style="margin-top: 4px; font-size: 12px; color: #64748b;">
            Direction: ${train.direction}°
          </div>
        </div>
      `);
      marker.addTo(map.current!);
      trainMarkers.current.set(train.id, marker);
    });

    // Incident mode: Add incident zone around critical stations
    if (incidentMode) {
      incidentZoneRef.current = L.layerGroup().addTo(map.current!);

      stations.forEach((station) => {
        if (station.status === 'critical') {
          // Add pulsing incident zone
          const incidentZone = L.circle([station.lat, station.lng], {
            radius: 500,
            fillColor: '#ef4444',
            color: '#ef4444',
            weight: 2,
            opacity: 0.6,
            fillOpacity: 0.15,
            className: 'incident-zone-pulse',
          });

          incidentZone.bindPopup(`
            <div style="font-family: Inter, sans-serif; padding: 8px;">
              <strong style="color: #ef4444; font-size: 14px;">INCIDENT ZONE</strong>
              <div style="margin-top: 6px; font-size: 12px; color: #64748b;">
                <div>Station: ${station.name}</div>
                <div>Status: CRITICAL</div>
                <div>Radius: 500m</div>
              </div>
            </div>
          `);

          incidentZoneRef.current?.addLayer(incidentZone);

          // Add outer alert ring
          const alertRing = L.circle([station.lat, station.lng], {
            radius: 800,
            fillColor: '#ef4444',
            color: '#ef4444',
            weight: 1,
            opacity: 0.3,
            fillOpacity: 0,
            dashArray: '5, 10',
          });
          incidentZoneRef.current?.addLayer(alertRing);
        }
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom, stations, onStationClick]);

  // Animate trains
  useEffect(() => {
    const interval = setInterval(() => {
      if (!map.current) return;

      trains.forEach((train, index) => {
        const marker = trainMarkers.current.get(train.id);
        if (marker) {
          const newLat = train.lat + (Math.sin(Date.now() / 1000 + index) * 0.001);
          const newLng = train.lng + (Math.cos(Date.now() / 1000 + index) * 0.001);
          marker.setLatLng([newLat, newLng]);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [trains]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />

      {/* Map Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <div className="bg-[#1A1F2E] rounded-lg p-2 shadow-lg border border-white/10">
          <div className="text-[10px] text-slate-400 font-mono mb-1">Zoom: {currentZoom}</div>
          <div className="flex items-center gap-2 text-xs text-white">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            <span>{stations.length} Stations</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white mt-1">
            <span className="material-symbols-outlined text-[16px]">train</span>
            <span>{trains.length} Trains</span>
          </div>
        </div>
      </div>

      {/* Heatmap & Lines Toggle */}
      <div className="absolute top-4 right-4 bg-[#1A1F2E] rounded-lg p-2 shadow-lg border border-white/10">
        <div className="text-[10px] font-bold text-slate-400 mb-2 px-1">LAYERS</div>
        <button
          onClick={() => {
            setShowHeatmap(!showHeatmap);
            if (heatLayerRef.current) {
              if (showHeatmap) map.current?.removeLayer(heatLayerRef.current);
              else heatLayerRef.current.addTo(map.current!);
            }
          }}
          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors ${
            showHeatmap ? 'bg-quantix-purple/20 text-quantix-purple' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className={`w-2 h-2 rounded ${showHeatmap ? 'bg-quantix-purple' : 'bg-slate-600'}`}></span>
          <span className="material-symbols-outlined text-[14px]">whatshot</span>
          <span>Heatmap</span>
        </button>
        <button
          onClick={() => {
            setShowLines(!showLines);
            if (lineLayerRef.current) {
              if (showLines) map.current?.removeLayer(lineLayerRef.current);
              else lineLayerRef.current.addTo(map.current!);
            }
          }}
          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors ${
            showLines ? 'bg-quantix-purple/20 text-quantix-purple' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className={`w-2 h-2 rounded ${showLines ? 'bg-quantix-purple' : 'bg-slate-600'}`}></span>
          <span className="material-symbols-outlined text-[14px]">timeline</span>
          <span>Rail Lines</span>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-[#1A1F2E] rounded-lg p-3 shadow-lg border border-white/10">
        <div className="text-xs font-bold text-white mb-2">Legend</div>
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#10b981]"></span> Normal
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span> Warning
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span> Critical
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-2">
          <span className="w-3 h-3 rounded-full bg-[#2E5CFF]"></span> Train
        </div>
        <div className="border-t border-white/10 my-2"></div>
        <div className="text-[10px] font-bold text-slate-400 mb-1">PASSENGER FLOW</div>
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
          <span className="w-3 h-2 rounded bg-[#ef4444]"></span> High &gt;80%
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
          <span className="w-3 h-2 rounded bg-[#f59e0b]"></span> Medium 50-80%
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="w-3 h-2 rounded bg-[#2E5CFF]"></span> Low &lt;50%
        </div>
        <div className="border-t border-white/10 my-2"></div>
        <div className="text-[10px] font-bold text-slate-400 mb-1">RAIL LINES</div>
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-0.5">
          <span className="w-4 h-1 rounded" style={{ backgroundColor: '#3b82f6' }}></span> Line A
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-0.5">
          <span className="w-4 h-1 rounded" style={{ backgroundColor: '#8b5cf6' }}></span> Line B
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300 mb-0.5">
          <span className="w-4 h-1 rounded" style={{ backgroundColor: '#ef4444' }}></span> Line C
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="w-4 h-1 rounded" style={{ backgroundColor: '#10b981' }}></span> Line D
        </div>
      </div>

      {/* Incident Mode Legend */}
      {incidentMode && (
        <div className="absolute top-4 left-4 bg-[#1A1F2E] rounded-lg p-3 shadow-lg border border-rail-danger/30">
          <div className="text-xs font-bold text-rail-danger mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">warning</span>
            Incident Zone
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
            <span className="w-3 h-3 rounded-full bg-[#ef4444]"></span> Critical Station
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
            <span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span> Warning Station
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 mb-1">
            <span className="w-3 h-3 rounded-full bg-[#10b981]"></span> Normal Station
          </div>
          <div className="border-t border-white/10 my-2"></div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="material-symbols-outlined text-[14px]">zoom_in</span>
            <span>Scroll to zoom</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span className="material-symbols-outlined text-[14px]">pan_tool</span>
            <span>Drag to pan</span>
          </div>
        </div>
      )}
    </div>
  );
};
