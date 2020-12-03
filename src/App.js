import {Component} from "react";
import firebase from "./firebase.js"
import "./App.css";
import Form from "./Form.js";

class App extends Component  {
  constructor () {
    super ();
    this.state = {
      books: [],
      userInput: ""
    }
  }
  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.on("value", (data) => {

      let bookEntries = [];

      const firebaseData = data.val();

      for (let key in firebaseData) {

        const propertyVal = firebaseData[key];
  
        const formattedDataObj = {
          id: key,
          ...propertyVal,
        };
        bookEntries.push(formattedDataObj);
      
      }
      this.setState({
        books: bookEntries
      })
    })
  } 

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })

  }

  handleClick = (event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();

    const book = {
      name: this.state.userInput,
      read: false
    }

    // error proofing to prevent user from submitting empty text field
    
    if (book.name === "") {
      alert("Don't forget to enter a book title!")
    } else dbRef.push(book)
   
    this.setState({
      userInput: ""
    }) 
    
  }

  completedBook = (book) => {
  
    const dbRef = firebase.database().ref(book.id);

      dbRef.update({
        name: book.name,
        read:!book.read // If it's true it's going to convert to false, if it's false it's going to convert to true

      })

  }

  removeBook = (bookid) => {
    const dbRef = firebase.database().ref();

    dbRef.child(bookid).remove()

  }

  render () {
    return (
      <div className="app">
        <header> 
          <h1>youreads</h1>
          <div className="input-text-bar">
          <Form
            userBook={this.handleChange}
            bookInfo={this.value}
            addBook={this.handleClick}

          />
            
          </div>
          <div className="arrow">
            <a href="#list-of-books" aria-label="Click to proceed to your list of books"><i className="fas fa-chevron-down"></i></a>
          </div>
        </header>
        <main>
          <section>

            <div className="list-of-books" id="list-of-books">

              <ul> 
                {
                  this.state.books.map((book) => {
                    return (
                      <div className="book-list-container">

                        <li className={(!book.read) ? "book-list":"book-list-container-read"}key={book.id}>
                          
                        
                          <input type="checkbox"
                            onClick={() => {
                              this.completedBook(book)
                            }}
                            id="book-read"
                            aria-label="When book is finished, click to mark as complete"
                            
                          >
                          </input> 
                          
                          {book.name}

                          <i className="fas fa-recycle"
                            aria-label="Click to remove book"
                            title="Click to remove book"
                            onClick={() => { this.removeBook(book.id) }}>
                          </i> 
                        </li>
                      </div>
                    )
                  })
                }
              </ul>
            </div>
          </section>
        </main>
        <footer><p>Created at Juno College</p></footer>
      </div>
    );

  }
  
}

export default App;


// Create two new components:
  // text input bar + submit button {Form!}
  // to read-item section (list of books, checkmark, delete item button)

// Configure firebase on React

// In firebase, store the user's value from input bar using the handleChange method and push it into the database using the handleClick method. 

// Grab data from Firebase using componentDidMount

//Take these values (the to-read books) and put it in state -> an empty array that holds user's input

// Map through the book state to display each book on page

// When a user marks a book read (clicks on a to-read list item), state is updated so that the to-read list item is crossed-off (or greyed out).