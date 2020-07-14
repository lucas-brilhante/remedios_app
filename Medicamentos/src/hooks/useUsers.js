import { useSelector } from "react-redux";

const useUsers = () => useSelector((store) => store.userReducer);

export default useUsers;
