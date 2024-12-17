import React from "react";

function Visualization({adapter}) {
  if (!adapter) {
    return <div>"No adapter provided"</div>
  }

  return <>{adapter.render()}</>;
}

export default Visualization;