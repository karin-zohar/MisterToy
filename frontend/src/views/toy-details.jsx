import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from "../services/util.service"
import { toyService } from "../services/toy.service"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [])

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    function getLabelClass(label) {
        return 'label ' + label.toLowerCase().replaceAll(' ', '-')
    }

    if (!toy) return <div>Loading...</div>
    const price = utilService.padNum(toy.price)
    return <section className="toy-details">
        <h1>{toy.name}</h1>
        <p>${price}</p>
        <p>{(toy.inStock) ? 'Available' : 'Out of stock'}</p>

        <div className="label-container">
            <ul>
                {toy.labels.map(label =>
                    <li
                        id={label}
                        key={label}
                        className={getLabelClass(label)}
                    >
                        {label}
                    </li>
                )}
            </ul>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
        <button><Link to={`/toy`}>Back</Link></button>
    </section>
}