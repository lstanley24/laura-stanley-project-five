import { Component } from "react";

class Dismiss extends Component {
  render() {
    return (

      <button id="disagree" className="disagree" title="return to book list"
      onClick={this.props.onClick}>

        Oops, no thank you!

      
        </button>


    )
  }

}

export default Dismiss;