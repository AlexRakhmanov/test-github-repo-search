import { IAction } from './actions';
import axios from 'axios';

interface State {
  data: any
};

const defaultState: State = {
  data: []
};

async function search(query: string) {
  console.log('reducers.ts: search');
  const pr = await axios.get(`https://api.github.com/search/repositories?q=${query}`)
       .then(data => {
         return data.data.items;
       });

  return pr;
}

export function reducer(state: State = defaultState, action: IAction): State {
  switch (action.type) {
    case "SEARCH":
      return {
        data: search(action.query)
      }
    default:
      console.log('reducers.ts: default case');
      return state;
  }
}