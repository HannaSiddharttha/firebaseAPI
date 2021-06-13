import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import './styles/stock.css'
export const Stock = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  let reloadData = function() {
      console.log("reload");
    const headers = {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        }
        // body: {"key" : "some text"}
    };
    fetch("http://localhost/api/product", headers)
    .then(res => res.json())
    .then(
        (result) => {
            // console.log(result);
            setIsLoaded(true);
            if(result.success) {
                setProducts(result.products);
            }
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
            // console.log(error);
            setIsLoaded(true);
            setError(error);
        }
    )
}

  let deleteProduct = (id) => {
      console.log(id);
      const headers = {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch("http://localhost/api/product/"+id, headers)
    .then(res => res.json())
    .then(
        (result) => {
            if(result.success) {
              reloadData();
            }
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
            console.log(error);
            // setIsLoaded(true);
            // setError(error);
        }
    )
  };

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    reloadData();
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } 
  if (!isLoaded) {
    return <div>Loading...</div>;
  } 

    return(
  <div className = "row">
  <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-1 mt-5 mb-2 text-center">
   <img src="./stock3.png"/>
   </div>
    <div className="container">
        <div className="col-10 offset-1 d-flex">
           <Link className = 'btn btn-outline-dark mt-1 ms-auto' to = "/add">Agregar Producto
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg ms-2" viewBox="0 0 16 16">
  <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
</svg>
           </Link>
        </div>
        <div className='col-10 offset-1'> 
        
        <table className="mt-2 table table-striped table-hover" >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product =>
                <tr key={product.id}>
                    <td scope="row">{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                        <Link className = 'btn btn-outline-dark' to = {`/edit/${product.id}`}>Editar Producto
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square ms-2" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
                        </Link>
                        {/* <button type="button" className="btn btn-outline-dark ms-1">Delete</button>  */}
                        <button type="button" className = 'ms-2 btn btn-outline-danger' onClick={() => { deleteProduct(product.id) }} >Delete</button>
                    </td>
                </tr>
                )}
            </tbody>
        </table>
        </div>
    </div>
    </div>
    )
}

// function reloadData() {
//     const headers = {
//         method: 'GET', 
//         headers: {
//             'Content-Type': 'application/json'
//         }
//         // body: {"key" : "some text"}
//     };
//     fetch("http://localhost/api/product", headers)
//     .then(res => res.json())
//     .then(
//         (result) => {
//             // console.log(result);
//             setIsLoaded(true);
//             if(result.success) {
//                 setProducts(result.products);
//             }
//         },
//         // Nota: es importante manejar errores aquí y no en 
//         // un bloque catch() para que no interceptemos errores
//         // de errores reales en los componentes.
//         (error) => {
//             // console.log(error);
//             setIsLoaded(true);
//             setError(error);
//         }
//     )
// }