package crud.spring.service;

import crud.spring.exception.RecordNotFoundException;
import crud.spring.model.CourseModel;
import crud.spring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Validated
@Service
@AllArgsConstructor
public class CourseService {
    private CourseRepository courseRepository;

    public List<CourseModel> findAll(){
        return courseRepository.findAll();
    }

    public CourseModel findById(@NotNull @Positive Long id){
        return courseRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CourseModel create(@Valid CourseModel courseModel){
        return courseRepository.save(courseModel);
    }

    public CourseModel update(@NotNull @Positive Long id, @Valid CourseModel courseModel){
        return courseRepository.findById(id)
                .map(record -> {
                    record.setName(courseModel.getName());
                    record.setCategory(courseModel.getCategory());
                    return courseRepository.save(record);
                }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void deleteById(@NotNull @Positive Long id){
        courseRepository.delete(courseRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
