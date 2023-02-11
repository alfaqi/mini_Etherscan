import Nav from './compnents/Nav';
import Home from './Home'
import Search from './compnents/Search';
import { useState } from 'react';

function App() {
  const [ethNet, setEthNet] = useState('mainnet')
  return (
    <div>
      <Nav SelectedItem={(a) => { setEthNet(a) }} />
      <Search />
      <Home ethNet={ethNet} />
    </div>
  );
}

export default App;
