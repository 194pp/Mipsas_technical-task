import {createStore} from 'redux';
import {defaultOwner, defaultRepo} from "../configs/configs";

export type ownRepType = {
  owner: string,
  repo: string,
  availableRepos: string[],
  issues: string[],
}

const initialState: ownRepType = {
  owner: defaultOwner || "",
  repo: defaultRepo || "",
  availableRepos: [],
  issues: [],
}

function ownerRepoReducer (state = initialState, action: { type: string; payload: any; }) {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        ...action.payload,
      };
    case 'clear':
      if (!!state.repo) {
        return {
          ...state,
          repo: '',
        };
      } else {
        return {
          ...state,
          owner: '',
          repo: '',
          availableRepos: [],
          issues: [],
        };
      }
    case 'fetchRepos':
      return {
        ...state,
        availableRepos: action.payload.availableRepos,
      };
    case 'fetchIssues':
      return {
        ...state,
        issues: action.payload,
      }
    case 'fetchExtraIssues':
      return {
        ...state,
        issues: [...state.issues, ...action.payload],
      }
    default: return state;
  }
}

const index = createStore(ownerRepoReducer);

export default index;
