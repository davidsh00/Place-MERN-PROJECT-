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
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./Users/pages/Auth";
import { authContext } from "./shared/context/auth-context";

import "./App.css";
import { useCallback, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const login = useCallback((user) => {
    setIsLoggedIn(true);
    setUser({ id: user.id, name: user.name, email: user.email });
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser({ id: null, email: null, name: null });
  }, []);

  let route;
  if (isLoggedIn) {
    route = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/places/new" element={<AddPlace />} />
        <Route path="/places/:pId" element={<UpdatePlace />} />
        <Route path="/:uId/places" element={<UserPlaces />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  } else {
    route = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:uId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </>
    );
  }
  return (
    <authContext.Provider value={{ isLoggedIn, logout, login, user }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>{route}</Routes>
        </main>
      </Router>
    </authContext.Provider>
  );
}

export default App;
