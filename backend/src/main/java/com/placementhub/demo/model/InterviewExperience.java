package com.placementhub.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "interview_experiences")
@Data
public class InterviewExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(columnDefinition = "TEXT")
    private String rounds;

    @Column(columnDefinition = "TEXT")
    private String tips;

    private LocalDateTime postedOn = LocalDateTime.now();
}
