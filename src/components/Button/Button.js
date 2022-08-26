import React from 'react'
import PropTypes from 'prop-types'
import { Button } from './Button.styled'

const LoadMoreBtn = ({ isLoading, handleLoadMore }) => {
  return (
    <Button type='button' onClick={handleLoadMore}>
      {isLoading ? 'Loading...' : 'Load More'}
    </Button>
  )
}

LoadMoreBtn.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleLoadMore: PropTypes.func.isRequired
}

export default LoadMoreBtn
