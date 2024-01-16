import React, {useState, useEffect } from 'react'
import Table from './Table'
import FormAddTable from './FormAddTable'
import FormSupTable from './FormSupTable'
import FormAddTask from './FormAddTask'
import {Link, useNavigate} from 'react-router-dom'
import {produce} from 'immer'
import { displayFormAddTable, setFormDropTableVisible, setTables } from '../redux/table/TableSlice'
import { useSelector } from 'react-redux'
import { store } from '../redux/store'

export default function Tables() {

    const tables = useSelector((state) => state.table.tables)
    const [tasks, setTasks] = useState([])

    const navigate = useNavigate()

    const formAddTableVisible = useSelector((state) => state.table.formAddTableVisible)
    const formDropTableVisible = useSelector((state) => state.table.formDropTableVisible)
    const tableToEdit = useSelector((state) => state.table.tableToEdit)

    const [formAddTaskVisible, setFormAddTaskVisible] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)

    useEffect(()=>{
        let connected = localStorage.getItem('connected')
    
        if(!connected){
          return navigate('/login')
        }
    }, [])

    useEffect(()=>{
        store.dispatch( setTables([
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
        ]))

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

    const hideFormUpdateTask = () => {
        setFormAddTaskVisible(false)
        setTaskToEdit(null)
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
    
  return (
    <div className="container">
        <Link to="/" className="btn btn-primary">page d'accueil</Link>
        <div className="d-flex">
        <button className="btn btn-success" onClick={()=>{ store.dispatch(displayFormAddTable()) }}>Ajouter un tableau</button>
        <button className="btn btn-danger" onClick={()=>{ store.dispatch(setFormDropTableVisible(true)) }}>Supprimer un tableau</button>
        <button className="btn btn-primary" onClick={()=>{ setFormAddTaskVisible(true) }}>Ajouter une tâche</button>
            {formAddTableVisible && <FormAddTable tableToEdit={tableToEdit} context={tableToEdit === null ? 'add' : 'edit'} />}
            {formDropTableVisible && <FormSupTable tables={tables} />}
            {formAddTaskVisible && <FormAddTask taskToEdit={taskToEdit} tables={tables} addTask={addTask} hideFormUpdateTask={hideFormUpdateTask} context={taskToEdit === null ? 'add' : 'edit'} setTaskToEdit={setTaskToEdit} updateTask={updateTask} />}
        </div>
        <div className="d-flex justify-content-start align-items-start">
            {[...tables].sort((a, b)=> ( a.order > b.order ? 1 : -1 )).map((table, index)=>{
                return <Table key={index} table={table} tasks={tasks} deletetask={deletetask} moveTask={moveTask} displayFormUpdateTask={displayFormUpdateTask}/>
            })}
        </div>
    </div>
  )
}
