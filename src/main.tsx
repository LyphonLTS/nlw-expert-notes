import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { Toaster } from 'sonner'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/*
      # Addin Toaster from ShadcnUI to notify the user about note creation
    */}
    <Toaster richColors />
  </React.StrictMode>,
)
