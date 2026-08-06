import "./FilterSelect.css";

export default function FilterSelect({
    label,
    options,
    value,
    onChange
}) {
    return (
        <div className="filter-select">

            <label>{label}</label>

            <select
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>

        </div>
    );
}