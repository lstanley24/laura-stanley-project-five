import { Component, Fragment } from "react";

class Counter extends Component {
  render() {
    return (
      <Fragment>
        <form>
          <input type="number" 
          name="readingGoal" 
          id="readingGoal"
          min="0"
          onChange={this.props.enterGoal}
          
          />
        </form>

        <input
          type="submit"
          aria-label={"Click here to submit your reading goal"}
          aria-required="true"
          value="Add reading goal"
          id="addReadinGoal"
          onClick={this.props.goalSet}

        />

      </Fragment>



    )
  }

}




export default Counter