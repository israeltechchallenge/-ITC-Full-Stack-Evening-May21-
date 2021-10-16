import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./components/notes/Notes";
import NoteState from "./context/notes/notesState";

function App() {
  return (
    <NoteState>
      <Router>
        <Switch>
          <Route exact path="/" component={Notes} />
        </Switch>
      </Router>
    </NoteState>
  );
}

export default App;
