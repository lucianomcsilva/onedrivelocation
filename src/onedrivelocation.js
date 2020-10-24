//Electron components
const { remote, ipcRenderer } = require('electron');

// React components
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

//My Own Components
import ModalCreateSymLinkFolder from './modalcreatesymlinkfolder'

async function runLS (Path) {
  return new Promise((resolve, reject) => {
    require('child_process').exec(`ls -lha ${Path}/SymLinkFolder;`, (err, stdout, stderr) => {
      if (err) reject(err)
      resolve(stdout);
    })
  })
}

function hasSymLinkFolder(Path){
  const fs = require('fs');
  const files = fs.readdirSync(Path)
  return files.indexOf("SymLinkFolder") > -1;
}

function findUnlinkedFolders(Path){
  const fs = require('fs');
  const files = fs.readdirSync(Path)
  console.log(files);
  return files;
}




export default class OneDriveLocation extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {value: '', alertcreate: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleClick  = this.handleClick.bind(this);

    //In Order to call this Class from frontend
    window.OneDriveLocation = this
  }
  componentWillUnmount(){
    //read the drive location before init

  }
  componentDidMount() {
    
    const path = this.props.folderLocation
    if(!hasSymLinkFolder(path)) {
      this.setState({alertcreate: true})      
      //createSymLinkFolder(path)
    }
    else
    { //Look for orphans links
      const folders = findUnlinkedFolders(path + "/SymLinkFolder")
      const obj_paths = []
      folders.map(async path =>   { 
        const obj_path = {local: '', symLinked: path, remote: this.props.folderLocation+'/SymLinkFolder/'+path.replace(/\\|\//g, "-").toLowerCase()}
        obj_paths.push(obj_path);
      });
      window.App.handleAddNewFolder(obj_paths)
      console.log(obj_paths);
    }
    console.log("mounting")
  }

  handleClick(event) {
    document.getElementById("oneDriveFolderLocation").value = ""
    this.props.onChangeLocation("");
    document.getElementById("oneDriveFolderLocation").click();
  }

  closeAlert = () => this.setState({alertcreate: false})

  async handleChange(event) {
    console.log(event, this);
    const path = document.getElementById("oneDriveFolderLocation").files[0].path
    const is_sl = hasSymLinkFolder(path);
    console.log(is_sl);
    if(!hasSymLinkFolder(path)) {
      this.setState({alertcreate: true})      
      //createSymLinkFolder(path)
    }
    this.props.onChangeLocation(path);

    //document.getElementById("visible_oneDriveFolderLocation").value = path;
    //this.setState({value: path});
  }

  render() {
    return (
      <>
      <ModalCreateSymLinkFolder onClose={this.closeAlert} onFallback={this.handleClick} path={this.props.folderLocation} show={this.state.alertcreate} />
      <Form className="onedrivelocationform">
        <h2>OneDrive folder location</h2>
        <span>Choose carefully and precisely the folder's location and don't mess it around. This is a trust relationship, no check will be performed. </span> 
        <span className="danger">You MAY loose all your files otherwise.</span>     
        <hr />
        <div className="input-group mb-3">
          <input id='visible_oneDriveFolderLocation' type="text" readOnly={true} className="form-control" placeholder="One Drive folder's location" aria-label="Recipient's username" aria-describedby="basic-addon2" value={this.props.folderLocation}/>
          <div className="input-group-append">
            <button className="btn btn-secondary" type="button" onClick={this.handleClick}> Choose </button>
          </div>          
        </div>        
        <Form.Group style={{display:'none'}}>
          <Form.File directory="true" webkitdirectory="true" id="oneDriveFolderLocation" ref={this.input} onChange={this.handleChange}/>
        </Form.Group>
      </Form>   
      </>
    );
  }
}

