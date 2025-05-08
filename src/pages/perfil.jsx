import { useSelector } from 'react-redux';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const uid = useSelector(state => state.auth.uid);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    avatar: '',
    bio: '',
    interests: [],
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = e => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter(i => i !== value),
    }));
  };

  const handleSubmit = async () => {
    await updateDoc(doc(db, 'users', uid), {
      ...formData,
      profileComplete: true,
    });
    navigate('/dashboard');
  };

  return (
    <div>
      <h3>Completa tu perfil</h3>
      <label>Avatar:</label>
      <select name="avatar" onChange={handleChange}>
        <option value="👩">👩</option>
        <option value="👨">👨</option>
        <option value="🧑‍🎨">🧑‍🎨</option>
      </select>

      <textarea name="bio" onChange={handleChange} placeholder="Descripción personal" />

      <label>Intereses:</label>
      <label><input type="checkbox" value="arte" onChange={handleCheckbox} /> Arte</label>
      <label><input type="checkbox" value="ciencia" onChange={handleCheckbox} /> Ciencia</label>
      <label><input type="checkbox" value="juegos" onChange={handleCheckbox} /> Juegos</label>
      <label><input type="checkbox" value="tecnología" onChange={handleCheckbox} /> Tecnología</label>

      <button onClick={handleSubmit}>Guardar perfil</button>
    </div>
  );
};

export default Perfil;
