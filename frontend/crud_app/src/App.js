import "./App.css";
import Authenticate from "./pages/authenticate";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import the apges
function App() {
    return (
        <Router>
            <div className="main">
                <div>
                    <Routes>
                        <Route
                            exact
                            path="/auth"
                            element={<Authenticate />}
                        ></Route>
                        <Route exact path="/home" element={<Home />}></Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
