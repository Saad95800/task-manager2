import React from 'react'
import { hideMessage } from '../redux/message/MessageSlice'
import { useSelector } from 'react-redux'
import { store } from '../redux/store'
export default function Message(){

    const texte = useSelector((state) => state.message.texte)
    const typeMessage = useSelector((state) => state.message.typeMessage)

    return (
        <div className={`d-flex justify-content-between ${typeMessage !== '' ? (typeMessage==='success' ? 'bg-success' : 'bg-danger') : ''}`}
            style={{height: '50px', width: '100%', position: 'fixed', top: '0px', left: '0px', padding: '10px' }}
        >
            <p style={{color: 'white', fontWeight: 'bold'}}>{texte}</p>
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{ 
                store.dispatch( hideMessage() )
             }}></button>
        </div>
    )

}