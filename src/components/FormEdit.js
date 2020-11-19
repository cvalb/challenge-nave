import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { changeDisplay, handleDate, requestDate } from '../services/functions';
import Naver from './object/Naver';
import { apiRequest } from '../services/apiRequest';
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
            const editedNaver = await apiRequest("show", true, naverId);
    
            setNaver(editedNaver);
            setName(editedNaver.name);
            setBirthdate(handleDate(editedNaver.birthdate));
            setJobRole(editedNaver.job_role);
            setProjects(editedNaver.project);
            setAdmission(handleDate(editedNaver.admission_date));
            setPhotoUrl(editedNaver.url);
        }
    
        getNaver();
    }, [naverId]);

    const sendForm = async () => {
        const admissionSend = requestDate(admission);
        const birthdateSend = requestDate(birthdate);

        const id = naverId.id;

        let requestObject = new Naver(id , name, jobRole, birthdateSend, admissionSend, projects, photoUrl);

        const editedNaver = await apiRequest("edit", true, requestObject);

        if(editedNaver.id){
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