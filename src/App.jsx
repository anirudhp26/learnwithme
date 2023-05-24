import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './views/login';
import Home from './views/home';
import Profile from './views/profile';
import Explore from './views/explore/Explore';
import authReducer from './redux';
import Layout from './views/Layout';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
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

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<Home />} path='/home'></Route>
              <Route element={<Explore />} path='/explore'></Route>
              <Route element={<Profile />} path='/:user'></Route>
            </Route>
            <Route element={<Login />} path='/'></Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App;
