import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import Earning from "./pages/Earning";
function App() {
  return (
   <Router>
   <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/earning-predictor/:id" element={<Earning/>}/>
   </Routes>
   </Router>
  );
}

export default App;
