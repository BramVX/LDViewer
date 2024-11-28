import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField/TextField";
import React, { useState } from "react";
import buildQuery from "../QueryBuilder";

function QueryField({query, onSubmit}) {

  const [currentQuery, setCurrentQuery] = useState(query);

  const handleChange = (event) => {
    setCurrentQuery(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(currentQuery); 
  };
  

  return(
    <div>
      <TextField
        id="outlined-multiline-static"
        label="SPARQL"
        multiline
        value={currentQuery}
        onChange={handleChange}
        style={{width:"100%"}}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Query
      </Button>
    </div>
  );
}

export default QueryField;