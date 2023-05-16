import { useEffect, useState } from 'react';
import {Row, Card, Button, Spinner, Form} from 'react-bootstrap'

import styles from './assets/css/global.module.css'

import logo from './assets/PCS.png'

function App() {
  const [hostname, setHostname] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    fetch("/hostname")
    .then((res) => res.json())
    .then((data) => setHostname(data.host))
  }, [])

  const loading = () => {
    if(hostname == null){
      return (
        <Spinner animation="border" role="status" variant='primary'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      )
    }else {
      return (
        <div className='col-12 text-center'>
          <h2 className={styles.lobster}>Personal Cloud Solution</h2>
          <small>Hosted by <b>{hostname}</b></small>
        </div>
      )
    }
  }

  const formHandler = e => {
    e.preventDefault();
  }

  return (
    <Row className='g-0 justify-content-center vh-100 bg-dark'>
      <Card className="col-lg-5 col-md-7 col-sm-9 col-xs-11" style={{margin: "auto", height: "auto"}}>
      <Row className='g-0 justify-content-center mt-3'>
        <img src={logo} alt='Personal Cloud Solution' className='col-2' />
      </Row>
      <Row className='g-0 justify-content-center mt-3'>
          {loading()}
          <hr className='mt-2' />
      </Row>
      <Card.Body>
      <Form onSubmit={(e) => formHandler(e)}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" id='email' required onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" id='password' required onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Form>
    <Row>
      <a href='#'>Forgot Password</a>
    </Row>
      </Card.Body>
    </Card>
    </Row>
  );
}

export default App;
