import React, {useState} from 'react'

export default function FormSupTable({deleteTable, tables}) {

    const [idTableSelected, setIdTableSelected] = useState('0')

  return (
    <form onSubmit={(e)=>{
        e.preventDefault()
        console.log(idTableSelected)
        idTableSelected = 0
        if(idTableSelected.toString() === '0'){
            alert('Veuillez sélectionner un tableau à supprimer.'); return
        }
        deleteTable(idTableSelected)
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
  )
}
