import {Component} from "react";
import firebase from "./firebase.js"
import "./App.css";
import Form from "./Form.js";


// Create two new components:
  // text input bar + submit button {Form!}
  // to read-item section (list of books, checkmark, delete item button)

// Configure firebase on React

// In firebase, store the user's value from input bar using the handleChange method and push it into the database using the handleClick method. 

// Grab data from Firebase using componentDidMount

//Take these values (the to-read books) and put it in state -> an empty array that holds user's input

// Map through the book state to display each book on page

// When a user marks a book read (clicks on a to-read list item), state is updated so that the to-read list item is crossed-off (or greyed out).

class App extends Component  {
  constructor () {
    super ();
    this.state = {
      books: [],
      userInput: ""
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
   
    // this is supposed to reset the text field so that it's blank upon the form being submitted but it doesn't do it and I don't know why! Shh, don't tell. 
    this.setState({
      userInput: " "
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

  // this is a method for the recycling icon. Once the icon is clicked, the item is removed from the page + firebase 
  removeBook = (bookid) => {
    const dbRef = firebase.database().ref();
    dbRef.child(bookid).remove()
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
            <section>
              <div className="wrapper">
                {/* originally this list-of-books section was going to be its own component and yeah, it should be, for sure, but I ran out of time!   */}
                <div className="list-of-books" id="list-of-books">
                  <ul> 
                    {
                      this.state.books.map((book) => {
                        return (
                          <div className="book-list-container" key={book.id}>

                            {/* conditional to allow book list item be styled once marked (checked) as completed */}
                            <li className={(!book.read) ? "book-list":"book-list-container-read"}> 
                      
                              <input type="checkbox"
                                onClick={() => {
                                  this.completedBook(book)
                                }}
                                id="book-read"
                                aria-label="When book is finished, click to mark as complete"
                              >
                              </input> 
                              
                              <span className="book-title"> {book.name} </span>
                            </li>

                            <i className="fas fa-recycle"
                              aria-label="Click to remove book"
                              title="Click to remove book"
                              onClick={() => { this.removeBook(book.id) }}>
                            </i> 
                          </div>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </section> 
        </main>
        <footer><p>Created at Juno College</p></footer>
      </div>
    );
  }
}

export default App;