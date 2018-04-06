import { fromJS } from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_ITEMS = 'FETCH_ITEMS'
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
export const DELETE_ITEM = 'DELETE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const RECEIVE_ITEM = 'RECEIVE_ITEM'

// ------------------------------------
// Actions
// ------------------------------------
export function fetchItems () {
  return {
    type: FETCH_ITEMS
  }
}

export function receiveItems (data) {
  return {
    type: RECEIVE_ITEMS,
    payload: data
  }
}

export function receiveItem (data) {
  return {
    type: RECEIVE_ITEM,
    payload: data
  }
}

export function deleteItem (data) {
  return {
    type: DELETE_ITEM,
    payload: data
  }
}

export function addItem (data) {
  return {
    type: ADD_ITEM,
    payload: data
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_ITEMS]: (state, { payload }) => {
    return state.set('loading', true)
  },
  [RECEIVE_ITEM]: (state, { payload }) => {
    return state.set('loading', true)
  },
  [DELETE_ITEM]: (state, { payload }) => {
    return state.set('loading', true)
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS({
  loading: false,
  list: []
})

export default function itemsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
