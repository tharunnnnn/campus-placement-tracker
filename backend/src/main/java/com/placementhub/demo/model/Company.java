package com.placementhub.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "companies")
@Data
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String roleOffered;
    private Double packageLpa;
    private Double eligibilityCgpa;
    private String eligibleDepartments;
    private LocalDate driveDate;

    @Column(columnDefinition = "TEXT")
    private String description;
}
