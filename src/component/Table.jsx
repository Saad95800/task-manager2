import React from 'react'
import Task from './Task'

export default function Table({table, tasks, deletetask, moveTask , displayFormUpdateTable, displayFormUpdateTask, moveTable}) {

  return (
    <div className="table p-2 m-3 rounded"
    draggable="true"
      onDragStart={(e)=>{
        e.dataTransfer.setData('id_table_drag', table.id)
        e.dataTransfer.setData('order_table_drag', table.order)
      }}
      onDrop={(e)=>{
        let id_task = e.dataTransfer.getData('id_task')
        let id_table_drag = e.dataTransfer.getData('id_table_drag')
        const order_table_drag = e.dataTransfer.getData('order_table_drag')

        if(id_task){
          // J'ai droppé une tâche
          moveTask(id_task, table.id)
        }else if(id_table_drag){
          // J'ai droppé un tableau
          moveTable(id_table_drag, order_table_drag, table.id, table.order)
        }

        
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
