import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface EventLocation {
  id: string;
  title: string;
  type: string;
  lat: number;
  lng: number;
}

interface EventLocationMapProps {
  events?: EventLocation[];
  className?: string;
}

// Mock Swedish forest locations for detected events
const SWEDEN_FOREST_LOCATIONS = [
  { lat: 64.2008, lng: 18.4526, name: 'Lapland Forest Reserve' },
  { lat: 62.3908, lng: 17.3069, name: 'Ångermanland Woods' },
  { lat: 60.1282, lng: 18.6435, name: 'Uppsala County Forest' },
  { lat: 58.4108, lng: 15.6214, name: 'Östergötland Nature Park' },
  { lat: 57.7089, lng: 11.9746, name: 'Gothenburg Woodland' },
];

const EventLocationMap: React.FC<EventLocationMapProps> = ({ events = [], className = '' }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(
    localStorage.getItem('mapbox_token') || ''
  );
  const [isTokenSet, setIsTokenSet] = useState<boolean>(!!localStorage.getItem('mapbox_token'));

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken.trim());
      setIsTokenSet(true);
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [17.0, 62.0], // Center of Sweden
      zoom: 4.5,
      pitch: 30,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      // Add markers for events or mock locations
      const locationsToShow = events.length > 0 
        ? events.map((event, index) => ({
            ...SWEDEN_FOREST_LOCATIONS[index % SWEDEN_FOREST_LOCATIONS.length],
            title: event.title,
            type: event.type,
          }))
        : SWEDEN_FOREST_LOCATIONS.map(loc => ({
            ...loc,
            title: loc.name,
            type: 'monitoring',
          }));

      locationsToShow.forEach((location) => {
        const markerColor = getMarkerColor(location.type);
        
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.cssText = `
          width: 32px;
          height: 32px;
          background-color: ${markerColor};
          border: 3px solid white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 8px; font-family: 'Plus Jakarta Sans', sans-serif;">
            <h3 style="margin: 0 0 4px 0; font-weight: 600; color: #003A23;">${location.title}</h3>
            <p style="margin: 0; font-size: 12px; color: #666;">
              ${location.lat.toFixed(4)}°N, ${location.lng.toFixed(4)}°E
            </p>
          </div>
        `);

        new mapboxgl.Marker(el)
          .setLngLat([location.lng, location.lat])
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, mapboxToken, events]);

  const getMarkerColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'fire':
        return '#f97316';
      case 'deforestation':
        return '#ef4444';
      case 'storm':
        return '#3b82f6';
      case 'wildlife':
        return '#eab308';
      default:
        return '#03813A';
    }
  };

  if (!isTokenSet) {
    return (
      <div className={`rounded-xl border border-border bg-card p-6 ${className}`}>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-eco-leaf-green" />
          <h3 className="font-semibold text-foreground">Event Location Map</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Enter your Mapbox public token to view the event locations on a map. 
          Get your token at{' '}
          <a 
            href="https://mapbox.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-eco-leaf-green hover:underline"
          >
            mapbox.com
          </a>
        </p>
        <div className="space-y-3">
          <div>
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1Ijo..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="mt-1"
            />
          </div>
          <button
            onClick={handleTokenSubmit}
            className="w-full bg-eco-leaf-green text-white py-2 px-4 rounded-lg hover:bg-eco-forest-mist transition-colors"
          >
            Load Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-border overflow-hidden ${className}`}>
      <div className="p-4 bg-card border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-eco-leaf-green" />
            <h3 className="font-semibold text-foreground">Event Locations - Sweden</h3>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span> Fire
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-red-500"></span> Deforestation
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span> Storm
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span> Wildlife
            </span>
          </div>
        </div>
      </div>
      <div ref={mapContainer} className="h-[400px] w-full" />
    </div>
  );
};

export default EventLocationMap;
