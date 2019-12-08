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
  ListGroupItem,
  Spinner
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
  faSun,
  faBed
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import ModalForm from "../../components/ModalForm";
import { load } from "../../services/BookService";
import { Book } from "../../types/Book";

//css
import "react-datepicker/dist/react-datepicker.css";
import "./style/viewpage.css";

registerLocale("pt-BR", ptBR);

const HOLIDAY_PRICE = 1200;
const WEEKEND_PRICE = 800;
const WEEKDAY_PRICE = 600;

const HOLIDAYS = [
  new Date("2019/12/24 03:00:00"),
  new Date("2019/12/25 03:00:00"),
  new Date("2019/12/31 03:00:00"),
  new Date("2020/01/01 03:00:00")
];

type Props = {};

type State = {
  loading: boolean;
  bookDate: Date;
  showModal: boolean;
  price: number;
  bookings: Book[];
};

class ViewPage extends React.Component<Props, State> {
  state: State = {
    loading: false,
    bookDate: new Date(),
    showModal: false,
    price: 0,
    bookings: []
  };

  componentDidMount() {
    load()
      .then(response => {
        this.setState({ loading: true, bookings: response.data });
      })
      .catch(error => {
        console.log("Erro na requisição: ", error);
      })
      .finally(() => {
        this.setBookDateAndPrices(this.state.bookDate);
        this.setState({ loading: false });
      });
  }

  setBookDateAndPrices = (date: Date) => {
    const day = date.getDay();
    const holiday = HOLIDAYS.filter(
      filterDate =>
        filterDate.getMonth() === date.getMonth() &&
        filterDate.getDate() === date.getDate()
    );

    this.setState({ bookDate: date });

    if (holiday.length > 0) {
      return this.setState({ price: HOLIDAY_PRICE });
    }

    if (day === 0 || day === 5 || day === 6) {
      return this.setState({ price: WEEKEND_PRICE });
    }

    if (day !== 0 && day !== 5 && day !== 6 && holiday.length === 0) {
      return this.setState({ price: WEEKDAY_PRICE });
    }
  };

  handleShowModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  getExcludeDates = () => {
    return this.state.bookings
      .filter((book: Book) => book.isConfirmed === true)
      .map((book: Book) => new Date(book.bookDate));
  };

  getBookingPrice() {
    const { price } = this.state;

    switch (price) {
      case HOLIDAY_PRICE:
        return (
          <div>
            <p>Feriados e datas comemorativas</p>
            <p>R${price},00</p>
          </div>
        );
      case WEEKDAY_PRICE:
        return (
          <div>
            <p>Durante a semana</p>
            <p>R${price},00</p>
          </div>
        );
      case WEEKEND_PRICE:
        return (
          <div>
            <p>Finais de semana</p>
            <p>R${price},00</p>
          </div>
        );
      default:
        return <div></div>;
    }
  }

  render() {
    const { loading, bookDate, showModal, price } = this.state;
    return (
      <>
        <Jumbotron className="jumbotron-container">
          <h1 className="title">Alugue hoje para sua festa</h1>
          <h2 className="title">Sua diversão começa aqui</h2>

          <ModalForm
            handleShowModal={this.handleShowModal}
            showModal={showModal}
            bookDate={bookDate}
            price={price}
          />

          <Form className="form-input-date" inline>
            <Form.Group>
              <Form.Label column>Disponibilidade</Form.Label>
              <DatePicker
                className="form-control"
                selected={bookDate}
                excludeDates={this.getExcludeDates()}
                minDate={new Date()}
                onChange={date => date && this.setBookDateAndPrices(date)}
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
              <p>Pague apenas 50% no ato e o restante no dia da festa.</p>
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
                      {" Piscina com aquecedor solar e cascata."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faSun} />
                      {" Cadeiras espreguiçadeira."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faToilet} />
                      {" Banheiro Masculino e Feminino."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faBed} />
                      {" Quarto com suíte."}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />
                      {" 10 mesas com 60 cadeiras."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faDrumstickBite} />
                      {" Churrasqueira com forno industrial."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />{" "}
                      {" Freezer e geladeira."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />{" "}
                      {" Fogão e panelas"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />{" "}
                      {" Pratos, talheres e utensílios de cozinha."}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Section>

            <Section id="availability" className="section-datepicker-inline">
              <SectionTitle>Disponibilidade</SectionTitle>
              <Row>
                {loading ? (
                  <Spinner animation="border" role="status">
                  <span className="sr-only">Carregando...</span>
                </Spinner>
                ) : (
                  <Col>
                  <DatePicker
                    className="datepicker-available"
                    selected={bookDate}
                    minDate={new Date()}
                    onChange={date => date && this.setBookDateAndPrices(date)}
                    monthsShown={2}
                    excludeDates={this.getExcludeDates()}
                    locale="pt-BR"
                    inline
                  />
                </Col>
                )}
                <Col sm={5}>
                  {loading ? (
                    <Spinner animation="border" role="status">
                    <span className="sr-only">Carregando...</span>
                  </Spinner>
                  ): (
                    <Card id="section-price" border="info">
                    <Card.Header>
                      {`Data da reserva: `}
                      <Bold>{bookDate.toLocaleDateString()}</Bold>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{this.getBookingPrice()}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Preço da taxa de limpeza incluso.
                      </ListGroupItem>
                      <ListGroupItem>
                        <Button
                          variant="outline-primary"
                          onClick={this.handleShowModal}
                        >
                          Quero reservar!
                        </Button>
                      </ListGroupItem>
                    </ListGroup>
                  </Card>
                  )}
                </Col>
              </Row>
            </Section>

            <Section>
              <SectionTitle>Localização</SectionTitle>
              <p>R. Guaratinga, 520c - Jardim dos Pássaros - Maringá-PR</p>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d915.427233424145!2d-51.97698204130726!3d-23.398740832335065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ecd6885745f567%3A0xaac13ecaa32dda3d!2sR.%20Guaratinga%2C%20520%20-%20Jardim%20dos%20Passaros%2C%20Maring%C3%A1%20-%20PR%2C%2087075-240!5e0!3m2!1spt-BR!2sbr!4v1569817365041!5m2!1spt-BR!2sbr"
                  width="800"
                  height="450"
                  style={{ border: 0 }}
                  title="googleMaps"
                />
              </div>
            </Section>
          </div>
        </Container>
        <footer className="page-footer">
          <Container>
            <Col>
              <Row>
                <h5 className="title-text">Espaço Santa Mônica</h5>
              </Row>
              <Row>
                <ul>
                  <li>Contato para informações</li>
                  <ul>
                    <ContactPerson>Gabriela: (44) 99178-9996</ContactPerson>
                    <ContactPerson>Ana Paula: (44) 99921-9315</ContactPerson>
                  </ul>
                </ul>
              </Row>

              <Row>
                <div className="footer-copyright">
                  © 2019 Espaço Santa Mônica
                </div>
              </Row>
            </Col>
          </Container>
        </footer>
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

const Bold = styled.span`
  font-weight: bold;
`;

const ContactPerson = styled.li`
  font-size: 12px;
`;

export default ViewPage;
