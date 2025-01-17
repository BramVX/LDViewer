import React from "react";
import Chart from "react-google-charts";
import { VisualizationAdapter } from "./VisualizationAdapter";

class GoogleChartsAdapter implements VisualizationAdapter {
  data: any;
  options: any;

  constructor(data: any, options: any) {
    this.data = data;
    this.options = options || {};
  }

  render() {
    return (
      <Chart
        chartType={this.options.chartType}
        data={this.data}
        options={this.options}
        legendToggle
      />
    );
  }
}

export default GoogleChartsAdapter;