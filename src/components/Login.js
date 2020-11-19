import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { changeDisplay } from '../services/functions';
import { authenticate, isAuthenticated } from '../services/auth';
import { apiRequest } from '../services/apiRequest';
import logotipo from '../img/logo.svg';
import iconExit from '../img/sair.svg';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");

    if (isAuthenticated()) {
        return <Redirect to="/navers" />;
    }

    const sendForm = async (formEmail, formPassword) => {

        const email = String(formEmail);
        const password = String(formPassword);

        if (email === "" || password === ""){
            changeDisplay("modal-error", "block");
            return;
        }
        
        // https://www.w3resource.com/javascript/form/email-validation.php
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        {
            changeDisplay("modal-error", "block");
            return;
        }
    
        const credentials = {email: email, password: password};
        
        const loginNaver = await apiRequest("login", false, credentials);
    
        if(loginNaver.errorCode){
            changeDisplay("modal-error", "block");
            setLogin(false);
        } else {
            authenticate(loginNaver.token);
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