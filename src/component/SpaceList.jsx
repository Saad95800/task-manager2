import React from 'react'
import {useSelector} from 'react-redux'
import SpaceItem from './SpaceItem'

export default function SpaceList(){

    const spaces = useSelector((state) => state.space.spaces)

    return (
        <div className="container mt-3">
            <div className="row">
                {spaces.map((space, i) => {
                    return <SpaceItem space={space} key={i} />
                })}
            </div>
        </div>
    )

}