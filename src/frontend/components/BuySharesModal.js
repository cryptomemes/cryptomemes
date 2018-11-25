import React, { Component, Fragment } from 'react'
import { Modal, Button, Icon, Input } from 'antd'
import { inject, observer } from 'mobx-react'

class BuySharesModal extends Component {
  state = {
    visible: false,
    confirmLoading: false,
    percentageValue: 0
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = async () => {
    const { memeStore: { buyMeme }, memeIndex } = this.props
    const { percentageValue } = this.state
    this.setState({
      confirmLoading: true,
    });
    await buyMeme(memeIndex, percentageValue)
    this.setState({
      visible: false,
      confirmLoading: false,
      percentageValue: 0
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  onValueChange = (e) => {
    this.setState({
      percentageValue: e.target.value
    })
  }

  render() {
    const { visible, confirmLoading, ModalText, percentageValue } = this.state;
    return (
      <div>
        <div onClick={this.showModal}>
          <Icon type="dollar" />
        </div>
        <Modal title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <form>
            <Input
              className="input"
              style={{ marginBottom: 5 }}
              type="number"
              name="percentage"
              placeholder="Enter percentage"
              value={percentageValue}
              onChange={this.onValueChange}
              addonAfter="%"
            />
          </form>
        </Modal>
      </div>
    );
  }
}

export default inject('memeStore')(observer(BuySharesModal))
