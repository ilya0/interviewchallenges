const ListRoute = (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ListContainer = require('./containers/List').default
      cb(null, ListContainer)
    }, 'items')
  }
})

// Sync route definition
export default (store) => ({
  path: 'users',
  indexRoute: ListRoute(store)
})
