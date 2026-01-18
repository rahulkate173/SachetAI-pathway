import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";

const center = [19.7515, 75.7139]; // Maharashtra

const hotspots = [
  {
    id: "solapur",
    position: [17.6599, 75.9064],
    color: "#ef4444",
    label: "Solapur – Critical Flood Alert",
  },
  {
    id: "mahabaleshwar",
    position: [17.9237, 73.6557],
    color: "#f97316",
    label: "Mahabaleshwar – Landslide Warning",
  },
  {
    id: "akkalkot",
    position: [17.5246, 76.19],
    color: "#22c55e",
    label: "Akkalkot – Rescue Completed",
  },
];

export default function MaharashtraMap({ activeSpot }) {
  const [hovered, setHovered] = useState(null);

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ width: "100%", height: "220px" }}
      scrollWheelZoom={false}
    >
      {/* FREE OpenStreetMap tiles */}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hotspots.map((spot) => {
        const isActive = activeSpot === spot.id;

        return (
          <Circle
            key={spot.id}
            center={spot.position}
            radius={isActive ? 35000 : 22000}
            pathOptions={{
              color: spot.color,
              fillColor: spot.color,
              fillOpacity: isActive ? 0.55 : 0.35,
              className: "pulse-circle",
            }}
            eventHandlers={{
              mouseover: () => setHovered(spot),
              mouseout: () => setHovered(null),
            }}
          >
            <Popup>{spot.label}</Popup>
          </Circle>
        );
      })}
    </MapContainer>
  );
}
