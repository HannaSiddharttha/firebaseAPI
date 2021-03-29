import React from 'react'
import './styles/servicios.css'
export const Servicios = () => (

<div className = "row">
  <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 mt-5 mb-5 text-center">
   <img src="./servicios.png"/>
   </div>
        <div className="contenedor">
          <div className="imagen">
            <img src="/images/sale.png" alt="" />
            <div className="overlay">
              <h2>Punto de Venta</h2>
            </div>
          </div>
          <div className="imagen">
            <img src="/images/app.png" alt="" />
            <div className="overlay">
              <h2>Menu QR interactivo</h2>
            </div>
          </div>
          <div className="imagen">
            <img src="/images/stock.png" alt="" />
            <div className="overlay">
              <h2>Control de Stock</h2>
            </div>
          </div>
          <div className="imagen">
            <img src="/images/employe.png" alt="" />
            <div className="overlay">
              <h2>Control de Empleados</h2>
            </div>
          </div>
          <div className="imagen">
            <img src="/images/history.png" alt="" />
            <div className="overlay">
              <h2>Historial de Ventas</h2>
            </div>
          </div>
          <div className="imagen">
            <img src="/images/drive.png" alt="" />
            <div className="overlay">
              <h2>Modulo de Drive</h2>
            </div>
          </div>
        </div>
      </div>
)
