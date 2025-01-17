import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { VisualizationAdapter } from "./VisualizationAdapter";
import "leaflet/dist/leaflet.css";

class LeafletAdapter implements VisualizationAdapter {
  data: any[];
  options: { center: [number, number]; zoom: number };
  valueNames: string[];

  constructor(
    data: any[],
    options?: { center: [number, number]; zoom: number }
  ) {
    this.valueNames = data[0];
    this.data = data.slice(1);
    this.options = options || { center: [51.836169, 5.857853], zoom: 12 };
  }

  calculateBounds() {
    const latLngs: [number, number][] = this.data.map((marker) => [
      parseFloat(marker[1]), // Latitude
      parseFloat(marker[0]), // Longitude
    ]);
    return latLngs;
  }

  render() {
    const popupStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      maxWidth: "150px",
      overflow: "hidden",
    };
    const spanStyle: React.CSSProperties = {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    };

    const bounds = this.calculateBounds();

    const FitBoundsComponent = () => {
      const map = useMap();
      React.useEffect(() => {
        if (bounds.length > 0) {
          map.fitBounds(bounds, { padding: [20, 20] });
        }
      }, [map, bounds]);
      return null;
    };

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
        <FitBoundsComponent/>
        {this.data.map((marker, index) => (
          <CircleMarker
            key={index}
            center={[parseFloat(marker[1]), parseFloat(marker[0])]}
            radius={5}
          >
            <Popup>
              <div style={popupStyle}>
                {this.valueNames[2] ? (
                <span style={spanStyle}>
                  {this.valueNames[2] + ": " + marker[2]}
                </span>
                ) : null}
                {this.valueNames[3] ? (
                <span style={spanStyle}>
                  {this.valueNames[3] + ": " + marker[3]}
                </span>
                ) : null}
                {this.valueNames[4] ? (
                <span style={spanStyle}>
                  {this.valueNames[4] + ": " + marker[4]}
                </span>
                ) : null}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    );
  }
}

export default LeafletAdapter;
