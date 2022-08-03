import { api } from "../../service/api";

import { useState } from "react";

import { Container, Form, Background } from "./styles";

import { Link, useNavigate } from "react-router-dom";

import {FiUser, FiMail, FiLock} from 'react-icons/fi'

import {Button} from '../../components/button'

import {Input} from '../../components/input'

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()


  function handleSignUp() {

    if(!name || !email || !password) {
       return alert("preencha todos os campos!");
      }

    
api.post("/users", {name, email, password})
    .then(() => {
      alert("usuário cadastrado com sucesso");
      navigate("/");
    })
    .catch(error => {
      if(error.response) {
        alert(error.response.data.message);
      } else {
        alert("não foi possivel cadastrar");
      }
    });

  }

    



  return(
    <Container>
      <Background/>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicaçao para salvar e gerenciar seus link uteis</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={event => setName(event.target.value)}
          />

          <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={event => setEmail(event.target.value)}
          />

          <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={event => setPassword(event.target.value)}
          />

          <Button title="Cadastrar" onClick={handleSignUp}/>

      <Link to="/">Voltar para o Login</Link>

      </Form>

      

    </Container>
  );

}