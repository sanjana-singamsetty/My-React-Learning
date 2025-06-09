# Common Network Protocols Explained

## HTTP/HTTPS

- **HTTP (HyperText Transfer Protocol)** is the foundation of data communication for the World Wide Web. It defines how messages are formatted and transmitted, and how web servers and browsers should respond to various commands.
- **HTTPS (HTTP Secure)** is the secure version of HTTP. It uses encryption protocols like SSL/TLS to secure data transfer between the client and server, protecting sensitive information from eavesdroppers.

**Use Case:** Browsing websites, submitting forms, online shopping.

---

## FTP (File Transfer Protocol)

- **FTP** is a standard network protocol used to transfer files from one host to another over a TCP-based network, such as the Internet.
- It allows users to upload, download, rename, delete, and move files on a remote server.

**Use Case:** Website maintenance, large file transfers between computers.

---

## SMTP (Simple Mail Transfer Protocol)

- **SMTP** is the protocol used to send emails from a client to a server or between servers.
- It works closely with other protocols like POP3 or IMAP, which are used to retrieve emails from the server.

**Use Case:** Sending outgoing emails from email clients or servers.

---

## TCP (Transmission Control Protocol)

- **TCP** is a connection-oriented protocol that ensures reliable, ordered, and error-checked delivery of data between applications.
- It establishes a connection before transmitting data and guarantees that data packets arrive in sequence and without errors.

**Use Case:** Web browsing, email, file transfers—any application where data integrity is crucial.

---

## UDP (User Datagram Protocol)

- **UDP** is a connectionless protocol that allows for fast data transmission without guaranteeing delivery, order, or error checking.
- It is suitable for applications where speed is more important than reliability.

**Use Case:** Streaming video/audio, online gaming, VoIP.

---

## IP (Internet Protocol)

- **IP** is responsible for addressing and routing packets of data so they can travel across networks and arrive at the correct destination.
- It works with both TCP and UDP to deliver data.

**Use Case:** Every device on a network uses IP addresses for communication.

---

## ICMP (Internet Control Message Protocol)

- **ICMP** is used for network diagnostics and error reporting.
- Commonly used by tools like `ping` and `traceroute` to test connectivity and diagnose network issues.

**Use Case:** Network troubleshooting, reporting unreachable hosts.

---

![TCP/IP Protocols Diagram](https://media.geeksforgeeks.org/wp-content/uploads/20240903112915/TCP-IP-Protocols-copy.webp)
