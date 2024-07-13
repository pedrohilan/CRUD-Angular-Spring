package crud.spring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import crud.spring.enums.CategoryEnum;
import crud.spring.enums.StatusEnum;
import crud.spring.enums.converters.CategoryConverter;
import crud.spring.enums.converters.StatusConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

@Data
@Entity
@Table(name = "course")
@SQLDelete(sql = "Update course set status = 'Inativo' where id = ?")
@Where(clause = "status = 'Ativo'")
public class CourseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @NotNull
    @NotBlank
    @Length(min = 5, max = 100)
    @Column(length = 100, nullable = false)
    private String name;

    @NotNull
    @Column(nullable = false)
    @Convert(converter = CategoryConverter.class)
    private CategoryEnum category;

    @NotNull
    @Convert(converter = StatusConverter.class)
    private StatusEnum status = StatusEnum.ACTIVE;
}
