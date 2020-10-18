import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


//export default function HowItWorks() {
export default class HowItWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: false}    
    window.HowItWorks = this;
  }  
  handleClose = () => this.setState({show: false});
  handleShow = () => this.setState({show: true});
  render()  {

  return (
    <>
      <Button variant="outline-secondary" onClick={this.handleShow}>How it Works</Button>

      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>How it Works</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{}}>
          <span><b>Any Folder Sync</b> doesn`t do any magic. It uses a pretty common artifact of the operational system called <a target="_blank" href="https://en.wikipedia.org/wiki/Symbolic_link"> Symbolic Link</a>. You can do everything by hand. This application just makes it easier and hopefully less messy.</span>
          <ol>
            <li>[ONLY FIRST USE] Create a common folder inside oneDrive. This app uses /users/OneDrive/SymLinkFolder, but actually can be anything. </li>
            <li>Create a new folder in the destination. For semantics reasons, this app uses a folder named full-path-to-destination-folder.</li>
            <li>[IMPORTANT]: Move all your files to this new folder.</li>
            <li>Create the symbolic lynk so you may continue using your customary folders.</li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleClose}>
            Close
          </Button>          
        </Modal.Footer>
      </Modal>
    </>
  );
  }
}