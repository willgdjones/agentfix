public class JavaError {
    public static void main(String[] args) {
        String name = null;
        // This will cause a NullPointerException
        System.out.println(name.length());
    }
}

