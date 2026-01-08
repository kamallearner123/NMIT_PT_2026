# Database Basics: Complete Guide

> **Module:** RDBMS
> **Topic:** Relational Models, Normalization, ACID Properties
> **Duration:** 1 hour

## 📚 Table of Contents

1. [Introduction to DBMS & RDBMS](#intro)
2. [ACID Properties](#acid)
3. [Keys in DBMS](#keys)
4. [Normalization](#normalization)
5. [Case Study: Banking System](#case-study)
6. [Interview Questions](#interview-questions)
7. [Multiple Choice Questions](#mcqs)
8. [Practice Challenges](#challenges)
9. [References](#references)

---

## <a name="intro"></a>1. Introduction to DBMS & RDBMS

-   **DBMS (Database Management System):** Software to store and manage data (e.g., File System, XML).
-   **RDBMS (Relational DBMS):** Stores data in **Tables** (Rows/Columns). Enforces relationships between tables. (e.g., MySQL, PostgreSQL, Oracle).

### Key Terms
-   **Table (Relation):** Collection of related data.
-   **Row (Tuple/Record):** A single entry.
-   **Column (Attribute/Field):** Specific characteristic.
-   **Schema:** The structure/blueprint of the database.

---

## <a name="acid"></a>2. ACID Properties

To ensure data integrity, RDBMS transactions follow ACID:

1.  **Atomicity:** All or Nothing. If one part fails, entire transaction is rolled back.
2.  **Consistency:** Database must remain in a valid state before and after transaction.
3.  **Isolation:** Concurrent transactions should not interfere with each other.
4.  **Durability:** Once committed, changes are permanent (even if power fails).

---

## <a name="keys"></a>3. Keys in DBMS

Keys uniquely identify a record.

1.  **Primary Key (PK):** Unique identifier. Cannot be NULL. (e.g., `Student_ID`).
2.  **Candidate Key:** Any key that *could* be a PK.
3.  **Foreign Key (FK):** Links to a PK in another table. Establishes relationship.
4.  **Composite Key:** Combination of multiple columns to act as PK.
5.  **Super Key:** Set of one or more keys that can identify a record.

---

## <a name="normalization"></a>4. Normalization

Process of organizing data to reduce **redundancy** and improve **integrity**.

### Normal Forms
1.  **1NF (First Normal Form):** Atomic values. No repeating groups/arrays in a cell.
2.  **2NF:** 1NF + No Partial Dependency (All non-key attributes depend on *full* PK).
3.  **3NF:** 2NF + No Transitive Dependency (Non-key attribute A depends on B, which depends on PK).
4.  **BCNF:** Slightly stronger version of 3NF.

> **Goal:** "The Key, the whole Key, and nothing but the Key (so help me Codd)."

---

## <a name="case-study"></a>5. Case Study: Banking System

**Requirements:**
-   Users have Accounts.
-   Users make Transactions.

**Schema Design:**
1.  **Users Table:**
    -   `user_id` (PK)
    -   `name`
    -   `email`

2.  **Accounts Table:**
    -   `account_id` (PK)
    -   `user_id` (FK)
    -   `balance`
    -   `type` (Savings/Current)

3.  **Transactions Table:**
    -   `transaction_id` (PK)
    -   `from_account_id` (FK)
    -   `to_account_id` (FK)
    -   `amount`
    -   `timestamp`

---

## <a name="interview-questions"></a>6. Interview Questions

### Q1: Difference between DELETE and TRUNCATE?
**Answer:**
-   **DELETE:** DML command. Deletes rows one by one. Can be rolled back. Slower.
-   **TRUNCATE:** DDL command. Deletes all rows by deallocating pages. Cannot be rolled back (usually). Faster.

### Q2: What is a View?
**Answer:**
A virtual table based on a SQL query result. It does not store data itself (unless Materialized View). Used to simplify complex queries or restrict access to specific columns.

### Q3: Explain "Index".
**Answer:**
A data structure (usually B-Tree) that improves the speed of data retrieval operations on a table at the cost of additional writes and storage space.

### Q4: What is Denormalization?
**Answer:**
The process of adding redundancy to a normalized database to improve read performance (avoiding expensive Joins). Used in Data Warehousing.

### Q5: Explain the types of Relationships.
**Answer:**
-   **One-to-One:** User <-> Passport.
-   **One-to-Many:** User <-> Orders.
-   **Many-to-Many:** Students <-> Courses (Requires a Junction Table).

---

## <a name="mcqs"></a>7. Multiple Choice Questions

### MCQ 1
**Which property ensures "All or Nothing"?**
A) Atomicity
B) Consistency
C) Isolation
D) Durability

<details>
<summary>Answer</summary>
**A) Atomicity**
</details>

### MCQ 2
**A Foreign Key must link to?**
A) Any column
B) Primary Key (or Unique Key) of another table
C) First column only
D) Integer column only

<details>
<summary>Answer</summary>
**B) Primary Key (or Unique Key) of another table**
</details>

### MCQ 3
**1NF requires?**
A) Unique rows
B) Atomic values
C) No transitive dependency
D) Two primary keys

<details>
<summary>Answer</summary>
**B) Atomic values**
</details>

### MCQ 4
**Which is faster for removing all records?**
A) DELETE
B) TRUNCATE
C) DROP
D) REMOVE

<details>
<summary>Answer</summary>
**B) TRUNCATE** (DROP removes table structure too).
</details>

---

## <a name="challenges"></a>8. Practice Challenges

### Challenge 1: Normalization
**Task:** Given a table `Orders(Name, Address, Item, Price)`, explain why it violates 2NF or 3NF and break it down.
**Solution:** `Name` and `Address` depend on User, `Item` and `Price` depend on Product. Split into `Users`, `Products`, and `Orders` tables.

### Challenge 2: E-Commerce Schema
**Task:** Design a schema for Amazon.
-   Products, Categories, Users, Orders, Reviews.
-   Handle Many-to-Many (Product is in multiple Categories).

---

## <a name="references"></a>9. References

-   **"Database System Concepts"** by Korth.
-   SQLZoo.net.

---

## 🎯 Key Takeaways

1.  **ACID is crucial:** For financial/critical systems.
2.  **Normalization:** Reduces duplicate data but increases Joins (complexity).
3.  **Keys:** Foreign keys maintain referential integrity.
