export default ({ blocks }) => {
    return (
        <div>
            <table role="grid">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Hash</th>
                        <th scope="col">Miner</th>
                        <th scope="col">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {blocks.map((block, key) => {
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
                                <td>{block.timestamp}</td>
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='4'>
                            <center>
                                <a href='https://etherscan.io/blocks' target='_blank'>
                                    View all blocks
                                </a>
                            </center>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}