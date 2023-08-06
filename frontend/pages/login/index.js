import { UserProvider } from '../../context/userContext';
import Login from '../../src/app/pages/login/Login'

const LoginPage = () => {
  return (
    <UserProvider>
      <Login/>
    </UserProvider>
      
  );
};

export default LoginPage;
