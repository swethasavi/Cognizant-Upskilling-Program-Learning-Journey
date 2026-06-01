import java.util.*;

public class LambdaSort {

    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("bheem");
        names.add("chuki");
        names.add("raju");
        names.add("jaku");
        Collections.sort(names, (a, b) -> a.compareTo(b));
        System.out.println("Sorted List:");
        for (String name : names) {
            System.out.println(name);
        }
    }
}