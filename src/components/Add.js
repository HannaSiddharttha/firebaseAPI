import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import './styles/stock.css'
import { useParams} from "react-router";

export const Add = () => {

    let [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // let [product, setProduct] = useState([]);
    let [name, setName] = useState([]);
    const [price, setPrice] = useState([]);
    const [stock, setStock] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        add(name, price, stock);
    }

return (
  <div className = "row">
  <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 mt-5 mb-2 text-center">
   <img src="./add2.png"/>
   </div>
<div className="container">
  <div className='col-lg-4 offset-lg-4 col-6 offset-3 mt-5'>
  {/* <div className="alert alert-warning">{error}</div> */}
 <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
        <div className="col-md-12 position-relative">
          <label htmlFor="validationTooltip01" className="form-label">Nombre del Producto</label>
          <input type="text" 
          className="form-control" 
          id="validationTooltip01" 
          value={name || ''} 
          onChange={ e => setName(e.target.value)} 
          required />
          <div className="valid-tooltip">
          </div>
        </div>

        <div className="col-md-3 position-relative">
          <label htmlFor="validationTooltip03" className="form-label">Precio</label>
          <input type="text" 
          className="form-control" 
          value={price || ''} 
          id="validationTooltip03" 
          onChange={ e => setPrice(e.target.value)}
          required />
          <div className="invalid-tooltip">
            Indique el precio del articulo
          </div>
        </div>
        <div className="col-md-3 position-relative">
          <label htmlFor="validationTooltip03" className="form-label">Unidades</label>
          <input type="text" 
          className="form-control" 
          value={stock || ''} 
          id="validationTooltip03" 
          onChange={ e => setStock(e.target.value)}
          required />
          <div className="invalid-tooltip">
            Indique cuantas unidades del producto quiere registrar
          </div>
        </div>
       
        <div className="col-12">
          <button type="submit" className = 'btn btn-outline-dark' >Agregar Producto</button>
          <Link className = 'btn btn-outline-dark ms-3' to = "/stock">Regresar</Link>
        </div>
      </form>
      </div>
      </div>
      </div>
    )
}

function add(name, price, stock) {

  const headers = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name" : name,
          "price" : price,
          "stock" : stock
        })
    };
    console.log(headers);
    fetch("http://localhost/api/product", headers)
    .then(res => res.json())
    .then(
        (result) => {
            if(result.success) {
              // browserHistory.push("/stock");
              // this.props.history.push("/stock");
              // window.location = "/stock";
              alert("Producto Agregado");
            }
        },
        // Nota: es importante manejar errores aqu?? y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
            console.log(error);
            // setIsLoaded(true);
            // setError(error);
            // setError(error);
        }
    )
  
}