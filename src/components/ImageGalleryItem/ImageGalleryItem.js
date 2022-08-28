import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal/Modal'
import { GalleryListItem, GalleryItemImage } from './ImageGalleryItem.styled'

class ImageGalleryItem extends Component {
  // static propTypes = {
  //   webformatURL: PropTypes.string.isRequired,
  //   largeImageURL: PropTypes.string.isRequired,
  //   tags: PropTypes.string.isRequired
  // }

  state = {
    showModal: false
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  render () {
    const { showModal } = this.state
    const { webformatURL, tags, largeImageURL } = this.props

    return (
      <GalleryListItem>
        <GalleryItemImage
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </GalleryListItem>
    )
  }
}

export default ImageGalleryItem
