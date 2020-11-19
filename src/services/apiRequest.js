import { getToken } from '../services/auth';

export const apiRequest = async (requestType, needAuthentication, requestObject) => {
    const token = getToken();

    let uri = "https://navedex-api.herokuapp.com/v1/";    
    let requestMethod;
    let requestBody;
    let request;
    let jsonHttp;

    const requestHeader = new Headers();
    requestHeader.append("Accept", "application/json");

    if(needAuthentication){
        requestHeader.append("Authorization", "Bearer " + token);
    }

    // Build the request information based on the type of request
    // I'm not sure if it's the best way of doing it, but it concentrates the API requests in one place.
    switch (requestType){
        case "login":
            requestMethod = "POST";
            uri = uri + "users/login";

            requestBody = bodyBuilder("login", requestObject);

        break;

        case "add":
            requestMethod = "POST";
            uri = uri + "navers";

            requestBody = bodyBuilder("naver", requestObject);
            
        break;

        case "edit":
            requestMethod = "PUT";
            uri = uri + "navers/" + requestObject.id;

            requestBody = bodyBuilder("naver", requestObject);
        
        break;
            
        case "delete":
            requestMethod = "DELETE";
            uri = uri + "navers/" + requestObject.id;

        break;

        case "list":
            requestMethod = "GET";
            uri = uri + "navers";
    
        break;

        case "show":
            requestMethod = "GET";
            uri = uri + "navers/" + requestObject.id;

        break;

        default: 
            throw new Error("Assign a valid requestType to the apiRequest function");
    }

    jsonHttp = {
        method: requestMethod,
        headers: requestHeader
    };

    if(typeof requestBody !== "undefined"){
        jsonHttp = Object.assign({body: requestBody}, jsonHttp);  
    }

    request = new Request(uri, jsonHttp);

    const response = await fetch(request);
    const json = await response.json();

    return json;
}

// Yup... it builds the request body...
function bodyBuilder(type, object) {
    const requestBody = new FormData();
    switch(type){
        case "login":
            requestBody.append("email", object.email);
            requestBody.append("password", object.password);

            return requestBody;

        case "naver":
            requestBody.append("job_role", object.job_role);
            requestBody.append("admission_date", object.admission_date);
            requestBody.append("birthdate", object.birthdate);
            requestBody.append("name", object.name);
            requestBody.append("project", object.project);
            requestBody.append("url", object.url);

            return requestBody;

        default:
            throw new Error("This is awkward...");
    }
}