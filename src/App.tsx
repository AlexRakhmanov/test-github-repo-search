import React from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

import Card from './components/Card';
import './styles/App.scss';
import { store } from './store/store';
import { search } from './store/actions';

const Root = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Input = styled.input`
background-color: #fff;
background-position: right 8px center;
background-repeat: no-repeat;
border: 1px solid #d1d5da;
border-radius: 3px;
box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
color: #24292e;
font-size: 16px;
line-height: 20px;
min-height: 34px;
outline: none;
padding: 6px 8px;
vertical-align: middle;
width: 30%;

&:focus {
  border-color: #2188ff;
  box-shadow: inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3);
  outline: none;
}
`

const CardsContainer = styled.div`
width: 100%;
`;

const P = styled.p`
text-align: center;
`;

interface State {
  data: object[],
  isFetching: boolean
}

class App extends React.Component<{}, State> {
  readonly state: State = {
    data: [],
    isFetching: false
  }

  private onChange = debounce((value: string) => this.handleChange(value), 500);

  private handleChange = (value: string) => {
    this.setState({
      isFetching: true
    })

    if (value === '') {
      this.setState({
        data: [],
        isFetching: false
      });
      return;
    }

    store.dispatch(search(value));

    store.getState().data.then((data:any) => {
      this.setState({
        data: data,
        isFetching: false
      })
    })
  }

  render() {
    return (
      <Root>
        <h1>Поиск по проектам на GitHub</h1>
        <Input
          type="text"
          placeholder="Введите имя репозитория"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChange(event.target.value)}
        />
        <h2>Результаты поиска: </h2>
        <CardsContainer>
          {this.state.data.length !== 0 && !this.state.isFetching && this.state.data.map((item: object) => (
            <Card data={item} />
          ))}
          {this.state.data.length === 0 && !this.state.isFetching && (
            <P>Ничего нет</P>
          )}
          {this.state.isFetching && (
            <P>Ищу...</P>
          )}
        </CardsContainer>
      </Root>
    );
  }
}

export default App;