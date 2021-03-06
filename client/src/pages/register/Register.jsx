import axios from "axios";
import { useRef ,useState} from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [text, setText]=useState("");

  /* avant d'envoyer les données on doit tout d'abord verifier 
  que les mots de passes inserer sont bien identique */
  const handleClick = async (e) => {
    e.preventDefault();

    
      /* dans le cas ou tout les elements sont bien
      inserer il faudra cree une variable user qui possedera les attributs cree  */
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      /* puis on utilise un post pour inscrire l'utilisateur puis on utilise 
      le hook history qui  nous permet de rediriger l'utilisateur vers la page de login */
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        if(err.response.status==402){
          setText("Les mots de passe sont differents");
          passwordAgain.current.setCustomValidity("Passwords don't match!");
        }else if(err.response.status==401){
          setText("Login deja pris");
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
              <img src={PF+"birdyRBG.png"} className="logo" alt="Birdy"/>
            </div>

            <form onSubmit={handleClick}>
              <span className="login100-form-title">
                Inscription
              </span>

              <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                <input className="input100" type="email" ref={email} name="email" placeholder="Email"/>
                <span className="focus-input100"></span>
               
              </div>
              
              <div className="wrap-input100 validate-input">
                <input className="input100" type="text" ref={username} name="Login" placeholder="@Login"/>
                <span className="focus-input100"></span>
               
              </div>

              <div className="wrap-input100 validate-input" data-validate = "Saisir un mot de passe">
                <input className="input100" type="password" ref={password} name="pass" placeholder="Mot de passe"/>
                <span className="focus-input100"></span>
                
              </div>
              <div className="wrap-input100 validate-input" data-validate = "Saisir un mot de passe">
                <input className="input100" type="password" ref={passwordAgain} name="pass" placeholder="Confirmer le mot de passe"/>
                <span className="focus-input100"></span>
                
              </div>
              <div>
                <p className="error-message">{text}</p>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" type="submit">
                  Incription
                </button>
              </div>

             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
