import { Marker, Popup, TileLayer } from "react-leaflet";
import React from "react";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default function yes(){
    const [chartData, setChartData] = React.useState([]);

  //add arguments for title and extra text
  const handleFetchedData = (data) => {
    setChartData(data);
  }

  var barsource = "https://api.data.pldn.nl/datasets/GeoDataWizard/verkaufsbuchernijmegen/services/verkaufsbuchernijmegen/sparql";
  var geosource = "https://api.data.pldn.nl/datasets/GeoDataWizard/stolpersteinenijmegen/services/stolpersteinenijmegen/sparql";

  const position = [5.857853, 51.836169];

return(
    <div id='map' style={{width:'300px', height:'300px'}} >hello
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>

    </div>
)
}