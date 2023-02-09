import { Component } from "react";
import { Container, Row, Col, Carousel, ListGroup } from "react-bootstrap";
import menu from "../data/menu.json";

class Home extends Component {
  state = {
    firstStateValue: 345,
    selectedPasta: null,
  };
  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6} className="text-center">
            <h1> Benvenuti nel nostro ristorante {this.state.firstStateValue}</h1>
            <p> Abbiamo primi piatti, secondi di pesce e carne, e contorni</p>

            <Carousel>
              {menu.map((pasta, index) => (
                <Carousel.Item
                  key={`pasta-${index}`}
                  onClick={(e) => {
                    //console.log("hai premuto", pasta.name, e);
                    this.setState = {
                      selectedPasta: pasta,
                    };
                  }}>
                  <img className="d-block w-100" src={pasta.image} alt={pasta.name} />
                  <Carousel.Caption>
                    <h3>{pasta.name}</h3>
                    <p>{pasta.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        {this.state.selectedPasta && (
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={6}>
              <ListGroup>
                {this.state.selectedPasta.comments.map((comment, index) => (
                  <ListGroup.Item key={`comment-${index}`}>{comment.comment}</ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}
export default Home;
