import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { changeDisplay } from '../services/functions';
import { authenticate, isAuthenticated } from '../services/auth';
import logotipo from '../img/logo.svg';
import iconExit from '../img/sair.svg';

const Login = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [login, setLogin] = useState("");

    if (isAuthenticated()) {
        return <Redirect to="/navers" />;
    }

    const sendForm = async (formEmail, formPassword) => {
        let email = String(formEmail);
        let password = String(formPassword);
        let uri = "https://navedex-api.herokuapp.com/v1/users/login";
      
        let h = new Headers();
        h.append("Accept", "application/json");
        
        let requestBody = new FormData();
        requestBody.append("email", email);
        requestBody.append("password", password);
        
        const response = await fetch(uri, {method: "POST", headers: h, body: requestBody});
        const json = await response.json();
        
        if(json.errorCode){
            changeDisplay("modal-error", "block");
            setLogin(false);
        } else {
            authenticate(json.token);
            setLogin(true);
        }
    }

    return(
        <main>
            <div className="transparent" id="transparent">
                <div className="modal" id="modal-error">
                    <img src={iconExit} alt="sair" style={{cursor : "pointer"}} className="x-icon"  
                        onClick={() => {changeDisplay("modal-error", "none")}}/>
                    <h3>Ops! Ocorreu um erro...</h3>
                    <p>Verifique se o e-mail e senha estão corretos.</p>
                </div>
            </div>
            <form className="login-box" onSubmit={(event) => {
                event.preventDefault();
                sendForm(email, password);
            }}>
                <img src={logotipo} alt="logotipo nave.rs"/>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" placeholder="E-mail" autoComplete="username" value={email} 
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" placeholder="Senha" autoComplete="current-password" value={password} 
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <input type="submit" className="login-button" value="Entrar"/>
            </form>
        </main>
    );
}

export default Login;