import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';

const InicioSesion = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			dispatch(login({ uid: userCredential.user.uid }));
			navigate('/dashboard');
		} catch (err) {
			console.error(err);
		}
	};

	const handleGoToRegistro = () => {
		navigate('/registro');
	};

	return (
		<form onSubmit={handleLogin}>
			<input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Correo' />
			<input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
			<button type='submit'>Iniciar sesión</button>
			<button type='button' onClick={handleGoToRegistro}>
				Registrarse
			</button>
		</form>
	);
};

export default InicioSesion;
