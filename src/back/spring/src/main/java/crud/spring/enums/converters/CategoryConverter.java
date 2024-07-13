package crud.spring.enums.converters;

import crud.spring.enums.CategoryEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class CategoryConverter implements AttributeConverter<CategoryEnum, String> {

    @Override
    public String convertToDatabaseColumn(CategoryEnum attribute) {
        if(attribute == null){
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public CategoryEnum convertToEntityAttribute(String dbData) {
        if(dbData == null){
            return null;
        }
        return Stream.of(CategoryEnum.values())
                .filter(c -> c.getValue().equals(dbData))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
