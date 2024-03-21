import type {
  AsyncThunk,
  PayloadAction,
  Slice,
  SliceSelectors,
} from '@reduxjs/toolkit'
import type { AsyncThunkConfig } from '@reduxjs/toolkit/dist/createAsyncThunk'

declare module '@RX-pizza' {
  type Pizza = {
    id: string
    title: string
    price: number
    imageUrl: string
    sizes: number[]
    types: number[]
    rating: number
  }

  enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
  }

  type SearchPizzaParams = {
    sortBy: string
    order: string
    category: string
    search: string
    currentPage: string
  }

  type PizzaSliceState = {
    pizzas: Pizza[]
    status: Status
  }

  type Reducers = {
    setPizzas(state: PizzaSliceState, action: PayloadAction<Pizza[]>): void
  }

  type PizzaSlice = Slice<
    PizzaSliceState,
    Reducers,
    'pizza',
    'pizza',
    SliceSelectors<PizzaSliceState>
  >

  type FetchPizzas = AsyncThunk<Pizza[], SearchPizzaParams, AsyncThunkConfig>
}
