import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Users from "./Users/pages/Users";
import AddPlace from "./places/pages/AddPlace";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";

function App() {
  return (
    <Router>
      <MainNavigation />
      <div className="text-blue-800 hidden">hello from test</div>
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/places/new" element={<AddPlace />} />
          <Route path="/:uId/places" element={<UserPlaces />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
