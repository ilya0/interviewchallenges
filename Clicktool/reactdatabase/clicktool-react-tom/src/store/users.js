import { fromJS } from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_USERS = 'FETCH_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const DELETE_USER = 'DELETE_USER'
export const ADD_USER = 'ADD_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

// ------------------------------------
// Actions
// ------------------------------------
export function fetchUsers () {
  return {
    type: FETCH_USERS
  }
}

export function receiveUsers (data) {
  return {
    type: RECEIVE_USERS,
    payload: data
  }
}

export function receiveUser (data) {
  return {
    type: RECEIVE_USER,
    payload: data
  }
}

export function deleteUser (data) {
  return {
    type: DELETE_USER,
    payload: data
  }
}

export function addUser (data) {
  return {
    type: ADD_USER,
    payload: data
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_USERS]: (state, { payload }) => {
    return state.merge(fromJS(payload))
  },
  [RECEIVE_USER]: (state, { payload }) => {
    return state.set('loading', true)
  },
  [ADD_USER]: (state, { payload }) => {
    return state.push(fromJS(payload))
  },
  [DELETE_USER]: (state, { payload }) => {
    return state.delete(payload)
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = fromJS(
  [{
    id: 1,
    first: 'Name',
    last: 'Url',
    age: 71,
    description: 'Bucky is a React developer and YouTuber',
    thumbnail: 'http://i.imgur.com/7yUvePI.jpg'
  },
  {
    id: 2,
    first: 'Name 2',
    last: 'URl 2',
    age: 27,
    description: 'Joby loves the Packers, cheese, and turtles.',
    thumbnail: 'http://i.imgur.com/52xRlm8.png'
  },
  {
    id: 3,
    first: 'Name 3',
    last: 'Url 3',
    age: 24,
    description: 'Madi likes her dog but it is really annoying.',
    thumbnail: 'http://i.imgur.com/4EMtxHB.png'
  },
  {
    id: 4,
    first: 'last ',
    last: 'one',
    age: 24,
    description: 'Madi likes her dog but it is really annoying.',
    thumbnail: 'http://i.imgur.com/4EMtxHB.png'
  }
]);

export default function usersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
