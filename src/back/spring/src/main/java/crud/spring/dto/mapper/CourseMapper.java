package crud.spring.dto.mapper;

import crud.spring.dto.CourseDTO;
import crud.spring.enums.CategoryEnum;
import crud.spring.model.CourseModel;
import org.springframework.stereotype.Component;

@Component
public class CourseMapper {
    public CourseDTO toDTO(CourseModel courseModel){
        if(courseModel == null){
            return null;
        }
        return new CourseDTO(courseModel.getId(), courseModel.getName(), courseModel.getCategory().getValue());
    }

    public CourseModel toEntity(CourseDTO courseDTO){
        if(courseDTO == null){
            return null;
        }
        CourseModel courseModel = new CourseModel();
        if(courseDTO.id() != null){
            courseModel.setId(courseDTO.id());
        }
        courseModel.setName(courseDTO.name());
        courseModel.setCategory(convertToCategoryValue(courseDTO.category()));
        return courseModel;
    }

    public CategoryEnum convertToCategoryValue(String value){
        if(value == null){
            return null;
        }

        return switch(value){
            case "front-end" -> CategoryEnum.FRONTEND;
            case "back-end" -> CategoryEnum.BACKEND;
            default -> throw new IllegalStateException("Unexpected value: " + value);
        };

    }
}
