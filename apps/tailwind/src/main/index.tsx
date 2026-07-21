import * as React from 'react';
import { createRoot } from 'react-dom/client';
import '../globals.css';
import Main from './page';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
