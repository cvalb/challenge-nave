import React, { Fragment, useState } from 'react';
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { logout, isAuthenticated } from '../services/auth';
import NaversList from './NaversList';
import FormAdd from './FormAdd';
import FormEdit from './FormEdit';
import logotipo from '../img/logo.svg';

const Home = () => {
    const [log, setLogout] = useState("");

    
    if (!isAuthenticated()) {
        return <Redirect to="/login" />;
    }

    return (
        <Fragment>
        <header>
            <Link to="/"><img src={logotipo} alt="logotipo nave.rs" /></Link>
            <span style={{cursor: "pointer"}} onClick={() => {logout(); setLogout(true)}}>Sair</span>
        </header>
            <Switch>
                <Route exact path="/navers">
                    <NaversList/>
                </Route>
                <Route exact path="/navers/adicionar">
                    <FormAdd/>
                </Route>
                <Route path="/navers/editar/:id">
                    <FormEdit/>
                </Route>
                <Route path="/navers/*" render={() => <h1>Page not found</h1>} />
            </Switch>
        </Fragment>
    );
}

export default Home;