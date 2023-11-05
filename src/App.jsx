import Nav from "./compnents/Nav";
import Home from "./Home";
import Search from "./compnents/Search";
import { useState } from "react";

function App() {
  const [ethNet, setEthNet] = useState("mainnet");
  const [srch, setSrch] = useState(false);
  return (
    <div>
      <Nav
        SelectedItem={(e) => {
          setEthNet(e);
        }}
        Srch={(e) => {
          setSrch(e);
        }}
      />
      {srch ? <Search ethNet={ethNet} /> : <></>}
      <Home ethNet={ethNet} />
    </div>
  );
}

export default App;
