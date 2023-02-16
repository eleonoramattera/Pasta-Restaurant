import { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

//ogni volta che invio una prenotazione il server si aspetta
//name (stringa)
//phone  (stringa/ numero)
//numberOfPeople (stringa/numero)
//smoking (booleano)
//dateTime (data/stringa)
//specialRequests (stringa)

class ReservetionForm extends Component {
  state = {
    reservation: {
      name: "",
      phone: "",
      numberOfPeople: 1,
      smoking: false,
      dateTime: "",
      specialRequest: "",
    },
  };
  handleChange = (propertyName, propertyValue) => {
    const value = propertyName === "numberOfPeople" ? parseInt(propertyValue) : propertyValue;

    this.setState({
      reservation: {
        ...this.state.reservation,
        [propertyName]: value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    fetch("https://striveschool-api.herokuapp.com/api/reservation", {
      method: "POST",
      body: JSON.stringify(this.state.reservation),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert("errore response");
        }
      })
      .then((bodyServer) => {
        console.log(bodyServer);
        alert("richiesta è andata a buon fine id " + bodyServer._id);
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-center  mt-5">
          <Col xs={12} md={6}>
            <h2 className="text-center">Prenota il tuo tavolo</h2>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il tuo nome"
                  value={this.state.reservation.name}
                  onChange={(e) => {
                    console.log(e.target.value);
                    // this.setState({ reservation: { ...this.state.reservation, name: e.target.value } });
                    this.handleChange("name", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Inserisci il tuo numero"
                  value={this.state.reservation.phone}
                  onChange={(e) => {
                    console.log(e.target.value);
                    // this.setState({ reservation: { ...this.state.reservation, phone: e.target.value } });
                    this.handleChange("phone", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Numero persone al tavolo</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={this.state.reservation.numberOfPeople}
                  onChange={(e) => {
                    console.log(e.target.value);
                    //   this.setState({
                    //  reservation: { ...this.state.reservation, numberOfPeople: parseInt(e.target.value) },
                    //  });
                    this.handleChange("numberOfPeople", e.target.value);
                  }}>
                  <option>Numero persone al tavolo</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Fumatori"
                  checked={this.state.reservation.smoking}
                  onChange={(e) => {
                    console.log(e.target.value);
                    //  this.setState({ reservation: { ...this.state.reservation, smoking: e.target.checked } });
                    this.handleChange("smoking", e.target.checked);
                  }}
                />
                <Form.Text className="text-muted">Spunta la casella se nel vostro tavolo ci sono fumatori</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data e Ora</Form.Label>
                <Form.Control
                  type="datetime-local" //non metto il placeholder perchè ce l'ha di default
                  value={this.state.reservation.dateTime}
                  onChange={(e) => {
                    console.log(e.target.value);
                    //  this.setState({ reservation: { ...this.state.reservation, dateTime: e.target.value } });
                    this.handleChange("dateTime", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Richieste speciali</Form.Label>
                <Form.Control
                  type="text"
                  rows={5}
                  as="textarea"
                  placeholder="allergie o intolleranze"
                  value={this.state.reservation.specialRequest}
                  onChange={(e) => {
                    console.log(e.target.value);
                    //  this.setState({ reservation: { ...this.state.reservation, specialRequest: e.target.value } });
                    this.handleChange("specialRequest", e.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                INVIA
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReservetionForm;
