import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers/rootReducer";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

export default store

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch