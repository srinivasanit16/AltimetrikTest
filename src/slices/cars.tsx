import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loading: false,
  hasErrors: false,
  cars: [],
}

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    getPosts: (state: any) => {
      state.loading = true
    },
    updateCarsSuccess: (state: any, { payload }: any) => {
      let cars = state.cars
      cars.push(payload)
      state.cars = cars
      state.loading = false
      state.hasErrors = false
    },
    getPostsFailure: (state: any) => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getPosts, updateCarsSuccess, getPostsFailure } = carsSlice.actions
export const carsSelector = (state: any) => state.cars
export default carsSlice.reducer

export function updateCars(car: any) {
  return (dispatch: any) => {

    try {
    //   const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    //   const data = await response.json()

      dispatch(updateCarsSuccess(car))
    } catch (error) {
      dispatch(getPostsFailure())
    }
  }
}
