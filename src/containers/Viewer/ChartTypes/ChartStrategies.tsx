import AreaChartStrategy from "./AreaChart";
import BarChartStrategy from "./BarChart";
import GeoChartStrategy from "./GeoChart";
import PieChartStrategy from "./PieChart";

const chartStrategies = {
    BarChart : new BarChartStrategy(),
    GeoChart : new GeoChartStrategy(),
    PieChart : new PieChartStrategy(),
    AreaChart : new AreaChartStrategy()
}

export default chartStrategies;