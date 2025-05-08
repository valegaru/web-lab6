import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { db } from '../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const uid = useSelector(state => state.auth.uid);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!uid) return;

    const fetchProfile = async () => {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };

    fetchProfile();
  }, [uid]);

  if (!profile) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Bienvenido, {profile.username}</h2>
      <p>Correo: {profile.email}</p>
      <p>Fecha de nacimiento: {profile.birthdate}</p>
      {!profile.profileComplete && (
        <button onClick={() => navigate('/perfil')}>Completa tu perfil</button>
      )}
    </div>
  );
};

export default Dashboard;
