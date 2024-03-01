import React, {FC, useEffect, useState} from "react";
import {fetchData} from "../../core/store/action-creators/data";
import {dataSlice, selectDataReducers} from "../../core/store/reducers/data-slice";
import {useAppDispatch} from "../../core/hooks/use-app-dispatch";
import {useAppSelector} from "../../core/hooks/use-app-selector";
import {Item} from "../../core/types/data";
import Modal from "./Modal";

const Table: FC = () => {
    const storedData = localStorage.getItem('data');
    const dispatch = useAppDispatch();
    const {items, error, isLoading} = useAppSelector(selectDataReducers);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        dispatch(dataSlice.actions.dataChanging(storedData ? JSON.parse(storedData) : []));
    }, []);

    const confirmRemove = (id: string) => {
        setShowModal(true);
        setSelectedItemId(id);
    }

    const sortByColumn = (column: keyof Item) => {
        const sortedData = [...items].sort((a, b) => a[column].localeCompare(b[column]));
        dispatch(dataSlice.actions.dataChanging(sortedData));
    }

    return (
        <>
            <button onClick={() => dispatch(fetchData())}>Load data</button>
            <button onClick={() => dispatch(dataSlice.actions.dataChanging([]))}>Clear data</button>
            {isLoading && !error && !items.length && <p>Loading...</p>}
            {items.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => sortByColumn('name')}>Name</th>
                        <th onClick={() => sortByColumn('gender')}>Gender</th>
                        <th onClick={() => sortByColumn('eye_color')}>Eye color</th>
                        <th onClick={() => sortByColumn('hair_color')}>Hair color</th>
                        <th onClick={() => sortByColumn('skin_color')}>Skin color</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.gender}</td>
                            <td>{item.eye_color}</td>
                            <td>{item.hair_color}</td>
                            <td>{item.skin_color}</td>
                            <td>
                                <button onClick={() => confirmRemove(item.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )
            }
            {!items.length && !isLoading && !error && <p>No data</p>}
            {error && <p>{error}</p>}
            {showModal
                &&
                <Modal
                    selectedItemId={selectedItemId}
                    items={items}
                    setShowModal={setShowModal}
                    setSelectedItemId={setSelectedItemId}
                />
            }
        </>
    )
}
export default Table;