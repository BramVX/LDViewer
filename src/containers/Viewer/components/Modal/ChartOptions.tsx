import chartStrategies from "#containers/Viewer/ChartTypes/ChartStrategies.tsx";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const ChartOptions = ({chartType, predicates, onOptionsChange}) => {
    const chartStrategy = chartStrategies[chartType];
    if (!chartStrategy) {
        return <div></div>;
    }

    console.log(chartStrategy);

    const chartOptions = chartStrategy.getDataOptions();
    const [options, setOptions] = useState(() => chartOptions.map(() => ""));

    const handleChange = (index) => (event) => {
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
            <Select 
                id={option} 
                onChange={handleChange(index)} 
                value={options[index]} 
                label={option} 
                required={index === 0}
                fullWidth
                >
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
}

export default ChartOptions;