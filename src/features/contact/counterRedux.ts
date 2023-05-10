export const INCREMENT_COUNTER="INCREMENT_COUNTER";
export const DECREASE_COUNTER="DECREASE_COUNTER";

export interface CounterState {
  data: number;
  title:string;
}

const initialState: CounterState = {
  data: 42,
  title:'Orther redux state'
};

export default function counterReducer(state = initialState, action: any) {
  return state;
}
