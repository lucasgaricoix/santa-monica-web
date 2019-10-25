import React from "react";
import {
  Card,
  Container,
  Form,
  Jumbotron,
  Col,
  Row,
  ListGroup,
  Button,
  CardDeck,
  ListGroupItem
} from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faUserFriends,
  faSwimmingPool,
  faToilet,
  faDrumstickBite,
  faChair
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import './style/viewpage.css'
import { addDays } from "date-fns";
import ModalForm from '../../components/Modal';

registerLocale("pt-BR", ptBR);

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Section = styled.section`
  align-items: flex-start;
  margin-top: 25px;
`;
const SectionTitle = styled.h4`
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

const MapButton = styled(Button)`
  margin-bottom: 15px;
`;

type Props = {};

type State = {
  currentImage: number;
  showMap: boolean;
  startDate: Date;
  available: Date;
  showModal: boolean;
};

class ViewPage extends React.Component<Props, State> {
  state: State = {
    currentImage: 0,
    showMap: false,
    startDate: new Date(),
    available: new Date(),
    showModal: false
  };

  onSubmitForm = () => {};

  toggleMap = () => {
    this.setState({ showMap: true });
  };

  setStartDate = (date?: Date | null, type?: string) => {
    if (date && type === "start") {
      this.setState({ startDate: date });
    }
    if (date && type === "available") {
      this.setState({ available: date });
    }
  };

  handleShowModal = () => {
    this.setState({ showModal: !this.state.showModal})
  }

  render() {
    const { showMap, startDate, showModal } = this.state;
    return (    
      <>
        <Jumbotron className="jumbotron-container">
          <h1 className="title">Alugue hoje para sua festa</h1>
          <h2 className="title">Sua diversão começa aqui</h2>

          <ModalForm handleShowModal={this.handleShowModal} showModal={showModal}/>

          <Form className="form-input-date" inline>
            <Form.Group>
              <Form.Label column>Disponibilidade</Form.Label>
              <DatePicker
                className="form-control"
                selectsStart
                selected={startDate}
                minDate={new Date()}
                onChange={date => this.setStartDate(date, "start")}
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label column>Saída</Form.Label>
              <DatePicker
                className="form-control"
                selectsEnd
                selected={endDate}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={addDays(startDate, 5)}
                onChange={date => this.setStartDate(date, "end")}
                placeholderText="Permitido apenas 5 dias de reserva."
                dateFormat="dd/MM/yyyy"                
                locale="pt-BR"
              />
            </Form.Group> */}
            <Button
              className="button-submit-date"
              type="submit"
              onClick={this.onSubmitForm}
              href="#availability"
              >
                Pesquisar
            </Button>
          </Form>
        </Jumbotron>

        <Container className="describe-container">
          <Row>
            <Col sm={3}>
              <h4>Alugue com tranquilidade</h4>
              <p>
                Uma experiência agradável para sua família desfrutar do nosso
                espaço.
              </p>
            </Col>
            <Col sm={3}>
              <h4>Garantia no pagamento</h4>
              <p>
                Pague com cartão em até 6x, sendo 50% no ato e o restante após a
                festa.
              </p>
            </Col>
            <Col sm={3}>
              <h4>Disponibilidade para Hospedagem</h4>
              <p>
                Você pode hospedar em nosso espaço, sendo uma suíte para
                garantir seu conforto.
              </p>
            </Col>
            <Col sm={3}>
              <h4>Acesso exclusivo para piscina</h4>
              <p>O banheiro e lavabo tem acesso exclusivo para a piscina.</p>
            </Col>
          </Row>

          <SectionContainer>
            <Section id="place-details" className="place-details">
            <SectionTitle>Detalhes do espaço</SectionTitle>
              <Row>
                <Col>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUserFriends} />
                      {" Capacidade para 60 pessoas."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faSwimmingPool} />
                      {" Piscina com cascata e aquecida."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />{" "}
                      {" Pratos e talheres inclusos para todos."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />
                      {" Mesas e cadeiras inclusos para todos."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faToilet} />
                      {" Banheiro Masculino e Feminino."}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faDrumstickBite} />
                      {" Churrasqueira com balcão e pia."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />{" "}
                      {" Freezer e geladeira."}
                    </ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon icon={faUtensils} />{" "}{"Forno Industrial."}</ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon icon={faChair} />{" Cadeiras espreguiçadeira"}</ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Section>

            <Section id="availability">
              <SectionTitle>Disponibilidade</SectionTitle>
              <DatePicker
                selected={this.state.available}
                minDate={startDate}
                onChange={date => this.setStartDate(date, "available")}
                monthsShown={3}
                excludeDates={[
                  addDays(new Date(), 14),
                  addDays(new Date(), 15)
                ]}
                locale="pt-BR"
                inline
              />
            </Section>

            <Section id="section-price">
              <SectionTitle>Preço</SectionTitle>
              <CardDeck>
                <Card border="info">
                  <Card.Header>Segunda à Sexta</Card.Header>
                  <Card.Body>
                    <Card.Title>R$350</Card.Title>
                  </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Preço da taxa de limpeza incluso.
                      </ListGroupItem>
                      <ListGroupItem>Valido até 30/11/2019.</ListGroupItem>                      
                    <ListGroupItem><Button variant="outline-primary" onClick={this.handleShowModal}>Quero alugar!</Button></ListGroupItem>
                    </ListGroup>
                </Card>
                <Card border="primary">
                  <Card.Header>Finais de semanas</Card.Header>
                  <Card.Body>
                    <Card.Title>R$650</Card.Title>
                  </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Preço da taxa de limpeza incluso.
                      </ListGroupItem>
                      <ListGroupItem>Valido até 30/11/2019.</ListGroupItem>
                      <ListGroupItem><Button variant="outline-primary" onClick={this.handleShowModal}>Quero alugar!</Button></ListGroupItem>
                    </ListGroup>
                </Card>

                <Card border="success">
                  <Card.Header>Natal e Ano Novo</Card.Header>
                  <Card.Body>
                    <Card.Title>R$1500</Card.Title>
                  </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Preço da taxa de limpeza incluso.
                      </ListGroupItem>
                      <ListGroupItem>
                        Preço válido para os dias 24/12/2019 á 03/01/2020.
                      </ListGroupItem>
                      <ListGroupItem><Button variant="outline-primary" onClick={this.handleShowModal}>Quero alugar!</Button></ListGroupItem>
                    </ListGroup>
                </Card>
              </CardDeck>
            </Section>

            <Section>
              <SectionTitle>Localização</SectionTitle>
              <p>R. Guaratinga, 520 - Jardim dos Pássaros</p>
              <MapButton onClick={this.toggleMap}>Expandir Mapa</MapButton>
              {showMap && (
                <div>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d915.427233424145!2d-51.97698204130726!3d-23.398740832335065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ecd6885745f567%3A0xaac13ecaa32dda3d!2sR.%20Guaratinga%2C%20520%20-%20Jardim%20dos%20Passaros%2C%20Maring%C3%A1%20-%20PR%2C%2087075-240!5e0!3m2!1spt-BR!2sbr!4v1569817365041!5m2!1spt-BR!2sbr"
                    width="800"
                    height="450"
                    style={{ border: 0 }}
                    title="googleMaps"
                  />
                </div>
              )}
            </Section>
          </SectionContainer>
        </Container>
      </>
    );
  }
}

export default ViewPage;
