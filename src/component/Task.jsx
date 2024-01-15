import React from 'react'

export default function Task({displayMessage, task, deletetask, displayFormUpdateTask}) {
  return (
    <div className="mb-1 p-2 rounded bg-white d-flex justify-content-between" style={{cursor: 'pointer'}}
      onDragStart={(e)=>{
        e.dataTransfer.setData('id_task', task.id)
      }}
      draggable="true"
      onClick={(e)=>{
        e.stopPropagation()
        displayFormUpdateTask(task)
      }}
    >
      {task.content}
      <button type="button" className="btn-close" aria-label="close" onClick={(e)=>{
        e.stopPropagation()
        deletetask(task.id)
        displayMessage("tâche suppriméé avec succès !", "success")
      }}></button>
    </div>
  )
}
