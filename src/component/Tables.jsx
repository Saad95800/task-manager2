import React, {useState, useEffect } from 'react'
import Table from './Table'
import FormAddTable from './FormAddTable'
import { v4 as uuidv4 } from 'uuid'
import FormSupTable from './FormSupTable'
import FormAddTask from './FormAddTask'
import {Link} from 'react-router-dom'

export default function Tables() {

    const [tables, setTables] = useState([])
    const [tasks, setTasks] = useState([])

    const [formAddTableVisible, setFormAddTableVisible] = useState(false)
    const [formDropTableVisible, setFormDropTableVisible] = useState(false)
    const [formAddTaskVisible, setFormAddTaskVisible] = useState(false)

    useEffect(()=>{
        let connected = localStorage.getItem('connected')
    
        if(!connected){
          return navigate('/login')
        }
    }, [])

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

    const deletetask = (id) => {
        let newTasks = [...tasks].filter((task) => task.id.toString() !== id.toString())
        setTasks(newTasks)
    }

    const moveTask = (id_task_drag, id_table_drop) => {
        let newTasks = [...tasks]
        let index = newTasks.findIndex(t => t.id.toString() === id_task_drag.toString())
        newTasks[index].tableId = id_table_drop
        setTasks(newTasks)
    }

  return (
    <div className="container">
        <Link to="/" className="btn btn-primary">page d'accueil</Link>
        <div className="d-flex">
        <button className="btn btn-success" onClick={()=>{ setFormAddTableVisible(true) }}>Ajouter un tableau</button>
        <button className="btn btn-danger" onClick={()=>{ setFormDropTableVisible(true) }}>Supprimer un tableau</button>
        <button className="btn btn-primary" onClick={()=>{ setFormAddTaskVisible(true) }}>Ajouter une tâche</button>
            {formAddTableVisible && <FormAddTable addTable={addTable} setFormAddTableVisible={setFormAddTableVisible} />}
            {formDropTableVisible && <FormSupTable tables={tables} deleteTable={deleteTable} setFormDropTableVisible={setFormDropTableVisible} />}
            {formAddTaskVisible && <FormAddTask tables={tables} addTask={addTask} setFormAddTaskVisible={setFormAddTaskVisible} />}
        </div>
        <div className="d-flex justify-content-start align-items-start">
            {tables.map((table, index)=>{
                return <Table key={index} table={table} tasks={tasks} deletetask={deletetask} moveTask={moveTask}/>
            })}
        </div>
    </div>
  )
}
