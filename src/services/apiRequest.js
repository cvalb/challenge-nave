
//Login 
const apiRequest = async (requestType, requestObject) => {
    let uri = "https://navedex-api.herokuapp.com/v1/";
    let requestMethod;
    let request;

    const h = new Headers();
    h.append("Accept", "application/json");

    if(requestType === "login"){
        requestMethod = "POST";

        const email = String(requestObject.email);
        const password = String(requestObject.password);

        const requestBody = new FormData();
        requestBody.append("email", email);
        requestBody.append("password", password);
        uri = uri + "users/login";

        jsonHttp = {
            method: 
        };
    }
    
    request = new Request(uri, jsonHttp);

    const response = await fetch(request);
    const json = await response.json();

    return json;
    
/*    if(json.errorCode){
        changeDisplay("modal-error", "block");
        setLogin(false);
    } else {
        authenticate(json.token);
        setLogin(true);
    }*/
}

//FormAdd
const sendForm1 = async () => {
    const token = getToken();
    const uri = "https://navedex-api.herokuapp.com/v1/navers";

    const admissionSend = requestDate(admission);
    const birthdateSend = requestDate(birthdate);

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

    return json;

/*    if(json.id){
        changeDisplay("modal-create", "block");
    } else {
        changeDisplay("modal-error", "block");
    }*/
}

//FormEdit
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

const sendForm2 = async () => {
    const token = getToken();
    const uri = "https://navedex-api.herokuapp.com/v1/navers/" + naverId.id;

    const admissionSend = requestDate(admission);
    const birthdateSend = requestDate(birthdate);

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
    
    const response = await fetch(uri, {method: "PUT", headers: h, body: requestBody});
    const json = await response.json();

/*    if(json.id){
        changeDisplay("modal-edit", "block");
    } else {
        changeDisplay("modal-error", "block");
    }*/
}

//NaversList
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
}, [showNaver]);

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
