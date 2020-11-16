import { getToken } from '../services/auth';

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

        case "add":
            requestMethod = "POST";
            uri = uri + "navers";

            requestHeader.append("Authorization", "Bearer " + token);

            requestBody.append("job_role", requestObject.job_role);
            requestBody.append("admission_date", requestObject.admission_date);
            requestBody.append("birthdate", requestObject.birthdate);
            requestBody.append("name", requestObject.name);
            requestBody.append("project", requestObject.project);
            requestBody.append("url", requestObject.url);
            
            jsonHttp = {
                method: requestMethod,
                headers: requestHeader,
                body: requestBody
            };
            break;

        case "edit":
            requestMethod = "PUT";
            uri = uri + "navers/" + requestObject.id;
        
            requestHeader.append("Authorization", "Bearer " + token);

            requestBody.append("job_role", requestObject.job_role);
            requestBody.append("admission_date", requestObject.admission_date);
            requestBody.append("birthdate", requestObject.birthdate);
            requestBody.append("name", requestObject.name);
            requestBody.append("project", requestObject.project);
            requestBody.append("url", requestObject.url);
            
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