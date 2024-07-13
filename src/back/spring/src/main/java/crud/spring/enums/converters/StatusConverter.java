package crud.spring.enums.converters;

import crud.spring.enums.CategoryEnum;
import crud.spring.enums.StatusEnum;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter<StatusEnum, String> {

    @Override
    public String convertToDatabaseColumn(StatusEnum attribute) {
        if(attribute == null){
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public StatusEnum convertToEntityAttribute(String dbData) {
        if(dbData == null){
            return null;
        }
        return Stream.of(StatusEnum.values())
                .filter(c -> c.getValue().equals(dbData))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
