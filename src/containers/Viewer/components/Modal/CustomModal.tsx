import { executeQuery } from "#containers/Viewer/Query.tsx";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import React, { createElement, useEffect, useImperativeHandle, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import ChartOptions from "./ChartOptions";
import chartStrategies from "#containers/Viewer/ChartTypes/ChartStrategies.tsx";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({onUpdate, id}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [chartType, setChartType] = useState('');
    const [source, setSource] = useState('');
    const [color, setColor] = useState<"success" | "warning" | "error" | "primary" | "secondary" | "info">("primary");
    const [predicates, setPredicates] = useState([]);
    const [chartOptions, setChartOptions] = useState([]);

    useEffect(() => {
      console.log("Chart type chosen", chartType);
    }, [chartType]);

    function handleSourceChange(e) {
      var query = `SELECT DISTINCT ?predicate {
        ?s ?predicate ?o}
        ORDER BY ?predicate`;
      var endpoint = e.target.value;

      console.log(endpoint);
    
      executeQuery(query, endpoint)
      .then((result) => {
        console.log("Query passed with: ", result);
        fillMenu(result);
        setColor("success");
        setSource(endpoint);
      }).catch((error) => {
        console.log("Query failed with: ", error);
        setColor("warning");
      });

      function fillMenu(menuItems){
        let predicateList = [];

        menuItems.forEach(binding => {
          const value = binding.get('predicate').value;
          const label = value.split("/").pop();
          predicateList.push({ value, label });
        });

        setPredicates(predicateList);
      }
    }

    const handleOptionsChange = (options) => {
      setChartOptions(options);
      console.log(options);
    }

    function handleSubmit(event){
      event.preventDefault(); 
      console.log("Type:", chartType)
      const chartStrategy = chooseStrategy(chartType);
      if(id == null){
        console.log("ADDING CHART");
        console.log(chartStrategy);
        console.log(chartOptions);
        onUpdate({chartOptions,chartStrategy,source});
      }else{
        console.log("EDITING CHART");
        onUpdate({chartOptions,chartStrategy,source, id});
      }
    }

    function chooseStrategy(chartType){
      const Strategy = chartStrategies[chartType] || chartStrategies["BarChart"];
      return Strategy;
    }


    const AddButton = () => {
      const text = id != null ? "Edit chart" : "Add new chart";
      return(
        <Button onClick={handleOpen} variant="contained" endIcon={<AddIcon/>}>
            {text}
        </Button>
      )
    }

    return (
        <div>
          <AddButton/>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add chart to dashboard
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <form onSubmit={handleSubmit}>
                  <FormControl>
                    <TextField id="filled-required" label="Source" variant="filled" onChange={handleSourceChange} color={color}/>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="chartType">Chart type</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        onChange={event => setChartType(event.target.value)} value={chartType}>
                        <MenuItem value={"BarChart"}>BarChart</MenuItem>
                        <MenuItem value={"GeoChart"}>GeoChart</MenuItem>
                        <MenuItem value={"PieChart"}>PieChart</MenuItem>
                        <MenuItem value={"AreaChart"}>AreaChart</MenuItem>
                      </Select>
                    </FormControl>
                    <ChartOptions chartType={chartType} predicates={predicates} onOptionsChange={handleOptionsChange}></ChartOptions>
                    <button type="submit">Add</button>
                  </form>
              </Typography>
            </Box>
          </Modal>
        </div>
      );
}

export default CustomModal;