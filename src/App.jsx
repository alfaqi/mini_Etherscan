import Nav from './compnents/Nav';
import Home from './Home'
// import './App'
import Search from './compnents/Search';

function App() {
  let ethNet, net;
  switch (net) {
    case 'mainnet':
      ethNet = 'mainnet'
      break;
    case 'goerli':
      ethNet = 'goerli'
      break;
    case 'sepolia':
      ethNet = 'sepolia'
      break;

    default:
      ethNet = 'mainnet'
      break;
  }
  return (
    <div>
      <Nav />
      <Search />
      <Home />
    </div>
  );
}

export default App;
