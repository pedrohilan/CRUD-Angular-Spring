package crud.spring.controller;

import crud.spring.dto.CourseDTO;
import crud.spring.service.CourseService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public List<CourseDTO> GetAllCourses() {
        return courseService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CourseDTO Save(@RequestBody @Valid CourseDTO courseDTO) {
        return courseService.create(courseDTO);
    }

    @GetMapping("/{id}")
    public CourseDTO GetById(@PathVariable @NotNull @Positive Long id) {
        return courseService.findById(id);
    }

    @PutMapping("/{id}")
    public CourseDTO Update(@PathVariable @NotNull @Positive Long id,
                            @RequestBody @Valid CourseDTO courseDTO) {
        return courseService.update(id, courseDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteById(@PathVariable @NotNull @Positive Long id) {
        courseService.deleteById(id);
    }
}
