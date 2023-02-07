export default ({ transactions, latestBlocksBalance }) => {

    return (
        <div>
            <table role="grid">
                <thead>
                    <td colSpan='5'>
                        <b>Latest Transactions</b>
                    </td>
                    <hr />
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Hash</th>
                        <th scope="col">Miner</th>
                        <th scope='col'>Balance</th>
                        <th scope="col">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((block, key) => {
                        return (
                            <tr key={key}>
                                <th scope='row'>
                                    <a href={`https://etherscan.io/block/${block.number}`} target='_blank'>
                                        {block.number}
                                    </a></th>
                                <td> {block.hash.substring(0, 20)}...</td>
                                <td>
                                    <a href={`https://etherscan.io/address/${block.miner}`} target='_blank'>
                                        {block.miner.substring(0, 20)}...
                                    </a>
                                </td>
                                <td>{latestBlocksBalance[key].substring(0, 7) + ' ETH'}</td>
                                <td>
                                    {block.timestamp}
                                    <br />
                                    {new Date(block.timestamp * 1000).toLocaleString()}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='5'>
                            <center>
                                <a href='https://etherscan.io/txs' target='_blank'>
                                    View all transactions
                                </a>
                            </center>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}