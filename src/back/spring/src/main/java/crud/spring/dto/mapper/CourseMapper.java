package crud.spring.dto.mapper;

import crud.spring.dto.CourseDTO;
import crud.spring.dto.LessonDTO;
import crud.spring.enums.CategoryEnum;
import crud.spring.model.CourseModel;
import crud.spring.model.LessonModel;
import org.springframework.stereotype.Component;
import java.util.List;

import java.util.stream.Collectors;

@Component
public class CourseMapper {
    public CourseDTO toDTO(CourseModel courseModel){
        if(courseModel == null){
            return null;
        }
        List<LessonDTO> lessons = courseModel.getLessons().stream()
                .map(lessonModel -> new LessonDTO(lessonModel.getId(), lessonModel.getName(),
                        lessonModel.getYoutubeUrl()))
                .collect(Collectors.toList());

        return new CourseDTO(courseModel.getId(), courseModel.getName(),
                courseModel.getCategory().getValue(),lessons);
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

        List<LessonModel> lessons = courseDTO.lessons().stream().map(lessonDTO -> {
            var lesson = new LessonModel();
            lesson.setId(lessonDTO.id());
            lesson.setName(lessonDTO.name());
            lesson.setYoutubeUrl(lessonDTO.youtubeUrl());
            lesson.setCourse(courseModel);
            return lesson;
        }).collect(Collectors.toList());
        courseModel.setLessons(lessons);

        return courseModel;
    }

    public CategoryEnum convertToCategoryValue(String value){
        if(value == null){
            return null;
        }

        System.out.println(value);

        return switch(value){
            case "front-end" -> CategoryEnum.FRONTEND;
            case "back-end" -> CategoryEnum.BACKEND;
            default -> throw new IllegalStateException("Unexpected value: " + value);
        };

    }
}
