import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';
import logo from '../assets/company-logo.svg';

function NavigationBar() {
  return (
      <Navbar className="bg-body-tertiary mb-5">

        <Container className="me-auto">

        <Navbar.Brand as={Link} to='/'>
            <img src={logo} width="50" height="50" className="d-inline-block align-center" />
            <Navbar.Text className='m-1'>Sams Hårddiskar</Navbar.Text>
        </Navbar.Brand>

        {/* If the user is loggedin then show <Navbar.Text>Signed in as...</Navbar.Text> otherwise show the login btn */}
        <Nav>
          <Button>Logga in</Button>
          <Nav.Link as={Link} to='/cart'>
            <BsCart3 size={25} />
          </Nav.Link>
        </Nav>

        </Container>

      </Navbar>
  )
}

export default NavigationBar