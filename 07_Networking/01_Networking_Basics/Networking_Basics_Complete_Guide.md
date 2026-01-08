# Networking Basics: Complete Guide

> **Module:** Networking
> **Topic:** OSI Model, TCP/IP, and IP Addressing
> **Duration:** 1 hour

## 📚 Table of Contents

1. [What is a Network?](#network)
2. [Types of Networks](#types)
3. [OSI Model (7 Layers)](#osi)
4. [TCP/IP Model](#tcpip)
5. [IP Addressing (IPv4 vs IPv6)](#ip)
6. [Interview Questions](#interview-questions)
7. [Multiple Choice Questions](#mcqs)
8. [Practice Challenges](#challenges)
9. [References](#references)

---

## <a name="network"></a>1. What is a Network?

A computer network is a set of computers sharing resources located on or provided by network nodes.
-   **Nodes:** Computers, Servers, Routers, Switches.
-   **Links:** Cables (Ethernet), Wireless (Wi-Fi).

---

## <a name="types"></a>2. Types of Networks

1.  **LAN (Local Area Network):** Covers a small area (Home, Office). High speed.
2.  **WAN (Wide Area Network):** Covers large distance (Internet). Slower.
3.  **MAN (Metropolitan Area Network):** Covers a city (Cable TV).
4.  **PAN (Personal Area Network):** Individual workspace (Bluetooth).

---

## <a name="osi"></a>3. OSI Model (7 Layers)

**Open Systems Interconnection (OSI)** model is a conceptual framework describing networking.

| Layer | Name | Function | Protocol Examples | Device |
| :--- | :--- | :--- | :--- | :--- |
| 7 | **Application** | End-user interface. | HTTP, SMTP, FTP | PC/Phone |
| 6 | **Presentation** | Encryption, Compress, Format. | SSL/TLS, JPEG | PC |
| 5 | **Session** | Session management. | NetBIOS, RPC | PC |
| 4 | **Transport** | End-to-end delivery, Reliability. | TCP, UDP | PC/Firewall |
| 3 | **Network** | Routing, Logical Addressing (IP). | IP, ICMP | Router |
| 2 | **Data Link** | Physical Addressing (MAC), Error check. | Ethernet, Wi-Fi | Switch |
| 1 | **Physical** | Bits on wire. | Cables, Hubs | Hub, Cable |

> **Mnemonic:** **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way (Physical -> Application).

---

## <a name="tcpip"></a>4. TCP/IP Model

The implementation model used by the Internet. It simplifies OSI into 4 layers.

1.  **Application Layer:** (Combines OSI App, Pres, Sess). HTTP, DNS, SSH.
2.  **Transport Layer:** TCP, UDP.
3.  **Internet Layer:** IP, ICMP, ARP.
4.  **Network Access Layer:** (Combines OSI Data Link, Physical). Ethernet.

---

## <a name="ip"></a>5. IP Addressing

An **IP (Internet Protocol) Address** is a numerical label assigned to each device.

### IPv4
-   32-bit address.
-   Notation: `192.168.1.1`.
-   Classes:
    -   Class A: `1.0.0.0` - `126.x.x.x` (Directly connects to Internet, Huge networks).
    -   Class C: `192.168.x.x` (Small networks).
-   **Private IPs:** `192.168.x.x`, `10.x.x.x` (Not routable on Internet).

### IPv6
-   128-bit address.
-   Hexadecimal Notation: `2001:0db8:85a3::8a2e:0370:7334`.
-   Created because we ran out of IPv4 addresses.

### MAC Address
-   Physical address burned into NIC card.
-   48-bit hex: `00:1A:2B:3C:4D:5E`.
-   Used for local delivery (within LAN).

---

## <a name="interview-questions"></a>6. Interview Questions

### Q1: TCP vs UDP?
**Answer:**
-   **TCP (Transmission Control Protocol):** Connection-oriented. Reliable (Ack). Ordered. Slower. (Email, Web).
-   **UDP (User Datagram Protocol):** Connectionless. Unreliable (Fire and Forget). Unordered. Faster. (Video Streaming, Gaming).

### Q2: What happens when you type `google.com` in browser?
**Answer:**
1.  **DNS Lookup:** Browser asks DNS server for IP of google.com.
2.  **TCP Handshake:** Browser initiates TCP connection with that IP (SYN, SYN-ACK, ACK).
3.  **HTTP Request:** Browser sends GET request.
4.  **Server Response:** Server sends HTML content.
5.  **Rendering:** Browser parses HTML/CSS.

### Q3: What is ARP?
**Answer:**
**Address Resolution Protocol.** Used to find the MAC address associated with a known IP address within a LAN.

### Q4: Difference between Router and Switch?
**Answer:**
-   **Switch:** Layer 2. Connects devices in a *single network*. Uses MAC addresses.
-   **Router:** Layer 3. Connects *different networks*. Uses IP addresses.

### Q5: What is DHCP?
**Answer:**
**Dynamic Host Configuration Protocol.** Automatically assigns IP addresses to devices when they join a network.

---

## <a name="mcqs"></a>7. Multiple Choice Questions

### MCQ 1
**Which layer provides encryption?**
A) Application
B) Presentation
C) Session
D) Transport

<details>
<summary>Answer</summary>
**B) Presentation**
</details>

### MCQ 2
**Which protocol is used for secure web browsing?**
A) HTTP
B) FTP
C) HTTPS
D) SSH

<details>
<summary>Answer</summary>
**C) HTTPS**
</details>

### MCQ 3
**How many bits are in an IPv4 address?**
A) 32
B) 64
C) 128
D) 48

<details>
<summary>Answer</summary>
**A) 32**
</details>

### MCQ 4
**Ping uses which protocol?**
A) TCP
B) UDP
C) ICMP
D) ARP

<details>
<summary>Answer</summary>
**C) ICMP**
</details>

---

## <a name="challenges"></a>8. Practice Challenges

### Challenge 1: Subnetting
**Task:** Given IP `192.168.1.0/24`. How many usable hosts are there?
**Solution:**
-   /24 means 24 bits for Network, 8 bits for Host.
-   2^8 = 256.
-   Subtract Network Address (`.0`) and Broadcast Address (`.255`).
-   Usable: 254.

### Challenge 2: Protocol Analysis
**Task:** Identify the port numbers for:
-   HTTP (80)
-   HTTPS (443)
-   SSH (22)
-   DNS (53)
-   FTP (21)

---

## <a name="references"></a>9. References

-   **"Computer Networking: A Top-Down Approach"** by Kurose & Ross.
-   Cisco CCNA Guides.

---

## 🎯 Key Takeaways

1.  **Layers:** Understanding OSI helps troubleshoot (Is it Physical? Is it Application?).
2.  **TCP vs UDP:** Know when to use which.
3.  **DNS:** It's the phonebook of the Internet.
