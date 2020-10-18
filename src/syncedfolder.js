//Electron components
const { remote, ipcRenderer } = require('electron');

// React components
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

//My Own Components




export default class SyncedFolder extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {value: '', alertcreate: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick  = this.handleClick.bind(this);

    window.OneDriveLocation = this
  }

  handleClick(event) {
    document.getElementById("localFolderLocation").value = ""
    //this.props.onChangeLocation("");
    document.getElementById("localFolderLocation").click();
  }

  closeAlert = () => this.setState({alertcreate: false})

  async handleChange(event) {
    const path = document.getElementById("localFolderLocation").files[0].path   
    this.props.onChangeLocation({local: path, symLinked: path, remote: this.props.folderLocation+'/SymLinkFolder/'+path.replace(/\\|\//g, "-").toLowerCase()});
  }

  render() {
    return (
      <>
      <Form className="syncedfolder">
        <div className="input-group mb-3" style={{marginTop:10, marginBottom:0}}>
          <input id='{this.props.remote}' type="text" readOnly={true} className="form-control" aria-label={this.props.local} aria-describedby="location" value={this.props.local}/>        
          <div className="input-group-append">
            <button className="btn btn-secondary" type="button" onClick={this.handleClick}> Unlink </button>
          </div>          
        </div>
        <span className="footer"><b>Remote Location: </b>{this.props.remote}</span>
      </Form>   
      </>
    );
  }
}