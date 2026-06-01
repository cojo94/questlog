import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="header">
            <p className="header-title">QuestLog</p>
            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/stats">Stats</Link>
            </nav>
        </header>
    )
}

export default Header