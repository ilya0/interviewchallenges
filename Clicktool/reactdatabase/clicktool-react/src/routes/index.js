import CoreContainer from '../containers/CoreContainer'
import UsersRoute from './Users'

export const createRoutes = (store) => ({
  path        : '/',
  childRoutes : [
    {
      component: CoreContainer,
      indexRoute: {
        onEnter: (nextState, replace) => replace('/users')
      },
      childRoutes: [
        UsersRoute(store)
      ]
    },
  ]
})

export default createRoutes
