import React from 'react';

import history from '../../services/history';
import Button from '../../components/Button';
import { Container } from './styles';

export default function Home() {
  function _handleOnClick() {
    history.push('/fazer-orcamento');
  }

  return (
    <Container>
      <h1>
        Quanto vale seu <span>freela</span>?
      </h1>
      <p>
        Uma calculadora que irá te mostrar o valor da sua hora perante o
        freelance cotado. O projeto tem a finalidade de descrever alguns fatores
        determinantes para você saber o seu valor da sua hora em um freelance.
      </p>
      <Button handleOnClick={_handleOnClick}>Quero fazer um orçamento</Button>
    </Container>
  );
}
