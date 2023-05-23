import { Link } from "react-router-dom"
import { utilService } from '../services/util.service'

export function ToyPreview({ toy }) {
    const price = utilService.padNum(toy.price)

    return (
        <section className="toy-preview">
            <h2>{toy.name}</h2>
            <p>${price}</p>
        </section>
    )
}