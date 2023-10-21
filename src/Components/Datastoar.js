
let bearerToken = "Bearer ";

let tokenset = false;

export function getBearerToken() {

return bearerToken;

}

export function setBearerToken(newToken) {

if(tokenset == false) {

tokenset = true;

bearerToken = bearerToken + newToken

}

}