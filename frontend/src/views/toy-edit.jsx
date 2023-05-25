import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { saveToy } from "../store/toy.actions"
import { toyService } from "../services/toy.service"
import { labelService } from "../services/label.sevice"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ToyEdit() {
    const params = useParams()
    const toyToEdit = useSelector((storeState) => storeState.toyModule.toys.find(toy => toy._id === params.toyId)) || toyService.getEmptyToy()
    const [updatedToy, setUpdatedToy] = useState(toyToEdit)
    const navigate = useNavigate()
    const [labels, setLabels] = useState([])

    useEffect(() => {
        if (!params.toyId) return
        labelService.query()
            .then(labels => {
                setLabels(labels)
                loadToy()
            })
        // eslint-disable-next-line
    }, [])

    function loadToy() {
        toyService.getById(params.toyId)
            .then((toy) => setUpdatedToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (type === 'checkbox') value = target.checked
        else value = (type === 'number') ? +value : value
        setUpdatedToy((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onHandleLabel({ target }) {
        const label = target.id;
        setUpdatedToy((prevToy) => {
            const labelIndex = prevToy.labels.findIndex((curLabel) => curLabel === label);
            if (labelIndex === -1) {
                return {
                    ...prevToy,
                    labels: [...prevToy.labels, label],
                };
            } else {
                const updatedLabels = prevToy.labels.filter((curLabel) => curLabel !== label);
                return {
                    ...prevToy,
                    labels: updatedLabels,
                };
            }
        });
    }


    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(updatedToy)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    function getLabelClass(label) {
        const labelsAsStr = JSON.stringify(updatedToy.labels)
        console.log('labelsAsStr: ', labelsAsStr)
        const isActive = labelsAsStr.includes(label) ? '' : 'inactive-label'
        const labelType = label.toLowerCase().replaceAll(' ', '-')
        return `label ${isActive} ${labelType}`
    }

    const { name, price, inStock, imgUrl } = updatedToy

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter toy name"
                    value={name}
                    autoFocus
                    onChange={handleChange}
                />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="0.00"
                    value={price}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In Stock</label>
                <input
                    type="checkbox"
                    name="inStock"
                    id="inStock"
                    // value={inStock}
                    checked={inStock}
                    onChange={handleChange}
                />

                <label htmlFor="imgUrl">Image URL:</label>
                <input 
                type="text"
                id="imgUrl"
                name="imgUrl"
                placeholder="Paste a link to the product image here"
                value={imgUrl}
                onChange={handleChange}
                />

                <div className="label-container">
                    <ul>
                        {labels.map(label => {
                            return <li
                                onClick={onHandleLabel}
                                id={label}
                                key={label}
                                className={getLabelClass(label)}
                            >
                                {label}
                            </li>
                        })}
                    </ul>
                </div>

                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )

}