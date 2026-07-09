import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <h1>Placement Hub</h1>
      <p>Choose your role to continue</p>

      <div className="role-buttons">
        <button onClick={() => navigate('/admin')}>
          Placement Cell / Admin
        </button>
        <button onClick={() => navigate('/student')}>
          Student
        </button>
      </div>
    </div>
  );
}

export default LoginPage;