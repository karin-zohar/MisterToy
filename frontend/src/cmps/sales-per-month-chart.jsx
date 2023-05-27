import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function SalesPerMonthsChart({getRandomIntInclusive}) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Sales Per Month',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: '2020',
                data: labels.map(() => getRandomIntInclusive(0,1000)),
                borderColor: '#E7A4E4',
                backgroundColor: '#E7A4E4',
            },
            {
                label: '2021',
                data: labels.map(() => getRandomIntInclusive(0,1000)),
                borderColor: '#FFC75F',
                backgroundColor: '#FFC75F',
            },
            {
                label: '2022',
                data: labels.map(() => getRandomIntInclusive(0,1000)),
                borderColor: '#7B88FF',
                backgroundColor: '#7B88FF',
            },
        ],
    };

    return <Line options={options} data={data} />;
}
