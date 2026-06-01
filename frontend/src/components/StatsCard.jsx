export default function StatsCard({ label, value }) {
    return (
        <div className="stats-card">
            <span className="stats-label">{label}: </span>
            <span className="stats-value">{value}</span>
        </div>
    )
}