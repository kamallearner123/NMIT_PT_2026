# Network Protocols & Components: Complete Guide

> **Module:** Networking
> **Topic:** HTTP, DNS, DHCP, Routers, and Switches
> **Duration:** 1 hour

## 📚 Table of Contents

1. [Common Protocols](#protocols)
    - [HTTP / HTTPS](#http)
    - [DNS](#dns)
    - [DHCP](#dhcp)
    - [FTP / SSH](#ftp)
2. [Network Components](#components)
    - [Router vs Switch vs Hub](#devices)
    - [Firewall](#firewall)
3. [Status Codes](#status-codes)
4. [Interview Questions](#interview-questions)
5. [Multiple Choice Questions](#mcqs)
6. [Practice Challenges](#challenges)
7. [References](#references)

---

## <a name="protocols"></a>1. Common Protocols

### <a name="http"></a>HTTP / HTTPS (HyperText Transfer Protocol)
-   **HTTP (Port 80):** Transmits data in clear text. Vulnerable to spying.
-   **HTTPS (Port 443):** HTTP + SSL/TLS. Encrypted communication.
-   **Methods:**
    -   `GET`: Retrieve data.
    -   `POST`: Submit data.
    -   `PUT`: Update data.
    -   `DELETE`: Remove data.

### <a name="dns"></a>DNS (Domain Name System)
Translates human-readable domain names (`google.com`) to IP addresses (`142.250.xxx.xxx`).
-   It acts like a phonebook.
-   **Records:**
    -   `A`: Maps Hostname to IPv4.
    -   `AAAA`: Maps Hostname to IPv6.
    -   `CNAME`: Alias for another domain.
    -   `MX`: Mail Exchange (for Email).

### <a name="dhcp"></a>DHCP (Dynamic Host Configuration Protocol)
Automatically assigns IP addresses, subnet masks, and gateways to devices on a network.
-   **DORA Process:**
    1.  **D**iscover: Client asks "Is there a DHCP server?"
    2.  **O**ffer: Server says "Yes, here is an IP."
    3.  **R**equest: Client says "I'll take it."
    4.  **A**cknowledge: Server says "Yours."

### <a name="ftp"></a>FTP / SSH
-   **FTP (File Transfer Protocol):** Port 21. Transfer files. Insecure.
-   **SSH (Secure Shell):** Port 22. Secure remote login.

---

## <a name="components"></a>2. Network Components

### <a name="devices"></a>Router vs Switch vs Hub

| Feature | Hub | Switch | Router |
| :--- | :--- | :--- | :--- |
| **Layer** | Physical (L1) | Data Link (L2) | Network (L3) |
| **Intelligence** | Dumb (Broadcasts to all) | Smart (Sends to specific MAC) | Smarter (Routes via IP) |
| **Domain** | Single Collision Domain | Separate Collision Domains | Separate Broadcast Domains |
| **Use** | Extinct (rare) | LAN connectivity | Connecting Networks (WAN) |

### <a name="firewall"></a>Firewall
A security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules.
-   **Packet Filtering:** Checks headers (IP/Port).
-   **Stateful:** Tracks connection state (e.g., allow IN only if OUT match).

---

## <a name="status-codes"></a>3. HTTP Status Codes

| Range | Class | Examples |
| :--- | :--- | :--- |
| **1xx** | Informational | 100 Continue |
| **2xx** | Success | **200 OK**, 201 Created |
| **3xx** | Redirection | **301 Moved Permanently**, 302 Found |
| **4xx** | Client Error | **400 Bad Request**, **401 Unauthorized**, **404 Not Found** |
| **5xx** | Server Error | **500 Internal Server Error**, **502 Bad Gateway** |

---

## <a name="interview-questions"></a>4. Interview Questions

### Q1: What is the difference between `GET` and `POST`?
**Answer:**
-   **GET:** Requests data. Parameters in URL. Limited size. Idempotent/Safe.
-   **POST:** Submits data. Parameters in Body. No size limit. Not Idempotent.

### Q2: What is SSL/TLS?
**Answer:**
**Secure Sockets Layer / Transport Layer Security.** Protocols for establishing authenticated and encrypted links between networked computers. It ensures privacy and data integrity.

### Q3: What is Localhost?
**Answer:**
Loopback address (`127.0.0.1`). It refers to "this computer". Used for testing networking applications without a network interface.

### Q4: What is a Gateway?
**Answer:**
A network node (router) that connects a local network to other networks (like the Internet). It acts as an entry/exit point.

### Q5: What is the purpose of Subnet Mask?
**Answer:**
It distinguishes the **Network** portion from the **Host** portion of an IP address. (e.g., `255.255.255.0` means first 3 bytes are Network).

---

## <a name="mcqs"></a>5. Multiple Choice Questions

### MCQ 1
**Which device operates at Layer 3 (Network)?**
A) Hub
B) Switch
C) Router
D) Repeater

<details>
<summary>Answer</summary>
**C) Router**
</details>

### MCQ 2
**Which port is used by HTTPS?**
A) 80
B) 21
C) 443
D) 8080

<details>
<summary>Answer</summary>
**C) 443**
</details>

### MCQ 3
**Which status code means "Not Found"?**
A) 200
B) 500
C) 404
D) 403

<details>
<summary>Answer</summary>
**C) 404**
</details>

### MCQ 4
**DNS maps Domain Names to?**
A) MAC Addresses
B) IP Addresses
C) Physical Addresses
D) Ports

<details>
<summary>Answer</summary>
**B) IP Addresses**
</details>

---

## <a name="challenges"></a>6. Practice Challenges

### Challenge 1: Browser DevTools
**Task:** Open Browser DevTools (F12) -> Network Tab. Visit `google.com`. Identify:
-   Request Method (GET)
-   Status Code (200)
-   Protocol (h3/http2)

### Challenge 2: Ping Test
**Task:** Run `ping 8.8.8.8` (Google DNS) vs `ping 127.0.0.1`. Compare the latency (time=xx ms).

### Challenge 3: Port Check
**Task:** Use `telnet google.com 80`. Type `GET / HTTP/1.1` and press Enter twice. Observe the raw HTTP response.

---

## <a name="references"></a>7. References

-   MDN Web Docs (HTTP).
-   Cloudflare Learning Center.

---

## 🎯 Key Takeaways

1.  **Know your codes:** 200, 404, 500 are expected knowledge.
2.  **Basic Security:** HTTPS is non-negotiable today.
3.  **Roles:** Router routes, Switch connects, Firewall protects.
