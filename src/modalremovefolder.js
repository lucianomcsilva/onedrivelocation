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

export default class ModalRemoveFolder extends React.Component {
  constructor(props) {
    super(props);
    
  }  

  handleCancel = (e) => {
    this.props.onClose();
    console.log(`nothing really happened`)
    return;
  }
  handleConfirm = () => {
    console.log("Okey dokey! Erasing everything.")
    //createSymLinkFolder(this.props.path)
    this.props.onConfirm()
    this.props.onClose()
    return;
  }

  render() {
    return (
      <Modal
      size="xl"
      show={this.props.show}
      onHide={this.handleCancel}
      backdrop="static"
      keyboard={false}
      >
<Modal.Header closeButton>
          <Modal.Title>Easy there!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{}}>        
          <span><big>Are you sure you wanna <b>delete</b>, <u>with no way back</u>, all your files in both local and remote destinations? This includes possible other remote computers you are syncing in. </big> </span>
          <br /><br />
          <span><big><b>This action cannot be undone</b>. Moreover, it is quite possible to erase these files those were previously linked in other local folder. </big> </span>
          <br /><br />
          <Alert variant="primary"> We strongly recommend you do it step by step to ensure you are totally aware of what you are doing. Unlink this folder from this computer and then, manually, delete the files using your favorite software aplication.</Alert>
          <Alert variant="danger"> <b>Remote paths:</b> {this.props.remote} </Alert>
          
          <code>  </code>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCancel}>
            Cancel
          </Button>  
          <Button variant="danger" onClick={this.handleConfirm}>
            Shut up and delete it
          </Button>                    
        </Modal.Footer>
      </Modal>
    )};
}
