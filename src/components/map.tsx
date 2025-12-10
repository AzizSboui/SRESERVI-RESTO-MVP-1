'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Skeleton } from './ui/skeleton';

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
}

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '0.5rem',
};

export function Map({ center }: MapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-muted rounded-lg">
        <p className="text-muted-foreground">Clé API Google Maps manquante.</p>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} loadingElement={<Skeleton className="h-[300px] w-full" />}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
