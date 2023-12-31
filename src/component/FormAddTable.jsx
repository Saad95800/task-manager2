import React, {useState} from 'react'

export default function FormAddTable({addTable, context, hideFormUpdateTable, tableToEdit, updateTable}) {

    const [title, setTitle] = useState(context === 'edit' ? tableToEdit.title : '')

  return (
    <div className="popup-overlay" onClick={()=>{
        hideFormUpdateTable()
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
                    addTable(title)
                }else{
                    updateTable(title, tableToEdit.id)
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
