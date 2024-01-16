import React, {useState, useEffect } from 'react'
import Table from './Table'
import FormAddTable from './FormAddTable'
import { v4 as uuidv4 } from 'uuid'
import FormSupTable from './FormSupTable'
import FormAddTask from './FormAddTask'
import {Link} from 'react-router-dom'
import {produce} from 'immer'

export default function Tables() {

    const [tables, setTables] = useState([])
    const [tasks, setTasks] = useState([])

    const [formAddTableVisible, setFormAddTableVisible] = useState(false)
    const [formDropTableVisible, setFormDropTableVisible] = useState(false)
    const [formAddTaskVisible, setFormAddTaskVisible] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)
    const [tableToEdit, setTableToEdit] = useState(null)

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
                title: 'Projet ressource',
                order: 1
            },
            {
                id: '2',
                title: 'Sujet de la prochaine réunion',
                order: 2
            },
            {
                id: '3',
                title: 'A faire',
                order: 3
            },
            {
                id: '4',
                title: 'En cours',
                order: 4
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


    const moveTable = (id_table_drag, order_table_drag, id_table_drop, order_table_drop) => {

        let newTables = [...tables]

        for(let table of newTables){
        
            // Si l'order du tableau de drop est suppérieur à l'order du tableau de drag

            if(Number(order_table_drop > Number(order_table_drag))){
                // le tableau qui a l'id id_table_drag prend le order order_table_drop
                // Les tableaux d'order inférieur à order_table_drop et supérieur à order_table_drag on leur order qui se décrémente de 1
                if(table.id.toString() === id_table_drag.toString()){
                    table.order = Number(order_table_drop)
                }else if(table.id.toString() === id_table_drop.toString()){
                    table.order = table.order - 1
                    // On décale à gauche les tableaux situés à gauche du tableau de drop
                }else if(Number(table.order) < Number(order_table_drop) && Number(table.order) > Number(order_table_drag)){
                    table.order = table.order - 1
                }
                // Si l'order du tableau de drop est inférieur à l'order du tableau de drag          
            }else if(Number(order_table_drop < Number(order_table_drag))){
                // le tableau qui a l'id id_table_drag prend le order order_table_drop
                // Les tableaux d'order suppérieur à order_table_drop et inférieur à order_table_drag on leur order qui s'incrémente de 1
                if(table.id.toString() === id_table_drag.toString()){
                    table.order = Number(order_table_drop)
                }else if(table.id.toString() === id_table_drop.toString()){
                    table.order = table.order + 1
                    // On décale à droite les tableaux situés à droite du tableau de drop
                }else if(Number(table.order) > Number(order_table_drop) && Number(table.order) < Number(order_table_drag)){
                    table.order = table.order + 1
                }  
            }

        }

        setTables(newTables)

    }

    const addTable = (title) => {
        const newTable = {
            id: uuidv4(),
            title: title
        }

        setTables([...tables, newTable])
        hideFormUpdateTable()
    }

    const deleteTable = (id) => {
        let newTables = [...tables].filter((tab) => tab.id.toString() !== id.toString())
        setTables(newTables)
    }

    const addTask = (taskContent, tableId) => {

        let nt = produce(tasks, function(tasksDraft){
            let newTask = {
                id: uuidv4(),
                content: taskContent,
                tableId
            }

            tasksDraft.push(newTask)
        })

        setTasks(nt)

        hideFormUpdateTask()
    }

    const deletetask = (id_task) => {

        setTasks(produce(tasks, (taskDraft)=>{

            let index = taskDraft.findIndex(t => t.id.toString() === id_task.toString())
            taskDraft.splice(index, 1)

        }))
    }

    const moveTask = (id_task_drag, id_table_drop) => {
        let newTasks = [...tasks]
        let index = newTasks.findIndex(t => t.id.toString() === id_task_drag.toString())
        newTasks[index].tableId = id_table_drop
        setTasks(newTasks)
    }

    const displayFormUpdateTask = (task) => {
        setFormAddTaskVisible(true)
        setTaskToEdit(task)
    }

    const displayFormUpdateTable = (table) => {
        setFormAddTableVisible(true)
        setTableToEdit(table)
    }

    const hideFormUpdateTask = () => {
        setFormAddTaskVisible(false)
        setTaskToEdit(null)
    }

    const hideFormUpdateTable = () => {
        setFormAddTableVisible(false)
        setTableToEdit(null)
    }

    const displayFormAddTask = () => {
        setFormAddTableVisible(true); 
        setTaskToEdit(null)
    }

    const updateTask = (taskContent, id_task) => {

        setTasks(
            produce(tasks, (tasksDraft)=>{
                let index = tasksDraft.findIndex(task => task.id === id_task)
                tasksDraft[index].content = taskContent
            })
        )
        hideFormUpdateTask()
    }

    const updateTable = (tableTitle, id_table) => {

        let newTables = [...tables]
        let index = newTables.findIndex(t => t.id === id_table)
        newTables[index].title = tableTitle
        setTables(newTables)
        hideFormUpdateTable()
    }
    
  return (
    <div className="container">
        <Link to="/" className="btn btn-primary">page d'accueil</Link>
        <div className="d-flex">
        <button className="btn btn-success" onClick={()=>{ displayFormAddTask() }}>Ajouter un tableau</button>
        <button className="btn btn-danger" onClick={()=>{ setFormDropTableVisible(true) }}>Supprimer un tableau</button>
        <button className="btn btn-primary" onClick={()=>{ setFormAddTaskVisible(true) }}>Ajouter une tâche</button>
            {formAddTableVisible && <FormAddTable updateTable={updateTable} tableToEdit={tableToEdit} addTable={addTable} context={tableToEdit === null ? 'add' : 'edit'} hideFormUpdateTable={hideFormUpdateTable} />}
            {formDropTableVisible && <FormSupTable tables={tables} deleteTable={deleteTable} setFormDropTableVisible={setFormDropTableVisible} />}
            {formAddTaskVisible && <FormAddTask taskToEdit={taskToEdit} tables={tables} addTask={addTask} hideFormUpdateTask={hideFormUpdateTask} context={taskToEdit === null ? 'add' : 'edit'} setTaskToEdit={setTaskToEdit} updateTask={updateTask} />}
        </div>
        <div className="d-flex justify-content-start align-items-start">
            {tables.sort((a, b)=> ( a.order > b.order ? 1 : -1 )).map((table, index)=>{
                return <Table key={index} moveTable={moveTable} displayFormUpdateTable={displayFormUpdateTable} table={table} tasks={tasks} deletetask={deletetask} moveTask={moveTask} displayFormUpdateTask={displayFormUpdateTask}/>
            })}
        </div>
    </div>
  )
}
