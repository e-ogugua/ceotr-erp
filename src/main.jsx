/**
 * main.jsx - Application entry point for CEOTR Ltd ERP Suite
 *
 * This file serves as the entry point for the React application, mounting
 * the root component to the DOM and setting up React Router for client-side navigation.
 * It provides the foundation for the entire application structure.
 *
 * @fileoverview Application bootstrap and DOM mounting
 */

/**
 * CEOTR Ltd ERP Suite — Developed by CEO – Chukwuka Emmanuel Ogugua.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
