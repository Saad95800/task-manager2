import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    spaces: [
        {
            id: 1,
            title: 'Espace cloud campus',
            color: '#fff'
        },
        {
            id: 2,
            title: 'Espace jod freelance',
            color: '#fff'
        },
        {
            id: 3,
            title: 'Espace jod freelance',
            color: '#fff'
        },
        {
            id: 4,
            title: 'Espace jod freelance',
            color: '#fff'
        },
        {
            id: 5,
            title: 'Espace jod freelance',
            color: '#fff'
        }
    ],
    viewFormEditSpace: false,
    spaceToEdit: null
}

export const SpaceSlice = createSlice({
    name: 'space',
    initialState: initialState,
    reducers: {
        setViewFormEditSpace: (state, action)=>{
            state.viewFormEditSpace = action.payload
        },
        setSpaceToEdit: (state, action)=>{
            state.spaceToEdit = action.payload
        },
        updateSpace: (state, action)=>{
            let title = action.payload.title
            let spaceId = action.payload.spaceId
            let color = action.payload.color

            let index = state.spaces.findIndex(s => {
                return s.id === spaceId
            })

            state.spaces[index].title = title
            state.spaces[index].color = color
            state.viewFormEditSpace = false
            state.spaceToEdit = null
        }
    }
})

export const {
    setViewFormEditSpace,
    setSpaceToEdit,
    updateSpace
} = SpaceSlice.actions

export default SpaceSlice.reducer

