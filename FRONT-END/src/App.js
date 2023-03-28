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
import { useAuth } from "./shared/hook/auth-hook";
import "./App.css";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

function App() {
  const { isLoading, user, login, logout } = useAuth();
  let route;
  if (!!user.token) {
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
  if (isLoading) {
    return <LoadingSpinner overlay />;
  }
  return (
    <authContext.Provider
      value={{ isLoggedIn: !!user.token, logout, login, user }}
    >
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
