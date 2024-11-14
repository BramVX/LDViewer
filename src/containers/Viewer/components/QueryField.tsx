import TextField from "@mui/material/TextField/TextField";
import React from "react";

function QueryField({query}) {
    return(
        <TextField
          id="outlined-multiline-static"
          label="SPARQL"
          multiline
          defaultValue={query}
          style={{width:"100%"}}
        />
    );
}

export default QueryField;