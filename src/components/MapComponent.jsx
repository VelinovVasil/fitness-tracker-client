
// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';


// const DefaultIcon = L.icon({
//   iconUrl: markerIcon,
//   iconRetinaUrl: markerIcon2x,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });


// L.Marker.prototype.options.icon = DefaultIcon;

// function LocationMarker({ setCoordinates }) {
//   const [position, setPosition] = useState(null);

//   useMapEvents({
//     click(e) {
//       setPosition(e.latlng);
//       setCoordinates(e.latlng);
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position}></Marker>
//   );
// }

// export default function MapComponent({ setCoordinates }) {
//   return (
//     <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <LocationMarker setCoordinates={setCoordinates} />
//     </MapContainer>
//   );
// }

import React from 'react';
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

function LocationMarker({ setCoordinates, isInteractive }) {
  const [position, setPosition] = React.useState(null);

  useMapEvents({
    click(e) {
      if (isInteractive) {
        setPosition(e.latlng);
        setCoordinates(e.latlng);
      }
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function MapComponent({ setCoordinates, isInteractive = true, center = [51.505, -0.09], zoom = 13 }) {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker setCoordinates={setCoordinates} isInteractive={isInteractive} />
    </MapContainer>
  );
}


