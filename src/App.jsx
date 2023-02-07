import Nav from './compnents/Nav';
import Home from './Home'
import './App'

function App() {
  return (
    <div>
      <nav >
        <ul>
          <li><strong>Brand</strong></li>
        </ul>
        <ul>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>
          <li><a href="#" role="button">Button</a></li>
        </ul>
      </nav>
      <Home />
    </div>
  );
}

export default App;
