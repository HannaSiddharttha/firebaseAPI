import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import 'firebase/auth'
import firebase from 'firebase/app'
import Auth from 'firebase/app'
import './styles/login.css'

export const Login= ()  =>{

    const [usuario, setUsuario]= useState()
    const [password, setPassword]= useState()

     const handleSubmit =(e) => {
        e.preventDefault()
        login(usuario,password)
    }
        
    
    return(
        <div className = "container">
            <div className = "row">
                <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 mt-5">
                    <img src="./logonegroreact.png"/>
                </div>
                <div className = "col-lg-4 offset-lg-4 col-md-6 offset-md-3 mt-5">
                    <form className ="card card-body" onSubmit ={handleSubmit}>
                        <div className = 'mb-3'>
                            <label className = 'form-label'>Usuario</label>
                            <input type = "email" className = 'form-control'onChange={ e => setUsuario(e.target.value)}
                        value ={usuario || ''}/>
                        </div>
                        <div className = 'mb-3'>
                            <label className = 'form-label'>Password</label>
                            <input type = "password" className = 'form-control' onChange={ e => setPassword(e.target.value)}
                        value ={password || ''}/>
                        </div>
                        <button type='submit'className = 'btn-grad'>Entrar</button>
                    </form>
                    <Link className = 'navbar-brand' to = "/registro">¿Tienes Cuenta?</Link>
                    <Link className = 'navbar-brand' to = "/recuperar">¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
        </div>
    )
}



function login(usuario,password) {
    firebase
    .auth()
    .signInWithEmailAndPassword(usuario,password)
    .then(res =>{
        if(res.user) Auth.setLoggedIn(true)

    })
    .catch(e =>{
        console.log(e.message)
    })
}
