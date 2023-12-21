import React from 'react'
import Task from './Task'

export default function Table({table, tasks, deletetask}) {

  return (
    <div className="table p-2 m-3 rounded">
        <p>{table.title}</p>
        {tasks.map((task)=>{
            if(table.id.toString() === task.tableId.toString()){
                return <Task task={task} deletetask={deletetask}/>
            }
        })}
    </div>
  )
}
