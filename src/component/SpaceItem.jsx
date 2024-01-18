import React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import { store } from '../redux/store'
import { addSpaceToDelete, removeSpaceToDelete, setSpaceToEdit, setViewFormEditSpace } from '../redux/space/SpaceSlice'
import { useSelector } from 'react-redux'

export default function SpaceItem({space}){

    const spacesToDelete = useSelector(state => state.space.spacesToDelete)

    return (
        <div className="card ms-2 me-2 mt-1 " style={{ width: "18rem", height: '200px', border: '1px solid black', backgroundColor: space.color }}>
            <Box>
                <button style={{ top: "0px", right: '0px' }}  className="btn btn-success position-absolute" onClick={()=>{ 
                    console.log('toto')
                    store.dispatch(setViewFormEditSpace(true))
                    store.dispatch(setSpaceToEdit(space))
                 }} >Edit</button>
                 <input type="checkbox" checked={spacesToDelete.includes(space.id.toString())} onClick={()=>{
                    if(spacesToDelete.includes(space.id.toString())){
                        store.dispatch(removeSpaceToDelete(space.id.toString()))
                    }else{
                        store.dispatch(addSpaceToDelete(space.id.toString()))
                    }
                
                  }} />
                <Link to={`/space/${space.id}/tables`} className="col-md-3">
                    <p className="text-center">{space.title}</p>
                </Link>
            </Box>
        </div>
    )

}