import { Navbar, Container, Nav } from "react-bootstrap";

const CustomNavBar = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <strong>Pasta Restaurant</strong> <i> {props.claim}</i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Menù</Nav.Link>
            <Nav.Link href="#link">Prenotazioni</Nav.Link>
            <Nav.Link href="#link">Contatti</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default CustomNavBar;
