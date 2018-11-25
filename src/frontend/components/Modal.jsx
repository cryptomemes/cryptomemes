import React, { Component, Fragment } from 'react'
import { Modal, Button, Icon, Input } from 'antd'
import { inject, observer } from 'mobx-react'

import uploadImage from '../utils/uploadImage'

class UploadModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      confirmLoading: false,
      file: '',
      imagePreviewUrl: '',
      title: '',
      price: 0
    }

    this.inputRef = React.createRef()
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const { title, price, file } = this.state
    const { memeStore: { createMeme } } = this.props

    const formData = new FormData()
    formData.append('image', file)

    this.setState({
      confirmLoading: true,
    });

    uploadImage(formData)
      .then(async (res) => {
        const { data: { url } } = res
        const imageId = url.split('/')[3]

        await createMeme(title, imageId, price)

        this.setState({
          visible: false,
          confirmLoading: false,
          title: '',
          price: 0,
          imagePreviewUrl: '',
          file: ''
        })
      })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  handleImageChange(e) {
    e.preventDefault()

    const reader = new window.FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => (
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      })
    );

    reader.readAsDataURL(file);
  }

  handleTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick() {
    this.inputRef.current.click()
  }

  render() {
    const {
      visible,
      confirmLoading,
      imagePreviewUrl,
      title,
      price
    } = this.state;

    return (
      <div>
        <div onClick={this.showModal}>
          Upload
        </div>
        <Modal
          title="Create Meme"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <form className="upload-form">
            <Input
              className="input"
              style={{ marginBottom: 5 }}
              type="text"
              value={title}
              name="title"
              placeholder="Enter title"
              onChange={this.handleTextChange}
            />
            <Input
              className="input"
              style={{ marginBottom: 5 }}
              type="number"
              value={price}
              name="price"
              placeholder="Enter price"
              onChange={this.handleTextChange}
            />
            <div className="input">
              {imagePreviewUrl
                && (
                  <img width="200px" alt="preview" src={imagePreviewUrl} />
                )
              }
            </div>
            <label htmlFor="file-upload">
              <input
                ref={this.inputRef}
                accept="image/*"
                id="file-upload"
                name="file-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={e => this.handleImageChange(e)}
              />
              <Button onClick={this.handleClick}>
                <Icon type="upload" />Upload
              </Button>
            </label>
          </form>
        </Modal>
      </div>
    );
  }
}

export default inject('memeStore')(observer(UploadModal));
