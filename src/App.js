import { Route, Routes } from "react-router-dom";
import "./App.css";
import Question from "./components/Question/Question";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/question" element={<Question />} />
      </Routes>
    </div>
  );
}

export default App;
