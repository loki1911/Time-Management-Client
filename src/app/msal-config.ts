import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '', 
      authority: 'https://login.microsoftonline.com/common', 
      redirectUri: 'http://localhost:4200', 
    },
  });
}

export const msalConfig = {
  auth: {
    clientId: '', 
    authority: 'https://login.microsoftonline.com/common', 
    redirectUri: 'http://localhost:4200', 
  },
  cache: {
    cacheLocation: 'localStorage', 
    storeAuthStateInCookie: true, 
  },
};
