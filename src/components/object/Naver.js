class Naver {
    constructor (id, nome, cargo, nascimento, admissao, projetos, fotoUrl){
        this.id = id ?? null; 
        this.name = nome ?? null; 
        this.job_role = cargo ?? null;
        this.birthdate = nascimento ?? Date.now(); 
        this.admission_date = admissao ?? Date.now();
        this.project = projetos ?? null;
        this.url = fotoUrl ?? null;
    }
}

export default Naver;