import MainHeader from "../Components/MainHeader/MainHeader";
import "../Styles/freeAgentsPage.css";
import Table from "../Components/Table/Table.js";

const FreeAgentsPage = () => {
    return (
        <div className="fa-page">
            <MainHeader />
            <div>FILTERS</div>
            <Table
                headers={["test"]}
                roster={["test"]}
                rosterPlacement={[]}
                setRosterPlacement={null}
                filterKeys={null}
                title={"players"}
            />
        </div>
    );
};

export default FreeAgentsPage;
