import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './app.jsx';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <Auth0Provider
    domain="dev-ibulh8kz68gq6pwf.us.auth0.com"
    clientId="PzOtmknYafgNAyTXWB34RuqK0QbEPjU6"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
