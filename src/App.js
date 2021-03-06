import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import Todo  from './Todo';
import db from './firebase';
import firebase from "firebase";


function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
   

    //when the app loads,  we need to listen to the database and fetch new todos as they get added/removed

    useEffect(() =>{
      //this code here... fires when the app.js loads
      db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>{
        //console.log(snapshot.docs.map(doc => doc.data()));
        setTodos(snapshot.docs.map(doc => ({id:doc.id ,todo: doc.data().todo})))
      })
     
    }, []);

    const addTodo = (event) => {
        event.preventDefault(); //will stop the refresh
        db.collection('todos').add({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

       
        setInput(""); ///clearing up the input after hitting input
    };

    return (
        <div className="App">
            <h1>hello world </h1>

            <FormControl>
                <InputLabel>Write a Todo</InputLabel>
                <Input value={input} onChange={(event) => setInput(event.target.value)} />
            </FormControl>

            <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
                Add Todo
            </Button>
        

            <ul>
                {todos.map((todo) => (
                   <Todo todo={todo} />
                  
               ))}
            </ul>
        </div>
    );
}

export default App;
