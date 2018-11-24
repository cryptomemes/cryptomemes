import React, { Component, Fragment } from 'react'
import { Modal, Button, Icon } from 'antd'

class BuySharesModal extends Component {
  state = {
    ModalText: 'Buy Shares Component here',
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
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
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}

export default BuySharesModal
