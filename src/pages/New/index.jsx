import {Header} from '../../components/header'

import { api } from '../../service/api';

import { useNavigate } from 'react-router-dom';

import {Input} from '../../components/input'
import {TextArea} from '../../components/TextArea'
import {NoteItem} from '../../components/NoteItem'
import {Section} from '../../components/section'
import {Button} from '../../components/button'
import {ButtonText} from '../../components/buttonText'
import { Container, Form } from './styles'
import { useState } from 'react';

export function New(){

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddLink() {

    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted));

  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
    
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted));

  }


  function handleBack() {
    navigate(-1);
  }

  async function handleNewNote() {
    if(!title){
      return alert("Digite um título para a sua nota")
    }
    if(newLink) {
          return alert(`Voce ainda não adicionou o link "${newLink}"`)
        }
    if(newTag) {
      return alert(`Voce ainda não adicionou a ultima tag "${newTag}"`)
    }
    
    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("nota criada com sucesso")
    navigate(-1);
  }


  return(
    <Container>
      <Header/>

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText
              title="Voltar"
              onClick={handleBack}
            />
          </header>

          <Input 
          placeholder="Titulo"
          onChange = {e => setTitle(e.target.value)}
          />
          
          <TextArea 
          placeholder="observaçoes"
          onChange = {e => setDescription(e.target.value)}
          />

          <Section title="links uteis">
            {
              links.map((link, index) => (
                <NoteItem
                key = {String(index)}
                value={link}
                onClick = {() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem
            isNew
            placeholder="Novo Link"
            value={newLink}
            onChange={e => setNewLink(e.target.value)}
            onClick = {handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className='tags'>
              {
                tags.map((tag, index) => (
                <NoteItem
                key={String(index)}
                value={tag}
                onClick= {() => handleRemoveTag(tag)}/>
                ))
              }
              

            <NoteItem
            isNew
            placeholder="Nova tag"
            onChange={e => setNewTag(e.target.value)}
            value={newTag}
            onClick={handleAddTag}
            />
            </div>
            
          </Section>
        
          <Button
          title="Salvar"
          onClick={handleNewNote} />

        </Form>
      </main>
    </Container>
  )
}