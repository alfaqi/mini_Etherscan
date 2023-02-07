import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import './App.css'
import Blocks from './compnents/Blocks';
import Logo from './svg/ethereum.svg'
import INFURA_ENDPOINT_KEY from './.infura'
import { ethers } from 'ethers';

function App() {
  const [lastBlock, setLastBlock] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  const [blocks, setBlocks] = useState([]);
  
  // Load Web3  
  const endpoint = `https://mainnet.infura.io/v3/${INFURA_ENDPOINT_KEY}`;
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
    for (let i = 0; i < 5; i++) {
      const block = await provider.getBlock(lastBlock.number - i);
      arr.push(block);
    }
    setBlocks(arr)
  }

  useEffect(() => {
    fetchingData();
  }, [])

  return (
    <div className='App'>
      <img src={Logo} alt='logo' style={{ 'width': '50px' }} />

      <br />
      <strong>Last block: {lastBlock.number}, </strong>
      <b> </b>
      <strong>Gas price: {gasPrice.toString()}</strong>
      <br />
      {blocks.length === 0
        ?
        <center>
          <br />
          <ReactLoading type="spinningBubbles" color="#0000FF" height={100} width={80} />
        </center>
        : <Blocks blocks={blocks} />
      }

    </div>
  );
}

export default App;
