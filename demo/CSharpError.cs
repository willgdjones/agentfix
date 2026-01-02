using System;

public class CSharpError
{
    public static void Main(string[] args)
    {
        string text = null;
        // This will cause a NullReferenceException
        Console.WriteLine(text.Length);
    }
}

