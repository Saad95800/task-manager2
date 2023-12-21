import React,{useState} from 'react'

export default function FormAddTask({tables, addTask, setFormAddTaskVisible}) {

    const [tableId, setTableId] = useState(0)
    const [taskContent, setTaskContent] = useState('')

  return (
    <div className="popup-overlay">
        <div className="m-3 border p-3 rounded-3" style={{backgroundColor: '#ffffffd6'}}>
            <button className="btn btn-danger" onClick={()=>{
                setFormAddTaskVisible(false)
            }}>Fermer</button>
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
                    <input type="text" className='form-control' value={taskContent} onChange={(e)=>{
                        setTaskContent(e.target.value)
                    }} />
                    <input type="submit" className='btn btn-success' value="Ajouter une tâche" /> 
                </div>
            </form>
        </div>
    </div>
  )
}
