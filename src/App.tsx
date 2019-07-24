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
padding: 10px 15px;
`

const CardsContainer = styled.div`
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
          className="search-input"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChange(event.target.value)}
        />
        <h2>Результаты поиска: </h2>
        <CardsContainer>
          {this.state.data.length !== 0 && !this.state.isFetching && this.state.data.map((item: Object) => (
            <Card data={item} />
          ))}
          {this.state.data.length === 0 && !this.state.isFetching && (
            <p>Ничего нет</p>
          )}
          {this.state.isFetching && (
            <p>Ищу...</p>
          )}
        </CardsContainer>
      </Root>
    );
  }
}

export default App;