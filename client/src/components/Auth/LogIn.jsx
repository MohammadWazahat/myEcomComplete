import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.name);
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const [tok, setTok] = useState();
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3015/users/logIn/", values)
      .then((res) => {
        // console.log(res.data.token);
        console.log(res);
        const token = res.data.token;
        // console.log(token);
        localStorage.setItem("tks", JSON.stringify(token));

        navigate("/");
      })
      .catch((err) => console.log(err));
    setTok(true);
  };

  // console.log(tok);
  return (
    <div>
      <div className="">
        <div className="flex justify-end m-8 gap-4 ">
          <div className="border border-gray-700 rounded flex p-2 mt-8">
            <Link to="/">Go To Dashboard</Link>
          </div>
          <div className="border border-gray-700 rounded flex p-2 mt-8">
            <Link to="/adminGetAllProducts" className="">
              Admin Panel
            </Link>
          </div>
        </div>
        <div>
          <div>
            <section className="">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="brd p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form
                      onSubmit={submitForm}
                      className="space-y-4 md:space-y-6"
                    >
                      <div>
                        <label
                          htmlFor="username"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Enter username
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="@robert123"
                          onChange={handleChange}
                          required=""
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={handleChange}
                          required=""
                        />
                      </div>

                      <button type="submit" className="buttonTwo w-full p-2 ">
                        Log In
                      </button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Not a User?{" "}
                        <Link
                          to="/signUp"
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          SignUp here
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center text-red-800 text-2xl mb-32">
            {tok == undefined ? (
              <div>Please Log In</div>
            ) : (
              <div className="flex flex-col gap-2 justify-center items-center">
                <div>User Don't Exist</div>
                <div className="text-lg">
                  Please{" "}
                  <Link
                    to="/signUp"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    SignUp here
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
