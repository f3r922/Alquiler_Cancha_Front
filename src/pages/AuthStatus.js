import { useNavigate } from "react-router-dom";


export const AuthStatus = () => {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={()=>  navigate("/")}>
        Entrar
      </button>
    </>
  );
};
