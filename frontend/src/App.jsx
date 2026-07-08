import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));

    axios.get('http://localhost:8080/api/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  return (
    <div>
      <h1>Placement Hub</h1>

      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} - {student.department} - CGPA: {student.cgpa}
          </li>
        ))}
      </ul>

      <h2>Companies</h2>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            {company.name} - {company.roleOffered} - {company.packageLpa} LPA - Drive: {company.driveDate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
