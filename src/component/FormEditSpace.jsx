import React, { useState } from 'react'
import { addSpace, setSpaceToEdit, setViewFormEditSpace, updateSpace } from '../redux/space/SpaceSlice'
import { store } from '../redux/store'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material' 
import Modal from '@mui/material/Modal';
import {style} from './styleModal'
import { addSpacesAPI } from '../api/SpaceAPI'
import { v4 as uuidv4 } from 'uuid'
export default function FormEditSpace(){

    const spaces = useSelector((state) => state.space.spaces)
    const spaceToEdit = useSelector((state) => state.space.spaceToEdit)
    const contextSpace = useSelector((state) => state.space.contextSpace)
    const viewFormEditSpace = useSelector((state) => state.space.contextSpace)
    const [title, setTitle] = useState(spaceToEdit !== null ? spaceToEdit.title : '')
    const [color, setColor] = useState('#fff')

    return (
        <Modal
            open={viewFormEditSpace}
            onClose={()=>{ 
                store.dispatch(setViewFormEditSpace(false))
                store.dispatch(setSpaceToEdit(null))
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h3>{contextSpace === "add" ? 'Ajouter un espace' : "Modifier un espace"}</h3>
                <form onSubmit={async (e)=>{
                    e.preventDefault()
                    if(contextSpace === 'edit'){
                        if(spaceToEdit !== null){
                            store.dispatch(updateSpace({title, spaceId: spaceToEdit.id, color: color}))
                        }
                    }else{
                        let id = await addSpacesAPI(title, color)
                        store.dispatch(addSpace({id, title, color: color}))
                    }
                }}>
                    <div className="form-group">
                        <input type="text" className='form-control' value={title} onChange={(e)=>{ setTitle(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <input type="color" className='form-control form-control-color' value={color} onChange={(e)=>{ setColor(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-primary'>Enregistrer</button>
                    </div>
                </form>
            </Box>
        </Modal>
    )

}