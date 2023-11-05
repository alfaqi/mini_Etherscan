import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import "./App.css";
import Blocks from "./compnents/Blocks";
import { ethers } from "ethers";
import Transactions from "./compnents/Transactions";

export default ({ ethNet = "mainnet" }) => {
  const [lastBlock, setLastBlock] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [blocksBalance, setBlocksBalance] = useState([]);
  const [tx, setTx] = useState([]);

  // Load Web3
  // mainnet, goerli, sepolia
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  let txns;
  const fetchingData = async () => {
    // Get last block number
    const lastBlock = await provider.getBlock("latest");
    setLastBlock(lastBlock);

    // Get gas price
    const gasPrice = await provider.getGasPrice();
    setGasPrice(gasPrice.toNumber());

    //Get transactions
    txns = await provider.getBlockWithTransactions(lastBlock.number);

    // Get last 5 blocks and number of transactions
    let arr = [];
    let arrBalan = [];
    let arrTx = [];

    let lengthOfBlocks = 5;

    for (let i = 0; i < lengthOfBlocks; i++) {
      const block = await provider.getBlock(lastBlock.number - i);
      const txes = await provider.getBlockWithTransactions(
        lastBlock.number - i
      );

      arr.push(block);
      arrBalan.push(
        ethers.utils.formatEther(
          await provider.getBalance(block.miner),
          "ether"
        )
      );
      arrTx.push(txes.transactions.length);
    }
    setBlocks(arr);
    setBlocksBalance(arrBalan);
    setTx(arrTx);
  };

  useEffect(() => {
    setBlocks([]);
    setGasPrice(0);
    setLastBlock(0);
    setBlocksBalance([]);
    setTx([]);
    fetchingData();
  }, [ethNet]);

  return (
    <div className="App">
      <article>
        Network: <strong>{ethNet}</strong>, Last block:{" "}
        <strong>{lastBlock.number} </strong>
        <br />
        Gas price: <strong>{gasPrice.toString()}</strong>
      </article>
      {blocks.length === 0 ? (
        <center>
          <br />
          <ReactLoading
            type="spinningBubbles"
            color="#0000FF"
            height={100}
            width={80}
          />
        </center>
      ) : (
        <>
          <article>
            <Blocks
              blocks={blocks}
              latestBlocksBalance={blocksBalance}
              tx={tx}
              ethNet={ethNet}
            />
          </article>
        </>
      )}
    </div>
  );
};
