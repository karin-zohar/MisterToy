const fs = require('fs')
var toys = require('../data/toy.json')

function query(filterBy = {}, sort = {}) {
    let filteredToys = toys
    if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        filteredToys = filteredToys.filter(toy => regExp.test(toy.name))
    }

    if (filterBy.price) {
        filteredToys = filteredToys.filter(toy => toy.price <= filterBy.price)
    }

    if (filterBy.inStock) {
        filteredToys = filteredToys.filter(toy => toy.inStock)
    }

    const { sortBy, desc } = sort
    if (sortBy === 'name') {
        filteredToys.sort((a, b) => desc * a.name.localeCompare(b.name))
    }
    else if (sortBy === 'createdAt') {
        filteredToys.sort((a, b) => desc * (new Date(b.createdAt) - new Date(a.createdAt)))
    }
    else {
        filteredToys.sort((a, b) => desc * (b[sortBy] - a[sortBy]))
    }

    return Promise.resolve(filteredToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found!')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    const toy = toys[idx]
    toys.splice(idx, 1)
    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such toy')
        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
        toyToUpdate.inStock = toy.inStock
        toyToUpdate.labels = [...toy.labels]
        toyToUpdate.imgUrl = toy.imgUrl
    } else {
        toy._id = _makeId()
        toys.push(toy)
    }

    return _saveToysToFile().then(() => toy)
    // return Promise.resolve(toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {

        const toysStr = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', toysStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}


module.exports = {
    query,
    get,
    remove,
    save
}

