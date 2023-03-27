import { ProductsAction, ProductsActionsEnum, ProductsState } from "./types"

const initialState: ProductsState = {
  products: null,
  isLoading: false,
  filters: {},
  categories: null,
  search: "",
}

export default function productsReducer(
  state = initialState,
  action: ProductsAction
): ProductsState {
  switch (action.type) {
    case ProductsActionsEnum.ADD_PRODUCT:
      return {
        ...state,
        products: state.products
          ? [action.payload, ...state.products]
          : [action.payload],
        isLoading: false,
      }

    case ProductsActionsEnum.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products!.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        isLoading: false,
      }

    case ProductsActionsEnum.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products!.filter((item) => item.id !== action.payload),
        isLoading: false,
      }
    case ProductsActionsEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false }

    case ProductsActionsEnum.SET_LOADING:
      return { ...state, isLoading: action.payload }

    case ProductsActionsEnum.SET_PRODUCTS:
      return { ...state, products: action.payload, isLoading: false }

    case ProductsActionsEnum.SET_FILTERS:
      return { ...state, filters: action.payload }

    case ProductsActionsEnum.SET_CATEGORIES:
      return { ...state, categories: action.payload }

    case ProductsActionsEnum.SET_SEARCH:
      return { ...state, search: action.payload }

    case ProductsActionsEnum.SET_MESSAGE:
      return { ...state, message: action.payload }

    default:
      return state
  }
}
