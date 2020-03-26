import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');
  const history = useHistory();

  async function handleNewIncident(event) {
    event.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile');
    } catch (error) {
      alert('Erro ao cadastrar, tente novamente')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="logo_heroes" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso para encontrar o seu super-herói! :)</p>

          <Link className="link-style" to="/profile">
            <FiArrowLeft size={16} color='#E02041' />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input type="text"
            placeholder="Título do caso"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <input type="text"
            placeholder="Valor em reais R$"
            value={value}
            onChange={event => setValue(event.target.value)}
          />

          <button className="btn" type="submit">Cadastrar! \o/</button>
        </form>
      </div>
    </div>
  );
}
