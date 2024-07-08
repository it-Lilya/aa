import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, useStore } from "react-redux";

type CounterState = {
  counter: number;
};
export type CounterId = string;

// описываем структуру состояния
type State = {
  counters: Record<CounterId, CounterState | undefined>;
} // store  в котором хранится state


export type IncrementAction = {
  type: 'increment';
  payload: {
    counterId: CounterId;
  }
}
export type DecrementAction = {
  type: 'decrement';
  payload: {
    counterId: CounterId;
  }
}
// типы action-ов
type Action = IncrementAction | DecrementAction;

const initialCounterState: CounterState = {counter: 0};
const initialState: State = {
  counters: {},
}
// создание reducer
const reducer = (state = initialState, action: Action) : State => { // в первый раз состояния не будет
  switch(action.type) {
    case "increment": {
      const {counterId} = action.payload;
      const currentCounter = state.counters[counterId] ?? initialCounterState;
      return {
        ...state, // все остальные поля
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 1
          }
        }
      };
    }
    case "decrement": {
      const {counterId} = action.payload;
      const currentCounter = state.counters[counterId] ?? initialCounterState;
      return {
        ...state, // все остальные поля
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter - 1
          }
        }
      };
    }
    default:
      return state;
  }
};

// создание store
export const store = configureStore({
  reducer: reducer,
});

export const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];

// экспорт type Store
export type AppState = ReturnType<typeof store.getState>;
// store.dispatch;
// store.getState;
// store.subscribe;

export type AppDispatch = typeof store.dispatch;
// возвращает версию useSelector уже типизированную AppStat-ом
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = () => useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();