import { Container, Box, Stack } from "@mui/material";
import React from "react";

const ContentContainer = ({ children }) => {
  return (
    <Container sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Stack sx={{ flex: 1, my: 2 }} spacing={2}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </Box>
      </Stack>
    </Container>
  );
};

export default ContentContainer;
