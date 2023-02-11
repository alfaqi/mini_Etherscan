import { useEffect, useState } from 'react';
import Home from '../Home';
import logo from '../svg/ethereum.svg'
import Search from './Search';
export default ({ SelectedItem }) => {
    const [ethNet, setEthNet] = useState('mainnet');
    const [url, setUrl] = useState('')
    const handleChange = (e) => {
        setEthNet(e.target.value)
    }
    const networkSelected = () => {
        if (ethNet == 'mainnet')
            setUrl('https://etherscan.io/')
        else if (ethNet == 'goerli')
            setUrl('https://goerli.etherscan.io/')
        else if (ethNet == 'sepolia')
            setUrl('https://sepolia.etherscan.io/')
    }
    useEffect(() => {
        networkSelected()
    }, [ethNet])
    return (
        <div>
            <nav style={{ 'width': '100%' }}>
                <ul>
                    <img src={logo} alt='Logo' style={{ 'width': '25px' }}></img>
                    <li><a href={url} target='_blank'>
                        <strong>Mini Etherscan</strong></a></li>
                </ul>
                <ul role='listbox'>
                    <li><a href={url} target='_blank'>Home</a></li>
                    <li>
                        <select id='network' onClick={handleChange} onChange={SelectedItem(ethNet)}>
                            <option value="mainnet" >Mainnet</option>
                            <option value="goerli" >Goerli Testnet</option>
                            <option value="sepolia" >Sepolia Testnet</option>
                        </select>
                    </li>
                </ul>
            </nav>
        </div>
    )
}








