import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const [companyName, setCompanyName] = useState('');
  const [roleOffered, setRoleOffered] = useState('');
  const [packageLpa, setPackageLpa] = useState('');
  const [eligibilityCgpa, setEligibilityCgpa] = useState('');
  const [driveDate, setDriveDate] = useState('');

  const [studentName, setStudentName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [batch, setBatch] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [skills, setSkills] = useState('');

  const [searchSkill, setSearchSkill] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  const [projectStudentId, setProjectStudentId] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectTechStack, setProjectTechStack] = useState('');

  const [expStudentId, setExpStudentId] = useState('');
  const [expCompanyId, setExpCompanyId] = useState('');
  const [expRounds, setExpRounds] = useState('');
  const [expTips, setExpTips] = useState('');

  const fetchStudents = () => {
    axios.get('http://localhost:8080/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));
  };

  const fetchCompanies = () => {
    axios.get('http://localhost:8080/api/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  };

  const fetchProjects = () => {
    axios.get('http://localhost:8080/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  };

  const fetchExperiences = () => {
    axios.get('http://localhost:8080/api/experiences')
      .then(response => setExperiences(response.data))
      .catch(error => console.error('Error fetching experiences:', error));
  };

  useEffect(() => {
    fetchStudents();
    fetchCompanies();
    fetchProjects();
    fetchExperiences();
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
    axios.post('http://localhost:8080/api/companies', newCompany)
      .then(() => {
        fetchCompanies();
        setCompanyName('');
        setRoleOffered('');
        setPackageLpa('');
        setEligibilityCgpa('');
        setDriveDate('');
      })
      .catch(error => console.error('Error adding company:', error));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      name: studentName,
      registerNumber: registerNumber,
      department: department,
      batch: batch,
      cgpa: parseFloat(cgpa),
      resumeLink: resumeLink,
      skills: skills,
    };
    axios.post('http://localhost:8080/api/students', newStudent)
      .then(() => {
        fetchStudents();
        setStudentName('');
        setRegisterNumber('');
        setDepartment('');
        setBatch('');
        setCgpa('');
        setResumeLink('');
        setSkills('');
      })
      .catch(error => console.error('Error adding student:', error));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/api/students/search?skill=${searchSkill}`)
      .then(response => setSearchResults(response.data))
      .catch(error => console.error('Error searching students:', error));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const newProject = {
      student: { id: parseInt(projectStudentId) },
      title: projectTitle,
      description: projectDescription,
      techStack: projectTechStack,
    };
    axios.post('http://localhost:8080/api/projects', newProject)
      .then(() => {
        fetchProjects();
        setProjectStudentId('');
        setProjectTitle('');
        setProjectDescription('');
        setProjectTechStack('');
      })
      .catch(error => console.error('Error adding project:', error));
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    const newExperience = {
      student: { id: parseInt(expStudentId) },
      company: { id: parseInt(expCompanyId) },
      rounds: expRounds,
      tips: expTips,
    };
    axios.post('http://localhost:8080/api/experiences', newExperience)
      .then(() => {
        fetchExperiences();
        setExpStudentId('');
        setExpCompanyId('');
        setExpRounds('');
        setExpTips('');
      })
      .catch(error => console.error('Error adding experience:', error));
  };

  return (
    <div>
      <h1>Placement Hub</h1>

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

      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            #{student.id} - {student.name} - {student.department} - CGPA: {student.cgpa} - Skills: {student.skills || 'Not added'}
          </li>
        ))}
      </ul>

      <h3>Add New Student</h3>
      <form onSubmit={handleAddStudent}>
        <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
        <input type="text" placeholder="Register Number" value={registerNumber} onChange={(e) => setRegisterNumber(e.target.value)} required />
        <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        <input type="text" placeholder="Batch (e.g. 2024-2028)" value={batch} onChange={(e) => setBatch(e.target.value)} required />
        <input type="number" step="0.01" placeholder="CGPA" value={cgpa} onChange={(e) => setCgpa(e.target.value)} required />
        <input type="text" placeholder="Resume Link" value={resumeLink} onChange={(e) => setResumeLink(e.target.value)} />
        <input type="text" placeholder="Skills (comma separated)" value={skills} onChange={(e) => setSkills(e.target.value)} />
        <button type="submit">Add Student</button>
      </form>

      <hr />

      <h2>Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            {project.title} - Tech: {project.techStack} - By: {project.student ? project.student.name : 'Unknown'}
          </li>
        ))}
      </ul>

      <h3>Add New Project</h3>
      <form onSubmit={handleAddProject}>
        <input type="number" placeholder="Student ID (see list above)" value={projectStudentId} onChange={(e) => setProjectStudentId(e.target.value)} required />
        <input type="text" placeholder="Project Title" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        <input type="text" placeholder="Tech Stack (comma separated)" value={projectTechStack} onChange={(e) => setProjectTechStack(e.target.value)} required />
        <button type="submit">Add Project</button>
      </form>

      <hr />

      <h2>Interview Experiences</h2>
      <ul>
        {experiences.map(exp => (
          <li key={exp.id}>
            <strong>{exp.student ? exp.student.name : 'Unknown'}</strong> @ <strong>{exp.company ? exp.company.name : 'Unknown'}</strong>
            <br />Rounds: {exp.rounds}
            <br />Tips: {exp.tips}
          </li>
        ))}
      </ul>

      <h3>Post Interview Experience</h3>
      <form onSubmit={handleAddExperience}>
        <input type="number" placeholder="Student ID" value={expStudentId} onChange={(e) => setExpStudentId(e.target.value)} required />
        <input type="number" placeholder="Company ID (see list below)" value={expCompanyId} onChange={(e) => setExpCompanyId(e.target.value)} required />
        <textarea placeholder="Describe the interview rounds" value={expRounds} onChange={(e) => setExpRounds(e.target.value)} required />
        <textarea placeholder="Tips for juniors" value={expTips} onChange={(e) => setExpTips(e.target.value)} />
        <button type="submit">Post Experience</button>
      </form>

      <hr />

      <h2>Companies</h2>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            #{company.id} - {company.name} - {company.roleOffered} - {company.packageLpa} LPA - Drive: {company.driveDate}
          </li>
        ))}
      </ul>

      <h3>Add New Company</h3>
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

export default App;