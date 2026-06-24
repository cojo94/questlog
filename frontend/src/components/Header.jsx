import { NavLink } from 'react-router-dom'

function Header() {
    return (
        <header className="header">
            <NavLink to="/" className="header-title">QuestLog</NavLink>
            <nav className="nav">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/stats"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Stats
                </NavLink>
            </nav>
        </header>
    )
}

export default Header