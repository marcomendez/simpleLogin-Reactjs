import React, { Component } from "react";


import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";

import Cookies from "universal-cookie";

const baseUrl = "http://localhost:3001/users";

const cookies = new Cookies();

class Login extends Component {

    state={
        form:{username:'',
        password:''}
    }

    handleChange = async e => {
        this.setState({
            form : {
                ...this.state.form, 
                [e.target.name]: e.target.value}
        });
        console.log(this.state.form)
    }


    openSession = async() =>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, password:this.state.form.password}})
        .then(response =>{
            console.log(response.data);
           return response.data;

        }).then(response =>{
            if(response.length > 0){
                var user = response[0];
                cookies.set('id', user.id, {path:"/"});
                cookies.set('username', user.username, {path:"/"});
                cookies.set('name', user.name, {path:"/"});
                cookies.set('lastname', user.last_name, {path:"/"});
                alert("Bienvenido " + user.name + " " + user.last_name);
                window.location.href="./home";

            } else{
                console.log("No hay user");
            }
        })
        .catch(error =>{
            console.log(error);
        })
    }

    componentDidMount(){
        if(cookies.get("username")){
            window.location.href="./home";
        }
    }


    render() {
    return (
    <div className="containerPrincipal">
        <div className="containerSecundario">
            <div className="form-group">
                <label>Usuario: </label>
                <br />
                <input type="text" name="username" className="form-control" onChange={this.handleChange}/>
                <br />
                <label>Contraseña: </label>
                <br />
                <input type="password" name="password" className="form-control" onChange={this.handleChange}/>
                <br />
                <button className="btn btn-primary" onClick={()=> this.openSession()}>Iniciar Sesión</button>
            </div>
        </div>
    </div>
    );
    }
}

export default Login;