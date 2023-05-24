import { NavLink } from "react-router-dom"
import heroImg from '../assets/img/hero.svg'

export function HomePage() {
    return (
        <section className="home-page">
            <div className="hero">
                <h1>Awesome toys for awesome kids.</h1>
                <img src={heroImg} alt="Illustration of a little girl playing with a teddy bear." />
                <button className='hero-btn btn'>
                    <NavLink to="/toy">
                        Find toys
                    </NavLink>
                </button>

            </div>
        </section>
    )
}