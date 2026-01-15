import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

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
}

const defaultStations: Station[] = [
  { id: 's1', name: 'Central Station', lat: 40.7128, lng: -74.0060, status: 'normal', line: 'Line A' },
  { id: 's2', name: 'Union Station', lat: 40.7505, lng: -73.9934, status: 'warning', line: 'Line A' },
  { id: 's3', name: 'North Gate', lat: 40.7831, lng: -73.9712, status: 'normal', line: 'Line B' },
  { id: 's4', name: 'West Terminal', lat: 40.7484, lng: -74.0358, status: 'critical', line: 'Line C' },
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
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const trainMarkers = useRef<Map<string, L.CircleMarker>>(new Map());

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

    // Use CartoDB Dark Matter tiles (free, dark theme)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map.current);

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
          <div className="text-[10px] text-slate-400 font-mono mb-1">Zoom: {zoom}</div>
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
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="w-3 h-3 rounded-full bg-[#2E5CFF]"></span> Train
        </div>
      </div>
    </div>
  );
};
