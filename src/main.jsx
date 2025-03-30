import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './context/storeContext.jsx'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      
      </StoreContextProvider> 
    </BrowserRouter> 
  </StrictMode>,
)
