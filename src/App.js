import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Devices from "./pages/Devices";
import Historic from "./pages/Historic";
import Live from "./pages/Live";
import NotFound from "./pages/NotFound";
import Navbar from "./components/navbar";
import './index.css';


function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Devices />} />
            <Route path="/historic" element={<Historic />} />
            <Route path="/live" element={<Live />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
  
}

export default App;
