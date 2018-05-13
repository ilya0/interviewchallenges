import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

export const CoreLayout = ({ children }) => (
  <div className='page-layout'>
    <main>
      <div className='main-content'>
        <Container>
          {children}
        </Container>
      </div>
    </main>
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.node,
}

export default CoreLayout
