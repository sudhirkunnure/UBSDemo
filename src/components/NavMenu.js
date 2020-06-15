import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>UBS Sanctions</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Fetch data from cosmos DB
              </NavItem>
            </LinkContainer>
          
            {/*<LinkContainer to={'/fetchdata'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Fetch data from cosmos DB 
              </NavItem>
            </LinkContainer>*/}
                 
            <LinkContainer to={'/addrecord'}>
              <NavItem>
                <Glyphicon glyph='th-list' />Create New Record 
              </NavItem>
            </LinkContainer>
      
       

                 
            <LinkContainer to={'/authorize'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Authorize Securities 
              </NavItem>
            </LinkContainer>

                 
            <LinkContainer to={'/search'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Search 
              </NavItem>
            </LinkContainer>
             <LinkContainer to={'/audit'}>
              <NavItem>
                <Glyphicon glyph='th-list' /> Audit 
              </NavItem>
            </LinkContainer>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
