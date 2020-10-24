//Electron components
const { remote, ipcRenderer } = require('electron');

// React components
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

//My Own Components
import ModalRemoveFolder from './modalremovefolder'



export default class SyncedFolder extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {value: '', alertRemove: false};

    this.handleChange  = this.handleChange.bind(this);
    this.handleClick   = this.handleClick.bind(this);
    this.handleRemove  = this.handleRemove.bind(this);

    window.OneDriveLocation = this
  }

  handleClick(event) {
    document.getElementById("localFolderLocation").value = ""
    //this.props.onChangeLocation("");
    document.getElementById("localFolderLocation").click();
  }

  closeAlert = () => this.setState({alertRemove: false})

  async handleChange(event) {
    const path = document.getElementById("localFolderLocation").files[0].path   
    this.props.onChangeLocation({local: path, symLinked: path, remote: this.props.folderLocation+'/SymLinkFolder/'+path.replace(/\\|\//g, "-").toLowerCase()});
  }
  async handleRemove(event) {
    //this.props.onHandleRemoveFolder(this.props.remote);
    this.setState({alertRemove: true})  
    return true;    
  }

  handleConfirmRemove = (event) => {
    console.log("here")
    this.props.onHandleRemoveFolder(this.props.remote)
    return true
  }
  render() {
    return (
      <>
      <ModalRemoveFolder onClose={this.closeAlert} onConfirm={this.handleConfirmRemove} path={this.props.path} symLinked={this.props.symLinked} remote={this.props.remote} show={this.state.alertRemove} />
      <Form className="syncedfolder">
        <div className="input-group mb-3" style={{marginTop:10, marginBottom:0}}>
          <input id='{this.props.remote}' type="text" readOnly={true} className="form-control" aria-label={this.props.local} aria-describedby="location" value={this.props.local}/>        
          <div className="input-group-append">
            {this.props.local == "" && <button className="btn btn-warning" type="button" onClick={this.handleClick}> Find </button>}
            {this.props.local == "" && <button className="btn btn-primary" type="button" onClick={this.handleClick}> Link </button>}
            {this.props.local != "" && <button className="btn btn-warning" type="button" onClick={this.handleClick}> Unlink </button>}
            <button className="btn btn-danger" type="button" onClick={this.handleRemove}> Remove </button>
          </div>          
        </div>
        <span className="footer"><b>Remote Location: </b>{this.props.remote}</span>
      </Form>   
      </>
    );
  }
}