import React from 'react';
import { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend, Title);

export function PricesPerLabelChart({ averagePricePerLabel, colors }) {
    const toyLabels = averagePricePerLabel.labels

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Price Per Label ',
            },
        },
    }

    const data = {
        labels: toyLabels,
        datasets: [
            {
                label: 'Average Price Per Label',
                data: averagePricePerLabel.values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
            },
        ],
    }


    return <Doughnut data={data} options={options} />;
}
