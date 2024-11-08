import { executeQuery } from "#containers/Viewer/Query.tsx";
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import React, { createElement, useImperativeHandle, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";


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

interface CustomModalProps {
  addChartToDashboard: (xOption: any, yOption: any, chartType: any) => void;
}

const CustomModal = React.forwardRef(({ addChartToDashboard }: CustomModalProps, ref) =>{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [xOptions, setXOptions] = useState([]);
    const [yOptions, setYOptions] = useState([]);
    const [xOption, setXOption] = useState('');
    const [yOption, setYOption] = useState('');
    const [chartType, setChartType] = useState('');
    const [source, setSource] = useState('');

    useImperativeHandle(ref, () =>({
      openModal: handleOpen
    }));

    const [color, setColor] = useState("");

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
        let xList = [];
        let yList = [];

        menuItems.forEach(binding => {
          const value = binding.get('predicate').value;
          const label = value.split("/").pop();
          xList.push({ value, label });
          yList.push({ value, label });
        });

        setXOptions(xList);
        setYOptions(yList);
      }
    }

    const handleSubmit = (event) => {
      console.log('handleSubmit ran');
      event.preventDefault(); // 👈️ Prevent page refresh

      console.log('x 👉️', xOption);
      console.log('y 👉️', yOption);
      alert(`You chose for '${xOption}' and '${yOption}', with chart type '${chartType}'`);
      //Close modal

      //Add chart to dynamic dashboard
      addChartToDashboard(xOption, yOption, chartType, source);
      
    }

    return (
        <div>
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
                <FormControl>
                  <form onSubmit={handleSubmit}>
                    <TextField id="filled-required" label="Source" variant="filled" onChange={handleSourceChange} color={color}/>
                    <InputLabel id="chartType">Chart type</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      onChange={event => setChartType(event.target.value)} value={chartType}>
                      <MenuItem value={"BarChart"}>BarChart</MenuItem>
                      <MenuItem value={"GeoChart"}>GeoChart</MenuItem>
                    </Select>
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
                    <button type="submit">Add</button>
                  </form>
                </FormControl>
              </Typography>
            </Box>
          </Modal>
        </div>
      );
});

export default CustomModal;