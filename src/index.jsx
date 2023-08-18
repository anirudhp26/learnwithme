import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './global.css';
import authReducer from './redux';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PERSIST, PURGE, REGISTER, REHYDRATE, PAUSE],
      },
    }),
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="268091910213-d2pivla123ctr6ohectd5a5b59q8mvtr.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <App />
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);