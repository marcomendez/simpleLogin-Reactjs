import React, { Component } from "react";


import Cookies from "universal-cookie";
const cookies = new Cookies();

class Home extends Component{


    closeSession = () =>{
        (cookies.remove('id', {path:"/"}));
        (cookies.remove('username', {path:"/"}));
        (cookies.remove('name', {path:"/"}));
        window.location.href="./"
    }


    componentDidMount(){
        if(!cookies.get("username")){
            window.location.href="./";
        }
    }


    render(){
        console.log(cookies.get('id'));
        console.log(cookies.get('username'));
        console.log(cookies.get('name'));
        return (
        <div>
            Hola Mundo;
            <br></br>
            <button onClick={() => {this.closeSession()}}> Cerrar session</button>
        </div>
        );
    }
}



export default Home;