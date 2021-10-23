import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./reducers/rootReducer";
import reduxLogger from './lib/reduxLoggerMiddleware';

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware => getDefaultMiddleware().concat(reduxLogger)),
    preloadedState
  });
  return store;
}
