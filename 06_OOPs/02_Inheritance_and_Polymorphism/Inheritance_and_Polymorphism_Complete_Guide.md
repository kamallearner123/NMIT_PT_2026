# Inheritance & Polymorphism: Complete Guide

> **Module:** Object-Oriented Programming (OOPs)
> **Topic:** Code Reusability and Flexibility
> **Duration:** 1 hour

## 📚 Table of Contents

1. [Inheritance](#inheritance)
2. [Types of Inheritance](#types)
3. [Polymorphism](#polymorphism)
4. [Compile-time vs Run-time Polymorphism](#compile-run)
5. [Virtual Functions & Pure Virtual Functions](#virtual)
6. [Interview Questions](#interview-questions)
7. [Multiple Choice Questions](#mcqs)
8. [Practice Challenges](#challenges)
9. [References](#references)

---

## <a name="inheritance"></a>1. Inheritance

The capability of a class to derive properties and characteristics from another class.
-   **Base Class (Parent):** The class being inherited from.
-   **Derived Class (Child):** The class that inherits.

**Syntax (C++):**
```cpp
class Child : public Parent {
    // Code
};
```

---

## <a name="types"></a>2. Types of Inheritance

1.  **Single Inheritance:** Class B inherits from Class A.
2.  **Multiple Inheritance:** Class C inherits from Class A **and** Class B. (Supported in C++, Python; Not in Java).
    -   *Diamond Problem:* If A and B both inherit from Z, and C inherits from A and B, C has two copies of Z.
3.  **Multilevel Inheritance:** C inherits from B, B inherits from A.
4.  **Hierarchical Inheritance:** B and C both inherit from A.
5.  **Hybrid Inheritance:** Combination of above.

---

## <a name="polymorphism"></a>3. Polymorphism

"Poly" (Many) + "Morph" (Forms). The ability of a message to be displayed in more than one form.

---

## <a name="compile-run"></a>4. Compile-time vs Run-time Polymorphism

### Compile-time (Static Binding)
Decided at compile time. Faster execution.

1.  **Function Overloading:** Functions with same name but different parameters (count or type).
    ```cpp
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    ```

2.  **Operator Overloading:** Giving special meaning to operators (e.g., `+` for string concatenation).

### Run-time (Dynamic Binding)
Decided at run time. Slower but more flexible. Achieved via **Method Overriding**.

-   **Overriding:** Derived class provides a specific implementation of a function already defined in Base class.

---

## <a name="virtual"></a>5. Virtual Functions (C++)

A `virtual` function is a member function in the base class that you redefine in a derived class. It tells the compiler to perform **Dynamic Binding**.

```cpp
class Animal {
public:
    virtual void sound() {
        cout << "Animal makes a sound" << endl;
    }
};

class Dog : public Animal {
public:
    void sound() override { // Good practice to use 'override'
        cout << "Dog barks" << endl;
    }
};

int main() {
    Animal* a;
    Dog d;
    a = &d;
    
    a->sound(); // Output: "Dog barks" (Because of virtual)
}
```

### Pure Virtual Function (Abstract Class)
A function with no implementation in the base class.
`virtual void sound() = 0;`
-   A class with at least one pure virtual function is **Abstract**. Cannot be instantiated.

---

## <a name="interview-questions"></a>6. Interview Questions

### Q1: What is the Diamond Problem?
**Answer:**
Occurs in Multiple Inheritance when two superclasses of a class have a common base class. The subclass receives two copies of the base class members, causing ambiguity.
**Solution:** `virtual` inheritance in C++. `class B : virtual public A`.

### Q2: Overloading vs Overriding?
**Answer:**
-   **Overloading:** Same function name, different parameters. Same scope. Compile-time.
-   **Overriding:** Same function name, same parameters. Inheritance scope (Base vs Derived). Run-time.

### Q3: Can Destructors be Virtual?
**Answer:**
**Yes, and they should be.** If a base class pointer points to a derived object and is deleted, only the base destructor runs (memory leak) unless the base destructor is virtual.

### Q4: Can Constructors be Virtual?
**Answer:**
**No.** To create an object, we need the constructor to run. The V-Table (Virtual Table) is created *after* the object is constructed. Calling a virtual function requires the V-Table, which doesn't exist yet properly.

### Q5: What is `super` in Java/Python?
**Answer:**
It is a keyword used to refer to the immediate parent class object. Used to call parent constructors or methods.

---

## <a name="mcqs"></a>7. Multiple Choice Questions

### MCQ 1
**Which inheritance type is NOT supported by Java?**
A) Single
B) Multilevel
C) Multiple (Classes)
D) Hierarchical

<details>
<summary>Answer</summary>
**C) Multiple (Classes)** (Java uses Interfaces to achieve this).
</details>

### MCQ 2
**Which keyword is used for Compile-time Polymorphism?**
A) virtual
B) override
C) operator
D) extends

<details>
<summary>Answer</summary>
**C) operator** (Operator Overloading).
</details>

### MCQ 3
**If a function is declared `virtual` in Base, it is automatically `virtual` in Derived?**
A) Yes
B) No
C) Only if `virtual` keyword is repeated
D) Depends on compiler

<details>
<summary>Answer</summary>
**A) Yes**
</details>

### MCQ 4
**Abstract classes are created using?**
A) Private constructors
B) Static methods
C) Pure virtual functions
D) Virtual destructors

<details>
<summary>Answer</summary>
**C) Pure virtual functions**
</details>

---

## <a name="challenges"></a>8. Practice Challenges

### Challenge 1: Shape Hierarchy
**Task:**
1.  Create abstract class `Shape` with pure virtual `area()`.
2.  Create classes `Circle`, `Rectangle` inheriting from `Shape`.
3.  Implement `area()` for both.
4.  Use `Shape*` array to store different shapes and print their areas (Polymorphism).

### Challenge 2: Employee System
**Task:**
-   Base `Employee` (salary).
-   Derived `Manager` (+bonus).
-   Derived `Intern` (stipend).
-   Function `printSalary(Employee* e)` that works for all types correctly.

---

## <a name="references"></a>9. References

-   **"C++ Primer"** by Lippman.
-   TutorialsPoint C++ Inheritance.

---

## 🎯 Key Takeaways

1.  **Reusability:** Inheritance saves rewriting code.
2.  **Flexibility:** Polymorphism allows a single interface to control different specialized objects.
3.  **Safety:** Use Virtual Destructors in Base classes.
