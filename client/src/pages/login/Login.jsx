import axios from "axios";
import { useContext, useRef,useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function Login() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //useRef est un hooks que l'on utilise pour recuperer l'email et le mps du formulaire
  const email = useRef();
  const password = useRef();
  const history = useHistory();
  const [text, setText] = useState("");

  /* on utilise ce hook de useContexte pour utiliser le dispatche de AuthContext dans l'appel de login call */
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
    setText("");
    /* dans le cas ou tout les elements sont bien
    inserer il faudra cree une variable user qui possedera les attributs cree  */
    const email_val = (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.current.value) ? email.current.value : "");
    const login_val = (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.current.value) ? email.current.value : "");
    
    const user = {
      login: login_val,
      email: email_val,
      password: password.current.value,
    };
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    
    try {
      await axios.post("/api/user/login", user);
      history.push("/");
    } catch (err) {
      if(err.response.status==400)
      {
        setText("Login ou mot de passe necessaire");
      }else if(err.response.status==401){
        setText("Utilisateur inconnu");
      }else if(err.response.status==405){
        setText("Login ou mot de passe invalide");
      }else{
          setText("Erreur interne");
      }
    }
  };

  return (
    <div className='bg-model'>
        
      <div>
        <div className="container-login100">
          <div className="wrap-login100">
            <div>
              <img src={PF+"birdyRBG.png"} alt="Birdy" className="logo"/>
            </div>

            <form onSubmit={handleClick}>
              <span className="login100-form-title">
                Connexion
              </span>

              <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                <input className="input100" required type="email" ref={email} name="email" placeholder="Email"/>
                <span className="focus-input100"></span>
               
              </div>

              <div className="wrap-input100 validate-input" data-validate = "Password is required">
                <input className="input100" required ref={password} type="password" name="pass" placeholder="Mot de passe"/>
                <span className="focus-input100"></span>
                
              </div>
              {/* ici on effectue une verification si la recherche est en cours si c'est le cas le bouton sera
            desactiver et l'icone de chargement sera afficher dans le cas contraire on aura
            notre simple bouton de log in*/}
              <div>
                <p className="error-message" >{text}</p>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" type="submit" disabled={isFetching}>
                  {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                    ) : (
                  "Connexion"
                    )}
                </button>
              </div>

              

              <div>
                <Link className="txt2" to='./register' style={{ textDecoration: "none"  }}>
                  <button className="logRegisterButton">
                    {isFetching ? (
                      <CircularProgress color="white" size="20px" />
                    ) : (
                      "Inscription"
                    )}
                  </button>
                  
                </Link>
              </div>
              
              <div >
                
                <Link className="txt2" to="#">
                  Mot de passe oublie?
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
