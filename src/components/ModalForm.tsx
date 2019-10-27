import React from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { save } from '../services/BookService';
import styled from "styled-components";

type Props = {
  showModal: boolean,
  handleShowModal(): void
  bookDate: Date
}

type State = {
  name: string,
  email: string,
  phoneNumber: string,
  bookDate: Date,
  coolMessage: string,
}

class ModalForm extends React.Component<Props, State> {
  state: State = {
    name: '',
    email: '',
    phoneNumber: '',
    bookDate: this.props.bookDate,
    coolMessage: ''
  }

  handleChange = (event: any) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value } as State)
  }

  dateFormat(date: Date) {
    var day = new Date(date).getDate().toString();
    var month = new Date(date).getMonth() + 1;
    var year = new Date(date).getFullYear();

    var dayFormatted = day.length === 1 ? '0' + day : day;

    const fullDate = `${year}-${month}-${dayFormatted}`;
    return fullDate;
  }

  onSubmitForm = async (event: any) => {
    event.preventDefault();
    this.props.handleShowModal();
    
    const data = {
      name: this.state.name,
      email: this.state.email,
      bookDate: this.state.bookDate,
      coolMessage: this.state.coolMessage
    }

    await save(data)
  }

  render() {
    const { showModal, handleShowModal } = this.props;
    const { name, email, phoneNumber, bookDate, coolMessage } = this.state;
    return (
      <>
        <Modal show={showModal} onHide={handleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>Solicitar requisiçao para alugar o espaço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Por favor, preencha este formulário, em breve nós vamos entrar em contato para confirmar a reserva.</p>
            <p>Reserva para o dia <Bold>{bookDate.toLocaleDateString()}</Bold></p>

            <Form onSubmit={this.onSubmitForm}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Control
                    name="name"
                    placeholder="Seu nome completo"
                    onChange={this.handleChange}
                    value={name}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Email: Ex.: espaco@santamonica.com.br"
                      onChange={this.handleChange}
                      value={email}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                    <Form.Control
                      name="phoneNumber"
                      type="text"
                      placeholder="Telefone: (44) 9 965-4321"
                      onChange={this.handleChange}
                      value={phoneNumber}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formMessage">
                    <Form.Control
                      as="textarea"
                      name="coolMessage"
                      placeholder="Escreva alguma mensagem"         
                      onChange={this.handleChange}
                      value={coolMessage}
                    />
                </Form.Group>
            </Form.Row>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleShowModal}>
              Fechar
              </Button>
            <Button variant="primary" type="submit" onClick={this.onSubmitForm}>
              Enviar
              </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
};

const Bold = styled.span`
  font-weight: bold;
`
export default ModalForm;