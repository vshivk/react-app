import React from "react";

export interface DataState {
    items: Item[],
    isLoading: boolean,
    error: string,
}

export interface Item {
    id: string,
    name: string,
    gender: string,
    eye_color: string,
    hair_color: string,
    skin_color: string,
}

export interface modalProps {
    selectedItemId: string,
    items: Item[],
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedItemId: React.Dispatch<React.SetStateAction<string>>
}