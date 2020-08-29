import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

function AccordionComponent(props){
  return(
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle eventKey="0">
          {props.title}
          <i className="fa fa-angle-down"></i>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {props.children}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default AccordionComponent;