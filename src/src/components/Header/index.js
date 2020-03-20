import React from 'react';

import history from '../../services/history';
import Logo from '../../assets/logo.png';
import { Container, Wrapper } from './styles';

export default function Header() {
  return (
    <Container>
      <Wrapper>
        <img src={Logo} alt="Heart devs" />
        <ul>
          <li>
            <a href="#" onClick={() => history.push('/')}>
              Página inicial
            </a>
          </li>
          <li>
            <a
              href="https://github.com/thuram/he4rtlabs-challenges-01"
              target="_blank"
            >
              Repositório
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/dev-lucaslopes/"
              target="_blank"
            >
              Quem sou eu?
            </a>
          </li>
        </ul>
      </Wrapper>
    </Container>
  );
}
