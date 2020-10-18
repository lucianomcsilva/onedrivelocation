import React, { useState } from 'react';

//React Bootstrap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
//My Own Components
import NotificationToast from './notificationtoast';
import AppHeader from './app.header'
import OneDriveLocation from './onedrivelocation';
import AddNewFolder from './addnewfolder';
import SyncedFolder from './syncedfolder'

class AddToast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {numbers: [{id:1, date: new Date()}, {id:2, date: new Date()}] };

    this.add = this.add.bind(this);

    //const [show, toggleShow] = useState(true);  
  }  
  
  add() { 
    this.setState({numbers: [{id: parseInt(100000000000*Math.random()), date: new Date()}, ...this.state.numbers]});
    console.log(this.state)
  }

  render = () => {
    const listItems = this.state.numbers.map((number) => 
      <NotificationToast key={number.id.toString()} created={number.date}>                 
        <span>{number.date.toLocaleTimeString()}</span>
      </NotificationToast>   
    );
    return (
      <>
        <Button onClick={this.add}>Show Toast</Button>
        <div 
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}
        >
          {listItems}
        </div>
      </>
    );
  };
};
  

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {folderLocation: '/Users/lucianocamilo/OneDrive', syncFolders: []}

    this.handleOneDriveChange = this.handleOneDriveChange.bind(this);
    window.App = this;
  }  
  dummy = () => {
      // Just to test arrow functions
  }
  handleOneDriveChange(folderLocation){
    console.log(folderLocation);
    this.setState({folderLocation: folderLocation});
  }

  handleAddNewFolder = (folderLocation) => {
    console.log(folderLocation);
    if(folderLocation.length > 1)
      this.setState({ syncFolders: [
        ...this.state.syncFolders,
        ...folderLocation
      ]})
    else  
      this.setState({ syncFolders: [
        ...this.state.syncFolders,
        folderLocation
      ]})
    console.log("Adding "+folderLocation.remote)
  }

  render() {
      return (
        <Container fluid id="anyfoldersyncapp" style={{margin:0, padding:0}}>  
          <AppHeader />        
          <Container fluid className='app-body'>
              <OneDriveLocation folderLocation={this.state.folderLocation} onChangeLocation={this.handleOneDriveChange}/>
              <AddNewFolder folderLocation={this.state.folderLocation} onChangeLocation={this.handleAddNewFolder}/>
              <div className="lisSyncedFolders">
                {this.state.syncFolders.length == 0 && <h2 >You don't have any folder synced</h2>}
                {this.state.syncFolders.length == 1 && <h2 >One folder in sync</h2>}
                {this.state.syncFolders.length >  1 && <h2 >{this.state.syncFolders.length} folders in sync</h2>}
              </div>
              {this.state.syncFolders.map((folderObj) => <SyncedFolder key={folderObj.remote} local={folderObj.local} remote={folderObj.remote} />)}
              
          </Container>  
        </Container>                     
      );
  }
}
