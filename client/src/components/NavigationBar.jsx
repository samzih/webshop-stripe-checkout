import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge, Dropdown, Stack } from 'react-bootstrap';
import { BsCart3 } from 'react-icons/bs';
import { PiUserCircleDuotone } from 'react-icons/pi';
import logo from '../assets/company-logo.svg';
import { useCartContext } from '../context/CartContext';
import { useUserContext } from '../context/UserContext';
import { AiOutlineUnorderedList} from 'react-icons/ai';
import { TbPower } from 'react-icons/tb';


function NavigationBar() {
  const { cartItems, setCartItems } = useCartContext();
  const { showModal, setModalMode, isLoggedIn, setIsLoggedIn, userData, setUserData, logoutUser } = useUserContext();

  // Calculates the total quantity of items in cart
  const totalQuantity = cartItems.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);

  const handleLogin = () => {
    showModal();
    setModalMode("login");
  }

  const handleLogout = () => {
    logoutUser();
    // setCartItems([]); // set the cart in LS to [] on logout
  }

  return (
      <Navbar className="bg-body-tertiary mb-5">

        <Container className="me-auto">

        <Navbar.Brand as={Link} to='/'>
            <img src={logo} width="50" height="50" className="d-inline-block align-center" />
            <Navbar.Text className='m-1'>Sams Hårddiskar</Navbar.Text>
        </Navbar.Brand>

        {/* If the user is loggedin then show <Navbar.Text>Signed in as...</Navbar.Text> otherwise show the login btn */}
        <Nav>
          {userData ? 
          (
            <>
            <Stack direction='horizontal'>
              <Navbar.Text className='fw-semibold'>{`Inloggad som ${userData.name}`}</Navbar.Text>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link}><PiUserCircleDuotone size={25} /></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to='/orders'><AiOutlineUnorderedList size={18} /> Orderhistorik</Dropdown.Item>
                  <Dropdown.Item as={Link} onClick={handleLogout}><TbPower size={18} /> Logga ut</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Stack>
            </>
          ) : 
          (
            <Button onClick={handleLogin}>Logga in</Button>
          )
          }
          <div className='vr ms-3' />
          <Nav.Link as={Link} to='/cart'>
            <BsCart3 size={25} />
            <Badge bg="success" pill style={{ position: "relative", bottom: "10px", right: "15px" }}>{totalQuantity}</Badge>
          </Nav.Link>
        </Nav>

        </Container>

      </Navbar>
  )
}

export default NavigationBar