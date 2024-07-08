package crud.spring.controller;

import crud.spring.model.CourseModel;
import crud.spring.repository.CourseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository courseRepository;

    private CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<CourseModel> GetAllCourses() {
        return courseRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<CourseModel> Save(@RequestBody CourseModel courseModel) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
                courseRepository.save(courseModel));
    }
}
