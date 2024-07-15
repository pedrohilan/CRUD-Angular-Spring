package crud.spring.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import crud.spring.enums.CategoryEnum;
import crud.spring.enums.StatusEnum;
import crud.spring.enums.converters.CategoryConverter;
import crud.spring.enums.converters.StatusConverter;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "course")
@SQLDelete(sql = "Update course set status = 'Inativo' where id = ?")
@Where(clause = "status = 'Ativo'")
public class CourseModel implements Serializable {
    private static final long serialVersionUID = 1L;

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

    @NotNull
    @NotEmpty
    @Valid
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "course")
    private List<LessonModel> lessons = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotNull @NotBlank @Length(min = 5, max = 100) String getName() {
        return name;
    }

    public void setName(@NotNull @NotBlank @Length(min = 5, max = 100) String name) {
        this.name = name;
    }

    public @NotNull CategoryEnum getCategory() {
        return category;
    }

    public void setCategory(@NotNull CategoryEnum category) {
        this.category = category;
    }

    public @NotNull StatusEnum getStatus() {
        return status;
    }

    public void setStatus(@NotNull StatusEnum status) {
        this.status = status;
    }

    public List<LessonModel> getLessons() {
        return lessons;
    }

    public void setLessons(List<LessonModel> lessons) {
        this.lessons = lessons;
    }
}
