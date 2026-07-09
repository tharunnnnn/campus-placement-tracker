import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, getCompanies, createCompany, searchStudents } from '../api';

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [companyName, setCompanyName] = useState('');
  const [roleOffered, setRoleOffered] = useState('');
  const [packageLpa, setPackageLpa] = useState('');
  const [eligibilityCgpa, setEligibilityCgpa] = useState('');
  const [driveDate, setDriveDate] = useState('');

  const [searchSkill, setSearchSkill] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const loadStudents = () => {
    getStudents().then(res => setStudents(res.data)).catch(err => console.error(err));
  };

  const loadCompanies = () => {
    getCompanies().then(res => setCompanies(res.data)).catch(err => console.error(err));
  };

  useEffect(() => {
    loadStudents();
    loadCompanies();
  }, []);

  const handleAddCompany = (e) => {
    e.preventDefault();
    const newCompany = {
      name: companyName,
      roleOffered: roleOffered,
      packageLpa: parseFloat(packageLpa),
      eligibilityCgpa: parseFloat(eligibilityCgpa),
      driveDate: driveDate,
    };
    createCompany(newCompany).then(() => {
      loadCompanies();
      setCompanyName('');
      setRoleOffered('');
      setPackageLpa('');
      setEligibilityCgpa('');
      setDriveDate('');
    }).catch(err => console.error(err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchStudents(searchSkill).then(res => setSearchResults(res.data)).catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Placement Cell Dashboard</h1>
      <Link to="/">← Back to Login</Link>

      <h2>🔍 SkillMatch — Search Students by Skill</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by skill (e.g. Java, React)"
          value={searchSkill}
          onChange={(e) => setSearchSkill(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {searchResults !== null && (
        <div>
          <h3>Search Results ({searchResults.length})</h3>
          <ul>
            {searchResults.map(student => (
              <li key={student.id}>
                {student.name} - {student.department} - CGPA: {student.cgpa} - Skills: {student.skills}
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr />

      <h2>All Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            #{student.id} - {student.name} - {student.department} - CGPA: {student.cgpa} - Skills: {student.skills || 'Not added'}
          </li>
        ))}
      </ul>

      <hr />

      <h2>Companies</h2>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            {company.name} - {company.roleOffered} - {company.packageLpa} LPA - Drive: {company.driveDate}
          </li>
        ))}
      </ul>

      <h3>Post New Company</h3>
      <form onSubmit={handleAddCompany}>
        <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        <input type="text" placeholder="Role Offered" value={roleOffered} onChange={(e) => setRoleOffered(e.target.value)} required />
        <input type="number" step="0.1" placeholder="Package (LPA)" value={packageLpa} onChange={(e) => setPackageLpa(e.target.value)} required />
        <input type="number" step="0.1" placeholder="Eligibility CGPA" value={eligibilityCgpa} onChange={(e) => setEligibilityCgpa(e.target.value)} required />
        <input type="date" value={driveDate} onChange={(e) => setDriveDate(e.target.value)} required />
        <button type="submit">Add Company</button>
      </form>
    </div>
  );
}

export default AdminDashboard;