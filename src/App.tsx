import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { store, IncrementAction, DecrementAction, CounterId, AppState, useAppSelector, selectCounter } from './store';
import { useEffect, useReducer, useRef } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';

function App() {
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  // useEffect(() => {
  //   // передаем ф которая будет вызываться каждый раз когда летит action store
  //   const unsubscribe = store.subscribe(() => {
  //     forceUpdate();
  //   });

  //   // отписываемся при размонтировании
  //   return unsubscribe;
  // })
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Counter counterId='first'/>
      <Counter counterId='second' />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
// селектор - чистая ф котор принимает в себя state 
// и возвращает его какой-то кусочек (не должна создавать 
// новых объектов, массивов)

// возвраает реф с состоянием или undefined
// const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];

export function Counter({counterId}: {counterId: CounterId}) {
  // обращаются к store из контекста
  // useDispatch();
  // useStore();
  // useSelector(); // получ данные из стора, внутри себя реализует логику
  // проверяет изменились ли селекторы в store, и перерисовывает
  const dispatch = useDispatch();
  const counterState = useAppSelector((state) => selectCounter(state, counterId));
  console.log('render', counterId);
  /*
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  console.log('render', counterId);
  const lastStateRef = useRef<ReturnType<typeof selectCounter>>();
  useEffect(() => {
    // передаем ф которая будет вызываться каждый раз когда летит action store
    const unsubscribe = store.subscribe(() => {
      const currentState = selectCounter(store.getState(), counterId);
      const lastState = lastStateRef.current;

      // сравнение селектора
      if (currentState !== lastState) {
        forceUpdate();
      }
      lastStateRef.current = currentState;
    });
    // отписываемся при размонтировании
    return unsubscribe;
  }, []);
*/
  //// const counterState = selectCounter(store.getState(), counterId);
  return (
    <>
     counter {counterState?.counter}
        <button
          onClick={() =>
            // store.dispatch({
            dispatch({
              type: 'increment',
              payload: {counterId}
            } satisfies IncrementAction)
          }
        >
          increment
        </button>
        <button onClick={() => store.dispatch({type: 'decrement', payload: {counterId}} satisfies DecrementAction)}>
          decrement
        </button>
    </>
  )
}
export default App
