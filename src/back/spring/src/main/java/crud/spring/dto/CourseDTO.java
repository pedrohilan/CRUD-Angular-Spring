package crud.spring.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import crud.spring.enums.CategoryEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record CourseDTO(@JsonProperty("_id") Long id,
                        @NotBlank @NotNull @Length(min = 5, max = 100) String name,
                        @NotBlank @NotNull @Length(min = 5, max = 10) String category) {

}
