import React from 'react'
import './styles/contactanos.css'
export const Contactanos = () => (

<div className = "row">
  <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 mt-5">
   <img src="./contac.png"/>
   </div>
<div className = "col-lg-4 offset-lg-4 col-md-6 offset-md-3 mt-4">
     {/* <background src="/images/fondo.png"/> */}
         <form className="row g-3 needs-validation pl-5 pr-5 pt-4" noValidate>
        <div className="col-md-6">
          <label htmlFor="validationCustom01" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="validationCustom01" defaultValue="" required />
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom02" className="form-label">Apellido</label>
          <input type="text" className="form-control" id="validationCustom02" defaultValue="" required />
          <div className="valid-feedback">
            Looks good!
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom03" className="form-label">Ciudad</label>
          <input type="text" className="form-control" id="validationCustom03" required />
          <div className="invalid-feedback">
            Porfavor escoja una ciudad.
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom04" className="form-label">Estado</label>
          <select className="form-select" id="validationCustom04" required>
            <option value>Escoja un estado</option>
            <option value='merida'>Merida</option>
            <option value='cancun'>Cancun</option>
            <option value='puebla'>Puebla</option>
            <option value='cdmexico'>Cd.Mexico</option>
            <option value='guadalajara'>Guadalajara</option>
          </select>
          <div className="invalid-feedback">
            Escoja un estado
          </div>
        </div>
        <div className="col-md-6">
          <label htmlFor="validationCustom05" className="form-label">Código Postal</label>
          <input type="text" className="form-control" id="validationCustom05" required />
          <div className="invalid-feedback">
            Porfavor ponga su codigo postal
          </div>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" defaultValue id="invalidCheck" required />
            <label className="form-check-label" htmlFor="invalidCheck">
              Acepto enviar mi información
            </label>
            <div className="invalid-feedback">
              Deberia aceptar terminos y condiciones para proseguir
            </div>
          </div>
        </div>
        <div className="col-3">
            <button type="button" className="btn-grad2">Enviar</button>
        </div>
        

      </form>
      </div>
      </div>
)