import React,{useState} from 'react'

export default function FormAddTask({tables, addTask}) {

    const [tableId, setTableId] = useState(0)
    const [taskContent, setTaskContent] = useState('')

  return (
    <form onSubmit={(e)=>{
        e.preventDefault()
        if(tableId.toString() === '0'){
            alert('Veuillez choisir un tableau pour votre tâche.'); return
        }
        addTask(taskContent, tableId)
        setTaskContent('')
        setTableId(0)
    }}>
        <div className="form-group">
                <select className="form-control" value={tableId} onChange={(e)=>{
                    setTableId(e.target.value)
                }}>
                    <option value={0}>---</option>
                    {tables.map((table)=>{
                        return <option key={table.id} value={table.id}>{table.title}</option>
                    })}
                </select>
        </div>
        <div className="form-group">
            <label>Tâche</label>
            <input type="text" value={taskContent} onChange={(e)=>{
                setTaskContent(e.target.value)
            }} />
            <input type="submit" value="Ajouter une tâche" /> 
        </div>
    </form>
  )
}
