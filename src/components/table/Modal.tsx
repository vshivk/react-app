import React, {FC} from "react";
import {dataSlice} from "../../core/store/reducers/data-slice";
import {useAppDispatch} from "../../core/hooks/use-app-dispatch";
import {modalProps} from "../../core/types/data";

const Modal: FC<modalProps> = ({setShowModal, selectedItemId, setSelectedItemId, items}) => {
    const dispatch = useAppDispatch();

    const removeString = () => {
        if (selectedItemId) {
            const data = items.filter(item => item.id !== selectedItemId);
            dispatch(dataSlice.actions.dataChanging(data));
            setShowModal(false);
            setSelectedItemId('');
        }
    }

    return (
        <div className={'modal'}>
            <div className={'modal-body'}>
                <p>Are you sure?</p>
                <button onClick={() => removeString()}>Yes</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
        </div>
    )
}
export default Modal;