import { IAction } from './actions';
import axios from 'axios';

interface State {
  data: object[]
};

const defaultState: State = {
  data: []
};

async function search(query: string) {
  return await axios.get(`https://api.github.com/search/repositories?q=${query}`)
                    .then(data => {
                      return data.data.items;
                    })
}

export function reducer(state: State = defaultState, action: IAction): State {
  switch (action.type) {
    case "SEARCH":
      let res: object[] = [];
      search(action.query).then(data => res = data);

      return {
        data: res
      }
    default:
      return state;
  }
}