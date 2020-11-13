import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { changeDisplay, handleDate, requestDate } from '../services/functions';
import { getToken } from '../services/auth';
import iconBack from '../img/voltar.svg';
import iconExit from '../img/sair.svg';


const FormEdit = () => {
    const naverId = useParams();
    const [naver, setNaver] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [jobRole, setJobRole] = useState("");
    const [projects, setProjects] = useState("");
    const [admission, setAdmission] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    useEffect(() => {
        const getNaver = async () => {
            const token = getToken();
            const uri = "https://navedex-api.herokuapp.com/v1/navers/" + naverId.id;
        
            const h = new Headers();
            h.append("Accept", "application/json");
            h.append("Authorization", "Bearer " + token);
            
            const response = await fetch(uri, {method: "GET", headers: h});
            const json = await response.json();

            setNaver(json);
            setName(json.name);
            setBirthdate(handleDate(json.birthdate));
            setJobRole(json.job_role);
            setProjects(json.project);
            setAdmission(handleDate(json.admission_date));
            setPhotoUrl(json.url);
        }

        getNaver();
    }, []);

    const sendForm = async () => {
        const token = getToken();
        const uri = "https://navedex-api.herokuapp.com/v1/navers/" + naverId.id;

        const admissionSend = requestDate(admission);
        const birthdateSend = requestDate(birthdate);
    
        const h = new Headers();
        h.append("Accept", "application/json");
        h.append("Authorization", "Bearer " + token);

        const requestBody = new FormData();
        requestBody.append("job_role", jobRole);
        requestBody.append("admission_date", admissionSend);
        requestBody.append("birthdate", birthdateSend);
        requestBody.append("name", name);
        requestBody.append("project", projects);
        requestBody.append("url", photoUrl);
        
        const response = await fetch(uri, {method: "PUT", headers: h, body: requestBody});
        const json = await response.json();

        if(json.id){
            changeDisplay("modal-edit", "block");
        } else {
            changeDisplay("modal-error", "block");
        }
    }



    return naver && (
        <main className="default-box">
            <div className="transparent" id="transparent">
                <div className="modal" id="modal-edit">
                    <img src={iconExit} alt="sair" className="x-icon" style={{cursor: "pointer"}} 
                        onClick={() => {changeDisplay("modal-edit", "none")}}
                    />
                    <h3>Naver editado</h3>
                    <p>Naver editado com sucesso!</p>
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
                    <span>Editar Naver</span>
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
                    <input type="submit" className="form-button" value="Salvar" style={{cursor: "pointer"}} />
                </fieldset>
            </form>
        </main>
    );
  }

export default FormEdit;