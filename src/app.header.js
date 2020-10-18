import React from 'react';
//React Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//My Own Components
import Disclaimer from './disclaimer';
import HowItWorks from './howitworks';



export default class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }  
  render = () => {
    return (
      <Container fluid className='app-header'>
        <Row noGutters>
          <div className='logo' style={{verticalAlign: 'baseline'}}> 
            <img src='assets/anyfoldersync_icon_alpha.png' width='96px' /> 
          </div>
          <Col> 
            <Container style={{padding:0}}> 
              <Row noGutters >
                <Col className="my-auto"><h1 className='title'>Any Folder Sync</h1> </Col>
                <Col md="auto" className="my-auto"> <HowItWorks /> </Col>
                <Col md="auto" className="my-auto"> <div style={{paddingLeft:20}}><Disclaimer /></div></Col>
              </Row>
            </Container>
            <Container fluid> <Row>
              <span>A quirk desktop app to help me out sync any folder on my computer using OneDrive as sync software</span> 
            </Row></Container>
          </Col>
        </Row>
      </Container>
    )
  }
};