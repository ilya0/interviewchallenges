const logger = require('../lib/logger')

let port = process.env.PORT || 8080

logger.info('Starting server...')
require('../../server/main').listen(port, () => {
  logger.success(`Server is running at http://localhost:${port}`)
})
