import React from 'react'
import Task from './Task'

export default function Table({table, tasks, deletetask, moveTask , displayFormUpdateTable, displayFormUpdateTask}) {

  return (
    <div className="table p-2 m-3 rounded"
      onDrop={(e)=>{
        console.log('drop')
        let id_task = e.dataTransfer.getData('id_task')
        moveTask(id_task, table.id)
      }}
      onDragOver={(e)=>{
        e.preventDefault()
      }}
      onClick={()=>{
        displayFormUpdateTable(table)
      }}
    >
        <p>{table.title}</p>
        {tasks.map((task)=>{
            if(table.id.toString() === task.tableId.toString()){
                return <Task key={task.id} task={task} deletetask={deletetask} displayFormUpdateTask={displayFormUpdateTask}/>
            }
        })}
    </div>
  )
}
