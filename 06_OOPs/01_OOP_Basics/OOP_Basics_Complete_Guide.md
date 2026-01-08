# OOP Basics: Complete Guide

> **Module:** Object-Oriented Programming (OOPs)
> **Topic:** Classes, Objects, Encapsulation, and Abstraction
> **Duration:** 1 hour

## 📚 Table of Contents

1. [What is OOP?](#intro)
2. [Classes and Objects](#classes-objects)
3. [Encapsulation](#encapsulation)
4. [Abstraction](#abstraction)
5. [Constructors & Destructors](#constructors)
6. [Access Modifiers](#modifiers)
7. [Interview Questions](#interview-questions)
8. [Multiple Choice Questions](#mcqs)
9. [Practice Challenges](#challenges)
10. [References](#references)

---

## <a name="intro"></a>1. What is OOP?

**Object-Oriented Programming (OOP)** is a programming paradigm based on the concept of "objects", which can contain data (attributes) and code (methods).

### Core Pillars of OOP
1.  **Encapsulation:** Binding data and methods together.
2.  **Abstraction:** Hiding complexity.
3.  **Inheritance:** Reusing code from parent classes.
4.  **Polymorphism:** Many forms (Overloading/Overriding).

---

## <a name="classes-objects"></a>2. Classes and Objects

### Class
A blueprint or template for creating objects. It defines the properties and behaviors.
> **Analogy:** A Class is the "Architect's Blueprint" for a house.

### Object
An instance of a class. It is a concrete entity created based on the blueprint.
> **Analogy:** An Object is the actual "House" built from the blueprint.

```cpp
// C++ Example
class Car {
public:
    string brand;
    void honk() {
        cout << "Beep beep!" << endl;
    }
};

int main() {
    Car myCar;       // Object creation
    myCar.brand = "Toyota";
    myCar.honk();
}
```

---

## <a name="encapsulation"></a>3. Encapsulation

Encapsulation is the wrapping of data (variables) and methods (functions) into a single unit (class).
It also involves **Data Hiding**: restricting direct access to some components of an object.

### Implementation
-   Make variables `private`.
-   Provide `public` **Getter and Setter** methods to access/modify them.

```cpp
class Account {
private:
    double balance; // Hidden data

public:
    // Setter (with validation)
    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    // Getter
    double getBalance() {
        return balance;
    }
};
```

---

## <a name="abstraction"></a>4. Abstraction

Abstraction is the concept of hiding complex implementation details and showing only the necessary features of an object.

> **Analogy:** Driving a car. You know how to use the steering wheel and pedals (Interface), but you don't need to know how the engine combustion works (Implementation).

### Implementation
-   **Abstract Classes:** Cannot be instantiated. Contain pure virtual functions (C++) or abstract methods (Java/Python).
-   **Interfaces:** Pure abstraction.

---

## <a name="constructors"></a>5. Constructors & Destructors

### Constructor
A special method invoked automatically when an object is created.
-   Same name as class.
-   No return type.
-   Used for initialization.

### Destructor
Invoked when an object is destroyed (goes out of scope).
-   Same name with `~` prefix (in C++).
-   Used for resource cleanup (closing files, releasing memory).

---

## <a name="modifiers"></a>6. Access Modifiers

Control the visibility of class members.

| Modifier | Inside Class | Derived Class | Outside Class |
| :--- | :---: | :---: | :---: |
| **Public** | ✅ | ✅ | ✅ |
| **Private** | ✅ | ❌ | ❌ |
| **Protected** | ✅ | ✅ | ❌ |

-   **Public:** Accessible from anywhere.
-   **Private:** Accessible only within the class.
-   **Protected:** Accessible within class and inherited classes.

---

## <a name="interview-questions"></a>7. Interview Questions

### Q1: Difference between Class and Object?
**Answer:**
-   **Class:** Conceptual blueprint, logical entity, takes no memory.
-   **Object:** Real-world entity, instance of class, takes memory.

### Q2: Why use Encapsulation?
**Answer:**
To protect data from unauthorized access or accidental modification (Data Hiding). It allows modifying implementation code without affecting the code that uses it (Flexibility).

### Q3: What is the `this` pointer?
**Answer:**
It is a pointer passed as a hidden argument to all non-static member functions. It points to the object invoking the function.

### Q4: Copy Constructor?
**Answer:**
A constructor that initializes an object using another object of the same class.
`ClassName(const ClassName &obj);`
Used during:
-   Initializing object with another object.
-   Passing object by value.
-   Returning object by value.

### Q5: Shallow Copy vs Deep Copy?
**Answer:**
-   **Shallow Copy:** Copies values of member variables. If variable is a pointer, it copies the address (so both objects point to same memory). (Default behavior).
-   **Deep Copy:** Allocates new memory for the pointer and copies the *actual data*. Required when class keeps pointers to heap memory.

---

## <a name="mcqs"></a>8. Multiple Choice Questions

### MCQ 1
**Which feature allows hiding internal details?**
A) Inheritance
B) Encapsulation
C) Abstraction
D) Polymorphism

<details>
<summary>Answer</summary>
**C) Abstraction** (Though Encapsulation helps achieve it).
</details>

### MCQ 2
**What is the default access modifier in a C++ class?**
A) public
B) private
C) protected
D) internal

<details>
<summary>Answer</summary>
**B) private** (In `struct` it is public).
</details>

### MCQ 3
**Which method is called when an object goes out of scope?**
A) Constructor
B) Initializer
C) Destructor
D) Finalizer

<details>
<summary>Answer</summary>
**C) Destructor**
</details>

### MCQ 4
**Can a constructor hold a return type?**
A) Yes, int
B) Yes, void
C) No
D) Only in Java

<details>
<summary>Answer</summary>
**C) No**
</details>

---

## <a name="challenges"></a>9. Practice Challenges

### Challenge 1: Bank Account Class
**Task:** Design a class `BankAccount` with:
-   Private `balance`.
-   Public `deposit(amount)`, `withdraw(amount)`.
-   Ensure withdraw fails if insufficient funds.

### Challenge 2: Rectangle Class
**Task:** Create a class `Rectangle`.
-   Attributes: `length`, `width`.
-   Methods: `area()`, `perimeter()`.
-   Create a constructor to initialize dimensions.

### Challenge 3: Deep Copy
**Task:** Create a class with a pointer member (e.g., `int* data`). Write a Copy Constructor that performs a Deep Copy to prevent double suppression faults.

---

## <a name="references"></a>10. References

-   **"Object-Oriented Programming in C++"** by Robert Lafore.
-   GeeksforGeeks OOPs concepts.

---

## 🎯 Key Takeaways

1.  **Thinking in Objects:** Model real-world entities.
2.  **Protect Data:** Always use private variables and public getters/setters.
3.  **Memory:** Use Destructors to prevent memory leaks in C++.
