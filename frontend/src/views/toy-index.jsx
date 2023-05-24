import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy } from '../store/toy.actions.js'
import { ToyFilter } from "../cmps/toy-filter"
import { ToyList } from '../cmps/toy-list'
import { SET_FILTER_BY, SET_SORT_BY } from '../store/toy.reducer.js'

export function ToyIndex() {
    const dispatch = useDispatch()
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const sortBy = useSelector((storeState) => storeState.toyModule.sortBy)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys(filterBy, sortBy)
    }, [filterBy, sortBy])


    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilter(filterToEdit) {
        dispatch({ type: SET_FILTER_BY, filterToEdit: { ...filterToEdit } })
    }

    function onSetSort(sortToEdit) {
        dispatch({ type: SET_SORT_BY, sortToEdit: { ...sortToEdit } })
    }


    return (
        <section className="toy-index">
            <h1>Find the right toy for <span>you</span></h1>
            <main>
                <ToyFilter
                    onSetFilter={onSetFilter}
                    onSetSort={onSetSort}
                />
                <button>
                    <Link to={`/toy/edit`}>Add Toy</Link>
                </button>
                {isLoading && <h4>Loading...</h4>}
                <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />
            </main>
        </section>
    )
}