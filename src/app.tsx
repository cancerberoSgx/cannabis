import * as React from 'react'
import { Example, examples } from './main';

interface P {
  examples: Example[];
}
interface S {
  selectedExample?: string;
}
export class App extends React.Component<P, S> {
  render() {
    return (<div>
      Examples:
      <select onChange={e => {
        this.setState({ selectedExample: e.currentTarget.selectedOptions[0].value });
      }}>{examples.map(example => {
        <option value={example.query} selected={example.query === this.state.selectedExample}>{example.query}</option>;
      })}</select>
      <button onClick={e => {
      }}></button>
    </div>);
  }
}
