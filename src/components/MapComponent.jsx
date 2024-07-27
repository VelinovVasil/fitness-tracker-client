
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ coordinates, setCoordinates, isInteractive }) {
  const [position, setPosition] = useState(coordinates);

  useMapEvents({
    click(e) {
      if (isInteractive) {
        setPosition(e.latlng);
        setCoordinates(e.latlng);
      }
    },
  });

  useEffect(() => {
    setPosition(coordinates);
  }, [coordinates]);

  return position === null ? null : <Marker position={position} />;
}

export default function MapComponent({ coordinates, setCoordinates, isInteractive = true, center = [42.7, 23.3], zoom = 13 }) {
  const mapCenter = coordinates ? [coordinates.lat, coordinates.lng] : center;

  return (
    <MapContainer center={mapCenter} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker coordinates={coordinates} setCoordinates={setCoordinates} isInteractive={isInteractive} />
    </MapContainer>
  );
}





