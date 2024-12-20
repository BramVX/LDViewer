import React from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { VisualizationAdapter } from "./VisualizationAdapter";

class LeafletAdapter implements VisualizationAdapter{
  data: any[];
  options: { center: [number, number]; zoom: number };

  constructor(data: any[], options?: { center: [number, number]; zoom: number }) {
    this.data = data;
    this.options = options || { center: [51.836169, 5.857853], zoom: 12 };
  }

  render() {
    return (
      <MapContainer
        center={this.options.center}
        zoom={this.options.zoom}
        style={{ height: "300px", width: "100%", margin: "10px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.data.map((marker, index) => (
          <CircleMarker
            key={index}
            center={[parseFloat(marker[1]), parseFloat(marker[0])]}
            radius={5}
          />
        ))}
      </MapContainer>
    );
  }
}

export default LeafletAdapter;