import { CircleMarker, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import React from "react";
import Chart from "react-google-charts";

function Visualization({chartType, chartData}) {
    console.log(chartData);
    if(chartType == "GeoChart"){
        console.log("i create a map")
        return(
            <div id='map'>
            <MapContainer center={[51.836169, 5.857853]} zoom={12} style={{height:'300px', width:'100%', margin:"10px"}}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {chartData.map((marker,index) => (
                <CircleMarker key={index} center={[parseFloat(marker[1]), parseFloat(marker[0])]} radius={5} />
              ))}
            </MapContainer>
            </div>
        );
    }else{
        return(
            <Chart
                chartType={chartType}
                data={chartData}
                legendToggle
            />
        );
    }
}

export default Visualization;