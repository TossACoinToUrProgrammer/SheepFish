import { IProduct } from "models"

export interface ProductsState {
  products: IProduct[] | null
  isLoading: boolean
  error?: string
}

export enum ProductsActionsEnum {
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
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

export interface SetErrorAction {
  type: ProductsActionsEnum.SET_ERROR
  payload: string
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