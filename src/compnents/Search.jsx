import { useEffect, useState } from 'react';
import '../App'
export default ({ ethNet = 'mainnet' }) => {
    const [searchQuery, setSearchQuery] = useState(null)
    const [paraUrl, setParaUrl] = useState('Address')
    const [baseUrl, setBaseUrl] = useState('mainnet')
    const [searchState, setSearchState] = useState('Address')
    const [url, setUrl] = useState(null)

    const handleChange = (e) => {
        setSearchState(`Search by ${paraUrl}`)
        if (!e) {
            setUrl(`${baseUrl}${paraUrl}/${searchQuery}`)

            return
        }
        setParaUrl(e.target.value)
        //  if (paraUrl == 'address')
        setUrl(`${baseUrl}${paraUrl}/${searchQuery}`)

    }

    const networkSelected = () => {
        if (ethNet == 'mainnet')
            setBaseUrl('https://etherscan.io/')
        else if (ethNet == 'goerli')
            setBaseUrl('https://goerli.etherscan.io/')
        else if (ethNet == 'sepolia')
            setBaseUrl('https://sepolia.etherscan.io/')
    }

    //url =     baseurl / paraUrl / searchQuery
    // url = `https://etherscan.io/block/12321313`
    // url = `https://etherscan.io/address/0xe6A7a1d47ff21B6321162AEA7C6CB457D5476Bca`
    // url = `https://etherscan.io/tx/0xbbd5bca46368afe54e8fd9d2e4311bb379cc3f539dee110cc1545d85b378e331`

    useEffect(() => {
        networkSelected()
        handleChange()
    }, [searchQuery, ethNet, paraUrl])
    return (
        <>
            <article>

                < form action={url} target='_blank' >
                    <input type="search"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-contorl"
                        placeholder={searchState} />
                    <select id='network' onChange={handleChange}>
                        <option value="Address" >Address</option>
                        <option value="Block" >Block</option>
                        <option value="Tx" >Txn Hash</option>
                    </select>
                    <input type="submit" value="Search" />
                </form >
            </article>
        </>

    )
};

