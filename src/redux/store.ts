import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Define a slice for your state
const initialState = {
  inputValue: ''
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        inputValue: action.payload
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
