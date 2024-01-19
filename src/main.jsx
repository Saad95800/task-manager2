import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {store} from './redux/store'
import {Provider} from'react-redux'
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <SnackbarProvider maxSnack={1}>} */}
          <App />              
        {/* </SnackbarProvider> */}
      </Provider>  
    </BrowserRouter>
  </React.StrictMode>,
)
