import { Action } from 'redux';

export interface IAction extends Action {
  query: string;
}

export function search(query: string): IAction {
  return {
    type: "SEARCH",
    query
  };
}
