import { useAuthStore } from '@/stores';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        console.log("InFetch1");
        if (body) {
            console.log("InFetch2");
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
            console.log("InFetch3");
        }
        console.log("InFetch4");
        return fetch(url, requestOptions).then(handleResponse);
        console.log("InFetch5");
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    //const { user } = useAuthStore(); // the following two lines was a change to enable storing the token in encoded text - not encoded text wrapped in a JSON string...
    //const isLoggedIn = !!user?.token;
    const { loginToken } = useAuthStore();
    const isLoggedIn = !!loginToken;
    console.log("InFetchAuthHeader2", isLoggedIn, loginToken,loginToken?.token);
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        //return { Authorization: `Bearer ${user.token}` };
        console.log("putting token into header",loginToken, loginToken.data);
        //return { Authorization: `Bearer ${loginToken.token}` };
        return { Authorization: `Bearer ${loginToken}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        console.log("hmm3");
        const data = text && JSON.parse(text);
        console.log("hmm4");
        console.log("hmm5", response);
        if (!response.ok) {
            //const { user, logout } = useAuthStore();
            const { loginToken, logout } = useAuthStore();
            //if ([401, 403].includes(response.status) && user) {
            if ([401, 403].includes(response.status) && loginToken) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                logout();
            }

            //I can only attribute the need for the next 4 lines to various servers idiosyncrasies around status codes and messages
            // the VS 19 IDE server gave full status messages - my hosted IIS did not...
            var errorResponses = "";
            if (response.status == "401") { errorResponses = "401 - Unauthorized"; }
            if (response.status == "403") { errorResponses = "403 - Forbidden"; }
            if (response.status == "417") { errorResponses = "417 - Expectation Failed"; }
            const error = (data && data.message) || errorResponses; // response.status; //Text;
            //const error = (data && data.message) || response.statusText;
            console.log("hmm2");
            console.log("error", error,data, data.message, response.statusText, response.status);
            //if (response.status = "417") { const error = {error:"417"}; }
            return Promise.reject(error);
        }

        return data;
    });
}    
