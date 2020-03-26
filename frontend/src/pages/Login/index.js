import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import heroesimg from '../../assets/heroes.png';
import './styles.css';
import api from '../../services/api';

export default function Login() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const res = await api.post('/sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', res.data.name);

      history.push('/profile');

    } catch (error) {
      alert('Falha no login, tente novamente');
    }
  }

  return (
    <>
      <div className="login-container">
        <section className="form">
          <img src={logo} alt="logo-heroes" />

          <form onSubmit={handleLogin}>
            <h1>Faça seu login</h1>

            <input type="text"
              placeholder="Sua ID"
              value={id}
              onChange={event => setId(event.target.value)}
              required
            />
            <button type="submit" className="btn">Entrar! :D</button>

            <Link to="/register" className="link-style">
              <FiLogIn size={16} color="#E02041" />
              Não tenho cadastro :(
            </Link>
          </form>
        </section>

        <img src={heroesimg} alt="heroes" />

      </div>
    </>
  );
}
