import { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hook/http-hook";
import UserList from "../components/UserList";
const Users = () => {
  const { isLoading, error, clearError, sendReq } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendReq("http://localhost:5000/api/users");
        setLoadedUser(responseData.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [sendReq]);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      {isLoading && <LoadingSpinner overlay />}
      {!isLoading && <UserList items={loadedUser} />}
    </>
  );
};
export default Users;
