import "../navbar/nav.css"

function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="site-title">Todo List</a>
            <ul>
                <li>
                    <a href="/">New List</a>
                </li>
                <li>
                    <a href="/list">Dark/Light Mode</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;