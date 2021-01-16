import {Component, Fragment} from "react";
import firebase from "./firebase.js"
import "./App.css";
import Form from "./Form.js";
import Delete from "./Delete.js";
import bookIcon from "./book-icon.png";
import Warning from "./Warning.js";
import Dismiss from "./Dismiss.js";
import Counter from "./Counter.js"

const bookKey = []

class App extends Component  {
  constructor () {
    super ();
    this.state = {
      // books: {
      //   name:
      //   popUp:false
      // },
      books: [],
      userInput: "",
      deleteWarning: false,
      readingGoal: 0
    }
  }

  componentDidMount() {

    //referencing firebase  
    const dbRef = firebase.database().ref();

    //getting the values from firebase
    dbRef.on("value", (data) => {

      let bookEntries = [];
      const firebaseData = data.val();

      // looping through the info in firebase and pushing the info into the new array (bookEntries)
      for (let key in firebaseData) {

        const propertyVal = firebaseData[key];
  
        const formattedDataObj = {
          id: key,
          ...propertyVal,
        };

        bookEntries.push(formattedDataObj);
  
      }

      this.setState({
        // updating state with the user's info that's stored in firebase. 
        books: bookEntries

      })
    })
  } 

  // handleChange method stores the info the user types into the text field
  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    }) 
  }

  //handleClick method submits the data to firebase
  handleClick = (event) => {

    //prevent default behaviour aka the page reloading
    event.preventDefault();

    //referencing firebase

    const dbRef = firebase.database().ref();

    //this book object pushes formats the info that needs to be push it to Firebase. When the checkbox is checked, "read:false" will be updated to "read:true"
    const book = {
      name: this.state.userInput,
      read: false
    }

    // error proofing to prevent user from submitting empty text field
    
    if (book.name === "") {
      alert("Don't forget to enter a book title!")
    } else dbRef.push(book)
   
    this.clearUserInput();

  }

  // this function ensures that the input=text field is cleared when the "add book" button is clicked. This function is called - this.ClearUserInput() - above. 

  clearUserInput = () => {
    document.getElementById('bookEntry').value='';

    this.setState({
      userInput: ""
      
    }) 

  }

  //these function ensures that the pop-up is not visible or visible 

  popUpDisplayHide = (bookid) => {
    bookKey.pop(bookid)

    this.setState ({
      deleteWarning: false
    })
  }

  
  popUpDisplayShow = (bookid) => {

    this.setState({
      deleteWarning: true
    })

    // this pushes the unique bookid (generated from firebase) into an empty array called bookKey. Which you click on the 

    bookKey.push(bookid)

    console.log(bookKey)


  }

  // this is a method for the delete button within the pop-up. Once the button is clicked, the item is removed from the page + firebase 

  removeBook = (bookid) => {

    const dbRef = firebase.database().ref();
    dbRef.child(bookKey[0]).remove()

    //this empties the array that the bookid is kept in so that if more books are added without the page refreshing etc., the app doesn't break
    bookKey.pop(bookid)

    // this hides the pop-up window and ensures that the pop-up window doesn't appear again once a new book is entered. 
    this.setState({
      deleteWarning: false
    })

  }


  // this is a method for the checkbox which marks the book as read (rather than deleting each book entry)
  completedBook = (book) => {
    const dbRef = firebase.database().ref(book.id);

    // once checked, in firebase, "read:false" is updated to "read:true"
    dbRef.update({
      name: book.name,
      read:!book.read // If it's true it's going to convert to false, if it's false it's going to convert to true. Thanks to Ana for this logic! This allows the checkbox to be checked and unchecked and firebase updates the read value accordingly.  
    })
  }


  // this grabs the number (of books) the user enters in the reading goal field and stores it locally (in state)

  goalEntry = (event) => {
    this.setState({
      readingGoal: event.target.value
    }) 

  }

  goalSet = (event) => {
    event.preventDefault();

  }


  render () {
    return (
      <div className="app">
        
          <header> 
            <div className="wrapper"> 
              <h1>youreads</h1>

                {/* importing form component and wow, props! */}
                <Form
                  userBook={this.handleChange}
                  bookInfo={this.value}
                  addBook={this.handleClick}
                />

       
                <div className="arrow">
                  <a href="#list-of-books" aria-label="Click to proceed to your list of books"><i className="fas fa-chevron-down"></i></a>
                </div>
            </div>  
          </header>
          <main>
            <section className="user-data">
              <div className="wrapper">
                {/* originally this list-of-books section was going to be its own component and yeah, it should be, for sure, but I ran out of time!   */}
                <div className="list-of-books" id="list-of-books">
                  <ul> 
                    {
                    // Object.keys(this.state.books).map((bookKey) => this.state.books[bookKey]);


                      this.state.books.map((book) => {
                        return (
                          <div className="book-list-container" key={book.id}>

                            {/* conditional to allow book list item be styled once marked (checked) as completed */}
                            <li className={(!book.read) ? "book-list":"book-list-container-read"}> 

                              <div className="checkbox-container">
                                    <div className={(!book.read) ? "far fa-square" : "fas fa-check-square"}/>
                                <input type="checkbox"
                                  onClick={() => {
                                    this.completedBook(book)
                                  }}
                                  id="book-read"
                                  aria-label="When book is finished, click to mark as complete"
                                  title= {`When ${book.name} is finished, click to mark as complete`}
                                />
                              </div>
                            
                              <span className="book-title"> {book.name} </span>
                            </li>

                            <Warning
                              onClick={() => { this.popUpDisplayShow(book.id) }}
                            />

                            <div className="delete-warning" id="delete-warning" style={{display: this.state.deleteWarning ? "flex" : "none"}}> 
                              <div className="pop-up">
                                <p>Are you sure you want to delete this book from your list?</p>
                                <figure>
                                  <img src={bookIcon} alt={"a stack of books"}/>
                                </figure>
                        
                                <div className="pop-up-buttons">
                                
                                  <Delete
                                    onClick={() => { this.removeBook(bookKey[0]) }}
                                 
                                  />

                                  <Dismiss 
                                    onClick={() => { this.popUpDisplayHide () }}
                                    title={`click to return to book list`}
                                  />

                                </div>
                              </div>
                            </div>
                          </div>
                        )

                      })

                    }
        
                  </ul>
                </div>
                {/* <Fragment>
                  <div className="goal-input">
                    <Counter
                      enterGoal={this.goalEntry} 
                      onClick={() => { this.addReadingGoal ()}}
                    />
                  </div>
                </Fragment> */}
              </div>
            </section> 
          </main>
        <footer><p>Created by Laura Stanley at Juno College</p></footer>
      </div>
    );
  }
}

export default App;