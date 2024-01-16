import React, {useState} from 'react'
import { styleModal } from '../utils/styles'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import { deleteTable, setFormDropTableVisible } from '../redux/table/TableSlice'

export default function FormSupTable({tables}) {

    const [idTableSelected, setIdTableSelected] = useState('0')

  return (
    <div className="popup-overlay">
        <div className="m-3 border p-3 rounded-3" style={{backgroundColor: '#ffffffd6'}}>
        <button className="btn btn-danger" onClick={()=>{
                store.dispatch( setFormDropTableVisible(false) )
        }}>Fermer</button>
        <form onSubmit={(e)=>{
            e.preventDefault()
            if(idTableSelected.toString() === '0'){
                alert('Veuillez sélectionner un tableau à supprimer.'); return
            }
            store.dispatch(deleteTable(idTableSelected))
            store.dispatch( displayMessage({texte: 'Tâche supprimée avec succès !', typeMessage: 'success'}) )
            setIdTableSelected('0')
        }}>
            <div className="form-group">
                <label>Supprimer un tableau</label>
                <select className="form-control" value={idTableSelected} onChange={(e)=>{
                    setIdTableSelected(e.target.value)
                }}>
                    <option value={'0'}>---</option>
                    {tables.map((table)=>{
                        return <option key={table.id} value={table.id}>{table.title}</option>
                    })}
                </select>
                <div className="form-group">
                    <input type="submit" className="btn btn-danger" value="Supprimer"/>
                </div>
            </div>
        </form>        
    </div>
    </div>

  )
}
