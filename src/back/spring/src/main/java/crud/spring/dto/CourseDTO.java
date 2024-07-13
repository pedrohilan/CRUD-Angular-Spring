package crud.spring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.util.List;

public record CourseDTO(@JsonProperty("_id") Long id,
                        @NotBlank @NotNull @Length(min = 5, max = 100) String name,
                        @NotBlank @NotNull @Length(min = 5, max = 10) String category,
                        List<LessonDTO> lessons) {

}
