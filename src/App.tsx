//import React from 'react';
import { useEffect, useState } from "react";


import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { uploadData } from 'aws-amplify/storage';

//authentication
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [file, setFile] = useState(null);  

  const handleChange = (event: any) => {
    console.log(event);
    setFile(event.target.files[0]);
    console.log(file);
    if(file){
    console.log(file.name);}
  };

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
    
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
        
    <Authenticator>
      {({ signOut }) => (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      
      <ul>
        {todos.map((todo) => (
          <li
          onClick={() => deleteTodo(todo.id)}
           key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <div>
      <input type="file" onChange={handleChange} />
        <button
          onClick={() =>
            uploadData({
              path: `picture-submissions/${file.name}`,
              data: file,
          })
        }
      >
        Upload
      </button>
    </div>
       <button onClick={signOut}>Sign out</button>
    </main>
        
      )}
      </Authenticator>
  );
}

export default App;
