import React, {Component} from 'react'
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app'
import 'firebase/auth'
import firebaseConfig  from '../firebaseConfig'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

const firebaseApp = firebase.initializeApp(firebaseConfig)

class Bygoogle extends Component{
  /*
  componentDidMount () {
    console.log("hola")
    const script = document.createElement("script");

    script.src = "/js/chat-button.js";
    script.async = true;

    document.body.appendChild(script);
  }
  */

    render(){
        const{
            user,
            signOut,
            signInWithGoogle,
            signInWithFacebook,
        } = this.props;

        var a ="usuario"
        const responseFacebook = (response) => {
        console.log("Este es el nombre completo: "+response.name);
        console.log("Este es el correo: "+response.email);
        console.log("Esta es la foto: "+response.picture.data.url);
      }

      const componentClicked=()=>{
        alert('Evento onClick');
      }
        return(
            <div>

                {
                    user
                    ? <Redirect to= '/' />
                    : <Redirect to= '/login' />
                }

                {
                    user
                    ?(<nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <div className="container-fluid">
                     <Link className="navbar-brand" to="/">
                    <img src="./logonegroreact.png" alt="" width={85} height={32} className="d-inline-block align-top" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">


              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mision">Mision</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vision">Vision</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/planes">Planes</Link>
              </li>
               <li className="nav-item">
                <Link className="nav-link" to="/servicios">Nuestra Plataforma</Link>
              </li>
               <li className="nav-item">
                <Link className="nav-link" to="/contactanos">Contactanos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chat">Chat</Link>
              </li>
               <li className="nav-item">
                <Link onClick={signOut} className="nav-link" to="/login">Cerrar Sesión ({firebase.auth().currentUser.email})</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>)
      :( 
      <div>
        <div className="container-fluid mt-5">
            <div className="d-flex justify-content-center mt-4">
              <Link className="btn btn-lg px-3 btn-outline-info" onClick ={signInWithGoogle} role="button"><img src="./logogoogle1.png" height="30" alt="Google"></img>  &nbsp; Iniciar Sesión con Google</Link>
              <Link className="btn btn-lg px-3 btn-outline-info" onClick ={signInWithFacebook} role="button"><img src="./logogoogle1.png" height="30" alt="Facebook"></img>  &nbsp; Iniciar Sesión con Facebook</Link>
            </div>
          </div>
          {/* <FacebookLogin
          appId="486988992425977"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          textButton="Iniciar Sesión con Facebook"
          icon="fa-facebook" /> */}
      </div>
      )
                }

            </div>

        );
    }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {

    googleProvider: new firebase.auth.GoogleAuthProvider(),
    facebookProvider: new firebase.auth.FacebookAuthProvider(),
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(Bygoogle);

