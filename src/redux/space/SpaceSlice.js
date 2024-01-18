import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    spaces: [
        {
            id: '1',
            title: 'Espace cloud campus',
            color: '#fff'
        },
        {
            id: '2',
            title: 'Espace jod freelance',
            color: '#fff'
        },
        {
            id: '3',
            title: 'Espace jod freelance',
            color: '#fff'
        },
        {
            id: '4',
            title: 'Espace jod freelance',
            color: '#fff'
        },
        {
            id: '5',
            title: 'Espace jod freelance',
            color: '#fff'
        }
    ],
    viewFormEditSpace: false,
    spaceToEdit: null,
    spacesToDelete: [],
    contextSpace: ''
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
        },
        setSpaceToDelete: (state, action) => {
            state.spacesToDelete = action.payload
        },
        addSpaceToDelete: (state, action) => {
            state.spacesToDelete.push(action.payload)
        },
        removeSpaceToDelete: (state, action) => {
            state.spacesToDelete = state.spacesToDelete.filter(s => s !== action.payload)
        },
        deleteSpaces: (state, action) => {
            state.spaces = state.spaces.filter(space => !state.spacesToDelete.includes(space.id))
            state.spacesToDelete = []
        },
        setContextSpace: (state, action) => {
            state.contextSpace = action.payload
        },
        addSpace: (state, action) => {
            let title = action.payload.title
            let color = action.payload.color
            state.spaces.push({
                id: uuidv4(),
                title,
                color
            })
            state.viewFormEditSpace = false
        },
    }
})

export const {
    setViewFormEditSpace,
    setSpaceToEdit,
    updateSpace,
    addSpaceToDelete,
    removeSpaceToDelete,
    deleteSpaces,
    addSpace,
    setContextSpace
} = SpaceSlice.actions

export default SpaceSlice.reducer

