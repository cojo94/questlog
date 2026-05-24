import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="header">
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </header>
    )
}

export default Header