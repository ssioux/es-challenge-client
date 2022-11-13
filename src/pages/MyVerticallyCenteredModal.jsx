// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";

// import { useState } from "react";
// import { loginService } from "../services/auth.services";
// import { useNavigate } from "react-router-dom";

// import { useContext } from "react";
// import { AuthContext } from "../context/auth.context";

// function MyVerticallyCenteredModal(props) {
//   const { authenticateUser } = useContext(AuthContext);

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePasswordChange = (e) => setPassword(e.target.value);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // 1. To take credential user info.
//     const userInfo = {
//       email: email,
//       password: password,
//     };

//     try {
//       // 2. Contact BE To validate it
//       const response = await loginService(userInfo);

//       // 3. Token received so we save it into localStorage
//       localStorage.setItem("authToken", response.data.authToken);

//       authenticateUser(); // invokoe to validate user
//       navigate("/profile");
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         setErrorMessage(error.response.data.errorMessage);
//       } else {
//         navigate("/error");
//       }
//     }

//     return (
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Login Form
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>


//           <Form>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="name@example.com"
//                 autoFocus
//               />
//             </Form.Group>
//             <Form.Group
//               className="mb-3"
//               controlId="exampleForm.ControlTextarea1"
//             >
//               <Form.Label>Example textarea</Form.Label>
//               <Form.Control as="textarea" rows={3} />
//             </Form.Group>
//           </Form>



//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={props.onHide}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   };
// }

// export default MyVerticallyCenteredModal;
