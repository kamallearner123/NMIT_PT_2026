# SQL Queries: Complete Guide

> **Module:** RDBMS
> **Topic:** DDL, DML, Joins, and Aggregations
> **Duration:** 1 hour

## 📚 Table of Contents

1. [SQL Sub-languages (DDL, DML)](#sub-languages)
2. [Basic Queries (SELECT)](#select)
3. [Filtering (WHERE)](#where)
4. [Joins](#joins)
5. [Aggregations & Grouping](#grouping)
6. [Subqueries](#subqueries)
7. [Interview Questions](#interview-questions)
8. [Multiple Choice Questions](#mcqs)
9. [Practice Challenges](#challenges)
10. [References](#references)

---

## <a name="sub-languages"></a>1. SQL Sub-languages

### DDL (Data Definition Language)
 Defines the schema.
-   `CREATE`: Create table/database.
-   `ALTER`: Modify structure (add column).
-   `DROP`: Delete table.
-   `TRUNCATE`: Wipe data.

```sql
CREATE TABLE Students (
    ID INT PRIMARY KEY,
    Name VARCHAR(50),
    Age INT
);
```

### DML (Data Manipulation Language)
 Manipulates data.
-   `INSERT`: Add rows.
-   `UPDATE`: Modify rows.
-   `DELETE`: Remove rows.

```sql
INSERT INTO Students VALUES (1, 'Alice', 20);
UPDATE Students SET Age = 21 WHERE ID = 1;
DELETE FROM Students WHERE ID = 1;
```

### DCL (Data Control Language)
-   `GRANT`, `REVOKE` (Permissions).

### TCL (Transaction Control Language)
-   `COMMIT`, `ROLLBACK`.

---

## <a name="select"></a>2. Basic Queries (SELECT)

```sql
-- Select all columns
SELECT * FROM Students;

-- Select specific columns
SELECT Name, Age FROM Students;

-- Distinct values (remove duplicates)
SELECT DISTINCT Age FROM Students;
```

---

## <a name="where"></a>3. Filtering (WHERE)

```sql
SELECT * FROM Students WHERE Age > 18;

-- Logical Operators
SELECT * FROM Students WHERE Age > 18 AND Name = 'Alice';
SELECT * FROM Students WHERE Age < 18 OR Age > 60;

-- IN (List of values)
SELECT * FROM Students WHERE Age IN (20, 21, 22);

-- LIKE (Pattern Matching)
SELECT * FROM Students WHERE Name LIKE 'A%'; -- Starts with A
SELECT * FROM Students WHERE Name LIKE '%ice'; -- Ends with ice
```

---

## <a name="joins"></a>4. Joins

Combine rows from two or more tables based on a related column.

### Types of Joins

1.  **INNER JOIN:** Returns records that have matching values in **both** tables.
2.  **LEFT (OUTER) JOIN:** Returns all records from the **left** table, and matched records from the right. (NULL if no match).
3.  **RIGHT (OUTER) JOIN:** Returns all records from the **right** table, and matched records from the left.
4.  **FULL (OUTER) JOIN:** Returns all records when there is a match in **either** left or right.

### Example
**Students:** `ID, Name`
**Marks:** `ID, Score`

```sql
-- Inner Join (Only students with marks)
SELECT Name, Score
FROM Students
INNER JOIN Marks ON Students.ID = Marks.ID;

-- Left Join (All students, even if no marks)
SELECT Name, Score
FROM Students
LEFT JOIN Marks ON Students.ID = Marks.ID;
```

---

## <a name="grouping"></a>5. Aggregations & Grouping

### Aggregate Functions
-   `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.

### GROUP BY
Groups rows that have the same values into summary rows.

```sql
-- Count students per Age
SELECT Age, COUNT(*)
FROM Students
GROUP BY Age;
```

### HAVING
Filters groups (like WHERE, but for groups).

```sql
-- Show ages where there are more than 5 students
SELECT Age, COUNT(*)
FROM Students
GROUP BY Age
HAVING COUNT(*) > 5;
```

> **Rule:** `WHERE` filters rows *before* grouping. `HAVING` filters groups *after* grouping.

---

## <a name="subqueries"></a>6. Subqueries

A query nested inside another query.

```sql
-- Find student with maximum marks
SELECT Name
FROM Students
WHERE Marks = (SELECT MAX(Marks) FROM Students);
```

---

## <a name="interview-questions"></a>7. Interview Questions

### Q1: Order of Execution in SQL?
**Answer:**
1.  `FROM` / `JOIN`
2.  `WHERE`
3.  `GROUP BY`
4.  `HAVING`
5.  `SELECT`
6.  `ORDER BY`
7.  `LIMIT`

### Q2: What is a Self Join?
**Answer:**
A regular join but the table is joined with itself.
Example: Employee table with `ManagerID` (which refers to `EmployeeID`).
```sql
SELECT E.Name AS Employee, M.Name AS Manager
FROM Employees E
JOIN Employees M ON E.ManagerID = M.EmployeeID;
```

### Q3: `UNION` vs `UNION ALL`?
**Answer:**
-   `UNION`: Combines results and **removes** duplicates. Slower.
-   `UNION ALL`: Combines results and **keeps** duplicates. Faster.

### Q4: How to find top 3 salaries?
**Answer:**
```sql
SELECT * FROM Employees
ORDER BY Salary DESC
LIMIT 3;
```
(Or use `RANK()` window function for ties).

### Q5: How to delete duplicate rows?
**Answer:**
Using `ROW_NUMBER()` or a temporary table.
```sql
DELETE FROM Table
WHERE ID NOT IN (
    SELECT MAX(ID) FROM Table GROUP BY DuplicateColumn
);
```

---

## <a name="mcqs"></a>8. Multiple Choice Questions

### MCQ 1
**Which keyword is used to sort results?**
A) `SORT BY`
B) `ORDER BY`
C) `GROUP BY`
D) `ALIGN BY`

<details>
<summary>Answer</summary>
**B) `ORDER BY`**
</details>

### MCQ 2
**What does `COUNT(*)` return?**
A) Number of distinct rows
B) Number of rows including NULLs
C) Number of non-NULL rows
D) Error

<details>
<summary>Answer</summary>
**B) Number of rows including NULLs**
</details>

### MCQ 3
**Which Join returns NULLs on the right side if no match found?**
A) Inner Join
B) Right Join
C) Left Join
D) Cross Join

<details>
<summary>Answer</summary>
**C) Left Join**
</details>

### MCQ 4
**Which function works with `GROUP BY`?**
A) `WHERE`
B) `HAVING`
C) `FILTER`
D) `CHECK`

<details>
<summary>Answer</summary>
**B) `HAVING`**
</details>

### MCQ 5
**`DROP TABLE` is a command of which sub-language?**
A) DML
B) DCL
C) DDL
D) TCL

<details>
<summary>Answer</summary>
**C) DDL**
</details>

---

## <a name="challenges"></a>9. Practice Challenges

### Challenge 1: Second Highest Salary
**Task:** Write a query to find the second highest salary from `Employees`.

<details>
<summary>Solution</summary>

```sql
-- Method 1: Limit/Offset
SELECT Salary FROM Employees
ORDER BY Salary DESC
LIMIT 1 OFFSET 1;

-- Method 2: Subquery
SELECT MAX(Salary) FROM Employees
WHERE Salary < (SELECT MAX(Salary) FROM Employees);
```
</details>

### Challenge 2: Employees Hired in Last 30 Days
**Task:** Write a query to select employees joined in last 30 days.

```sql
SELECT * FROM Employees
WHERE JoinDate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);
```

### Challenge 3: Department with Max Employees
**Task:** Find the department name with maximum number of employees.

```sql
SELECT DepName
FROM Departments
JOIN Employees ON Departments.ID = Employees.DepID
GROUP BY DepName
ORDER BY COUNT(*) DESC
LIMIT 1;
```

---

## <a name="references"></a>10. References

-   W3Schools SQL Tutorial.
-   LeetCode SQL Problems.

---

## 🎯 Key Takeaways

1.  **Select efficiently:** Avoid `SELECT *`.
2.  **Index keys:** Foreign keys should be indexed for faster joins.
3.  **Understand Joins:** Visualizing Venn diagrams helps.
