import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function InStockPercentPerLabelChart({ toys, inStockPercentByLabel, colors }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Availability Percent By Label',
            },
        },
    };

    const labels = inStockPercentByLabel.map(toy => toy.label)
    const data = {
        labels,
        datasets: [
            {
                label: 'Percentage of toys in stock',
                data: labels.map(label => inStockPercentByLabel.find(l => l.label === label).percentage),
                backgroundColor: colors
            },

        ],
    }

    return <Bar options={options} data={data} />;
}
