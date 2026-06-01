import java.util.*;
import java.util.stream.*;

record Person(String name, int age) {}

public class RecordDemo {

    public static void main(String[] args) {

        List<Person> people = List.of(
                new Person("Ravi", 20),
                new Person("Anu", 17),
                new Person("Kumar", 25)
        );
        System.out.println("All People:");
        people.forEach(System.out::println);

        System.out.println("Age >= 18:");
        people.stream()
                .filter(p -> p.age() >= 18)
                .forEach(System.out::println);
    }
}