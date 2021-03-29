import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import 'firebase/auth'
import firebase from 'firebase/app'
import Auth from 'firebase/app'
import './styles/recuperar.css'

export const Recuperar = () => {

    const [usuario, setUsuario] = useState()

    const handleSubmit = (e) => {

        e.preventDefault()
        recuperar(usuario)
        

    }

    return(
        <div className="row">
            <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 mt-5">

                <form className="card card-body" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className='form-label'>Usuario</label>
                        <input type="email" className="form-control" 
                        onChange={ e => setUsuario(e.target.value)}
                        value={usuario || ''}/>
                    </div>

                    <button type="submit" className='btn-grad'>Recuperar</button>

                </form>

                
            </div>
        </div>
    )

}

function recuperar(usuario) {
    
    firebase
    .auth()
    .sendPasswordResetEmail(usuario)
    .then(res => {

    })
    .catch(e => {
        console.log(e.message)
        if (e.message == "The email address is badly formatted.") {
            window.alert("Ingrese correctamente el correo electrónico.")
        } else if(e.message == "There is no user record corresponding to this identifier. The user may have been deleted.")
        {
            alert("La cuenta no ha sido encontrada")
        }
    })

}