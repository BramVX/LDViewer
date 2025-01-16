import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, {
  useEffect,
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
  
  const [source, setSource] = useState(dataset);
  const cards =  localStorage.getItem("cards");
  const parsedCards = cards ? JSON.parse(cards) : null;
  const [chartType, setChartType] = useState(parsedCards && parsedCards[id] ? parsedCards[id].chartType : "");
  const [color, setColor] = useState<
    "success" | "warning" | "error" | "primary" | "secondary" | "info"
  >("primary");
  const [predicates, setPredicates] = useState([]);

  const [formData, setFormData] = useState({
    title: parsedCards && parsedCards[id] ? parsedCards[id].title : "",
    chartOptions: parsedCards && parsedCards[id] ? parsedCards[id].chartOptions : [],
  });

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
    setFormData((prev) => ({ ...prev, chartOptions: options }));
  };

  const handleTitleChange = (e) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleChartTypeChange = (chartType) => {
    setChartType(chartType);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const chartStrategy = chooseStrategy(chartType);

    if (chartStrategy.checkChartOptions(formData.chartOptions)) {
      const title = formData.title;
      const chartOptions = formData.chartOptions;
      if (id == null) {
        onUpdate({ title, chartOptions, chartStrategy, source });
      } else {
        onUpdate({ title, chartOptions, chartStrategy, source, id });
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
          <InputLabel id="chartTitle">Title</InputLabel>
          <TextField
            id="filled-required"
            label="Title"
            variant="filled"
            value={formData.title}
            onChange={handleTitleChange}
            required
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
