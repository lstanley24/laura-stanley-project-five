import { Component } from "react";



class Delete extends Component {

  render() {
    return (
      <button id="agree" className="agree" title="Click to permanently delete book"
        onClick={this.props.onClick}>
        Yes please!
      </button>

    )
  }

}

export default Delete;