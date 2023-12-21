import React, {useState} from 'react'

export default function FormAddTable({addTable, setFormAddTableVisible}) {

    const [title, setTitle] = useState('')

  return (
    <div className="popup-overlay">
        <div className="m-3 border p-3 rounded-3 bg-forms" style={{margin: 'auto', backgroundColor: '#ffffffd6'}}>
            <button className="btn btn-danger" onClick={()=>{
                setFormAddTableVisible(false)
            }}>Fermer</button>
            <form onSubmit={(e)=>{
                e.preventDefault()
                if(title.trim().length === 0){
                    alert("Veuillez saisir un titre au tableau."); return
                }
                addTable(title)
                setTitle('')
            }}>
                <div className="form-group">
                    <label>Ajouter un tableau</label>
                    <input type="text" className="form-control" value={title} onChange={(e)=>{ setTitle(e.target.value) }} />
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary" value="Ajouter"/>
                </div>
            </form>   
        </div>
    </div>
  )
}
