import "./SummaryCard.css";

export default function SummaryCard({
    icon,
    iconColor,
    iconBackground,
    title,
    value,
    footer,
}) {
    return (
        <div className="stats-overview-card">

            <div
                className="stats-icon"
                style={{
                    background: iconBackground,
                    color: iconColor
                }}
            >
                {icon}
            </div>

            <div className="stats-info">

                <h4>{title}</h4>

                <h2>{value}</h2>

                <p>{footer}</p>

            </div>

        </div>
    );
}