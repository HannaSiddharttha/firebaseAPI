import React from 'react'
import {Link} from 'react-router-dom'
import Bygoogle from './Bygoogle';

export const Navbar = () => (

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                <Link className="nav-link" to="/login">
                  <Bygoogle/>
                </Link>
              </li>


            </ul>
          </div>
        </div>
      </nav>
)