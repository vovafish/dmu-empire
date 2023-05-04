import jwt from "jwt-decode";



export const RequireAuth = () => {
    //console.log("--Middleware--");
    const token = localStorage.getItem("jwt_authorization");
    //console.log(token);
    //const token = Cookies.get("jwt_authorization");
    if (token !== undefined && token !== null && token !== "") {
      const decoded = jwt(token);
      if (decoded.email) {
        return decoded;
      }
    }
}


// export default function requireAuth() {
//     navigate = useNavigate();
//      console.log('--Middleware--');
//     const token = localStorage.getItem("jwt_authorization");
//     //const token = Cookies.get("jwt_authorization");
//     const decoded = jwt(token);
//     if (!decoded.email) {
//         navigate(`/signIn`);
//     } else {
//       console.log(decoded);  
//     } 

//   if (!authenticated) {
//     replace("/signIn");
//   }
  //next();
// }
