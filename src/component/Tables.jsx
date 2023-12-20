import React, {useState} from 'react'
import Table from './Table'
import FormAddTable from './FormAddTable'
import { v4 as uuidv4 } from 'uuid'
import FormSupTable from './FormSupTable'

export default function Tables() {

    const [tables, setTables] = useState([
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

  return (
    <div className="container">
        <div className="d-flex">
            <FormAddTable addTable={addTable}/>
            <FormSupTable tables={tables} deleteTable={deleteTable}/>
        </div>
        <div className="d-flex justify-content-start align-items-start">
            {tables.map((table, index)=>{
                return <Table key={index} table={table} />
            })}
        </div>
    </div>
  )
}
