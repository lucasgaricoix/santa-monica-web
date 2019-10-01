import React from 'react';
import { Card, Container, Form, Jumbotron, Col, Row, FormLabel, ListGroup, Button, CardDeck, ListGroupItem } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faArrowAltCircleLeft, faUtensils, faUserFriends, faSwimmingPool, faToilet, faDrumstickBite } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

import "react-datepicker/dist/react-datepicker.css";
//Images
import slide0 from '../../img/project-preview1.jpg';
import slide1 from '../../img/project-preview2.jpg';
import slide2 from '../../img/project-preview3.jpg';
import { addDays } from 'date-fns';


const Title = styled.h1`
  text-shadow: 1px 2px #000;
`

const SubTitle = styled.h4`
  text-shadow: 1px 2px #000;
`

const CheckInOut = styled(FormLabel)`  
  text-shadow: 1px 1px #000;
`

const JumBotronContainer = styled(Jumbotron)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  height: 600px;
  color: #fff;
`

const ArrowButton = styled.button`
  border: none;
  background: none;
`

const DivButton = styled.div`
  margin-top: auto;
  align-self: flex-end | center ;
`

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
`
const Section = styled.section`  
  align-items: flex-start;
  margin-top: 15px;
`
const SectionTitle = styled.h4`
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(0,0,0,.125);
`

const MapButton = styled(Button)`
  margin-bottom: 15px;
`

const images = [
  slide0,
  slide1,
  slide2
]

type Props = {}

type State = {
  currentImage: number;
  showMap: boolean;
  startDate: Date;
  endDate: Date;
}

class ViewPage extends React.Component<Props, State> {
  state: State = {
    currentImage: 0,
    showMap: false,
    startDate: new Date(),
    endDate: new Date(),
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

  toggleMap = () => {
    this.setState({ showMap: true })
  }

  setStartDate = (date?: Date | null, type?: string) => {
    if (date && type === 'start') {
      this.setState({ startDate: date })
    }
    if (date && type === 'end') {
      this.setState({ endDate: date })
    }
  }

  render() {
    const { currentImage, showMap, startDate, endDate } = this.state;
    return (
      <>
        <JumBotronContainer style={{ backgroundImage: `url("${images[currentImage]}")` }}>          
          <Title>Alugue hoje para sua festa</Title>
          <SubTitle>Sua diversão começa aqui</SubTitle>

          <Form inline >
            <Form.Group>
              <CheckInOut column>Entrada</CheckInOut>
              <DatePicker
                selected={startDate}
                minDate={new Date()}
                onChange={date => this.setStartDate(date, 'start')}
              />
            </Form.Group>
            <Form.Group>
              <CheckInOut column>Saida</CheckInOut>
              <DatePicker
                selected={endDate}
                minDate={startDate}
                maxDate={addDays(startDate, 5)}
                onChange={date => this.setStartDate(date, 'end')}
                placeholderText="Permitido apenas 5 dias de reserva."
              />
            </Form.Group>
            <Button onClick={this.pesquisarCalendario}>Pesquisar</Button>
          </Form>

          <DivButton>
            <ArrowButton onClick={this.previousImage}><FontAwesomeIcon color="#fff" icon={faArrowAltCircleLeft} /></ArrowButton>
            <ArrowButton onClick={this.nextImage}><FontAwesomeIcon color="#fff" icon={faArrowAltCircleRight} /></ArrowButton>
          </DivButton>
          
        </JumBotronContainer>
        
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

          <SectionContainer>
            <SectionTitle>Detalhes do espaço</SectionTitle>
            <Section>
              <Row>
              <Col>
              <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUserFriends} />
                      {' Capacidade para 60 pessoas.'}
                    </ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon icon={faSwimmingPool} />{' Piscina com cascata.'}</ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} /> {' Pratos e talheres inclusos para todos.'}
                    </ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon icon={faUtensils} />{' Mesas e cadeiras inclusos para todos.'}</ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon icon={faToilet} />{' Banheiro Masculino/Feminino.'}</ListGroup.Item>
                  </ListGroup>
                  </Col>
                  <Col>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faDrumstickBite} />
                      {' Churrasqueira com balcao e pia.'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FontAwesomeIcon icon={faUtensils} /> {' Pratos e talheres inclusos para todos.'}
                    </ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  </Col>
                  </Row>
            </Section>

            <Section>
              <SectionTitle>Disponibilidade</SectionTitle>
              <DatePicker
                selected={startDate}
                onChange={date => this.setStartDate(date)}
                inline
              />
            </Section>

            <Section>
              <SectionTitle>Preço</SectionTitle>
              <CardDeck>
                <Card border="info">
                  <Card.Header>Segunda a Sexta</Card.Header>
                  <Card.Body>
                    <Card.Title>R$350</Card.Title>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Preco da taxa de limpeza incluso.</ListGroupItem>
                        <ListGroupItem>Valido ate 30/11/2019.</ListGroupItem>
                      </ListGroup>
                  </Card.Body>
                </Card>
                <Card border="primary">
                  <Card.Header>Finais de semanas</Card.Header>
                  <Card.Body>
                    <Card.Title>R$650</Card.Title>
                    
                      <ListGroup className="list-group-flush">
                        <ListGroupItem>Preco da taxa de limpeza incluso.</ListGroupItem>
                        <ListGroupItem>Valido ate 30/11/2019.</ListGroupItem>                        
                      </ListGroup>

                    </Card.Body>                  
                </Card>
                <Card border="success">
                  <Card.Header>Natal e Ano Novo</Card.Header>
                  <Card.Body>
                    <Card.Title>R$1500</Card.Title>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Preco da taxa de limpeza incluso.</ListGroupItem>
                        <ListGroupItem>Preco valido para os dias 24/12/2019 a 03/01/2020.</ListGroupItem>                        
                      </ListGroup>
                  </Card.Body>
                </Card>
              </CardDeck>


            </Section>

            <Section>
              <SectionTitle>Localizaçao</SectionTitle>
              <p>R. Guaratinga, 520 - Jardim dos Passaros</p>
              <MapButton onClick={this.toggleMap}>Expandir Mapa</MapButton>
              {showMap && (
                <div>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d915.427233424145!2d-51.97698204130726!3d-23.398740832335065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ecd6885745f567%3A0xaac13ecaa32dda3d!2sR.%20Guaratinga%2C%20520%20-%20Jardim%20dos%20Passaros%2C%20Maring%C3%A1%20-%20PR%2C%2087075-240!5e0!3m2!1spt-BR!2sbr!4v1569817365041!5m2!1spt-BR!2sbr" width="800" height="450" style={{ border: 0 }} title="googleMaps" />
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