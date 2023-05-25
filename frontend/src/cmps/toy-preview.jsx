import { Link } from "react-router-dom"
import { utilService } from '../services/util.service'
import defaultImg from '../assets/img/default-img.png'

export function ToyPreview({ toy }) {
    const price = utilService.padNum(toy.price)
    const toyImg = (toy.imgUrl) ? toy.imgUrl : defaultImg
    
    return (
        <section className="toy-preview">
            <h2>{toy.name}</h2>
            <p className="price">${price}</p>
            <div className="img-wrapper">
                <img src={toyImg} alt="toy" />
            </div>
        </section>
    )
}