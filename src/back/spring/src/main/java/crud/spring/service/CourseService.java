package crud.spring.service;

import crud.spring.dto.CourseDTO;
import crud.spring.dto.mapper.CourseMapper;
import crud.spring.exception.RecordNotFoundException;
import crud.spring.repository.CourseRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.stream.Collectors;

@Validated
@Service
@AllArgsConstructor
public class CourseService {
    private CourseRepository courseRepository;
    private CourseMapper courseMapper;

    public List<CourseDTO> findAll(){
        return courseRepository.findAll().stream()
                .map(courseMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CourseDTO findById(@NotNull @Positive Long id){
        return courseRepository.findById(id).map(courseMapper::toDTO)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public CourseDTO create(@Valid CourseDTO courseDTO){
        return courseMapper.toDTO(courseRepository.save(courseMapper.toEntity(courseDTO)));
    }

    public CourseDTO update(@NotNull @Positive Long id, @Valid CourseDTO courseDTO){
        return courseRepository.findById(id)
                .map(record -> {
                    record.setName(courseDTO.name());
                    record.setCategory(courseMapper.convertToCategoryValue(courseDTO.category()));
                    return courseRepository.save(record);
                }).map(courseMapper::toDTO)
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void deleteById(@NotNull @Positive Long id){
        courseRepository.delete(courseRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
