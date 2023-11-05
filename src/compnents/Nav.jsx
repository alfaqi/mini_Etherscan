import { useEffect, useState } from "react";
import logo from "../svg/ethereum.svg";
export default ({ SelectedItem, Srch }) => {
  const [ethNet, setEthNet] = useState("mainnet");
  const [srch, setSrch] = useState(true);
  const [url, setUrl] = useState("");
  const handleChange = (e) => {
    setEthNet(e.target.value);
  };
  const changeSearchState = () => {
    setSrch(!srch);
    Srch(srch);
  };
  const networkSelected = () => {
    if (ethNet == "mainnet") setUrl("https://etherscan.io/");
    else if (ethNet == "goerli") setUrl("https://goerli.etherscan.io/");
    else if (ethNet == "sepolia") setUrl("https://sepolia.etherscan.io/");
  };

  useEffect(() => {
    networkSelected();
  }, [ethNet]);
  return (
    <div>
      <nav style={{ width: "100%" }}>
        <ul>
          <img src={logo} alt="Logo" style={{ width: "25px" }} />
          <li>
            <a href={url} target="_blank">
              <strong>Mini Etherscan</strong>
            </a>
          </li>
        </ul>
        <ul role="listbox">
          <li>
            <a href={url} target="_blank">
              Home
            </a>
          </li>
          <li>
            <a onClick={changeSearchState}>
              <button style={{ backgroundColor: "#588ae8" }}>Search</button>
            </a>
          </li>
          <li>
            <select
              id="network"
              onClick={handleChange}
              onChange={SelectedItem(ethNet)}
            >
              <option value="mainnet">Mainnet</option>
              <option value="goerli">Goerli Testnet</option>
              <option value="sepolia">Sepolia Testnet</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  );
};
