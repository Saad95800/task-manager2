import React from 'react'
import {useSelector} from 'react-redux'

export default function SpaceList(){

    const spaces = useSelector((state) => state.space.spaces)

    return (
        <div classname="container">
            <div className="row">
                {spaces.map((space, i) => {
                    return <div key={i} className="col-md-3">
                                <p className="text-center bg-white" style={{height: '200px', border: '1px solid black'}}>{space.title}</p>
                            </div>
                })}
            </div>
        </div>
    )

}