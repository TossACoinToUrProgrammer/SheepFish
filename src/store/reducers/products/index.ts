import { ProductsAction, ProductsActionsEnum, ProductsState } from "./types"

const initialState: ProductsState = {
  products: null,
  isLoading: false,
}

export default function productsReducer(
  state = initialState,
  action: ProductsAction
): ProductsState {
  switch (action.type) {

    default:
      return state
  }
}
