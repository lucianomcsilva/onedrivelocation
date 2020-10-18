// React components
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function createSymLinkFolder(Path){
  const fs = require('fs');
  fs.mkdirSync(`${Path}/SymLinkFolder`)
  
  //Check if it worked
  //return hasSymLinkFolder(Path)
}

export default class ModalCreateSymLinkFolder extends React.Component {
  constructor(props) {
    super(props);
    
  }  

  handleCancel = (e) => {
    this.props.onClose();
    console.log(`falling back `)
    this.props.onFallback(e);
    return;
  }
  handleConfirm = () => {
    console.log("Creating a SymLink folder")
    createSymLinkFolder(this.props.path)
    this.props.onClose();
    return;
  }

  render() {
    return (
      <Modal
      show={this.props.show}
      onHide={this.handleCancel}
      backdrop="static"
      keyboard={false}
      >
<Modal.Header closeButton>
          <Modal.Title>How it Works</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{}}>
          <span>It seems you don't have a <b>SymLinkFolder</b> created in your OneDrive folder. Check again if your folder selections is correct. If so, confirm and it will be created to you</span>
          <br />
          <br />
          <Alert variant="danger"> {this.props.path} </Alert>
          <code>  </code>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCancel}>
            Choose Again 
          </Button>  
          <Button variant="primary" onClick={this.handleConfirm}>
            Go for it
          </Button>                    
        </Modal.Footer>
      </Modal>
    )};
}
