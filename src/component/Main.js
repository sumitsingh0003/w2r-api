import {React, useState} from "react"
import {useNavigate} from "react-router-dom" 
import axios from "axios";
import ThanksMsg from '../img/success.gif'


const Main = () => {
  const navigate = useNavigate()
  const [handleInput, setHandleInput] = useState({ username:"", password:""});
  const [state, setstate] = useState(false);

  const handleField = (e) =>{
    setHandleInput({...handleInput, [e.target.name]:e.target.value})
  }
  
  const submtForm = async (e) =>{
    e.preventDefault();
    const username = handleInput.username;
    const password = handleInput.password;

    try {
      const response = await axios.post('https://login-api.web2rise.in/api/login', {username, password});
      const token = response.data.token;
      if(token){
        setHandleInput({ username:"", password:""})
        localStorage.setItem('token',token)
        setstate(true)
        navigationPage()
      }
    } catch (error) {
      console.error(error); 
    }
  }

  const navigationPage = () => {
    setTimeout(() => {
      navigate('/all-users');
      setstate(true)
    }, 2000);
  };

  return (
    <>
      <section className="adminLogin h-100" style={{backgroundColor: "#9A616D"}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{borderRadius: "1rem"}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block" style={{overflow: "hidden"}}>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                      style={{borderRadius: "15px 0px 0px 15px"}}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form >
                        <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fa fa-cubes fa-2x me-3" aria-hidden="true"  style={{color: "#ff6219"}}></i>
                         
                          <span className="h1 fw-bold mb-0">Admin Login</span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{letterSpacing:"1px"}}
                        >
                          Login to your account
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            onChange={handleField}
                            name="username"
                            value={handleInput.username}
                          />
                          <label className="form-label" htmlFor="form2Example17">
                            Username
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            onChange={handleField}
                            name="password"
                            value={handleInput.password}
                          />
                          <label className="form-label" htmlFor="form2Example27">
                            Password
                          </label>
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={submtForm}
                          >
                            Login
                          </button>
                        </div>

                      {state ?
                        <div className="pt-1 mb-4">
                         <img src={ThanksMsg} alt="Thank you Mesg" />
                        </div>
                      : ''
                       }

                        {/* <Link to="small text-muted" href="#!">
                          Forgot password?
                        </Link>
                        <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>
                          Don't have an account?
                          <Link to="#!" style={{color: "#393f81"}}>
                            Register here
                          </Link>
                        </p>
                        <Link to="#!" className="small text-muted">
                          Terms of use.
                        </Link>
                        <Link to="#!" className="small text-muted">
                          Privacy policy
                        </Link> */}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
