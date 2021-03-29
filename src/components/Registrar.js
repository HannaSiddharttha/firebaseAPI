import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import 'firebase/auth'
import firebase from 'firebase/app'
import Auth from 'firebase/app'
import './styles/registrar.css'

export const Registro= ()  =>{
    const [usuario, setUsuario]= useState()
    const [password, setPassword]= useState()
    const [repassword, setRePassword]= useState()

    const handleSubmit =(e) => {
        e.preventDefault()
        add(usuario, password)
    

    }

    return(
        <div className = "row">
            <div className = "col-lg-4 offset-lg-4 col-md-6 offset-md-3 mt-5">
                <form className ="card card-body" onSubmit={handleSubmit}>
                  <div className = 'mb-3'>
                      <label className = 'form-label'>Correo Electronico</label>
                      <input type = 'email' className= 'form-control' onChange={ e => setUsuario(e.target.value)}
                      value = {usuario || ''}/>
                  </div> 
                   <div className = 'mb-3'>
                      <label className = 'form-label'>Password</label>
                      <input type = 'password' className= 'form-control'onChange={ e => setPassword(e.target.value)}
                      value ={password || ''}/>
                  </div> 
                  <div className = 'mb-3'>
                      <label className = 'form-label'>Repetir Password</label>
                      <input type = 'password' className= 'form-control' onChange={ e => setRePassword(e.target.value)}
                      value = {repassword || ''}/>
                  </div> 
                  <button type='submit' className='btn-grad'>Guardar</button>
                </form>
                 <Link className = 'navbar-brand' to = "/Login">Ya tengo cuenta</Link>
            </div>
        </div>
    )
}

function add(email, password) {
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res =>{
        if (res.user) Auth.setLoggedIn(true)
    })
    .catch(e =>{
        console.log(e.message)
    })
    
}