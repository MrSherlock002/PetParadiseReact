import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import rootReducer from "./reducers/RootReducer";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

// Thunk import statements
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";

// Persisting store
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

// Persisting redux state changes
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk)//,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() - For dev purpose only
  )
);

const Persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
