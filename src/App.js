import logo from './logo.svg';
import Bygoogle from './components/Bygoogle';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom' 
import { Inicio } from './components/Inicio';
import { Login } from './components/Login';
import {Navbar} from './components/Navbar';
import {Mision} from './components/Mision';
import {Vision} from './components/Vision';
import {Planes} from './components/Planes';
import {Contactanos} from './components/Contactanos';
import {Servicios} from './components/Servicios';
import {Stock} from './components/Stock';
import {Add} from './components/Add';
import {Edit} from './components/Edit';
import { Nosotros } from './components/Nosotros';
import { Registro } from './components/Registrar';
import { Recuperar } from './components/Recuperar';
import { Chat } from'./components/Chat';
function App() {
  return (
    
    <Router>
      <Bygoogle/>
        <div className="main-container">
        <Switch>
         <Route path = "/chat" component = {Chat}/>
         <Route path = "/servicios" component = {Servicios} /> 
         <Route path = "/stock" component = {Stock} /> 
         <Route path = "/add" component = {Add} /> 
         <Route path = "/edit/:id" component = {Edit} /> 
         <Route path = "/login" component = {Login} />
         <Route path = "/contactanos" component = {Contactanos} /> 
         <Route path = "/planes" component = {Planes} /> 
         <Route path = "/vision" component = {Vision} /> 
         <Route path = "/mision" component = {Mision} />
         <Route path = "/nosotros" component = {Nosotros} />
         <Route path="/registro" component={Registro}/>
          <Route path="/recuperar" component={Recuperar}/>
         <Route path = "/" component = {Inicio} />
        </Switch>
        </div>

      <div className="container p-2">
        <Switch>
          {/* <Route path="/inicio" component={Inicio}/> */}
          {/* <Route path="/registro" component={Registro}/> */}
          {/* <Route path="/recuperar" component={Recuperar}/> */}
          {/* <Route path="/" component={Login}/> */}
        </Switch>
        
      </div>
    </Router>


 );
}
export default App;