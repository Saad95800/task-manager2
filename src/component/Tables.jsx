import React, {useState, useEffect } from 'react'
import Table from './Table'
import FormAddTable from './FormAddTable'
import { v4 as uuidv4 } from 'uuid'
import FormSupTable from './FormSupTable'
import FormAddTask from './FormAddTask'

export default function Tables() {

    const [tables, setTables] = useState([])
    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        setTables([
            {
                id: '1',
                title: 'Projet ressource'
            },
            {
                id: '2',
                title: 'Sujet de la prochaine réunion'
            },
            {
                id: '3',
                title: 'A faire'
            },
            {
                id: '4',
                title: 'En cours'
            }
        ])

        setTasks([
            {
                id: '1',
                content: 'Faire le header',
                tableId: '1'
            },
            {
                id: '2',
                content: 'Faire le footer',
                tableId: '2'
            }
        ])
    }, [])

    const addTable = (title) => {
        const newTable = {
            id: uuidv4(),
            title: title
        }

        setTables([...tables, newTable])
    }

    const deleteTable = (id) => {
        let newTables = [...tables].filter((tab) => tab.id.toString() !== id.toString())
        setTables(newTables)
    }

    const addTask = (taskContent, tableId) => {
        setTasks([...tasks, {
            id: uuidv4(),
            content: taskContent,
            tableId
        }])
    }

  return (
    <div className="container">
        <div className="d-flex">
            <FormAddTable addTable={addTable}/>
            <FormSupTable tables={tables} deleteTable={deleteTable}/>
            <FormAddTask tables={tables} addTask={addTask} />
        </div>
        <div className="d-flex justify-content-start align-items-start">
            {tables.map((table, index)=>{
                return <Table key={index} table={table} tasks={tasks} />
            })}
        </div>
    </div>
  )
}
