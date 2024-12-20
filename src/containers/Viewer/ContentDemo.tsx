import { TileLayer } from "react-leaflet";
import React from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default function ContentDemo(){

return(
    <div id='map' style={{width:'300px', height:'300px'}} >
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
)
}