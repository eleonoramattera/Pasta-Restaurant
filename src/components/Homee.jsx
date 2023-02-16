import { Component } from "react";

import { Container, Row, Col, Carousel, ListGroup, Button } from "react-bootstrap";
import menu from "../data/menu.json"; //menu è una variabile che racchiude il json (array)

//Per far rispecchiare  i comenti con il piatto selezionato mi serve una memoria interna ovvero lo state quindi pe rprima cosa
//trasformare il componente funzione a classe
class Homee extends Component {
  state = {
    firstStateValue: 345,
    selectedPasta: null, // null è il valore iniziale che cambierà in un oggetto del piatto
  };
  //per sapere se ho selezionato un piatto o no. Nel momento in cui faccio un'azione il valore passa
  //da null a qualcos'altro ed è questo passaggio di valore che mi darà il riferimento che qualcosa è stato cambiato. Esempio mostro i commenti
  // uso onClick ovvero quando premo su una foto nel carosello sotto mi cambiano i commenti. quando premo sulla slide muto lo stato e  ci inserisco
  // l'emento che ho premuto;
  //l'unico comodo per resettare, al momento, lo stato a "null" è il refresh della pagina (oppure button che ho messo sotto)

  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6} className="text-center">
            <h1>Benvenuti nel nostro Ristorante {this.state.firstStateValue}</h1>
            <p>Abbiamo primi piatti, primi piatti o primi piatti...</p>

            {/*metto nel carosello il json(il json adesso è locale ma lo prenderò poi dalle API.
devo importarmi il json (dato che uso
1 Devo delimitare l'area dinamica del jsx quindi metto le {}
  il codice dinamico cicla l'array quindi il singolo oggetto "pasta" e map ritorna un'array jsx con valori dimanici
2 key è una prop che si aspetta un valore univoco*/}

            <Carousel>
              {menu.map((pasta, index) => (
                <Carousel.Item
                  key={`pasta-${index}`} //qua perchè è quando premo sulla foto della pasta che cambiano i commenti
                  onClick={(e) => {
                    console.log("clicked", pasta.name, e);
                    this.setState({
                      selectedPasta: pasta,
                    });
                  }}>
                  {/*devo collegare l'onClick al cambio di stato. setState richiede all'interno un oggetto.
Il cambiamento dello stato è un metodo asincrono e aggiorna l'interafaccia. pasta in setState è l'oggetto che ho usato in map.
Al click del Carosello ottengo un altro oggetto dinamicamente mi basta collegare lo stato a dove voglio leggere i commenti*/}

                  {/*per modificare lo state devo usare il metodo setState() al quale devo passare un oggetto con le proprità che devo cambiare */}

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

        <Row className="justify-content-center mt-4">
          <Col xs={"auto"} className="text-center">
            <Button variant="primary" onClick={() => this.setState({ selectedPasta: null })}>
              Reset Comments
            </Button>
          </Col>
        </Row>

        {/*ogni volta che accedo ad un piatto sotto escono i commenti diversi (presi dal json) in base al piatto selezionato. 
prendo prima commenti del primo elemento e dopo vedo come devo cambiarli in base al piatto selezionato*/}
        {/*{menu[0].comments.map((commentSingolo, index) => (
    <ListGroup.Item key={`comment-${index}`}>{commentSingolo.comment}</ListGroup.Item>
    ))}*/}

        {/* short circuit operator, se il valore a sinistra del && è falsy quello che c'è a destra non verrà eseguito
Se non metto lo short circuit operator mi da errore perchè react cerca subito selectedPasta che all'inizio è null*/}

        {/*{this.state.selectedPasta && (*/}
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            <h4>Recensioni per {this.state.selectedPasta.name}</h4>
            <ListGroup>
              {/* lo short circuit farà sì che comments non venga letto prima che selectedPasta esista e sia un oggetto */}
              {this.state.selectedPasta ? (
                this.state.selectedPasta.comments.map((commentoSingolo, index) => (
                  <ListGroup.Item key={`commentoSingolo-${index}`}>{commentoSingolo.comment}</ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>Nessun commento. Premi su unaa foto</ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
        {/*)}*/}
      </Container>
    );
  }
}

export default Homee;
