import { browserHistory } from 'react-router'

export const goTo = (path) => {
  browserHistory.push(path)
}
