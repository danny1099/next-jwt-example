import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [profile, setProfileUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const getProfileUser = async () => {
      const response = await axios.get('/api/profile');
      const json = await response.data;

      setProfileUser(json);
    };

    getProfileUser().catch(console.error);
  }, []);

  const setLogOut = async () => {
    const response = await axios.post('/api/auth/logout');

    router.push(`/${response.status === 200 ? 'login' : ''}`);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Email: {profile.email}</h3>
      <p>Usuario: {profile.username}</p>
      <button onClick={() => getProfileUser()}>Get Profile</button>
      <button onClick={() => setLogOut()}>Log Out</button>
    </div>
  );
}
