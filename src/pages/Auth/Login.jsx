// import { use } from "react";
// import { Link, useLocation, useNavigate } from "react-router";
// import { AuthContext } from "../../context/AuthContext";
// import { FaGoogle } from "react-icons/fa";

// const Login = () => {
//   const { signInUser, signInWithGoogle } = use(AuthContext);

//   const location = useLocation();
//   const navigate = useNavigate();
//   console.log(location);

//   const handleLogIn = (event) => {
//     event.preventDefault();
//     const email = event.target.email.value;
//     const password = event.target.password.value;

//     console.log(email, password);
//     signInUser(email, password)
//       .then((result) => {
//         console.log(result.user);
//         event.target.reset();
//         navigate(location.state || "/");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleGoogleSignIn = () => {
//     signInWithGoogle()
//       .then((result) => {
//         console.log(result.user);
//         navigate(location?.state || "/");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="card bg-base-100  w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
//       <div className="card-body">
//         <h1 className="text-3xl font-bold text-center">Login</h1>
//         <form onSubmit={handleLogIn}>
//           <fieldset className="fieldset">
   
//             <label className="label">Email</label>
//             <input
//               type="email"
//               name="email"
//               className="input focus:border-0 focus:outline-gray-200"
//               placeholder="Email"
//             />

//             <label className="label">Password</label>
//             <input
//               type="password"
//               name="password"
//                className="input  focus:border-0 focus:outline-gray-200"
//               placeholder="Password"
//             />
//             <div>
//               <a className="link link-hover">Forgot password?</a>
//             </div>
//             <button className="btn btn-sm text-right  bg-linear-to-r from-green-500 to-green-800 text-white">
//               Login
//             </button>
//           </fieldset>
//         </form>

//         <button
//           onClick={handleGoogleSignIn}
//           className="btn btn-sm text-right  bg-linear-to-r from-green-500 to-green-800 text-white"
//         >
//           <FaGoogle />
//           Login with Google
//         </button>
//         <p className="text-center">
//           Don't have any account? Please  <Link
//             className="text-blue-500 hover:text-blue-800"
//             to="/auth/register"
//           >
//              Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful!");
        event.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.error(error);
        if (error.code === "user-not-found") {
          toast.error("No user found with this email");
        } else if (error.code === "wrong-password") {
          toast.error("Incorrect password");
        } else {
          toast.error("Login failed. Please try again.");
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        toast.success("Google sign-in successful!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google sign-in failed. Please try again.");
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogIn}>
          <fieldset className="fieldset">
            <label className="label text-black">Email</label>
            <input
              type="email"
              name="email"
              className="input focus:border-0 focus:outline-gray-200"
              placeholder="Email"
              required
            />

            <label className="label text-black">Password</label>
            <input
              type="password"
              name="password"
              className="input focus:border-0 focus:outline-gray-200"
              placeholder="Password"
              required
            />

            <div>
              <a className="link link-hover text-black cursor-not-allowed">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-sm text-right  bg-linear-to-r from-green-500 to-green-800 text-white"
            >
              Login
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn btn-sm text-right  bg-linear-to-r from-green-500 to-green-800 text-white"
        >
          <FaGoogle />
          Login with Google
        </button>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link className="text-blue-500 hover:text-blue-800" to="/auth/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

