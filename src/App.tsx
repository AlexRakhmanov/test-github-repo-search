import React from 'react';
import styled from 'styled-components';

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

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      this.setState({
        data: [],
        isFetching: false
      });
      return;
    }

    console.log('App.tsx: handleChange');

    this.setState({
      isFetching: true
    })

    console.log('App.tsx: handleChange -> dispatch');
    store.dispatch(search(event.target.value));

    console.log('App.tsx: handleChange -> setState');
    this.setState({
      data: store.getState().data,
      isFetching: false
    })
    // axios.get(`https://api.github.com/search/repositories?q=${event.target.value}`)
    //      .then(data => {
    //        this.setState({
    //           data: data.data.items,
    //           isFetching: false
    //        });

    //        console.log(data.data);
    //      })
  }

  render() {
    return (
      <Root>
        <h1>Поиск по проектам на GitHub</h1>
        <Input
          type="text"
          placeholder="Введите имя репозитория"
          className="search-input"
          onChange={this.handleChange}
        />
        <h2>Результаты поиска: </h2>
        <CardsContainer>
          {this.state.data.length !== 0 && this.state.data.map((item: Object) => (
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