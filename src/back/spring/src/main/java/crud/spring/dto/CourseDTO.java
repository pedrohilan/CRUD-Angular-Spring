package crud.spring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import crud.spring.enums.CategoryEnum;
import crud.spring.enums.validations.ValueOfEnum;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import java.util.List;

public record CourseDTO(@JsonProperty("_id") Long id,
                        @NotBlank @NotNull @Length(min = 5, max = 100) String name,
                        @NotBlank @NotNull @Length(min = 5, max = 10) /*@ValueOfEnum(enumClass = CategoryEnum.class)*/  String category,
                        @NotEmpty @NotNull @Valid List<LessonDTO> lessons) {

}
