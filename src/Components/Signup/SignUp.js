import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import "./SignupPage.css";
import { Link,useNavigate} from "react-router-dom";

function SignUp() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLasttName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [correctCredential,setCorrectCredential]=useState(false);
  const navigate = useNavigate();
  const emailPattern = /^\S+@\S+\.\S+$/;

  function mailInput(e) {
    const mailSet = e.target.value;
    setMail(mailSet);
  }

  function passwordInput(e) {
    const passwordSet = e.target.value;
    setPassword(passwordSet);
  }

  function firstNameInput(e) {
    const firstNameSet = e.target.value;
    setFirstName(firstNameSet);
  }
  function lastNameInput(e) {
    const lastNameSet = e.target.value;
    setLasttName(lastNameSet);
  }

  async function handleSignup() {
    console.log("Function is called");
    if (!firstName) {
      setCorrectCredential(false);
      setErrorMessage("First name is required.");
      return;
    }
    if (!mail || !password) {
      setCorrectCredential(false);
      setErrorMessage("Email and Password are required.");
      return;
    }
    
    if (!emailPattern.test(mail)) {
      setCorrectCredential(false);
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "f104bi07c490",
          },
          body: JSON.stringify({
            name:`${firstName} ${lastName}`,
            email: mail,
            password: password,
            appType: "facebook",
          }),
        }
      );
      if (response.status === 403) {
        setCorrectCredential(false);
        setErrorMessage("Email is already registered. Please go and log in instead.");
      }
        else if (response.ok) {
        console.log("Succecfully SignUp");
        navigate("/");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setCorrectCredential(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }
 

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "day":
        setDay(value);
        break;
      case "month":
        setMonth(value);
        break;
      case "year":
        setYear(value);
        break;
      default:
        break;
    }
  };
  const handleRadioChange = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <div className="signup-Page">
      <div>
        <section className="headingSignup">
          <h1>facebook</h1>
        </section>

        <Box>
          <div className="signupBox">
            <section className="boxHeader">
              <h3>Create a New account</h3>
              <h5 id="signuph5">It's quick and easy</h5>
            </section>
            <Divider id="signupDivider" />
            <p className="errorDisplay" style={{display:correctCredential?"none":"",color:"red",textAlign:"center"}}>{errorMessage}</p>

            <section className="signupName">
              <input
                type="text"
                id="first-Name"
                value={firstName}
                onChange={firstNameInput}
                placeholder="First name"
              />
              <input
                type="text"
                id="last-Name"
                value={lastName}
                onChange={lastNameInput}
                placeholder="Last name"
              />
            </section>
            <section className="signupMail">
              <input
                type="email"
                id="signupEmail-address"
                value={mail}
                onChange={mailInput}
                placeholder="Email address"
              />
              
              <input
                type="password"
                id="signupNew-Password"
                value={password}
                onChange={passwordInput}
                placeholder="New password"
              />
              
            </section>
            <section className="signupDate">
              <h3 id="dateh3">Date of birth</h3>
              <section className="dateBtn">
                <select
                  name="day"
                  className="signupDOB"
                  value={day}
                  onChange={handleDropdownChange}
                >
                  <option value="1" selected="1">
                    1
                  </option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </select>
                <select
                  name="month"
                  className="signupDOB"
                  value={month}
                  onChange={handleDropdownChange}
                >
                  <option value="1" selected="1">
                    Jan
                  </option>
                  <option value="2">Feb</option>
                  <option value="3">Mar</option>
                  <option value="4">Apr</option>
                  <option value="5">May</option>
                  <option value="6">Jun</option>
                  <option value="7">Jul</option>
                  <option value="8">Aug</option>
                  <option value="9">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
                <select
                  name="year"
                  className="signupDOB"
                  value={year}
                  onChange={handleDropdownChange}
                >
                  <option value="2023" selected="1">
                    {" "}
                    2023
                  </option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                  <option value="2017">2017</option>
                  <option value="2016">2016</option>
                  <option value="2015">2015</option>
                  <option value="2014">2014</option>
                  <option value="2013">2013</option>
                  <option value="2012">2012</option>
                  <option value="2011">2011</option>
                  <option value="2010">2010</option>
                  <option value="2009">2009</option>
                  <option value="2008">2008</option>
                  <option value="2007">2007</option>
                  <option value="2006">2006</option>
                  <option value="2005">2005</option>
                  <option value="2004">2004</option>
                  <option value="2003">2003</option>
                  <option value="2002">2002</option>
                  <option value="2001">2001</option>
                  <option value="2000">2000</option>
                  <option value="1999">1999</option>
                  <option value="1998">1998</option>
                  <option value="1997">1997</option>
                  <option value="1996">1996</option>
                  <option value="1995">1995</option>
                  <option value="1994">1994</option>
                  <option value="1993">1993</option>
                  <option value="1992">1992</option>
                  <option value="1991">1991</option>
                  <option value="1990">1990</option>
                  <option value="1989">1989</option>
                  <option value="1988">1988</option>
                  <option value="1987">1987</option>
                  <option value="1986">1986</option>
                  <option value="1985">1985</option>
                  <option value="1984">1984</option>
                  <option value="1983">1983</option>
                  <option value="1982">1982</option>
                  <option value="1981">1981</option>
                  <option value="1980">1980</option>
                  <option value="1979">1979</option>
                  <option value="1978">1978</option>
                  <option value="1977">1977</option>
                  <option value="1976">1976</option>
                  <option value="1975">1975</option>
                  <option value="1974">1974</option>
                  <option value="1973">1973</option>
                  <option value="1972">1972</option>
                  <option value="1971">1971</option>
                  <option value="1970">1970</option>
                  <option value="1969">1969</option>
                  <option value="1968">1968</option>
                  <option value="1967">1967</option>
                  <option value="1966">1966</option>
                  <option value="1965">1965</option>
                  <option value="1964">1964</option>
                  <option value="1963">1963</option>
                  <option value="1962">1962</option>
                  <option value="1961">1961</option>
                  <option value="1960">1960</option>
                  <option value="1959">1959</option>
                  <option value="1958">1958</option>
                  <option value="1957">1957</option>
                  <option value="1956">1956</option>
                  <option value="1955">1955</option>
                  <option value="1954">1954</option>
                  <option value="1953">1953</option>
                  <option value="1952">1952</option>
                  <option value="1951">1951</option>
                  <option value="1950">1950</option>
                  <option value="1949">1949</option>
                  <option value="1948">1948</option>
                  <option value="1947">1947</option>
                  <option value="1946">1946</option>
                  <option value="1945">1945</option>
                  <option value="1944">1944</option>
                  <option value="1943">1943</option>
                  <option value="1942">1942</option>
                  <option value="1941">1941</option>
                  <option value="1940">1940</option>
                  <option value="1939">1939</option>
                  <option value="1938">1938</option>
                  <option value="1937">1937</option>
                  <option value="1936">1936</option>
                  <option value="1935">1935</option>
                  <option value="1934">1934</option>
                  <option value="1933">1933</option>
                  <option value="1932">1932</option>
                  <option value="1931">1931</option>
                  <option value="1930">1930</option>
                  <option value="1929">1929</option>
                  <option value="1928">1928</option>
                  <option value="1927">1927</option>
                  <option value="1926">1926</option>
                  <option value="1925">1925</option>
                  <option value="1924">1924</option>
                  <option value="1923">1923</option>
                  <option value="1922">1922</option>
                  <option value="1921">1921</option>
                  <option value="1920">1920</option>
                  <option value="1919">1919</option>
                  <option value="1918">1918</option>
                  <option value="1917">1917</option>
                  <option value="1916">1916</option>
                  <option value="1915">1915</option>
                  <option value="1914">1914</option>
                  <option value="1913">1913</option>
                  <option value="1912">1912</option>
                  <option value="1911">1911</option>
                  <option value="1910">1910</option>
                  <option value="1909">1909</option>
                  <option value="1908">1908</option>
                  <option value="1907">1907</option>
                  <option value="1906">1906</option>
                  <option value="1905">1905</option>
                </select>
              </section>
              <section className="signupRadio">
                <div className="signupRadioHeader">
                  <h3>Gender</h3>
                </div>
                <div className="signupRadioBtn">
                  <div className="radioInput">
                    <label htmlFor="femaleRadio">
                      <div className="signupClick">
                        <span>Female</span>
                        <input
                          type="radio"
                          id="femaleRadio"
                          checked={gender === "female"}
                          onChange={() => handleRadioChange("female")}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="radioInput">
                    <label htmlFor="maleRadio">
                      <div className="signupClick">
                        <span>Male</span>
                        <input
                          type="radio"
                          id="maleRadio"
                          checked={gender === "male"}
                          onChange={() => handleRadioChange("male")}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="radioInput">
                    <label htmlFor="customRadio">
                      <div className="signupClick">
                        <span>Custom</span>
                        <input
                          type="radio"
                          id="customRadio"
                          checked={gender === "custom"}
                          onChange={() => handleRadioChange("custom")}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </section>
              <section className="signupSpan">
                <span>
                  People who use our service may have uploaded your contact
                  information to Facebook
                </span>
                <span>
                  By clicking Sign Up, you agree to our Terms, Privacy Policy
                  and Cookies Policy. You may receive SMS notifications from us
                  and can opt out at any time.
                </span>
              </section>
              <section className="signupBtnSection">
                <button className="signupBtn" onClick={handleSignup}>Sign Up</button>
              </section>
            </section>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default SignUp;
