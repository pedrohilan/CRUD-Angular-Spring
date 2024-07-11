package crud.spring.controller;

import crud.spring.model.CourseModel;
import crud.spring.repository.CourseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{id}")
    public ResponseEntity<CourseModel> GetById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseModel> Update(@PathVariable Long id, @RequestBody CourseModel courseModel) {
        return courseRepository.findById(id)
                        .map(record -> {
                            record.setName(courseModel.getName());
                            record.setCategory(courseModel.getCategory());
                            CourseModel updated = courseRepository.save(record);
                            return ResponseEntity.ok().body(updated);
                        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        return courseRepository.findById(id)
                .map(record -> {
                    courseRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
