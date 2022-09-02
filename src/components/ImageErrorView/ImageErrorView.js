import React from 'react'
import PropTypes from 'prop-types'
import errorImage from './error1.jpg'

const ImageErrorView = ({ message }) => {
  return (
    <div role='alert'>
      <img src={errorImage} alt='' />
      <p>{message}</p>
    </div>
  )
}

ImageErrorView.propTypes = {
  message: PropTypes.string.isRequired
}

export default ImageErrorView
