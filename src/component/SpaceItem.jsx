import React from 'react'
import { Link } from 'react-router-dom'

export default function SpaceItem({space}){

    return (
        <Link to={`/space/${space.id}/tables`} className="col-md-3">
            <p className="text-center bg-white" style={{height: '200px', border: '1px solid black'}}>{space.title}</p>
        </Link>
    )

}