import { Component } from "react";

class Warning extends Component {
  render () {
    return (
      <i className="fas fa-recycle"
        aria-label="Click to remove book"
        onClick={this.props.onClick}
        title= "Click to remove book">
      </i>
    )
  }

}




export default Warning