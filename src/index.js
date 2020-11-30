import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import UserInfo from './UserInfo';
import Keycloak from 'keycloak-js';
import configData from './config.json';

let keycloak = Keycloak('/keycloak.json');
 
//Initialization of the keycloak instance
keycloak.init({ onLoad: 'login-required' }).success((authenticated) => {
 
   if (!authenticated) {
       window.location.reload();
   } else {
	   
       console.info("Authenticated");
       console.info(JSON.stringify(keycloak.idTokenParsed));
       if (keycloak.hasRealmRole('Customer')|keycloak.hasRealmRole('Provider')){

   //React Render on authentication
 ReactDOM.render((<BrowserRouter>
    <App />
  </BrowserRouter>), document.getElementById('root'));
 
   //store authentication tokens in sessionStorage for usage in app
   sessionStorage.setItem('given_name', keycloak.idTokenParsed.given_name);
   sessionStorage.setItem('id', keycloak.idTokenParsed.name);
   sessionStorage.setItem('family_name', keycloak.idTokenParsed.family_name);
   sessionStorage.setItem('authentication', keycloak.token);
   sessionStorage.setItem('refreshToken', keycloak.refreshToken);
   sessionStorage.setItem('preferredUsername', keycloak.preferredUsername);
   if(keycloak.hasRealmRole('Provider')){sessionStorage.setItem('role', 'Provider');}
   if(keycloak.hasRealmRole('Customer')){sessionStorage.setItem('role', 'Customer');}
 } 
  else {ReactDOM.render((<div>
    <h1>User not authorized </h1>
  </div>), document.getElementById('root'));}
   }
//to regenerate token on expiry
setTimeout(() => {
       keycloak.updateToken(70).success((refreshed) => {
           if (refreshed) {
               console.debug('Token refreshed' + refreshed);
           } else {
               console.warn('Token not refreshed, valid for '
                   + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
           }
       }).error(() => {
           console.error('Failed to refresh token');
       });
 
 
   }, 60000)
 
}).error(() => {
   console.error("Authenticated Failed");
});

export default keycloak;


/*
ReactDOM.render((

<BrowserRouter>
<App />
  </BrowserRouter>

  ), document.getElementById('root'));

  export default keycloak;
*/