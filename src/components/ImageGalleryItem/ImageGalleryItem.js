import { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal/Modal'
import { GalleryListItem, GalleryItemImage } from './ImageGalleryItem.styled'

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <GalleryListItem>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <Modal onCloseModal={onCloseModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </GalleryListItem>
  )
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired
}

export default ImageGalleryItem
