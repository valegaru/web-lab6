import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    birthdate: '',
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'users', uid), {
        username: formData.username,
        birthdate: formData.birthdate,
        email: formData.email,
        profileComplete: false,
      });

      navigate('/inicioSesion');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Correo" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <input name="username" placeholder="Nombre de usuario" onChange={handleChange} />
      <input name="birthdate" type="date" onChange={handleChange} />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;
