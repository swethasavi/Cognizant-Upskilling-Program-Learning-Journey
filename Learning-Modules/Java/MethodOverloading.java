public class MethodOverloading {
    public static int add(int a, int b) {
        return a + b;
    }
    public static double add(double a, double b) {
        return a + b;
    }
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
    public static void main(String[] args) {
        System.out.println("Two int: " + add(5, 10));
        System.out.println("Two double: " + add(5.5, 2.5));
        System.out.println("Three int: " + add(1, 2, 3));
    }
}