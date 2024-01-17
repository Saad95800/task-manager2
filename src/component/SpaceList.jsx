import React from 'react'
import {useSelector} from 'react-redux'
import SpaceItem from './SpaceItem'
import FormEditSpace from './FormEditSpace'

export default function SpaceList(){

    const viewFormEditSpace = useSelector(state => state.space.viewFormEditSpace)
    console.log(viewFormEditSpace)
    const spaces = useSelector((state) => state.space.spaces)

    return (
        <div className="container mt-3">
            <div className="row">
                {spaces.map((space, i) => {
                    return <SpaceItem space={space} key={i} />
                })}
                {viewFormEditSpace && <FormEditSpace />}
            </div>
        </div>
    )

}