import axios from "axios"
import { IProduct } from "shared/models"
import { AppDispatch } from "store"
import {
  AddProductAction,
  DeleteProductAction,
  Filters,
  ProductsActionsEnum,
  SetCategories,
  SetErrorAction,
  SetFiltersAction,
  SetLoadingAction,
  SetMessageAction,
  SetProductsAction,
  SetSearchAction,
  UpdateProductAction,
} from "./types"

const PRODUCTS_API = "https://dummyjson.com/products"

export const ProductsActionCreators = {
  setProducts: (products: IProduct[]): SetProductsAction => ({
    type: ProductsActionsEnum.SET_PRODUCTS,
    payload: products,
  }),
  setLoading: (isLoading: boolean): SetLoadingAction => ({
    type: ProductsActionsEnum.SET_LOADING,
    payload: isLoading,
  }),
  setError: (error: string): SetErrorAction => ({
    type: ProductsActionsEnum.SET_ERROR,
    payload: error,
  }),
  setFilters: (filters: Filters): SetFiltersAction => ({
    type: ProductsActionsEnum.SET_FILTERS,
    payload: filters,
  }),
  setMessage: (message: string): SetMessageAction => ({
    type: ProductsActionsEnum.SET_MESSAGE,
    payload: message,
  }),
  setSearch: (search: string): SetSearchAction => ({
    type: ProductsActionsEnum.SET_SEARCH,
    payload: search,
  }),
  setCategories: (categories: string[]): SetCategories => ({
    type: ProductsActionsEnum.SET_CATEGORIES,
    payload: categories,
  }),
  deleteProduct: (id: number): DeleteProductAction => ({
    type: ProductsActionsEnum.DELETE_PRODUCT,
    payload: id,
  }),
  updateProduct: (product: IProduct): UpdateProductAction => ({
    type: ProductsActionsEnum.UPDATE_PRODUCT,
    payload: product,
  }),
  addProduct: (product: IProduct): AddProductAction => ({
    type: ProductsActionsEnum.ADD_PRODUCT,
    payload: product,
  }),
  fetchProducts: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsActionCreators.setLoading(true))
      const response = await axios.get(PRODUCTS_API)
      dispatch(ProductsActionCreators.setProducts(response.data.products))
    } catch (error) {
      dispatch(ProductsActionCreators.setError("Something went wrong"))
    }
  },
  fetchCategories: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsActionCreators.setLoading(true))
      const response = await fetch(`${PRODUCTS_API}/categories`)
      const categories = await response.json()
      dispatch(ProductsActionCreators.setCategories(categories))
    } catch (error) {
      dispatch(ProductsActionCreators.setError("Something went wrong"))
    }
  },
  deleteProductThunk: (id: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsActionCreators.setLoading(true))
      const res = await axios.delete(`${PRODUCTS_API}/${id}`, {
        method: "DELETE",
      })
      if (res.status === 200) {
        dispatch(ProductsActionCreators.deleteProduct(id))
        dispatch(ProductsActionCreators.setMessage('Successfully deleted!'))
      }
    } catch (error) {
      dispatch(ProductsActionCreators.setError("Something went wrong"))
    }
  },
  updateProductThunk: (product: IProduct) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsActionCreators.setLoading(true))
      const res = await axios.put(`${PRODUCTS_API}/${product.id}`, {
        body: product,
      })
      if (res.status === 200) {
        dispatch(ProductsActionCreators.updateProduct(product))
        dispatch(ProductsActionCreators.setMessage('Successfully updated!'))
      }
    } catch (error) {
      dispatch(ProductsActionCreators.setError("Something went wrong"))
    }
  },
  addProductThunk: (product: IProduct) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsActionCreators.setLoading(true))
      const res = await axios.post(`${PRODUCTS_API}/add`, {
        body: product,
      })
      if (res.status === 200) {
        dispatch(ProductsActionCreators.addProduct(product))
        dispatch(ProductsActionCreators.setMessage('Successfully added!'))
      }
    } catch (error) {
      dispatch(ProductsActionCreators.setError("Something went wrong"))
    }
  },
}
