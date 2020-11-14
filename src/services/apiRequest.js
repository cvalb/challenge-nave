import { getToken } from '../services/auth';

//Login 
export const apiRequest = async (requestType, requestObject) => {
    const requestBody = new FormData();
    const token = getToken();

    let uri = "https://navedex-api.herokuapp.com/v1/";    
    let requestMethod;
    let request;
    let jsonHttp;

    const requestHeader = new Headers();
    requestHeader.append("Accept", "application/json");

    switch (requestType){
        case "login":
            requestMethod = "POST";
            uri = uri + "users/login";

            requestBody.append("email", requestObject.email);
            requestBody.append("password", requestObject.password);

            jsonHttp = {
                method: requestMethod,
                headers: requestHeader,
                body: requestBody
            };

            break;

        case "add" || "edit":
        /* I don't think this would be the best practice, but it's legible and concise.
            Accepting suggestions */
            switch(requestType){
                case "add":
                    requestMethod = "POST";
                    uri = uri + "navers";
                    break;

                case "edit":
                    requestMethod = "PUT";
                    uri = uri + "navers/" + requestObject.id;
                    break;

                default: 
                    return;
            }

            requestHeader.append("Authorization", "Bearer " + token);

            requestBody.append("job_role", requestObject.jobRole);
            requestBody.append("admission_date", requestObject.admission);
            requestBody.append("birthdate", requestObject.birthdate);
            requestBody.append("name", requestObject.name);
            requestBody.append("project", requestObject.projects);
            requestBody.append("url", requestObject.photoUrl);
            
            jsonHttp = {
                method: requestMethod,
                headers: requestHeader,
                body: requestBody
            };
            break;

        case "delete":
            requestMethod = "DELETE";
            uri = uri + "navers/" + requestObject.id;

            requestHeader.append("Authorization", "Bearer " + token);

            jsonHttp = {
                method: requestMethod,
                headers: requestHeader
            };

            break;

        case "list":
                requestMethod = "GET";
                uri = uri + "navers";
    
                requestHeader.append("Authorization", "Bearer " + token);
                
                jsonHttp = {
                    method: requestMethod,
                    headers: requestHeader
                };
    
                break;

        case "show":
            requestMethod = "GET";
            uri = uri + "navers/" + requestObject.id;

            requestHeader.append("Authorization", "Bearer " + token);
            
            jsonHttp = {
                method: requestMethod,
                headers: requestHeader
            };

            break;

        default: 

            return;
    }

    request = new Request(uri, jsonHttp);

    const response = await fetch(request);
    const json = await response.json();

    return json;
}

/*

//FormAdd
const sendForm1 = async () => {

    const admissionSend = requestDate(admission);
    const birthdateSend = requestDate(birthdate);

    Object.append({birthdate: birthdateSend, admission: admissionSend});
    
    const addedNaver = await apiRequest("add");

    if(addedNaver.id){
        changeDisplay("modal-create", "block");
    } else {
        changeDisplay("modal-error", "block");
    }
}

//FormEdit
useEffect(async () => {
    const getNaver = async () => {

        const editedNaver = await apiRequest("get");

        setNaver(editedNaver);
        setName(editedNaver.name);
        setBirthdate(handleDate(editedNaver.birthdate));
        setJobRole(editedNaver.job_role);
        setProjects(editedNaver.project);
        setAdmission(handleDate(editedNaver.admission_date));
        setPhotoUrl(editedNaver.url);
    }

    getNaver();
}, []);

const sendForm2 = async () => {

    const admissionSend = requestDate(admission);
    const birthdateSend = requestDate(birthdate);

    Object.append({birthdate: birthdateSend, admission: admissionSend});

    const editedNaver = await apiRequest("edit");


    if(editedNaver.id){
        changeDisplay("modal-edit", "block");
    } else {
        changeDisplay("modal-error", "block");
    }
}

*/