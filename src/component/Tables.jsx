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
import { setFormAddTaskVisible, setTasks } from '../redux/task/TaskSlice'

export default function Tables() {



    const navigate = useNavigate()

    const tables = useSelector((state) => state.table.tables)
    const formAddTableVisible = useSelector((state) => state.table.formAddTableVisible)
    const formDropTableVisible = useSelector((state) => state.table.formDropTableVisible)
    const tableToEdit = useSelector((state) => state.table.tableToEdit)
    const taskToEdit = useSelector((state) => state.task.taskToEdit)

    const formAddTaskVisible = useSelector((state) => state.task.formAddTaskVisible)

    
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

        store.dispatch( setTasks([
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
        ]) )
    }, [])

/*
    const displayFormAddTask = () => {
        setFormAddTableVisible(true); 
        setTaskToEdit(null)
    }
*/
    
  return (
    <div className="container">
        <Link to="/" className="btn btn-primary">page d'accueil</Link>
        <div className="d-flex">
        <button className="btn btn-success" onClick={()=>{ store.dispatch(displayFormAddTable()) }}>Ajouter un tableau</button>
        <button className="btn btn-danger" onClick={()=>{ store.dispatch(setFormDropTableVisible(true)) }}>Supprimer un tableau</button>
        <button className="btn btn-primary" onClick={()=>{ store.dispatch(setFormAddTaskVisible(true)) }}>Ajouter une tâche</button>
            {formAddTableVisible && <FormAddTable context={tableToEdit === null ? 'add' : 'edit'} />}
            {formDropTableVisible && <FormSupTable tables={tables} />}
            {formAddTaskVisible && <FormAddTask tables={tables} context={taskToEdit === null ? 'add' : 'edit'} />}
        </div>
        <div className="d-flex justify-content-start align-items-start">
            {[...tables].sort((a, b)=> ( a.order > b.order ? 1 : -1 )).map((table, index)=>{
                return <Table key={index} table={table} />
            })}
        </div>
    </div>
  )
}
