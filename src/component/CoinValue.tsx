import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore } from 'redux';

const initialCoin = {
  count: 200
};

const coinPersistConfig = {
  key: 'root',
  storage
};

const coinReducer = (state = initialCoin, action : any) => {
  switch (action.type) {
    case 'ADD_5':
      return {
        ...state,
        count: state.count + 5
      };
    case 'SUB_5':
      return {
        ...state,
        count: state.count - 5
      };
    case 'BUY_PRO':
        return{
          ...state,
          count: state.count - action.payload
        };
    case 'SELL_PRO':
        return{
          ...state,
          count: state.count + action.payload
        };
    default:
      return state;
  }
};

const persistedReducerCoin = persistReducer(coinPersistConfig, coinReducer);

const coinCount = createStore(persistedReducerCoin);
const persistorCoin = persistStore(coinCount);

export default { coinCount, persistorCoin };