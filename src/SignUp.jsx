import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  // toggle popup
  const [show, setShow] = useState(false);
  // toggle between the login and signup page
  const [isSignup, setIsSignup] = useState(false);
  // toggle to show and hide password
  const [visible, setVisible] = useState(false);
  // error handler
  const [error, setError] = useState("");
  // success message
  const [success, setSuccess] = useState("");
  // handle Checked
  const [isChecked, setIsChecked] = useState(false);
  
  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  // form input states
  const [formvalue, setFormvalue] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
  });
  // destructring formvalues

  const { username, email, password, contact } = formvalue;

  // handle Change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formvalue, [name]: value });
  };

  // handleSubmit

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      if (!username || !email || !password || !contact) {
        setError("*please enter all the required feilds");
        setSuccess("");
      } else {
        setError("");
        setFormvalue({ username: "", email: "", password: "", contact: "" });
        setSuccess("signup successfull");
      }
    } else {
      if (!username || !password) {
        setError("*please enter login details");
        setSuccess("");
      } else if (username != "saikumar") {
        setError("please enter correct username");
        setSuccess("");
      } else if (password !== "sai@123") {
        setError("please enter valid password");
        setSuccess("");
      } else if (!isChecked) {
        setError("please check the box");
        setSuccess("");
      } else {
        setError("");
        setSuccess("Login successfull");
        setFormvalue({ username: "", password: "" });
      }
    }
  };

  // phone number validation 
  const handleKeyPress = (event) => {
    const keyCode = event.which || event.keyCode;
    // Allow only numeric keys (0-9)
    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
      setError("please input only numbers");
    } else {
      setError("");
    }
  };

  return (
    <Wrapper>
      {!show && (
        <button onClick={() => setShow(!show)} className="auth-btn">
          Authentication
        </button>
      )}
      {show && (
        <>
          <section className="auth">
            <div className="toggle-btns">
              <button
                onClick={() => setIsSignup(false)}
                className={!isSignup ? "switch" : ""}
              >
                Login
              </button>
              <button
                onClick={() => setIsSignup(true)}
                className={isSignup ? "switch" : ""}
              >
                Signup
              </button>
            </div>
            <p style={{ color: "green" }}>{success}</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Full name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="enter your userName"
                />
              </div>
              {isSignup && (
                <div>
                  <label>
                    Email<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="enter your Email here"
                  />
                </div>
              )}
              <div className="password">
                <label>
                  Enter Password<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="enter your password"
                />
                <span className="show-pass">
                  {!visible ? (
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => setVisible(true)}
                      style={{color:"green"}}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      onClick={() => setVisible(false)}
                      style={{color:"green"}}
                    />
                  )}
                </span>
              </div>
              {!isSignup && (
                <>
                  <section className="terms">
                    <div className="remember">
                      <div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleChecked}
                        />
                      </div>
                      <p>Remember me</p>
                    </div>

                    <p style={{ color: "gray" }}>Forget Password?</p>
                  </section>
                </>
              )}
              {isSignup && (
                <div>
                  <label>
                    Contact<span style={{ color: "red" }}>*</span>
                  </label>
                  <span className="country-code">+91</span>
                  <input
                    type="tel"
                    name="contact"
                    minLength={10}
                    maxLength={10}
                    value={contact}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="enter your contact number"
                  />
                </div>
              )}
              <span style={{ color: "red" }}>{error}</span>
              <section className="submit-btns">
                {isSignup ? (
                  <>
                    <button onClick={() => setShow(false)}>
                      <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                    <button type="submit">SAVE&VERIFY</button>
                  </>
                ) : (
                  <button style={{ width: "100%" }} onClick={handleSubmit}>
                    Login
                  </button>
                )}
              </section>
              {!isSignup && (
                <div className="no-account">
                  <p>
                    Dont have an account?{" "}
                    <a href="#" onClick={() => setIsSignup(true)}>
                      regester here.
                    </a>
                  </p>
                </div>
              )}
            </form>
            {show && (
              <FontAwesomeIcon
                className="close"
                icon={faXmark}
                onClick={() => setShow(false)}
              />
            )}
          </section>
        </>
      )}

      <div>
        <h2>User Details</h2>
        <p>
          <strong>Username:</strong> saikumar
        </p>
        <p>
          <strong>Password:</strong> sai@123
        </p>
      </div>
    </Wrapper>
  );
}

// CSS
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  gap: 1rem;
  .auth-btn {
    background-color: #1982d9;
    color: white;
    border-radius: 5px;
    padding: 10px 20px;
  }
  .auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: relative;
    box-shadow: 0 0 2px gray;
    padding: 1rem;

    .toggle-btns {
      display: flex;
      justify-content: center;
      gap: 2rem;
      button {
        background-color: white;
        font-size: 2rem;
        position: relative;
      }
      .switch {
        ::after {
          position: absolute;
          content: "";
          left: 0;
          bottom: 0;
          width: 100%;
          box-shadow: 0 1px 4px green;
          height: 1px;
          background-color: green;
        }
      }
    }

    form {
      width: min(70vw, 500px);

      div {
        display: flex;
        flex-direction: column;
        position: relative;
        /* show password */
        .show-pass {
          position: absolute;
          top: 50%;
          right: 0;
        }
        /* country code */
        .country-code {
          position: absolute;
          top: 50%;
          left: 0;
          ::after {
            content: "";
            position: absolute;
            top: 0;
            right: -5px;
            height: 100%;
            width: 2px;
            background-color: black;
          }
        }
        input {
          width: 100%;
          height: 40px;
          padding-left: 2rem;
        }
      }
      .submit-btns {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        button {
          background-color: #1982d9;
          color: white;
          border-radius: 5px;
          padding: 10px 20px;
        }
      }

      /* login */
      .terms {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .remember {
          /* width: 100%; */
          display: flex;
          align-items: flex-start;
          justify-content: space-evenly;
        }
      }

      /* no account */
      .no-account {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .close {
    position: absolute;
    top: 0;
    font-size: 2rem;
    left: 96%;
  }
`;

export default SignUp;
