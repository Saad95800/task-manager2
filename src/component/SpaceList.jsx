import React from 'react'
import {useSelector} from 'react-redux'
import SpaceItem from './SpaceItem'
import FormEditSpace from './FormEditSpace'
import { deleteTasksByTablesId } from '../redux/task/TaskSlice'
import { deleteSpaces, setContextSpace, setViewFormEditSpace } from '../redux/space/SpaceSlice'
import { deleteTablesBySpacesId } from '../redux/table/TableSlice'
import { store } from '../redux/store'

export default function SpaceList(){

    const viewFormEditSpace = useSelector(state => state.space.viewFormEditSpace)
    const spaces = useSelector((state) => state.space.spaces)
    const tables = useSelector((state) => state.table.tables)
    const spacesToDelete = useSelector((state) => state.space.spacesToDelete)

    const getTablesToDeleteBySpacesToDelete = (spacesToDelete) => {
        let tablesToDelete = []

        for(let t of tables){
            if(spacesToDelete.includes(t.spaceId)){
                tablesToDelete.push(t.id)
            }
        }
        return tablesToDelete
    }

    return (
        <div className="container mt-3">
            <button className="btn btn-danger" onClick={()=>{
                let tablesToDelete = getTablesToDeleteBySpacesToDelete(spacesToDelete)
                store.dispatch(deleteTasksByTablesId(tablesToDelete))
                store.dispatch(deleteTablesBySpacesId(spacesToDelete))
                store.dispatch(deleteSpaces())
            }}>Supprimer en masse</button>
            <button className="btn btn-success" onClick={()=>{ 
                store.dispatch(setViewFormEditSpace(true))
                store.dispatch(setContextSpace('add'))
             }}>Ajouter</button>
            <div className="row">
                {spaces.map((space, i) => {
                    return <SpaceItem space={space} key={i} />
                })}
                {viewFormEditSpace && <FormEditSpace />}
            </div>
        </div>
    )

}