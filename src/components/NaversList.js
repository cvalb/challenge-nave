import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { changeDisplay, calcYears } from '../services/functions';
import { getToken } from '../services/auth';
import Naver from './object/Naver';
import iconDelete from '../img/excluir.svg';
import iconEdit from '../img/editar.svg';
import iconExit from '../img/sair.svg';
import hanSolo from '../img/wide.jpg'; // !!!!


const NaversList = () => {
    const [showNaver, setNaver] = useState(new Naver());
    const [arrayNavers, setArrayNavers] = useState("");

    useEffect(() => {
        const getNavers = async () => {
            const token = getToken();
            const uri = "https://navedex-api.herokuapp.com/v1/navers";
        
            let h = new Headers();
            h.append("Accept", "application/json");
            h.append("Authorization", "Bearer " + token);
            
            const response = await fetch(uri, {method: "GET", headers: h});
            const json = await response.json();

            setArrayNavers(json);
        }

        getNavers();
    });

    const deleteNaver = async (id) => {
        const token = getToken();
        const uri = "https://navedex-api.herokuapp.com/v1/navers/" + id;
    
        let h = new Headers();
        h.append("Accept", "application/json");
        h.append("Authorization", "Bearer " + token);

        const response = await fetch(uri, {method: "DELETE", headers: h});

        const json = await response.json();

        console.log(json);

        changeDisplay("modal-confirm", "none");

        if(json.deleted){
            changeDisplay("modal-delete", "block");
            setNaver(new Naver());
        } else {
            changeDisplay("modal-error", "block");
        }
    }

    return arrayNavers && (
        <main className="default-box">
            <div className="transparent" id="transparent">
                <div className="modal-naver" id="modal-naver">
                    <img src={iconExit} alt="sair" className="x-icon" 
                        onClick={() => {changeDisplay("modal-naver", "none")}}
                    />
                    <img src={showNaver.url} alt="Foto" className="modal-photo" />
                    <div className="modal-text">
                        <h3>{showNaver.name}</h3>
                        <p>{showNaver.job_role}</p>
                        <span>Idade</span>
                        <p>{calcYears(showNaver.birthdate)}</p>
                        <span>Tempo de empresa</span>
                        <p>{calcYears(showNaver.admission_date)}</p>
                        <span>Projetos que participou</span>
                        <p>{showNaver.project}</p>
                        <div className="icon-wrap">
                        <img src={iconDelete} alt="excluir" className="icon" onClick={() => {changeDisplay("modal-naver", "none"); changeDisplay("modal-confirm", "block")}}/>
                        <Link to={"/navers/editar/" + showNaver.id}><img src={iconEdit} alt="editar" className="icon" /></Link>
                        </div>
                    </div>
                </div>
                <div className="modal" id="modal-confirm">
                    <h3>Excluir Naver</h3>
                        <p>Tem certeza que deseja excluir o Naver {showNaver.name}?</p>
                    <div className="button-wrap">
                        <button className="button-negative" 
                            onClick={() => {changeDisplay("modal-confirm", "none")}}
                        >Cancelar</button>
                        <button className="button"  
                            onClick={() => {deleteNaver(showNaver.id)}}
                            >Excluir</button>
                    </div>
                </div>
                <div className="modal" id="modal-delete">
                    <img src={iconExit} alt="sair" className="x-icon"
                        onClick={() => {changeDisplay("modal-delete", "none")}}/>
                    <h3>Naver excluído</h3>
                    <p>Naver excluído com sucesso!</p>
                </div>
                <div className="modal" id="modal-error">
                    <img src={iconExit} alt="sair" className="x-icon"
                        onClick={() => {changeDisplay("modal-error", "none")}}/>
                    <h3>Ops! Ocorreu um erro...</h3>
                    <p>Ocorreu um erro ao processar a solicitação.</p>
                </div>
            </div>
            <div className="wrapper">
                <h2 className="navers-title">Navers</h2>
                <Link to="/navers/adicionar"><button className="button">Adicionar Naver</button></Link>
            </div>
            <div className="navers">
                <ul>
                    { arrayNavers.map((naver, i) => {
                        return (
                        <li className="navers-card" key={i}>
                        <div style={{cursor: "pointer"}} onClick={() => {
                            setNaver(naver);
                            changeDisplay("modal-naver", "block")}}>
                            <h3><img src={naver.url} alt="Foto" className="photo" /></h3>
                            <h4>{naver.name}</h4>
                            <p>{naver.job_role}</p>
                        </div>
                        <img src={iconDelete} alt="excluir" className="icon" onClick={() => {setNaver(naver); changeDisplay("modal-confirm", "block");}}/>
                        <Link to={"/navers/editar/" + naver.id}><img src={iconEdit} alt="editar" className="icon" /></Link>
                        </li>
                        );
                    })
                    }
                </ul>
            </div>
        </main>
    );
}

export default NaversList;