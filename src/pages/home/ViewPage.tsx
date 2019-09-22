import React from 'react';
import { Container, Form, Jumbotron, Col, Row, FormLabel, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import history from 'history'

//Images
import slide0 from '../../img/project-preview1.jpg';
import slide1 from '../../img/project-preview2.jpg';
import slide2 from '../../img/project-preview3.jpg';

const images = [
  slide0,
  slide1,
  slide2
]

type Props = {}

type State = {
  currentImage: number
}

class ViewPage extends React.Component<Props, State> {
  state: State = {
    currentImage: 0
  }

  previousImage = () => {
    if (this.state.currentImage > 0) {
      this.setState(prevState => ({
        currentImage: prevState.currentImage - 1
      }))
    }
  }

  nextImage = () => {
    if (this.state.currentImage < images.length - 1) {
      this.setState(prevState => ({
        currentImage: prevState.currentImage + 1
      }))
    }
  }

  pesquisarCalendario = () => {
  }

  render() {
    const { currentImage } = this.state;
    return (
      <>
        <Jumbotron style={{ color: "#fff", borderStyle: "solid", borderWidth: 1, borderColor: "black", backgroundImage: `url("${images[currentImage]}")`, height: 650, textAlign: "center" }}>
          <h1>Alugue hoje para sua festa</h1>
          <h4>Sua diversão começa aqui</h4>

          <Form inline >
            <Form.Group>
              <FormLabel column>Entrada</FormLabel>
              <Form.Control id="checkin" type="date" placeholder="Entrada" />
            </Form.Group>
            <Form.Group>
              <FormLabel column>Saída</FormLabel>
              <Form.Control id="checkout" type="date" placeholder="Saída" />
            </Form.Group>
            <Button onClick={this.pesquisarCalendario}>Pesquisar</Button>
          </Form>

          <div style={{ marginTop: 400 }}>
            <button style={{ border: "none", background: "none" }} onClick={this.previousImage}><FontAwesomeIcon icon={faArrowAltCircleLeft} /></button>
            <button style={{ border: "none", background: "none" }} onClick={this.nextImage}><FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
          </div>

        </Jumbotron>
        <Container className="describe-container">
          <Row>
            <Col sm={3}>
              <h4>Alugue com tranquilidade</h4>
              <p>Uma experiência agradável para sua família desfrutar do nosso espaço.</p>
            </Col>
            <Col sm={3}>
              <h4>Garantia no pagamento</h4>
              <p>Pague com cartão em até 6x, sendo 50% no ato e o restante após a festa.</p>
            </Col>
            <Col sm={3}>
              <h4>Disponibilidade para Hospedagem</h4>
              <p>Você pode hospedar em nosso espaço, sendo uma suíte para garantir seu conforto.</p>
            </Col>
            <Col sm={3}>
              <h4>Acesso exclusivo para piscina</h4>
              <p>O banheiro e lavabo tem acesso exclusivo para a piscina.</p>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ViewPage;