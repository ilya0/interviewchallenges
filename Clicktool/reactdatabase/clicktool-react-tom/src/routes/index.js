import CoreContainer from '../containers/CoreContainer'
import ItemsRoute from './Items'

export const createRoutes = (store) => ({
  path        : '/',
  childRoutes : [
    {
      component: CoreContainer,
      indexRoute: {
        onEnter: (nextState, replace) => replace('/items')
      },
      childRoutes: [
        ItemsRoute(store)
      ]
    },
  ]
})

export default createRoutes
