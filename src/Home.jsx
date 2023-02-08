import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import './App.css'
import Blocks from './compnents/Blocks';
import Logo from './svg/ethereum.svg'
import INFURA_ENDPOINT_KEY from './.infura'
import { ethers } from 'ethers';
import Transactions from './compnents/Transactions';

export default ({ ethNet = 'mainnet' }) => {
  const [lastBlock, setLastBlock] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [blocksBalance, setBlocksBalance] = useState([]);
  const [tx, setTx] = useState([]);
  
  // Load Web3  
  // mainnet, goerli, sepolia
   
  const endpoint = `https://${ethNet}.infura.io/v3/${INFURA_ENDPOINT_KEY}`;
  const provider = new ethers.providers.JsonRpcProvider(endpoint)

  const fetchingData = async () => {
    // Get last block number
    const lastBlock = await provider.getBlock('latest');
    setLastBlock(lastBlock)

    // Get gas price
    const gasPrice = await provider.getGasPrice();
    setGasPrice(gasPrice.toNumber())

    // Get last 10 blocks 
    let arr = [];
    let arrBalan = [];
    let arrTx = [];
    for (let i = 0; i < 5; i++) {
      const block = await provider.getBlock(lastBlock.number - i);
      const txes = await provider.getBlockWithTransactions(lastBlock.number - i)
      // console.log(a.transactions.length , lastBlock.number-i);
      arr.push(block);
      arrBalan.push(ethers.utils.formatEther(await provider.getBalance(block.miner), 'ether'))
      arrTx.push(txes.transactions.length)
    }
    setBlocks(arr)
    setBlocksBalance(arrBalan);
    setTx(arrTx)
  }

  useEffect(() => {
    fetchingData();
  }, [])

  return (
    <div className='App'>
<strong> Network </strong>
      <strong>Last block: {lastBlock.number} </strong>
      <br />
      <strong>Gas price: {gasPrice.toString()}</strong>
      <br />
      {blocks.length === 0
        ?
        <center>
          <br />
          <ReactLoading type="spinningBubbles" color="#0000FF" height={100} width={80} />
        </center>
        : <>
          <Blocks blocks={blocks} latestBlocksBalance={blocksBalance} tx={tx} />
          <Transactions transactions={blocks} latestBlocksBalance={blocksBalance} />
        </>
      }
    </div>
  );
}


