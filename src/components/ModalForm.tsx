import React from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { save } from '../services/BookService';

type Props = {
  showModal: boolean,
  handleShowModal(): void
}

type State = {
  name: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  bookDate: string,
  coolMessage: string,
}

class ModalForm extends React.Component<Props, State> {
  state: State = {
    name: '',
    lastName: '',    
    email: '',
    phoneNumber: '',
    bookDate: '',
    coolMessage: ''
  }

  handleChange = (event: any) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value } as State)
  }

  onSubmitForm = async (event: any) => {
    event.preventDefault();
    this.props.handleShowModal();
    
    const data = {
      name: this.state.name,
      lastName: this.state.lastName,
      email: this.state.email,
      bookDate: this.state.bookDate,
      coolMessage: this.state.coolMessage
    }

    await save(data)
  }

  render() {
    const { showModal, handleShowModal } = this.props;
    const { name, lastName, email, phoneNumber, bookDate, coolMessage } = this.state;
    return (
      <>
        <Modal show={showModal} onHide={handleShowModal}>
          <Modal.Header closeButton>
            <Modal.Title>Solicitar requisiçao para alugar o espaço</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Por favor, preencha este formulário, em breve nós vamos entrar em contato para confirmar a reserva.</p>
            <Form onSubmit={this.onSubmitForm}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="Seu nome"
                    onChange={this.handleChange}
                    value={name}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control
                    name="lastName"
                    placeholder="Sobrenome"
                    onChange={this.handleChange}
                    value={lastName}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Email: Ex.: espaco@santamonica.com.br"
                      onChange={this.handleChange}
                      value={email}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhone">
                  <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="phoneNumber"
                      type="text"
                      placeholder="(44) 9 965-4321"
                      onChange={this.handleChange}
                      value={phoneNumber}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridBook">
                  <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="bookDate"
                      type="date"                      
                      onChange={this.handleChange}
                      value={bookDate}
                    />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formMessage">
                  <Form.Label>Mensagem</Form.Label>
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

  export default ModalForm;