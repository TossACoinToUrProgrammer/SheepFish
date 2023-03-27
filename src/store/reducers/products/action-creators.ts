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
      const response = await fetch(PRODUCTS_API)
      const products = await response.json()
      dispatch(ProductsActionCreators.setProducts(products.products))
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
      const res = await fetch(`${PRODUCTS_API}/${id}`, {
        method: "DELETE",
      })
      if (res.status === 201) {
        dispatch(ProductsActionCreators.deleteProduct(id))
      }
    } catch (error) {
      dispatch(ProductsActionCreators.setError("Something went wrong"))
    }
  },
  updateProductThunk: (product: IProduct) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsActionCreators.setLoading(true))
      const res = await fetch(`${PRODUCTS_API}/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      if (res.status === 201) {
        dispatch(ProductsActionCreators.updateProduct(product))
      }
    } catch (error) {
      dispatch(ProductsActionCreators.setError("Something went wrong"))
    }
  },
  addProductThunk: (product: IProduct) => async (dispatch: AppDispatch) => {
    try {
      dispatch(ProductsActionCreators.setLoading(true))
      const res = await fetch(`${PRODUCTS_API}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })
      if (res.status === 201) {
        dispatch(ProductsActionCreators.addProduct(product))
      }
    } catch (error) {
      dispatch(ProductsActionCreators.setError("Something went wrong"))
    }
  },
}
