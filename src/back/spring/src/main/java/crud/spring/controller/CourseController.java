package crud.spring.controller;

import crud.spring.model.CourseModel;
import crud.spring.service.CourseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public List<CourseModel> GetAllCourses() {
        return courseService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CourseModel Save(@RequestBody @Valid CourseModel courseModel) {
        return courseService.create(courseModel);
    }

    @GetMapping("/{id}")
    public CourseModel GetById(@PathVariable @NotNull @Positive Long id) {
        return courseService.findById(id);
    }

    @PutMapping("/{id}")
    public CourseModel Update(@PathVariable @NotNull @Positive Long id, @RequestBody @Valid CourseModel courseModel) {
        return courseService.update(id, courseModel);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable @NotNull @Positive Long id) {
        courseService.deleteById(id);
    }
}
