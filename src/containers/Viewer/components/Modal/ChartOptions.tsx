import chartStrategies from "#containers/Viewer/ChartTypes/ChartStrategies.tsx";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

const ChartOptions = ({
  chartType,
  predicates,
  onOptionsChange,
  oldOptions,
}) => {
  const chartStrategy = chartStrategies[chartType];
  if (!chartStrategy) {
    return <div></div>;
  }

  const chartOptions = chartStrategy.getDataOptions();
  const [options, setOptions] = useState(
    oldOptions && oldOptions.length > 0
      ? oldOptions
      : chartOptions.map(() => "")
  );

  console.log("options", options);

  React.useEffect(() => {
    if (oldOptions && oldOptions.length > 0) {
      setOptions(oldOptions);
    }
  }, [oldOptions, chartOptions]);

  const handleChange = (index) => (event) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = JSON.parse(event.target.value);
      onOptionsChange(newOptions);
      console.log("new options:", newOptions);
      return newOptions;
    });
  };

  console.log("oldoptions", oldOptions);
  console.log("chartoptions", chartOptions);

  //JSON.stringify([predicate.value, predicate.datatype])
  //{oldOptions.includes(predicate.label) ? predicate.label : ""}

  return (
    <div>
      <p>{chartStrategy.chartOptionsWarning()}</p>
      {chartOptions.map((option, index) => (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id={option}>Subject</InputLabel>
          <Select
            id={option}
            onChange={handleChange(index)}
            value={JSON.stringify(options[index])}
            label={option}
            required={index === 0}
            fullWidth
          >
            {predicates.map((predicate) => {
              console.log("options all", options);
              console.log("predicate", predicate);
              console.log("predicate.value", predicate.value);
              console.log("predicate.label", predicate.label);

              const isSelected =
                oldOptions[index] === predicate.label;
                

              return (
                <MenuItem
                  key={predicate.value}
                  value={JSON.stringify([predicate.value, predicate.datatype])}
                  selected={isSelected}
                >
                  {isSelected ? "Previous: " : ""} {predicate.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

export default ChartOptions;
