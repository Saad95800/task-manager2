import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    spaces: [
        {
            id: 1,
            title: 'Espace cloud campus'
        },
        {
            id: 2,
            title: 'Espace jod freelance'
        },
        {
            id: 3,
            title: 'Espace jod freelance'
        },
        {
            id: 4,
            title: 'Espace jod freelance'
        },
        {
            id: 5,
            title: 'Espace jod freelance'
        }
    ]
}

export const SpaceSlice = createSlice({
    name: 'space',
    initialState: initialState,
    reducers: {
    }
})

export const {
} = SpaceSlice.actions

export default SpaceSlice.reducer

