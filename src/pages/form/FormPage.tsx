import React from 'react';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { History } from 'history'

type Props = {
  history: History;
}

type State = {
  loading: boolean,
  name: string,
  lastName: string,
  email: string,
  password: string,
  cnpjcpf: string,
  adressName: string,
  number: string,
  aditionalAdress: string,
  city: string,
  state: string,
  zipCode: string
}

class FormPage extends React.Component<Props, State> {
  state: State = {
    loading: false,
    name: '',
    lastName: '',
    email: '',
    password: '',
    cnpjcpf: '',
    adressName: '',
    number: '',
    aditionalAdress: '',
    city: '',
    state: '',
    zipCode: ''
  }

  handleChange = (event: any) => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value } as State)
  }

  onSubmit = async (event: any) => {
    event.preventDefault()
    console.log('test')

    this.setState({ loading: true })
    
    return this.props.history.goBack();
  }

  render() {
    const { name, lastName, email, password, cnpjcpf,
      adressName, number, aditionalAdress, city, state, zipCode
    } = this.state;
    return (
      <Container>
        <Form onSubmit={this.onSubmit} >
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

            <Form.Group as={Col} controlId="formGridCnpjCpf">
              <Form.Label>CNPJ/CPF</Form.Label>
              <Form.Control
                name="cnpjcpf"
                placeholder="123.456.789-10"
                onChange={this.handleChange}
                value={cnpjcpf}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={this.handleChange}
                value={email}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              name="adressName"
              placeholder="Av. Brasil"
              onChange={this.handleChange}
              value={adressName}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridNumber">
              <Form.Label>Número</Form.Label>
              <Form.Control
                name="number"
                placeholder="...1234"
                onChange={this.handleChange}
                value={number}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress3">
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                name="aditionalAdress"
                placeholder="Apto. 123, casa, apartamento"
                onChange={this.handleChange}
                value={aditionalAdress}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                name="city"
                onChange={this.handleChange}
                value={city}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select" onChange={this.handleChange} value={state}>
                <option>Choose...</option>
                <option>Paraná</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>CEP</Form.Label>
              <Form.Control name="zipCode" onChange={this.handleChange} value={zipCode} />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
      </Button>
        </Form>
      </Container>

    )
  }
}

export default FormPage