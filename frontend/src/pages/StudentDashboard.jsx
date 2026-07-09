import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getStudents, updateStudent,
  getCompanies,
  getProjects, createProject,
  getExperiences, createExperience
} from '../api';

function StudentDashboard() {
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const [currentStudentId, setCurrentStudentId] = useState('');
  const [profileName, setProfileName] = useState('');
  const [profileDepartment, setProfileDepartment] = useState('');
  const [profileCgpa, setProfileCgpa] = useState('');
  const [profileSkills, setProfileSkills] = useState('');
  const [profileResumeLink, setProfileResumeLink] = useState('');

  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectTechStack, setProjectTechStack] = useState('');

  const [expCompanyId, setExpCompanyId] = useState('');
  const [expRounds, setExpRounds] = useState('');
  const [expTips, setExpTips] = useState('');

  const loadStudents = () => getStudents().then(res => setStudents(res.data)).catch(err => console.error(err));
  const loadCompanies = () => getCompanies().then(res => setCompanies(res.data)).catch(err => console.error(err));
  const loadProjects = () => getProjects().then(res => setProjects(res.data)).catch(err => console.error(err));
  const loadExperiences = () => getExperiences().then(res => setExperiences(res.data)).catch(err => console.error(err));

  useEffect(() => {
    loadStudents();
    loadCompanies();
    loadProjects();
    loadExperiences();
  }, []);

  const handleLoadProfile = (e) => {
    e.preventDefault();
    const student = students.find(s => s.id === parseInt(currentStudentId));
    if (student) {
      setProfileName(student.name);
      setProfileDepartment(student.department);
      setProfileCgpa(student.cgpa);
      setProfileSkills(student.skills || '');
      setProfileResumeLink(student.resumeLink || '');
    } else {
      alert('Student ID not found');
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedData = {
      name: profileName,
      department: profileDepartment,
      cgpa: parseFloat(profileCgpa),
      skills: profileSkills,
      resumeLink: profileResumeLink,
    };
    updateStudent(currentStudentId, updatedData).then(() => {
      loadStudents();
      alert('Profile updated!');
    }).catch(err => console.error(err));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const newProject = {
      student: { id: parseInt(currentStudentId) },
      title: projectTitle,
      description: projectDescription,
      techStack: projectTechStack,
    };
    createProject(newProject).then(() => {
      loadProjects();
      setProjectTitle('');
      setProjectDescription('');
      setProjectTechStack('');
    }).catch(err => console.error(err));
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    const newExperience = {
      student: { id: parseInt(currentStudentId) },
      company: { id: parseInt(expCompanyId) },
      rounds: expRounds,
      tips: expTips,
    };
    createExperience(newExperience).then(() => {
      loadExperiences();
      setExpCompanyId('');
      setExpRounds('');
      setExpTips('');
    }).catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      <Link to="/">← Back to Login</Link>

      <h2>My Profile</h2>
      <form onSubmit={handleLoadProfile}>
        <input
          type="number"
          placeholder="Enter your Student ID"
          value={currentStudentId}
          onChange={(e) => setCurrentStudentId(e.target.value)}
          required
        />
        <button type="submit">Load My Profile</button>
      </form>

      {profileName && (
        <form onSubmit={handleUpdateProfile}>
          <input type="text" placeholder="Name" value={profileName} onChange={(e) => setProfileName(e.target.value)} required />
          <input type="text" placeholder="Department" value={profileDepartment} onChange={(e) => setProfileDepartment(e.target.value)} required />
          <input type="number" step="0.01" placeholder="CGPA" value={profileCgpa} onChange={(e) => setProfileCgpa(e.target.value)} required />
          <input type="text" placeholder="Skills (comma separated)" value={profileSkills} onChange={(e) => setProfileSkills(e.target.value)} />
          <input type="text" placeholder="Resume Link" value={profileResumeLink} onChange={(e) => setProfileResumeLink(e.target.value)} />
          <button type="submit">Save Profile</button>
        </form>
      )}

      <hr />

      <h2>Companies Visiting Campus</h2>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            #{company.id} - <strong>{company.name}</strong> - {company.roleOffered} - {company.packageLpa} LPA - Eligibility CGPA: {company.eligibilityCgpa} - Drive: {company.driveDate}
          </li>
        ))}
      </ul>

      <hr />

      <h2>My Projects</h2>
      <ul>
        {projects.filter(p => p.student && p.student.id === parseInt(currentStudentId)).map(project => (
          <li key={project.id}>
            {project.title} - Tech: {project.techStack}
          </li>
        ))}
      </ul>

      <h3>Add a Project</h3>
      <form onSubmit={handleAddProject}>
        <input type="text" placeholder="Project Title" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} />
        <input type="text" placeholder="Tech Stack (comma separated)" value={projectTechStack} onChange={(e) => setProjectTechStack(e.target.value)} required />
        <button type="submit">Add Project</button>
      </form>

      <hr />

      <h2>Interview Experiences (from Seniors)</h2>
      <ul>
        {experiences.map(exp => (
          <li key={exp.id}>
            <strong>{exp.student ? exp.student.name : 'Unknown'}</strong> @ <strong>{exp.company ? exp.company.name : 'Unknown'}</strong>
            <br />Rounds: {exp.rounds}
            <br />Tips: {exp.tips}
          </li>
        ))}
      </ul>

      <h3>Share Your Interview Experience</h3>
      <form onSubmit={handleAddExperience}>
        <input type="number" placeholder="Company ID (see list above)" value={expCompanyId} onChange={(e) => setExpCompanyId(e.target.value)} required />
        <textarea placeholder="Describe the interview rounds" value={expRounds} onChange={(e) => setExpRounds(e.target.value)} required />
        <textarea placeholder="Tips for juniors" value={expTips} onChange={(e) => setExpTips(e.target.value)} />
        <button type="submit">Post Experience</button>
      </form>
    </div>
  );
}

export default StudentDashboard;