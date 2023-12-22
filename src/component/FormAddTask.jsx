import React,{useState, useEffect} from 'react'

export default function FormAddTask({tables, addTask, hideFormUpdateTask, context, updateTask, taskToEdit}) {
    console.log(context)
    const [tableId, setTableId] = useState(0)
    const [taskContent, setTaskContent] = useState(context === 'edit' ? taskToEdit.content : '')

  return (
    <div className="popup-overlay" onClick={()=>{
        hideFormUpdateTask()
    }}>
        <div 
        onClick={(e)=>{
                e.stopPropagation()
        }}
        className="m-3 border p-3 rounded-3" style={{backgroundColor: '#ffffffd6'}}>
            <form onSubmit={(e)=>{
                    e.preventDefault()
                    
                    if( context === 'add' && tableId.toString() === '0'){
                        alert('Veuillez choisir un tableau pour votre tâche.'); return
                    }

                    if(context === 'add'){
                        addTask(taskContent, tableId)
                    }else{
                        updateTask(taskContent, taskToEdit.id)
                    }
                    
                    setTaskContent('')
                    setTableId(0)
                }}>
                <div className="form-group">
                        {context === 'add' && 
                        <select className="form-control" value={tableId} onChange={(e)=>{
                            setTableId(e.target.value)
                        }}>
                            <option value={0}>---</option>
                            {tables.map((table)=>{
                                return <option key={table.id} value={table.id}>{table.title}</option>
                            })}
                        </select>}
                </div>
                <div className="form-group">
                    <label>Tâche</label>
                    <input type="text" className='form-control' value={taskContent} onChange={(e)=>{
                        setTaskContent(e.target.value)
                    }} />
                    <input type="submit" className='btn btn-success' value={context === 'edit' ? 'Modifier la tâche' : "Ajouter une tâche"} /> 
                </div>
            </form>
        </div>
    </div>
  )
}
