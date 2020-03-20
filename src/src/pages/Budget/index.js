import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CurrencyInput from 'react-currency-input';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '../../services/history';
import { calculate } from '../../store/modules/budget/actions';
import Button from '../../components/Button';
import { Container, InputGroup } from './styles';

const schema = Yup.object().shape({
  workedDays: Yup.number()
    .positive('Apenas valores positivos!')
    .min(1)
    .required('Por favor, informe o total de dias trabalhados.')
    .positive('Apenas valores positivos!'),
  vacation: Yup.number()
    .typeError(
      'Por favor, informe a quantidade de dias de férias corretamente (apenas números).'
    )
    .positive('Apenas valores positivos!'),
  dailyHours: Yup.number().typeError(
    'Por favor, informe a quantidade de horas trabalhadas corretamente (apenas números).'
  ),
  total: Yup.number()
    .typeError(
      'Por favor, informe o valor do projeto corretamente corretamente.'
    )
    .required('O campo Valor do projeto é obrigatório.'),
});

export default function Home() {
  const dispatch = useDispatch();

  const [total, setTotal] = useState('');
  const [dailyHours, setDailyHours] = useState('');
  const [workedDays, setWorkedDays] = useState('');
  const [vacation, setVacation] = useState(0);

  function _handleOnChange(_, maskedvalue, floatvalue) {
    setTotal(floatvalue);
  }

  async function _handleSubmit() {
    try {
      await schema.validate({ total, dailyHours, workedDays, vacation });
    } catch (error) {
      toast.error(error.message);
      return;
    }

    if (parseInt(dailyHours, 10) < 1 || parseInt(dailyHours, 10) > 24) {
      toast.error('O dia só tem 24 horas :)');
      return;
    }

    dispatch(calculate(total, dailyHours, workedDays, vacation));

    history.push('/resultado');
  }

  return (
    <Container>
      <h1>
        Vamos as <span>contas</span>!
      </h1>
      <form action="">
        <InputGroup>
          <label>Valor total do projeto</label>
          <CurrencyInput
            value={total}
            onChangeEvent={_handleOnChange}
            prefix="R$ "
            decimalSeparator=","
            thousandSeparator="."
            placeholder="R$ 0,00"
          />
        </InputGroup>
        <InputGroup>
          <label>Quantidade de horas trabalhadas por dia</label>
          <input
            type="text"
            placeholder="ex.: 8 (máximo de 24)"
            value={dailyHours}
            onChange={e => setDailyHours(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <label>Dias efetivos trabalhados na semana</label>
          <input
            type="text"
            placeholder="ex: 7"
            value={workedDays}
            onChange={e => setWorkedDays(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <label>Dias de férias pelo projeto</label>
          <input
            type="text"
            placeholder="ex.: 3"
            value={vacation}
            onChange={e => setVacation(e.target.value)}
          />
        </InputGroup>
      </form>
      <Button handleOnClick={_handleSubmit}>Calcular</Button>
    </Container>
  );
}
