package com.placementhub.demo.controller;

import com.placementhub.demo.model.InterviewExperience;
import com.placementhub.demo.repository.InterviewExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experiences")
public class InterviewExperienceController {

    @Autowired
    private InterviewExperienceRepository experienceRepository;

    @GetMapping
    public List<InterviewExperience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    @PostMapping
    public InterviewExperience createExperience(@RequestBody InterviewExperience experience) {
        return experienceRepository.save(experience);
    }

    @GetMapping("/{id}")
    public InterviewExperience getExperienceById(@PathVariable Long id) {
        return experienceRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteExperience(@PathVariable Long id) {
        experienceRepository.deleteById(id);
    }
}
