import React, {useState} from 'react'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'
import { addTable, hideFormUpdateTable, updateTable } from '../redux/table/TableSlice'
import { useSelector } from 'react-redux'

export default function FormAddTable({context}) {

    const tableToEdit = useSelector((state) => state.table.tableToEdit)

    const [title, setTitle] = useState(context === 'edit' && tableToEdit !== null ? tableToEdit.title : '')

  return (
    <div className="popup-overlay" onClick={()=>{
        store.dispatch(hideFormUpdateTable())
    }}>
        <div 
        onClick={(e)=>{
                e.stopPropagation()
            }}
        className="m-3 border p-3 rounded-3 bg-forms" style={{margin: 'auto', backgroundColor: '#ffffffd6'}}>
            <form onSubmit={(e)=>{
                e.preventDefault()
                if(title.trim().length === 0){
                    alert("Veuillez saisir un titre au tableau."); return
                }
                if(context === 'add'){
                    store.dispatch(addTable(title))
                    store.dispatch( displayMessage({texte: 'Tableau ajouté avec succès !', typeMessage: 'success'}) )
                }else{
                    store.dispatch(updateTable({tableTitle: title, id_table: tableToEdit.id}))
                    store.dispatch( displayMessage({texte: 'Tableau modifié avec succès !', typeMessage: 'success'}) )
                }
                setTitle('')
            }}
            >
                <div className="form-group">
                    <label>Ajouter un tableau</label>
                    <input type="text" className="form-control" value={title} onChange={(e)=>{ setTitle(e.target.value) }} />
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value={context === 'edit' ? 'Modifier' : "Ajouter"}/>
                </div>
            </form>   
        </div>
    </div>
  )
}
