import './App.css';
import React, {Component} from "react";
const host = "http://localhost:9001";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {response: ""}
  }
  callAPI(){
    fetch(host+"/").then(res => res.text()).then(res => this.setState({response: res})).catch(err => err);
  }
  componentDidMount() {
    this.callAPI();
  }
  render(){
    return(<div className="App"><p>{this.state.response}</p></div>);
  }
}

export default App;
