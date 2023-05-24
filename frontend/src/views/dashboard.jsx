import { PricesPerLabelChart } from "../cmps/prices-per-label-chart"

export function Dashboard() {
    return (
        <section className="dashboard">
            <h1>dashboard</h1>

            <div>
                <PricesPerLabelChart />
            </div>
        </section>
    )
}