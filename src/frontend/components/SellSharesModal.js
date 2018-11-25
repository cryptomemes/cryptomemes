import React, { Component, Fragment } from 'react'
import { Modal, Button, Icon, Input } from 'antd'
import { inject, observer } from 'mobx-react'

class SellSharesModal extends Component {
  state = {
    ModalText: 'Buy Shares Component here',
    visible: false,
    confirmLoading: false,
    percentage: 0
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = async () => {
    const { memeIndex, memeStore: { sellMemeShare } } = this.props
    const { percentage } = this.state

    this.setState({
      confirmLoading: true
    })

    await sellMemeShare(memeIndex, percentage)

    this.setState({
      visible: false,
      confirmLoading: false,
      percentage: 0,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      confirmLoading: false,
      percentage: 0
    });
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { memeTitle } = this.props
    const { visible, confirmLoading, ModalText, percentage } = this.state;
    return (
      <div>
        <div onClick={this.showModal}>
          <Icon type="dollar" />
          {' '}
          Sell
        </div>
        <Modal title={`Sell '${memeTitle}'`}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <form className="upload-form">
            <Input
              className="input"
              type="number"
              value={percentage}
              name="percentage"
              placeholder="Enter desire percentage to sell"
              onChange={this.handleTextChange}
            />
          </form>
        </Modal>
      </div>
    );
  }
}

export default inject('memeStore')(observer(SellSharesModal))
