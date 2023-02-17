import { BrowserRouter, Routes, Route } from "react-router-dom";
import Buy from "./components/Pages/Buy";
import Home from "./components/Home";
import config from "./config/config";
import Presale from "./components/Presale";
import Login from "./components/Login";
function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={`${config.baseUrl}`} element={<Home />} />
                    <Route path={`${config.baseUrl}Buy`} element={<Buy />} />
                    <Route path={`${config.baseUrl}Presale`} element={<Presale />} />
                    <Route path={`${config.baseUrl}Login`} element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
