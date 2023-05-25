import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { toyService } from '../services/toy.service'
import { utilService } from '../services/util.service'
import { labelService } from '../services/label.sevice'
import { MultipleSelectChip } from './mulit-select-chip'

export function ToyFilter({ onSetFilter, onSetSort, labels }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const [sortByToEdit, setSortByToEdit] = useState(toyService.getDefaultSort())
    const [maxPrice, setMaxPrice] = useState(500)

    const formattedPrice = utilService.padNum(maxPrice)

    useEffect(() => {
        onSetFilter(filterByToEdit)

    }, [filterByToEdit])

    useEffect(() => {
        onSetSort(sortByToEdit)

    }, [sortByToEdit])

    function handleFilterChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'checkbox') value = target.checked
        else value = (type === 'number' || type === 'range') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleSortChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number' || type === 'range') ? +value : value
        setSortByToEdit((prevSort) => ({ ...prevSort, [field]: value }))
    }

    function setRangeLabel({ target }) {
        setMaxPrice(target.value)
    }

    return (
        <section className="toy-filter">
            <section className="sort">
                <h4>sort by:</h4>
                <select
                    name="sortBy"
                    id="sortBy"
                    defaultValue="createdAt"
                    onChange={handleSortChange}>
                    <option value="createdAt">createdAt</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                </select>

                <button value={1} onClick={handleSortChange} name="desc">&#8593;</button>
                <button value={-1} onClick={handleSortChange} name="desc" >&#8595;</button>
            </section>

            <section className="filter">

                <input
                    type="search"
                    id="search"
                    name="name"
                    placeholder="Search toys"
                    onChange={handleFilterChange}
                />
                <label htmlFor="price">Max price: ${formattedPrice}</label>
                <input
                    type="range"
                    id="price"
                    name="price"
                    min="0"
                    max="2000"
                    onChange={(event) => {
                        handleFilterChange(event)
                        setRangeLabel(event)
                    }}
                />

                <label htmlFor="inStock">In stock</label>
                <input
                    type="checkbox"
                    name="inStock"
                    onChange={handleFilterChange}
                />

                <MultipleSelectChip
                    names={labels}
                    handleFilterChange={handleFilterChange}
                />

            </section>


        </section>
    )
}