import { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

//ogni volta che invio una prenotazione il server si aspetta
//name (stringa)
//phone  (stringa/ numero)
//numberOfPeople (stringa/numero)
//smoking (booleano)
//dateTime (data/stringa)
//specialRequests (stringa)
//1 LEGARE GLI INPUT ALLO STATE

class ReservetionForm extends Component {
  state = {
    reservation: {
      name: "",
      phone: "",
      numberOfPeople: 1, //tutto quello che prendo dal DOM è una stringa. A me serve un numero quindi uso parseInt()
      smoking: false,
      dateTime: "",
      specialRequest: "",
    },
  };
  handleChange = (propertyName, propertyValue) => {
    this.setState({ reservation: { ...this.state.reservation, [propertyName]: propertyValue } });
    //this.setState({ reservation: { ...this.state.reservation, [propertyName]: propertyName ===="numberOfPeople"? parseInt(propertyValue): propertyValue //
  };
  //handleChange = (propertyName, propertyValue) => {
  //  const value = propertName ==="numberOfPeople" ? parseInt (propertyValue) : propertyValue
  //this.setState({reservation: {...this.state.reservation, [propertyName]: value})

  handleSubmit = (e) => {
    e.prevent.Default(); //così i comportamenti di base che vengono azionati normalmente vengono ignorati e non refresha
    //DEVO FARE CHIAMATA ASINCRONA quindi fetch verrà esegiuta solo se la funzione handleSubmit verrà eseguita perchè l'unica cosa che può ritardare l'esecuzione di una chiamata di funzione è un'altra funzione.
    fetch("https://striveschool-api.herokuapp.com/api/reservation", {
      method: "POST", //(creare dati, invia qualcosa in formato stringa io però nello state ho un'oggetto quindi uso stringify)
      body: JSON.stringify(this.state.reservation), // la mia richiesta deve avere un corpo (body) dentro al quale posso passare dei dati che devono essere stringa
      //payload (anteprima) nel tab Network
      headers: {
        "Content-type": "application/json",
      }, //sono metadati checi permettono di comunicare al server qualcosa in più. Content-type non deve essere text-plain ma application/json
      //DEVO SAPERE QUANDO FINISCE L'OPERAZIONE
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert("errore response");
        }
      }) //body server è l'oggetto  che mi ritorna il server
      .then((bodyServer) => {
        console.log(bodyServer);
        alert("richiesta è andata a buon fine id " + bodyServer._id);
      })
      .catch((error) => {
        alert(error);
      });
  };
  //quando faccio una post il server mi risponde con un oggetto definitivo ovvero quello che poi va a inserirsi nel database

  render() {
    return (
      <Container>
        <Row className="justify-content-center  mt-5">
          <Col xs={12} md={6}>
            <h2 className="text-center">Prenota il tuo tavolo</h2>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label> {/*sto accedendo allo stato */}
                <Form.Control
                  type="text"
                  placeholder="Inserisci il tuo nome"
                  value={this.state.reservation.name}
                  /*VALUE DEVE ESSERE LETTO DALLO STATO l'input avrà come valore solo i valori che passano dallo stato */
                  /* così però ho SOLO LA CONNESSIONE DALLO STATO VERSO L'INPUT */
                  /* per CONNETTERE DALL'INPUT ALLO STATO devo far si che ad ogni testo premuto (OnChange) il cambiamento venga
                salvato nello stato con setState */
                  /*onChange = {(e)=> {this.setState({reservation:{name:e.target.value}})}}  così però salvo la proprità che ho scritto e perdo le altre*/
                  onChange={(e) => {
                    this.handleChange("name", e.target.value);
                  }}
                  // this.setState({ reservation: { ...this.state.reservation, name: e.target.value } });//
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Inserisci il tuo numero"
                  value={this.state.reservation.phone}
                  /* onChange = {(e)=> {this.setState({reservation:{phone:e.target.value}})}} */
                  onChange={(e) => {
                    this.handleChange("phone", e.target.value);
                    // this.setState({ reservation: { ...this.state.reservation, phone: e.target.value } });//
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Numero persone al tavolo</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={this.state.reservation.numberOfPeople}
                  /* onChange = {(e)=> {this.setState({reservation:{numberOfPeople:e.target.value}})}} */
                  onChange={(e) => {
                    this.handleChange("numberOfPeople", parseInt(e.target.value));
                    //  this.setState({  reservation: { ...this.state.reservation, numberOfPeople: parseInt(e.target.value) }, });
                  }}>
                  <option>Numero persone al tavolo</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Fumatori"
                  checked={this.state.reservation.smoking}
                  /* onChange = {(e)=> {this.setState({reservation:{smoking:e.target.checked}})}} */
                  onChange={(e) => {
                    this.handleChange("smoking", e.target.checked);
                    //   this.setState({ reservation: { ...this.state.reservation, smoking: e.target.checked } });//
                  }}
                />
                <Form.Text className="text-muted">Spunta la casella se nel vostro tavolo ci sono fumatori</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Data e Ora</Form.Label>
                <Form.Control
                  type="datetime-local" //non metto il placeholder perchè ce l'ha di default
                  value={this.state.reservation.dateTime}
                  /*onChange = {(e)=> {this.setState({reservation:{dateTime:e.target.value}})}} */
                  onChange={(e) => {
                    this.handleChange("dateTime", e.target.value);
                    //this.setState({ reservation: { ...this.state.reservation, dateTime: e.target.value } });//
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
                  /*onChange = {(e)=> {this.setState({reservation:{specialRequest:e.target.value}})}} */
                  onChange={(e) => {
                    this.handleChange("specialRequest", e.target.value);
                    //  this.setState({ reservation: { ...this.state.reservation, specialRequest: e.target.value } });//
                  }}
                />
              </Form.Group>
              {/* submit refresha la pagina perchè aziona un evento del Form ovvero OnSubmit Quindi in realtà io controllo tramite l'evento onSubmit e non tramite il bottone*/}
              {/*il comportamento di base di un form è refreshare la pagina perchè è pensato per aggiungere query params(nell'URL)  e azionare un'action collegata ad un file php
  io però non uso php ma js ogni volta che uso un form devo usare il preventDefault. (metodo dell'oggetto event ) */}
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
