import React from "react";
import { createRoot } from "react-dom/client";
import App from "./containers/App/index.tsx";
import Viewer from "./containers/Viewer/index.tsx";
import ContextProviders from "./ContextProviders.tsx";
import registerIcons from "./utils/FaIcons.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

registerIcons();
const root = createRoot(document.getElementById("app")!);
root.render(
      <BrowserRouter>
        <Routes>
          <Route path='/ldviewer/*' element={
            <ContextProviders>
              <Viewer />
            </ContextProviders>
            }>
          </Route>
          <Route path='/*' element={
            <ContextProviders>
              <App />
            </ContextProviders>}>
          </Route>
        </Routes>
      </BrowserRouter>
);
