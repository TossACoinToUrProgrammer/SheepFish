import { IProduct } from "shared/models"

export interface Filters {
  category?: string
  price?: {
    min?: number
    max?: number
  }
}

export interface ProductsState {
  products: IProduct[] | null
  isLoading: boolean
  error?: string
  filters: Filters
  categories: string[] | null
  search: string
}

export enum ProductsActionsEnum {
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_FILTERS = "SET_FILTERS",
  SET_SEARCH = "SET_SEARCH",
  SET_CATEGORIES = "SET_CATEGORIES",
  DELETE_PRODUCT = "DELETE_PRODUCT",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  ADD_PRODUCT = "ADD_PRODUCT",
}

export interface SetProductsAction {
  type: ProductsActionsEnum.SET_PRODUCTS
  payload: IProduct[] | null
}

export interface SetLoadingAction {
  type: ProductsActionsEnum.SET_LOADING
  payload: boolean
}

export interface SetSearchAction {
  type: ProductsActionsEnum.SET_SEARCH
  payload: string
}

export interface SetErrorAction {
  type: ProductsActionsEnum.SET_ERROR
  payload: string
}

export interface SetFiltersAction {
  type: ProductsActionsEnum.SET_FILTERS
  payload: Filters
}

export interface SetCategories {
  type: ProductsActionsEnum.SET_CATEGORIES
  payload: string[]
}

export interface DeleteProductAction {
  type: ProductsActionsEnum.DELETE_PRODUCT
  payload: number
}

export interface UpdateProductAction {
  type: ProductsActionsEnum.UPDATE_PRODUCT
  payload: IProduct
}

export interface AddProductAction {
  type: ProductsActionsEnum.ADD_PRODUCT
  payload: IProduct
}

export type ProductsAction =
  | SetProductsAction
  | SetErrorAction
  | SetLoadingAction
  | DeleteProductAction
  | UpdateProductAction
  | AddProductAction
  | SetFiltersAction
  | SetCategories
  | SetSearchAction
