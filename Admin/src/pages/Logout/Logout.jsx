// // src/pages/Logout.jsx
// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Logout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/"); // redirect to homepage after 3 seconds
//     }, 7000);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
//       <h1 className="text-3xl font-bold text-gray-800 mb-2">
//         You are successfully logged out.
//       </h1>
//       <h3 className="text-xl text-gray-600 mb-4">
//         Thank you for visiting! Hope to see you again soon 😊
//       </h3>
//       <p className="text-sm text-gray-500">Redirecting to homepage...</p>
//     </div>
//   );
// };

// export default Logout;
