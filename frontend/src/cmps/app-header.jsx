import { NavLink } from "react-router-dom"

export function AppHeader() {

    return (
        <header className="app-header">
            <div className="logo">MisterToy</div>

            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/toy">Toys</NavLink> 
            </nav>
        </header>
    )
}