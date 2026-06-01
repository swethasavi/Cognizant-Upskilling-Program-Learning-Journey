public class PatternSwitch {

    public static void checkType(Object obj) {

        switch (obj) {
            case Integer i -> System.out.println("Integer value: " + i);
            case String s -> System.out.println("String value: " + s);
            case Double d -> System.out.println("Double value: " + d);
            default -> System.out.println("Unknown type");
        }
    }
    public static void main(String[] args) {
        checkType(10);
        checkType("Hello");
        checkType(5.5);
    }
}