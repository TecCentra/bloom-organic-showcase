import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-98.5795, 39.8283], // Center of USA
      zoom: 4,
    });

    // Add marker for the business location
    new mapboxgl.Marker({ color: '#A47551' })
      .setLngLat([-98.5795, 39.8283])
      .setPopup(new mapboxgl.Popup().setHTML('<h3 class="font-semibold">Organic Bloom</h3><p>123 Organic Way, Nature Valley</p>'))
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    setIsMapLoaded(true);
  };

  const handleLoadMap = () => {
    if (apiKey) {
      initializeMap(apiKey);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="w-full">
      {!isMapLoaded && (
        <div className="mb-4 p-6 bg-card border border-border rounded-lg">
          <p className="text-sm text-muted-foreground mb-3">
            Enter your Mapbox public token to view the map. Get yours at{' '}
            <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter Mapbox API token"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleLoadMap} className="bg-primary hover:bg-primary/90">
              Load Map
            </Button>
          </div>
        </div>
      )}
      <div 
        ref={mapContainer} 
        className="w-full h-[400px] rounded-lg shadow-lg"
        style={{ display: isMapLoaded ? 'block' : 'none' }}
      />
    </div>
  );
};

export default Map;
