import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

export default function HomePage() {

  const navigate = useNavigate()

  useEffect(()=>{
    let connected = localStorage.getItem('connected')

    if(!connected){
      return navigate('/login')
    }
  }, [])


  return (
    <>
        <h1>HomePage</h1>
        <Link to="/login" className='btn btn-danger'>Déconnexion</Link>     
        <Link to="/tables" className='btn btn-success'>Tableaux</Link>     
    </>
  )
}
