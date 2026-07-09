package com.placementhub.demo.repository;

import com.placementhub.demo.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByDepartmentAndCgpaGreaterThanEqual(String department, Double cgpa);

    List<Student> findBySkillsContainingIgnoreCase(String skill);
}
