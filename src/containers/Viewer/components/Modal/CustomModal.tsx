import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  createElement,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import ChartOptions from "./ChartOptions";
import chartStrategies from "#containers/Viewer/ChartTypes/ChartStrategies.tsx";
import DataService from "#containers/Viewer/Data/DataService.tsx";

const CustomModal = ({ dataset, onUpdate, id }) => {
  const dataService = new DataService();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cards =  localStorage.getItem("cards");
  console.log(cards);
  const parsedCards = cards ? JSON.parse(cards) : null;
  const [chartType, setChartType] = useState(parsedCards && parsedCards[id] ? parsedCards[id].chartType : "");
  const [source, setSource] = useState(dataset);
  const [color, setColor] = useState<
    "success" | "warning" | "error" | "primary" | "secondary" | "info"
  >("primary");
  const [predicates, setPredicates] = useState([]);
  const [chartOptions, setChartOptions] = useState([]);

  useEffect(() => {
    if (source) {
      handleSourceChange({ target: { value: source } });
    }
  }, [source]);

  function handleSourceChange(e) {
    var query = `    SELECT DISTINCT ?predicate (DATATYPE(?o) AS ?datatype) {
        ?s ?predicate ?o
        FILTER(isLiteral(?o))  # Focus on literals to get datatypes
    }
    ORDER BY ?predicate ?datatype
`;
    var endpoint = e.target.value;

    dataService
      .executeQuery(query, endpoint)
      .then((result) => {
        fillMenu(result);
        setColor("success");
        setSource(endpoint);
      })
      .catch((error) => {
        console.log(error);
        setColor("warning");
      });

    function fillMenu(menuItems) {
      let predicateList = [];

      menuItems.forEach((binding) => {
        const value = binding.get("predicate").value;
        const label = value.split("/").pop();
        const datatype = binding.get("datatype").value;
        predicateList.push({ value, label, datatype });
      });

      console.log("predicates", predicateList);

      setPredicates(predicateList);
    }

    setSource(e.target.value);
  }

  const handleOptionsChange = (options) => {
    setChartOptions(options);
    console.log("options", options);
  };

  const handleChartTypeChange = (chartType) => {
    setChartType(chartType);
  };

  function handleSubmit(event) {
    console.log("submitting");
    event.preventDefault();
    const chartStrategy = chooseStrategy(chartType);

    if (chartStrategy.checkChartOptions(chartOptions)) {
      if (id == null) {
        onUpdate({ chartOptions, chartStrategy, source });
      } else {
        onUpdate({ chartOptions, chartStrategy, source, id });
      }
    } else {
      alert(chartStrategy.chartOptionsWarning());
    }
  }

  function chooseStrategy(chartType) {
    const Strategy = chartStrategies[chartType] || chartStrategies["BarChart"];
    return Strategy;
  }

  const AddButton = () => {
    const text = id != null ? "Edit visualization" : "Add new visualization";
    return (
      <Button onClick={handleOpen} variant="contained" endIcon={<AddIcon />}>
        {text}
      </Button>
    );
  };

  return (
    <div>
      <AddButton />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogContent>
          <DialogTitle id="modal-modal-title">
            {id != null ? "Edit visualization" : "Add new visualization"}
          </DialogTitle>
          <DialogContentText>
            Fill in the dataset SPARQL endpoint here if its not prefilled. A
            green underline indicates a succesfull connection.
          </DialogContentText>
          <TextField
            id="filled-required"
            label="Source"
            variant="filled"
            onChange={handleSourceChange}
            color={color}
            value={source}
            helperText={
              color === "warning" ? "The dataset is not reachable" : ""
            }
            required
            autoFocus
            fullWidth
          />
          <InputLabel id="chartType">Chart type</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            onChange={(event) => handleChartTypeChange(event.target.value)}
            value={chartType}
            required
            fullWidth
          >
            <MenuItem value={"BarChart"}>BarChart</MenuItem>
            <MenuItem value={"GeoChart"}>GeoChart</MenuItem>
            <MenuItem value={"PieChart"}>PieChart</MenuItem>
            <MenuItem value={"AreaChart"}>AreaChart</MenuItem>
          </Select>
          <ChartOptions
            chartType={chartType}
            predicates={predicates}
            onOptionsChange={handleOptionsChange}
          ></ChartOptions>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomModal;
