import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { changeDisplay, requestDate } from '../services/functions';
import { getToken } from '../services/auth';
import iconBack from '../img/voltar.svg';
import iconExit from '../img/sair.svg';

const FormAdd = () => {
    let [createdNaver, setCreatedNaver] = useState(false);
    let [name, setName] = useState("");
    let [birthdate, setBirthdate] = useState("");
    let [jobRole, setJobRole] = useState("");
    let [projects, setProjects] = useState("");
    let [admission, setAdmission] = useState("");
    let [photoUrl, setPhotoUrl] = useState("");

    if (createdNaver) {
        return <Redirect to="/navers" />;
    }

    const sendForm = async () => {
        let token = getToken();
        let uri = "https://navedex-api.herokuapp.com/v1/navers";

        let admissionSend = requestDate(admission);
        let birthdateSend = requestDate(birthdate);
    
        let h = new Headers();
        h.append("Accept", "application/json");
        h.append("Authorization", "Bearer " + token);

        let requestBody = new FormData();
        requestBody.append("job_role", jobRole);
        requestBody.append("admission_date", admissionSend);
        requestBody.append("birthdate", birthdateSend);
        requestBody.append("name", name);
        requestBody.append("project", projects);
        requestBody.append("url", photoUrl);
        
        const response = await fetch(uri, {method: "POST", headers: h, body: requestBody});
        const json = await response.json();

        if(json.id){
            changeDisplay("modal-create", "block");
        } else {
            changeDisplay("modal-error", "block");
        }
    }

    return (
        <main className="default-box">
            <div className="transparent" id="transparent">
                <div className="modal" id="modal-create">
                    <img src={iconExit} alt="sair" className="x-icon" style={{cursor: "pointer"}} 
                        onClick={() => {changeDisplay("modal-create", "none"); setCreatedNaver(true)}}
                    />
                    <h3>Naver criado</h3>
                    <p>Naver criado com sucesso!</p>
                </div>
                <div className="modal" id="modal-error">
                    <img src={iconExit} alt="sair" className="x-icon" style={{cursor: "pointer"}}
                        onClick={() => {changeDisplay("modal-error", "none")}}/>
                    <h3>Ops! Ocorreu um erro...</h3>
                    <p>Ocorreu um erro ao processar a solicitação.</p>
                </div>
            </div>
            <h3 className="form-title">
                <Link to="/navers/">
                    <img src={iconBack} alt="voltar" />
                    <span>Adicionar Naver</span>
                </Link>
            </h3>
            <form className="form-naver"onSubmit={(event) => {
                event.preventDefault();
                sendForm();
            }}>
            <fieldset>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" id="nome" placeholder="Nome" value={name} 
                    onChange={(event) => {
                        setName(event.target.value);
                    }}/>
                    <label htmlFor="Nascimento">Nascimento</label>
                    <input type="date" id="Nascimento" placeholder="aaaa-mm-dd" value={birthdate}
                    onChange={(event) => {
                        setBirthdate(event.target.value);
                        console.log(birthdate);
                    }}/>
                    <label htmlFor="projetos">Projetos que participou</label>
                    <input type="text" id="projetos" placeholder="Projetos que participou" value={projects}
                    onChange={(event) => {
                        setProjects(event.target.value);
                    }}/>
                </fieldset>
                <fieldset>
                    <label htmlFor="cargo">Cargo</label>
                    <input type="text" id="cargo" placeholder="Cargo" value={jobRole} 
                    onChange={(event) => {
                        setJobRole(event.target.value);
                    }}/>
                    <label htmlFor="tempo">Data de admissão</label>
                    <input type="date" id="tempo" placeholder="aaaa-mm-dd" value={admission}                     
                    onChange={(event) => {
                        setAdmission(event.target.value);
                        console.log(admission);
                    }}/>
                    <label htmlFor="urlFoto">URL da foto do Naver</label>
                    <input type="text" id="urlFoto" placeholder="URL da foto do Naver" value={photoUrl} 
                    onChange={(event) => {
                        setPhotoUrl(event.target.value);
                    }}/>
                    <input type="submit" className="form-button" value="Adicionar Naver" style={{cursor: "pointer"}} />
                </fieldset>
            </form>
        </main>
    );
}

export default FormAdd;