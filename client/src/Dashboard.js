import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Row } from 'react-bootstrap';
import Folder from './components/dashboard/Folder';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies()

const getFolders = async () => {
    const data = await axios.get('/folders')
    console.log(data)
}

export default function Dashboard() {
    getFolders()
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Personal Cloud Solution</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Create Folder</Nav.Link>
                            <Nav.Link href="#link">Upload</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Row className="justify-content-around">
                <Folder alt="Hello" folderName="Hello" />
            </Row>
        </>
    )
}