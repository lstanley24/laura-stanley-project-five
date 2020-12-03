import { Component } from "react";

class Form extends Component {
    render () {
        return ( 
            <div className= "input-text-bar">
                <form> 
                    <fieldset>
                        <label htmlFor="bookEntry">Enter the title of a book you want to read</label>
                        <div> 
                            <input 
                                type="text" 
                                id="bookEntry" 
                                placeholder="Moby Dick"
                                onChange={this.props.userBook}
                                value={this.props.bookInfo}
                            />

                        </div>
                        <div className="submit-button"> 
                            <input 
                                type="submit"
                                aria-label={"Click here to add your book"}
                                aria-required="True"
                                value="Add Book"
                                id="addBook"
                                onClick={this.props.addBook}
                            />

                        </div>
                    </fieldset>
                </form>
            </div>

        )
    }

}









export default Form;