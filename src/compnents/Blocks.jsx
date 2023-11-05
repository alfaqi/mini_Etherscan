import { useEffect, useState } from "react";

export default ({ blocks, latestBlocksBalance, tx, ethNet }) => {
  const [network, setNetwork] = useState("");
  const networkSelected = () => {
    if (ethNet == "goerli") setNetwork("goerli.");
    else if (ethNet == "sepolia") setNetwork("sepolia.");
  };
  useEffect(() => {
    networkSelected();
  }, []);
  return (
    <div>
      <table role="grid">
        <thead>
          <td colSpan="5">
            <b>Latest Blocks</b>
          </td>
          {/* <hr /> */}
          <tr>
            <th scope="col">#</th>
            <th scope="col">Hash</th>
            <th scope="col">Miner</th>
            <th scope="col">Balance</th>
            <th scope="col">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, key) => {
            return (
              <tr key={key}>
                <th scope="row">
                  <a
                    href={`https://${network}etherscan.io/block/${block.number}`}
                    target="_blank"
                  >
                    {block.number}
                  </a>
                </th>
                <td> {block.hash.substring(0, 20)}...</td>
                <td>
                  <a
                    href={`https://${network}etherscan.io/address/${block.miner}`}
                    target="_blank"
                  >
                    {block.miner.substring(0, 20)}...
                  </a>
                  <br />
                  <a
                    href={`https://${network}etherscan.io/txs?block=${block.number}`}
                    target="_blank"
                    data-tooltip="Transactions in this Block"
                  >
                    {tx[key] + " txns"}
                  </a>
                </td>
                <td>{latestBlocksBalance[key].substring(0, 7) + " ETH"}</td>
                <td>
                  {block.timestamp}
                  <br />
                  {new Date(block.timestamp * 1000).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">
              <center>
                <a
                  href={`https://${network}etherscan.io/blocks`}
                  target="_blank"
                >
                  View all blocks
                </a>
              </center>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
