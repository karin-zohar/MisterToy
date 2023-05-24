import { NavLink } from "react-router-dom"

export function AppHeader() {

    return (
        <header className="app-header main-layout full
">
            <div className="logo">Mister Toy</div>

            <nav>
                <NavLink to="/">Home</NavLink> 
                <NavLink to="/about">About</NavLink> 
                <NavLink to="/toy">Toys</NavLink> 
                <NavLink to="/dashboard">Dashboard</NavLink> 
            </nav>
        </header>
    )
}