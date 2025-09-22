import { configureStore } from '@reduxjs/toolkit'
import { catalogApi } from '../../features/catalog/catalogApi'
import { basketApi } from '../../features/basket/BasketApi'




export const store = configureStore({
  reducer: {
    [catalogApi.reducerPath]: catalogApi.reducer,
    [basketApi.reducerPath]:basketApi.reducer
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(catalogApi.middleware,basketApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch