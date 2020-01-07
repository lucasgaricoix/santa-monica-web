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
  Image
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
  faPhoneAlt,
  faSun,
  faBed,
  faShower,
  faExclamationTriangle,
  faChair
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import ModalForm from "../../components/ModalForm";
import ModalPhotos from "../../components/ModalPhotos";
import { load } from "../../services/BookService";
import { Book } from "../../types/Book";

//css
import "react-datepicker/dist/react-datepicker.css";
import "./style/viewpage.css";

import inside2 from "../../assets/img/inside/inside-2.jpeg";
import inside3 from "../../assets/img/inside/inside-3.jpeg";
import inside4 from "../../assets/img/inside/inside-4.jpeg";
import inside5 from "../../assets/img/inside/inside-5.jpeg";

export const insideImages = [inside2, inside3, inside4, inside5];

registerLocale("pt-BR", ptBR);

const HOLIDAY_PRICE = { key: "HOLIDAY_PRICE", price: 1200 };
const WEEKEND_PRICE = { key: "WEEKEND_PRICE", price: 800 };
const WEEKDAY_PRICE = { key: "WEEKDAY_PRICE", price: 600 };
const WEEKEND_LOW_PRICE = { key: "WEEKEND_LOW_PRICE", price: 600 };
const WEEKDAY_LOW_PRICE = { key: "WEEKDAY_LOW_PRICE", price: 500 };
const CARNIVAL_PRICE = { key: "CARNIVAL_PRICE", price: 800 };

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
  showModalPhotos: boolean;
  price: number;
  priceType: string;
  bookings: Book[];
  currentImage: number;
  width: number;
};

class ViewPage extends React.Component<Props, State> {
  state: State = {
    loading: false,
    bookDate: new Date(),
    showModal: false,
    showModalPhotos: false,
    price: 0,
    priceType: "",
    bookings: [],
    currentImage: 0,
    width: window.innerWidth,
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

      window.addEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  setBookDateAndPrices = (date: Date) => {
    this.setState({ bookDate: date });

    const day = date.getDate();
    const weekDay = date.getDay();
    const month = date.getMonth() + 1;
    const holiday = HOLIDAYS.filter(
      filterDate =>
        filterDate.getMonth() === date.getMonth() &&
        filterDate.getDate() === date.getDate()
    );

    if (holiday.length > 0) {
      return this.setState({
        priceType: HOLIDAY_PRICE.key,
        price: HOLIDAY_PRICE.price
      });
    }

    if (month === 2 && day === 25) {
      return this.setState({
        priceType: CARNIVAL_PRICE.key,
        price: CARNIVAL_PRICE.price
      });
    }

    if (
      month > 2 &&
      month < 10 &&
      (weekDay === 0 || weekDay === 5 || weekDay === 6)
    ) {
      return this.setState({
        priceType: WEEKEND_LOW_PRICE.key,
        price: WEEKEND_LOW_PRICE.price
      });
    }

    if (
      month > 2 &&
      month < 10 &&
      weekDay !== 0 && weekDay !== 5 && weekDay !== 6 && holiday.length === 0
    ) {
      return this.setState({
        priceType: WEEKDAY_LOW_PRICE.key,
        price: WEEKDAY_LOW_PRICE.price
      });
    }

    if (weekDay === 0 || weekDay === 5 || weekDay === 6) {
      return this.setState({
        priceType: WEEKEND_PRICE.key,
        price: WEEKEND_PRICE.price
      });
    }

    if (
      weekDay !== 0 &&
      weekDay !== 5 &&
      weekDay !== 6 &&
      holiday.length === 0
    ) {
      return this.setState({
        priceType: WEEKDAY_PRICE.key,
        price: WEEKDAY_PRICE.price
      });
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

  handleShowModalPhotos = (index?: number) => {
    this.setState({
      showModalPhotos: !this.state.showModalPhotos,
      currentImage: index!
    });
  };

  getBookingPrice() {
    const { price, priceType } = this.state;

    switch (priceType) {
      case HOLIDAY_PRICE.key:
        return (
          <div>
            <p>Feriados e datas comemorativas</p>
            <p>R${price},00</p>
          </div>
        );
      case CARNIVAL_PRICE.key:
        return (
          <div>
            <p>Preço especial de Carnaval</p>
            <p>R${price},00</p>
          </div>
        );
      case WEEKDAY_LOW_PRICE.key:
        return (
          <div>
            <p>Baixa temporada durante a semana</p>
            <p>R${price},00</p>
          </div>
        );
      case WEEKEND_LOW_PRICE.key:
        return (
          <div>
            <p>Baixa temporada nos finais de semana</p>
            <p>R${price},00</p>
          </div>
        );
      case WEEKDAY_PRICE.key:
        return (
          <div>
            <p>Durante a semana</p>
            <p>R${price},00</p>
          </div>
        );
      case WEEKEND_PRICE.key:
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

  monthsToShow = () => {
    const {width} = this.state;
    return width < 550 ? 1 : 2
  }

  render() {
    const {
      bookDate,
      showModal,
      showModalPhotos,
      price,
      currentImage,
      width
    } = this.state;
    return (
      <>
        {showModalPhotos ? (
          <ModalPhotos
            handleShowModalPhotos={this.handleShowModalPhotos}
            showModalPhotos={showModalPhotos}
            photos={insideImages}
            currentImage={currentImage}
          />
        ) : null}

        <ModalForm
          handleShowModal={this.handleShowModal}
          showModal={showModal}
          bookDate={bookDate}
          price={price}
        />

        <Jumbotron className="jumbotron-container">
          <h1 className="title">Alugue hoje para sua festa</h1>
          <h2 className="title">Sua diversão começa aqui</h2>

          <Form className="form" inline>
            <Form.Group >
              {width > 550 ? (<Form.Label column>Disponibilidade</Form.Label>) : (<Form.Label>Disponibilidade</Form.Label>)}
              <DatePicker
                className={"form-control"}
                selected={bookDate}
                excludeDates={this.getExcludeDates()}
                minDate={new Date()}
                onChange={date => date && this.setBookDateAndPrices(date)}
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
              />
            </Form.Group>
            <Button
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
            <SectionTitle>Fotos</SectionTitle>
            <Row>
              {insideImages.map((photo, index) => (
                <Col key={`col-tiny-image-${index}`} xs={6} md={3}>
                  <Image
                    thumbnail
                    src={photo}
                    alt={`tiny-image-${index}`}
                    height={200}
                    width={270}
                    onClick={() => this.handleShowModalPhotos(index)}
                  />
                </Col>
              ))}
            </Row>
          </div>

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
                      <FontAwesomeIcon icon={faExclamationTriangle} />
                      {
                        " Portão eletrônico, alarme e cerca elétrica para sua segurança."
                      }
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faBed} />
                      {" Quarto com suíte."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faSwimmingPool} />
                      {" Piscina com aquecedor solar, cascata e iluminação."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faShower} />
                      {" Ducha na piscina."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faSun} />
                      {" Cadeiras espreguiçadeiras de fibra."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faToilet} />
                      {" Banheiro Masculino e Feminino."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faToilet} />
                      {" Lavabo separado do banheiro."}
                    </ListGroup.Item>
                    <ListGroup.Item />
                  </ListGroup>
                </Col>
                <Col>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />
                      {" Mesa retangular de madeira."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faChair} />
                      {" Banquetas altas de fibra."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faChair} />
                      {" 10 mesas com 60 cadeiras."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faDrumstickBite} />
                      {" Churrasqueira e forno industrial."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />{" "}
                      {" Geladeira e Freezer horizontal."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />{" "}
                      {" Fogão cooktop 5 bocas e panelas"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />{" "}
                      {" 60 pratos, talheres."}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} />{" "}
                      {" Armário com utensílios de cozinha."}
                    </ListGroup.Item>
                    <ListGroup.Item />
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
                    selected={bookDate}
                    minDate={new Date()}
                    onChange={date => date && this.setBookDateAndPrices(date)}
                    monthsShown={this.monthsToShow()}
                    excludeDates={this.getExcludeDates()}
                    locale="pt-BR"
                    inline
                  />
                </Col>
                <Col sm={5}>
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
                        <FontAwesomeIcon icon={faPhoneAlt} />
                        {" (44) 99929-0738"}
                      </ListGroupItem>
                      <ListGroup.Item>
                        <a
                          href="https://wa.me/554499290738"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline-primary">
                            <FontAwesomeIcon icon={faWhatsapp} /> Mensagem via
                            WhatsApp
                          </Button>
                        </a>
                      </ListGroup.Item>
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
          <Section>
            <SectionTitle />
            <Container>
              <Col>
                <Row>
                  <div className="footer-copyright">
                    © 2020 Espaço Santa Mônica
                  </div>
                </Row>
              </Col>
            </Container>
          </Section>
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

export default ViewPage;
