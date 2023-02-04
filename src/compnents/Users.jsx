import '../App.css'
export default ({ users }) => {
    return (
        <div>
            <table role="grid">
                <thead>
                    <tr>
                        <th scope="col">Login</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => {
                        return (
                            <tr key={key}>
                                <td>{user.login}</td>
                                <td><img className='img' src={user.avatar_url} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}