import { useSelector } from 'react-redux';

const useUser = () => useSelector((store) => store.userReducer);

export default useUser;
