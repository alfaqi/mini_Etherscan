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
  const [networt, setNetwork] = useState(null)

  // Load Web3  
  // mainnet, goerli, sepolia
  const endpoint = `https://${ethNet}.infura.io/v3/${INFURA_ENDPOINT_KEY}`;
  const provider = new ethers.providers.JsonRpcProvider(endpoint)
  let txns
  const fetchingData = async () => {
    let network = await provider.getNetwork()
    if (network.chainId == 1)
      setNetwork('Ethereum Mainnet')
    else if (network.chainId == 5)
      setNetwork('Goerli Testnet')
    else if (network.chainId == 11155111)
      setNetwork('Sepolia Testnet')

    // Get last block number
    const lastBlock = await provider.getBlock('latest');
    setLastBlock(lastBlock)

    // Get gas price
    const gasPrice = await provider.getGasPrice();
    setGasPrice(gasPrice.toNumber())

    //Get transactions
    txns = await provider.getBlockWithTransactions(lastBlock.number)
    // console.log('aaa ', txns.number);

    // Get last 5 blocks and number of transactions
    let arr = [];
    let arrBalan = [];
    let arrTx = [];

    let lengthOfBlocks = 5

    for (let i = 0; i < lengthOfBlocks; i++) {
      const block = await provider.getBlock(lastBlock.number - i);
      const txes = await provider.getBlockWithTransactions(lastBlock.number - i)

      arr.push(block);
      arrBalan.push(ethers.utils.formatEther(await provider.getBalance(block.miner), 'ether'))
      arrTx.push(txes.transactions.length)
      // console.log('aaa ', lastBlock.number);
    }
    setBlocks(arr)
    setBlocksBalance(arrBalan);
    setTx(arrTx)
  }

  useEffect(() => {
    setBlocks([])
    setGasPrice(0)
    setLastBlock(0)
    setBlocksBalance([])
    setTx([])
    setNetwork('')
    fetchingData();
  }, [ethNet])

  return (
    <div className='App'>
      <article>
        Network: <strong>{networt}</strong>,
        Last block: <strong>{lastBlock.number} </strong>
        <br />
        Gas price: <strong>{gasPrice.toString()}</strong>
      </article>
      {blocks.length === 0
        ?
        <center>
          <br />
          <ReactLoading type="spinningBubbles" color="#0000FF" height={100} width={80} />
        </center>
        : <>
          <article>
            <Blocks blocks={blocks} latestBlocksBalance={blocksBalance} tx={tx} ethNet={ethNet} />
          </article>
          {/* <article>
            <Transactions transactions={blocks} latestBlocksBalance={blocksBalance} />
          </article> */}
        </>
      }
    </div>
  );
}


