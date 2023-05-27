import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadToys } from '../store/toy.actions'
import { PricesPerLabelChart } from "../cmps/prices-per-label-chart"
import { InStockPercentPerLabelChart } from '../cmps/in-stock-percent-per-label-chart'
import { chartService } from '../services/chart.service'
import { SalesPerMonthsChart } from '../cmps/sales-per-month-chart'
import { utilService } from '../services/util.service'


export function Dashboard() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    console.log('chartService.getInStockPercentByLabel(toys): ', chartService.getInStockPercentByLabel(toys))
    useEffect(() => {
        loadToys()
    }, [])

    console.log('chartService.getInStockPercentByLabel(toys) : ', chartService.getInStockPercentByLabel(toys))
    const averagePricePerLabel = chartService.getAveragePricePerLabel(toys)
    const inStockPercentByLabel = chartService.getInStockPercentByLabel(toys)
    const getRandomIntInclusive = utilService.getRandomIntInclusive

    const colors = [
        '#7B88FF',
        '#FFC75F',
        '#FF75A0',
        '#FF9C71',
        '#A5AEFF',
        '#E7A4E4',
        '#E7305B',
        '#75CFB8'
    ]

    return (
        <section className="dashboard">
            <h1>Let's play with some numbers</h1>

            <section className="charts">
                    <div>
                        <p>Here in Mister Toy, we are committed to full transparency and integrity towards our customers. This is why we make sure to publish easily accessible information for the benefit of everyone who loves toys as much as we do. 
                        </p>
                        <p>If you wish to find out more, please contact us at inquiries@mistertoy.com or call 1-800-toys. </p>
                    </div>
                <div>
                    <InStockPercentPerLabelChart
                        toys={toys}
                        inStockPercentByLabel={inStockPercentByLabel}
                        colors={colors}
                    />
                </div>
                <div>
                    <SalesPerMonthsChart 
                    getRandomIntInclusive={getRandomIntInclusive}
                    />
                </div>

                <div>
                    <PricesPerLabelChart
                        toys={toys}
                        averagePricePerLabel={averagePricePerLabel}
                        colors={colors}
                    />
                </div>

            </section>

        </section>
    )
}