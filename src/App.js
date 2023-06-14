import './App.css';
import {BrowserRouter, useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
