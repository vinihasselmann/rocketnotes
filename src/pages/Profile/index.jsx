import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/auth'

import { api } from "../../service/api";
import avatarPlaceHolder from '../../assets/profilePlaceHolder.svg';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { ButtonText } from '../../components/buttonText';

import {Container, Form, Avatar}  from './styles';



export function Profile() {
  const {user, updateProfile} = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setOldPassword] = useState();
  const [passwordNew, setNewPassword] = useState();

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceHolder;

  const [avatar, setAvatar] = useState(avatarURL);
  const [avatarFile, setAvatarFile] = useState(null);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleUpdate() {
     const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    }

    const userUpdated = Object.assign(user, updated);
    

    await updateProfile({
      user: userUpdated,
      avatarFile
    });
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }


  return (
    <Container>
      <header>
        <button type="button" onClick={handleBack}>
        <FiArrowLeft/>
        </button>
      </header>

      <Form>

        <Avatar>
          <img 
          src={avatar}
          alt="foto do usuário" />

          <label htmlFor="avatar">
            <FiCamera/>
            <input
            id="avatar"
            type="file"
            onChange={handleChangeAvatar} />
          </label>
        </Avatar>

        <Input
        placeholder="Nome"
        type="text"
        icon={FiUser}
        value={name}
        onChange = {e => setName(e.target.value)}
        />
      

     
        <Input
        placeholder="E-mail"
        type="text"
        icon={FiMail}
        value={email}
        onChange = {e => setEmail(e.target.value)}
        />
      

 
        <Input
        placeholder="Senha atual"
        type="password"
        icon={FiLock}
        onChange = {e => setOldPassword(e.target.value)}
        />

        <Input
        placeholder="Nova senha"
        type="password"
        icon={FiLock}
        onChange = {e => setNewPassword(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate}/>
     </Form>
    
    </Container>
  )
}