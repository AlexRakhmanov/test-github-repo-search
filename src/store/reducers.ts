import { IAction } from './actions';
import axios from 'axios';

interface State {
  data: object[]
};

const defaultState: State = {
  data: []
};

let res: object[] = [];

function search(query: string) {
  console.log('reducers.ts: search');
  axios.get(`https://api.github.com/search/repositories?q=${query}`)
       .then(data => {
         res = data.data.items;
       });
}

export function reducer(state: State = defaultState, action: IAction): State {
  switch (action.type) {
    case "SEARCH":
      search(action.query)

      return {
        data: res
      }
    default:
      console.log('reducers.ts: default case');
      return state;
  }
}