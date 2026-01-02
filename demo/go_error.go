package main

import "fmt"

func main() {
	fruits := []string{"apple", "banana"}
	// This will cause a panic: runtime error: index out of range
	fmt.Println(fruits[2])
}

