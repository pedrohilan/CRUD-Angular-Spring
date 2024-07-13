package crud.spring.enums;

public enum StatusEnum {
    ACTIVE("Ativo"),
    INACTIVE("Inativo");

    private String value;

    private StatusEnum(String value){
        this.value = value;
    }

    public String getValue(){
        return value;
    }

    @Override
    public String toString() {
        return "StatusEnum{" +
                "value='" + value + '\'' +
                '}';
    }
}
