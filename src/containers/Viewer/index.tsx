import React from "react";
import { wizardAppConfig } from "../../config/index.ts";
import DashNav from "./DashNav.tsx";
import("../../theme/global.scss");

interface Props {}
const Viewer: React.FC<Props> = () => {
  return (
    <div>
      <title>{wizardAppConfig.appName}</title>
      <DashNav/>
    </div>
  );
};
export default Viewer;
