import "./App.css";
import CustomRoutes from './CustomRoute'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App" >
        
      <Router>
        
       <CustomRoutes></CustomRoutes>
      </Router>
    </div>
  );
}

export default App;
