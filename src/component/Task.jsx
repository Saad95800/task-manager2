import React from 'react'
import { displayMessage } from '../redux/message/MessageSlice'
import { store } from '../redux/store'

export default function Task({task, deletetask, displayFormUpdateTask}) {
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
        store.dispatch( displayMessage({texte: "tâche supprimée avec succès !", typeMessage: "success"}) )
      }}></button>
    </div>
  )
}
