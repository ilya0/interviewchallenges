import { Record } from 'immutable'
import log from '../middleware/logger'
import { browserHistory } from 'react-router'
import api from '../middleware/api'

export const FETCH_ITEMS = 'FETCH_ITEMS'
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
export const DELETE_ITEM = 'DELETE_ITEM'
export const ADD_ITEM = 'ADD_ITEM'
export const RECEIVE_ITEM = 'RECEIVE_ITEM'

const Items = new Record({

})

const User = new Record({
  id: null,
  username: null,
  password: null,
  email: null,
  name: null,
  createdAt: null,
  token: null,
  phone: null,
  country_code: null,
  authy_id: null
})

export function authLoginRequest (payload) {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload
  }
}

export function authLoginSuccess (payload) {
  sessionStorage.setItem('token', payload.user.token)
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload
  }
}

export function authCodeEnter (payload) {
  return {
    type: AUTH_CODE_ENTER,
    payload
  }
}

export function authSignupSuccess (payload) {
  return {
    type: AUTH_SIGNUP_SUCCESS,
    payload
  }
}

export function authLoginFailure (payload) {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload
  }
}

export function authSignupFailure (payload) {
  return {
    type: AUTH_SIGNUP_FAILURE,
    payload
  }
}

export function receiveAccountInfo (payload) {
  return {
    type: RECEIVE_ACCOUNT_INFO,
    payload
  }
}

export function logout () {
  sessionStorage.removeItem('token')
  browserHistory.replace('/')
  return {
    type: AUTH_LOGOUT_USER
  }
}

export const loginWithToken = (token, redirect = null) => {
  return (dispatch, getState) => {
    dispatch(authLoginRequest())
    log.debug('Auth::loginWithToken::initial')
    return api.get('/users/authenticate')
      .then(({ data }) => {
        dispatch(authLoginSuccess(data))
        return data
      })
      .catch((e) => dispatch(authLoginFailure('Session expired.')))
  }
}

export const login = (payload, redirect = null) => {
  return (dispatch, getState) => {
    dispatch(authLoginRequest(payload))
    log.debug('Auth::login::initial', payload)
    const body = JSON.stringify({
      email: payload.email,
      password: payload.password
    })
    return api.post('/users/authenticate', body)
      .then(({ data }) => {
        dispatch(authCodeEnter(data))
      })
      .catch((e) => {
        dispatch(authLoginFailure('Invalid credentials.'))
      })
  }
}

export const sendToken = (payload, redirect = null) => {
  return (dispatch, getState) => {
    log.debug('Auth::token::initial', payload)
    const state = getState()
    const body = JSON.stringify({
      user_id: state.auth.user.id,
      code: payload.code
    })
    return api.post('/users/authy', body)
      .then(({ data }) => {
        dispatch(authLoginSuccess(data))
      })
      .catch((e) => {
        dispatch(authLoginFailure('Invalid code.'))
      })
  }
}

export const signup = (payload) => {
  return (dispatch, getState) => {
    dispatch(authLoginRequest(payload))
    log.debug('Auth::signup::initial', payload)
    const body = JSON.stringify(payload)
    return api.post('/users', body)
      .then(({ data }) => {
        dispatch(authSignupSuccess(data))
        return Promise.resolve(data)
      })
      .catch((e) => dispatch(authSignupFailure(e)))
  }
}

export const saveAccountInfo = (payload) => {
  return (dispatch, getState) => {
    log.debug('Auth::saveAccountInfo::initial', payload)
    return api.patch(`/user`, JSON.stringify(payload))
      .then(({ data }) => {
        log.debug('Auth::saveAccountInfo::response', data)
        dispatch(receiveAccountInfo(data))
      })
      .catch((e) => log.error(e))
  }
}

export const actions = {
  login,
  logout,
  signup,
  saveAccountInfo
}

const initialState = new Auth()

const ACTION_HANDLERS = {
  [AUTH_CODE_ENTER]: (state, { payload }) => {
    return state.set('enterCode', true)
      .set('user', new User(payload.user))
  },
  [AUTH_LOGIN_REQUEST]: (state, { payload }) => {
    return state.set('isAuthenticating', true)
  },
  [AUTH_LOGIN_SUCCESS]: (state, { payload }) => {
    return state.set('isAuthenticating', false)
      .set('token', payload.user.token)
      .set('enterCode', false)
      .set('user', new User(payload.user))
      .set('isAuthenticated', true)
      .set('error', null)
  },
  [AUTH_LOGIN_FAILURE]: (state, { payload }) => {
    return state.set('isAuthenticating', false)
      .set('error', payload)
  },
  [AUTH_LOGOUT_USER]: (state) => {
    return state.set('isAuthenticated', false)
      .set('token', null)
      .set('user', null)
      .set('error', null)
  },
  [RECEIVE_ACCOUNT_INFO]: (state, { payload }) => {
    return state.set('user', payload)
  }
}

export default function authReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
