import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { polyfill } from "mobile-drag-drop";
import App from './App.tsx'
import './index.css'
import "mobile-drag-drop/default.css"; 


polyfill({
  dragImageCenterOnTouch: true 
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
