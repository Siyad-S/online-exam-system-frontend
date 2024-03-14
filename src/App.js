import { Route, Routes } from "react-router-dom";
import "./App.css";
import Question from "./components/Question/Question";
import User from "./components/User/User";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/question" element={<Question />} />
      </Routes>
    </div>
  );
}

export default App;
