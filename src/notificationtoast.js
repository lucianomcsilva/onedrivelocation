import React from 'react';
import Toast from 'react-bootstrap/Toast';
import moment from 'moment';

class NotificationToast extends React.Component {
  constructor(props) {
    super(props);    

    this.state = {date: new Date(), show: true};
    this.toggleShow = this.toggleShow.bind(this);
    //const [show, toggleShow] = useState(true);  
  }  

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }  

  toggleShow() { 
    this.setState(state => ({
      show: !state.show
    }));
  }

  render = () => {
    
    const elapsed =  moment(this.props.created).fromNow();
  
    //console.log(elapsed2, elapsed, this.props.created.toLocaleTimeString(), this.state.date.toLocaleTimeString());
    return (
      <>
        <Toast      
          show={this.state.show} 
          onClose={this.toggleShow}
        >
          <Toast.Header>
            <strong className="mr-auto">Any Folder Sync</strong>
            <small style={{ paddingLeft: 20 }}>{elapsed}</small>
          </Toast.Header>
          <Toast.Body>{this.props.body} {this.props.children}</Toast.Body>
        </Toast>
      </>
    );
  };  
}
export default NotificationToast;