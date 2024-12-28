import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Table from "./component/Table";
import PilotCalendar from "./component/PilotCalendar";
import FlightManager from "./component/FlightManager";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/table/:id" element={<Table/>} />
        <Route path="/pilot" element={<PilotCalendar/>} />
        <Route path="/manager" element={<FlightManager/>} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);