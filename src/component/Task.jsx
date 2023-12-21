import React from 'react'

export default function Task({task, deletetask, displayFormUpdateTask}) {
  return (
    <div className="mb-1 p-2 rounded bg-white d-flex justify-content-between" style={{cursor: 'pointer'}}
      onDragStart={(e)=>{
        console.log('drag')
        e.dataTransfer.setData('id_task', task.id)
      }}
      draggable="true"
      onClick={()=>{
        displayFormUpdateTask(task)
      }}
    >
      {task.content}
      <button type="button" className="btn-close" aria-label="close" onClick={()=>{
        deletetask(task.id)
      }}></button>
    </div>
  )
}
