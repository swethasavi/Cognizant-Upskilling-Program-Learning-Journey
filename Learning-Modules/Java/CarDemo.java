class Car {

    String make;
    String model;
    int year;

    void displayDetails() {
        System.out.println(make + " " + model + " " + year);
    }
}
public class CarDemo {

    public static void main(String[] args) {

        Car car1 = new Car();
        car1.make = "Toyota";
        car1.model = "Innova";
        car1.year = 2020;
        Car car2 = new Car();
        car2.make = "Honda";
        car2.model = "City";
        car2.year = 2022;
        car1.displayDetails();
        car2.displayDetails();
    }
}