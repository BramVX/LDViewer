import ChartStrategy from "./ChartInterface";

class GeoChartStrategy extends ChartStrategy {
  chartType: string = "GeoChart";
  dataOptions: string[] = [
    "point/geo",
    "optional data",
    "optional data",
    "optional data",
  ];

  getChartType(): string {
    return this.chartType;
  }

  getDataOptions(): string[] {
    return this.dataOptions;
  }

  formatData(bindings) {
    const formattedData = [];
    const pattern = /Point \(([-+]?\d*\.?\d+) ([-+]?\d*\.?\d+)\)/;

    console.log(bindings);

    for (const [geo, optional1, optional2, optional3] of bindings) {
      if (formattedData.length <= 0) {
        formattedData.push([
          "lat",
          "long",
          optional1[0].value,
          optional2[0].value,
          optional3[0].value,
        ]);
      }
      const match = geo[1].value.match(pattern);
      formattedData.push([
        match[1],
        match[2],
        optional1[1].value,
        optional2[1].value,
        optional3[1].value,
      ]);
    }
    return formattedData;

    //bind( replace( str(?point), "^[^0-9\\.-]*([-]?[0-9\\.]+) .*$", "$1" ) as ?long )
    //bind( replace( str(?point), "^.* ([-]?[0-9\\.]+)[^0-9\\.]*$", "$1" ) as ?lat )
  }

  checkChartOptions(chartOptions: any): boolean {
    const firstDatatype = chartOptions[0][1].split("#")[1];

    console.log(chartOptions[0][1]);

    if (
      chartOptions[0][1].split("/").pop().substring(0, 3) == "geo" ||
      firstDatatype == "point" ||
      firstDatatype == "lat_long"
    ) {
      return true;
    }
    return false;
  }

  chartOptionsWarning(): string {
    return "The first option must be a geo point datatype. The rest are optional";
  }

  buildQuery(values: any): string {
    return super.buildQuery(values);
    //OPTIONAL { ?o <https://schema.org/familyName> ?familyName. }
  }
}

export default GeoChartStrategy;
