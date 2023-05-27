import { NavLink } from "react-router-dom"
import { useEffect, useState } from 'react'

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(prevIsMenuOpen => !prevIsMenuOpen)
    }

    const isOpen = (isMenuOpen) ? 'menu-open' : ''
    return (
        <header className="app-header main-layout full">
            <NavLink to="/">
                <div className="logo">Mister Toy</div>
            </NavLink>

            <nav className={isOpen}>
                <div className="hamburger-btn" onClick={() => toggleMenu()}></div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </header>
    )
}