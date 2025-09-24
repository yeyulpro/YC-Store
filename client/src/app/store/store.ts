import { configureStore } from '@reduxjs/toolkit'
import { catalogApi } from '../../features/catalog/catalogApi'
import { basketApi } from '../../features/basket/BasketApi'
import { catalogSlice } from '../../features/catalog/catalogSlice'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'




export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    catalog: catalogSlice.reducer
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(catalogApi.middleware,basketApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();