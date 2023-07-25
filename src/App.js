import './App.css';
import {MemoryRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

function App() {
    return (
        <MemoryRouter initialEntries={["/day"]}>
            <AppRouter/>
        </MemoryRouter>
    );
}

export default App;
