import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    try {
      const res = await api.post('/ongs', data)

      alert(`Seu ID de acesso: ${res.data.id}`)
      history.push('/');
    } catch (error) {
      alert('Erro no cadastro, tente novamente')
    }

  }

  return (
    <>
      <div className="register-container">
        <div className="content">
          <section>
            <img src={logo} alt="logo_heroes" />

            <h1>Cadastro</h1>
            <p>Cadastre-se, entre na nossa plataforma e compartilhe seus casos!</p>

            <Link className="link-style" to="/">
              <FiArrowLeft size={16} color='#E02041' />
              Voltar para login
            </Link>
          </section>

          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Nome da ONG"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <input type="email" placeholder="E-mail"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <input type="text" placeholder="Whatsapp"
              value={whatsapp}
              onChange={event => setWhatsapp(event.target.value)}
            />

            <div className="input-group">
              <input type="text" placeholder="Cidade"
                value={city}
                onChange={event => setCity(event.target.value)}
              />
              <input type="text" placeholder="UF"
                style={{ width: 80, marginLeft: 8 }}
                value={uf}
                onChange={event => setUf(event.target.value)}
              />
            </div>

            <button className="btn" type="submit">Cadastrar! \o/</button>
          </form>
        </div>
      </div>
    </>
  );
}
