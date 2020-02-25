import React, { Component } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utility/AxiosWithAuth";

class BubblePage extends Component {
  state = {
    colorList: []
  }
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  componentDidMount(){
    this.getBubbles();
  }

  getBubbles = () =>{
    axiosWithAuth()
      .get('/api/colors')
      .then(res =>{
        this.setState({
          colorList: res.data
        });
      });
  } 


  render(){
    return (
      <>
        <ColorList colors={this.state.colorList} updateColors={this.setState.bind(this)} getColors={this.getBubbles.bind(this)} />
        <Bubbles colors={this.state.colorList} />
      </>
    );
  }
}

export default BubblePage;
