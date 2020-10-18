//Electron components
const { remote, ipcRenderer } = require('electron');

// React components
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

//My Own Components

function createFolder(Destination){
  try {
    const fs = require('fs');
    if (!fs.existsSync(Destination)){
      fs.mkdirSync(Destination);
  }      
  } catch (error) {
    console.log(error)
    return false
  }
  return true;
}


export default class AddNewFolder extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {value: '', alertcreate: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick  = this.handleClick.bind(this);
    this.executeAddFolder = this.executeAddFolder.bind(this)

    window.AddNewFolder = this
  }

  handleClick(event) {
    document.getElementById("localFolderLocation").value = ""
    //this.props.onChangeLocation("");
    document.getElementById("localFolderLocation").click();
  }

  closeAlert = () => this.setState({alertcreate: false})

  handleChange(event) {
    console.log(event)
    const path = document.getElementById("localFolderLocation").files[0].path   
    const obj_path = {local: path, symLinked: path, remote: this.props.folderLocation+'/SymLinkFolder/'+path.replace(/\\|\//g, "-").toLowerCase()}
    this.executeAddFolder(obj_path)
  }

  executeAddFolder(obj_path) {
    if(createFolder(obj_path.remote)) {
      this.props.onChangeLocation(obj_path);
    }
  }

  render() {
    return (
      <>
      {this.props.folderLocation &&
      <Form className="addnewfolder">
        <h2>Include a new folder</h2>
        <span>Click add, choose a local folder and let <b>Any Sync Folder</b> do its magic! </span>      
        <div className="input-group mb-3" style={{marginTop:10}}>
          <input id='visible_oneDriveFolderLocation' type="text" readOnly={true} className="form-control" placeholder="Your local folder to be synced" aria-label="Recipient's username" aria-describedby="basic-addon2" value=""/>
          <div className="input-group-append">
            <button className="btn btn-secondary" type="button" onClick={this.handleClick}> Add </button>
          </div>          
        </div>        
        <Form.Group style={{display:'none'}}>
          <Form.File directory="true" webkitdirectory="true" id="localFolderLocation" ref={this.input} onChange={this.handleChange}/>
        </Form.Group>
      </Form>   
      }
      </>
    );
  }
}

