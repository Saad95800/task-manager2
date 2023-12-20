import React from 'react'

export default function Task({task}) {
  return (
    <div className="bg-white m-2 p-2 rounded-3">{task.content}</div>
  )
}
