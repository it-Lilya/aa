import { configureStore } from "@reduxjs/toolkit";

// описываем структуру состояния
type State = {
  counter: number,
} // store  в котором хранится state


export type IncrementAction = {
  type: 'increment'
}
export type DecrementAction = {
  type: 'decrement'
}
// типы action-ов
type Action = IncrementAction | DecrementAction;


const initialState = {
  counter: 0,
}
// создание reducer
const reducer = (state = initialState, action: Action) : State => { // в первый раз состояния не будет
  switch(action.type) {
    case "increment":
      return {
        ...state, // все остальные поля
        counter: state.counter + 1,
      };
    case "decrement":
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

// создание store
export const store = configureStore({
  reducer: reducer,
});

store.dispatch;
store.getState;
store.subscribe;

