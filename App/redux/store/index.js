import reducer from '../reducers';
import { createStore,applyMiddleware } from 'redux';
import rootSaga from '../sagas/rootSaga';
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
export default store