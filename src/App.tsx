import React, {FC} from 'react';
import './styles/table.css';
import Table from "./components/table/Table";

const App: FC = () => {
    return (
        <div className="container">
            <Table/>
        </div>
    );
}

export default App;
