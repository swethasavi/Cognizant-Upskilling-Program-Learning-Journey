public class TypeCastingExample {
    public static void main(String[] args) {
        double decimalValue = 9.78;
        int intValue = (int) decimalValue;
        System.out.println("Double value: " + decimalValue);
        System.out.println("After converting to int: " + intValue);
        int number = 10;
        double doubleValue = (double) number;
        System.out.println("Int value: " + number);
        System.out.println("After converting to double: " + doubleValue);
    }
}