package com.placementhub.demo.controller;

import com.placementhub.demo.model.Student;
import com.placementhub.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        updatedStudent.setId(id);
        return studentRepository.save(updatedStudent);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }

    @GetMapping("/search")
    public List<Student> searchStudents(
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Double minCgpa) {

        if (skill != null) {
            return studentRepository.findBySkillsContainingIgnoreCase(skill);
        }
        if (department != null && minCgpa != null) {
            return studentRepository.findByDepartmentAndCgpaGreaterThanEqual(department, minCgpa);
        }
        return studentRepository.findAll();
    }
}
