import React, { useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, FirebaseContext } from '../../store/firebaseContext'; // Import useAuth and FirebaseContext
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import Logo from '../../olx-logo.png';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const { auth, db } = useContext(FirebaseContext); // Use FirebaseContext to access auth and db
  const { setUser } = useAuth(); // Access setUser from AuthContext
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create user
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", result.user);

      // Update user profile
      await updateProfile(result.user, { displayName: username });
      console.log("User profile updated");

      // Add user to Firestore
      await addDoc(collection(db, 'users'), {
        id: result.user.uid,
        username: username,
        phone: phone
      });
      console.log("User added to Firestore");

      // Set user state
      setUser(result.user); // Ensure this is defined in AuthContext

      // Redirect to login
      navigate('/login');
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}

export default Signup;
