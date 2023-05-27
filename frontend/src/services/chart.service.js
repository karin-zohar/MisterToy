export const chartService = {
    getAveragePricePerLabel,
    getInStockPercentByLabel
}

function getAveragePricePerLabel(toys) {
    const totalPricesByLabel = toys.reduce((acc, toy) => {
        if (toy.labels.length) {
            toy.labels.forEach(label => {
                if (acc[label]) acc[label].price += toy.price
                if (!acc[label]) acc[label] = {
                    count: 0,
                    price: toy.price
                }
                acc[label].count++
            })
        }
        return acc
    }, {})

    const avgPricePerLabel = []
    for (const label in totalPricesByLabel) {
        avgPricePerLabel.push(totalPricesByLabel[label].price / totalPricesByLabel[label].count).toFixed(0)
    }
    const res = {
        labels: Object.keys(totalPricesByLabel),
        values: avgPricePerLabel
    }
    return res
}

function getToysByLabel(toys) {
    const toysByLabel = toys.reduce((acc, toy) => {
        if (toy.labels.length) {
            toy.labels.forEach(label => {
                if (!acc[label]) acc[label] = []
                acc[label].push(toy)
            })
        }
        return acc
    }, {})
    return toysByLabel
}

function getInStockPercentByLabel(toys) {
    const toysByLabel = getToysByLabel(toys)
    const inStockPercentages = []
    for (const label in toysByLabel) {
        const totalLength = toysByLabel[label].length
        const inStockLength = toysByLabel[label].filter(toy => toy.inStock).length
        const percentage = ((inStockLength / totalLength) * 100).toFixed(0)
        inStockPercentages.push({percentage: +percentage, label})
    }
    return inStockPercentages
}