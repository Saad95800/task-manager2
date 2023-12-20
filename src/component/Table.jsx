import React from 'react'
import Task from './Task'

export default function Table({table, tasks}) {

    
  return (
    <div className="table p-2 m-3 rounded">
        <p>{table.title}</p>
        {tasks.map((task)=>{
            if(table.id.toString() === task.tableId.toString()){
                return <Task task={task} />
            }
        })}
    </div>
  )
}
