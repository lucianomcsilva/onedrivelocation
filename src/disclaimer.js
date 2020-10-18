import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'



//export default function Disclaimer() {
  //const [show, setShow] = useState(false);
export default class Disclaimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: false}    
    window.Disclaimer = this;
  }  

  handleClose = () => this.setState({show: false});
  handleShow = () => this.setState({show: true});
  render()  {
  return (
    <>
      <Button variant="outline-secondary" onClick={this.handleShow}>Disclaimers</Button>

      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Disclaimer</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{}}>
          <span><b>Any Folder Sync</b> is a side project built with intent to solve my issues using OneDrive. It was not extensivily tested in any means. <u>Use it in your own risk.</u> There is no WARRANTY, LIABILITY or any ohter DAMAGE or CLAIM anyone will provide. Again, use it at your own discretions. And let's have some fun.</span>
          <Form.Group controlId="formBasicCheckbox" style={{textAlign: 'right', padding:0, marginTop:20 }}>
            <Form.Check type="checkbox" label="Don't show this message again" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleClose}>
            Close
          </Button>          
        </Modal.Footer>
      </Modal>
    </>
  )}
}