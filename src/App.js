
import { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import './App.css';
import About from './components/About';
import Alert from "./components/Alert";
import Home from './components/Home';
import Login from "./components/Login";
import Navbar from './components/Navbar';
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";

function App() {

  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>

              <Route exact path="/about" element={<About />}></Route>
              <Route path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route path="/signup" element={<Signup showAlert={showAlert} />}></Route>

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
