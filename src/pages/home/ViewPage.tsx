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
import ModalForm from '../../components/ModalForm';
import { load } from "../../services/BookService";

//css
import "react-datepicker/dist/react-datepicker.css";
import './style/viewpage.css'

registerLocale("pt-BR", ptBR);

const WEEKDAY_PRICE = '350';
const WEEKEND_PRICE = '650';
const HOLIDAY_PRICE = '1500';

type Props = {};

type State = {
  loading: boolean;
  showMap: boolean;
  bookDate: Date;
  showModal: boolean;
  bookings: [];
};

class ViewPage extends React.Component<Props, State> {
  state: State = {
    loading: false,
    showMap: false,
    bookDate: new Date(),
    showModal: false,
    bookings: []
  };

  componentDidMount() {
    load().then((response) => {
      this.setState({ loading: true })
      this.setState({ bookings: response.data })
    })
      .catch(error => {
        console.log('Erro na requisição: ', error)
      })
      .finally(() => this.setState({ loading: false }))
  }

  toggleMap = () => {
    this.setState({ showMap: true });
  };

  setBookDate = (date: Date) => {
    if (this.state.bookDate) {
      this.setState({ bookDate: date })
    }
  };

  handleShowModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  getExcludeDates = () => {
    return this.state.bookings.map((book: any) => new Date(book.bookDate))
  }

  getBookingPrice() {
    const { bookDate } = this.state;
    const day = bookDate.getDay();
    if (day !== 0 && day !== 6) {
      return (
        <div>
          <p>Durante a semana</p>
          <p>{`R$${WEEKDAY_PRICE}`}</p>
        </div>
      )
    } else if (day === 0 || day === 6) {
      return (
        <div>
          <p>Finais de semana</p>
          <p>{`R$${WEEKEND_PRICE}`}</p>
        </div>
      )
    }
    else {
      return (
      <div>
        <p>Feriados e Natal</p>
        <p>{`R$${HOLIDAY_PRICE}`}</p>
      </div>
      )
    }
  }

  render() {
    const { showMap, bookDate, showModal } = this.state;
    return (
      <>
        <Jumbotron className="jumbotron-container">
          <h1 className="title">Alugue hoje para sua festa</h1>
          <h2 className="title">Sua diversão começa aqui</h2>

          <ModalForm
            handleShowModal={this.handleShowModal}
            showModal={showModal}
            bookDate={bookDate}            
          />

          <Form className="form-input-date" inline>
            <Form.Group>
              <Form.Label column>Disponibilidade</Form.Label>
              <DatePicker
                className="form-control"
                selected={bookDate}
                excludeDates={this.getExcludeDates()}
                minDate={new Date()}
                onChange={date => date && this.setBookDate(date)}
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
              />
            </Form.Group>
            <Button
              className="button-submit-date"
              type="submit"
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

          <div>
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

            <Section id="availability" className="section-datepicker-inline">
              <SectionTitle>Disponibilidade</SectionTitle>
              <Row>
                <Col>
                  <DatePicker
                    className="datepicker-available"
                    selected={this.state.bookDate}
                    minDate={new Date()}
                    onChange={date => date && this.setBookDate(date)}
                    monthsShown={2}
                    excludeDates={this.getExcludeDates()}
                    locale="pt-BR"
                    inline
                  />
                </Col>
                <Col>
                  <Card border="info">
                    <Card.Header>{`Data da reserva: `}<Bold>{bookDate.toLocaleDateString()}</Bold></Card.Header>
                    <Card.Body>
                      <Card.Title>{this.getBookingPrice()}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Preço da taxa de limpeza incluso.
                    </ListGroupItem>
                      <ListGroupItem>Valido até 30/11/2019.</ListGroupItem>
                      <ListGroupItem><Button variant="outline-primary" onClick={this.handleShowModal}>Quero alugar!</Button></ListGroupItem>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
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
          </div>
        </Container>
      </>
    );
  }
}

const Section = styled.section`
  margin-top: 25px;
`;
const SectionTitle = styled.h4`
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
`;

const MapButton = styled(Button)`
  margin-bottom: 15px;
`;

const Bold = styled.span`
  font-weight: bold;
`

export default ViewPage;
