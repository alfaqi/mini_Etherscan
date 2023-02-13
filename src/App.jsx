import Nav from './compnents/Nav';
import Home from './Home'
import Search from './compnents/Search';
import { useEffect, useState } from 'react';
import Srch from './compnents/srch';

function App() {
  const [ethNet, setEthNet] = useState('mainnet')
  const [srch, setSrch] = useState(false)
  const a = () => {
    console.log(srch);
  }
  useEffect(() => {
    a()
  }, [srch])
  // return(<Srch/>)
  return (
    <div>
      <Nav SelectedItem={(a) => { setEthNet(a) }} Srch={(aa) => {setSrch(aa)}} />
      {srch ?
        <Search ethNet={ethNet} /> : <></>
      }
      <Home ethNet={ethNet} />
    </div>
  );
}

export default App;
