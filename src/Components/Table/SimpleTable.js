import "./style.css";

const SimpleTable = ({ headers, itemList }) => {
    const columnCount = headers.length;
    const gridTemplateColumns = `2fr ${"1fr ".repeat(columnCount - 1)}`;

    return (
        <div className="table">
            <div
                className="header"
                style={{ gridTemplateColumns: gridTemplateColumns }}
            >
                {headers.map((col, index) => (
                    <div key={index}>{col}</div>
                ))}
            </div>
            {itemList.map((item, index) => (
                <div key={index} className="row">
                    {headers.map((col, index) => (
                        <div key={index}>{item[col] || "-"}</div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SimpleTable;
