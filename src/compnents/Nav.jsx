import logo from '../svg/ethereum.svg'
export default () => {
    return (
        <div>
            <nav style={{ 'width': '100%' }}>
                <ul>
                    <img src={logo} alt='Logo' style={{ 'width': '25px' }}></img>
                    <li><a href='https://etherscan.io/' target='_blank'>
                        <strong>Mini Etherscan</strong></a></li>
                </ul>
                <ul role='listbox'>
                    <li><a href="https://etherscan.io/" target='_blank'>Home</a></li>
                   
                    <li>
                        <select>
                            
                            <option  value="mainnet" >Mainnet</option>

                            <option value="goerli" >Goerli Testnet</option>
                            <option value="sepolia" >Sepolia Testnet</option>
                        </select>
                    </li>
                </ul>
            </nav>
        </div>
    )
}