import AreaChartStrategy from "#containers/Viewer/ChartTypes/AreaChart.tsx";
import BarChartStrategy from "#containers/Viewer/ChartTypes/BarChart.tsx";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const ChartOptions = ({chartType, predicates, onOptionsChange}) => {
    let chartStrategy;
    switch(chartType){
        case "BarChart":
            chartStrategy = new BarChartStrategy();
            console.log("AND I GET SET: ", chartStrategy)
            break;
        case "AreaChart":
            chartStrategy = new AreaChartStrategy();
            console.log("AND I GET SET: ", chartStrategy)
            break;
        default:
            console.log(chartType)
            return(<div></div>);
    }

    console.log(chartStrategy);

    const chartOptions = chartStrategy.getDataOptions();
    const [options, setOptions] = useState(() => chartOptions.map(() => ""));

    const handleChange = (index) => (event) => {
        console.log("I change");
        setOptions((prevOptions) => {
            const newOptions = [...prevOptions];
            newOptions[index] = event.target.value;
            onOptionsChange(newOptions);
            return newOptions;
        });
    };

    return(
        <div>
        {chartOptions.map((option, index) => (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id={option}>{option}</InputLabel>
            <Select id={option} onChange={handleChange(index)} value={options[index]} label={option}>
                {predicates.map((predicate) => (
                    <MenuItem key={predicate.value} value={predicate.value}>
                        {predicate.label}
                    </MenuItem>
                ))}
            </Select>
            </FormControl>
        ))}
        </div>
    );

    /*
    <Select id="x-axis" onChange={event => setXOption(event.target.value)} value={xOption}>
                      {xOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <Select id="y-axis" onChange={event => setYOption(event.target.value)} value={yOption}>
                      {yOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    */
}

export default ChartOptions;