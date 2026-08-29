# Grocery Inventory Management System

A simple, modern inventory management system designed for small and medium-sized grocery stores.

The system will initially be developed as a **web application** and will use **PostgreSQL** as its primary database. A **mobile application** will be developed in a later stage to allow store owners and staff to manage inventory from phones and tablets.

---

## Technology Stack

### Web Application

| Layer         | Technology                              |
| ------------- | --------------------------------------- |
| Frontend      | Next.js                                 |
| Language      | TypeScript                              |
| Styling       | Tailwind CSS                            |
| UI Components | shadcn/ui                               |
| Backend       | Next.js Server Actions / Route Handlers |
| Database      | **PostgreSQL**                          |
| ORM           | Drizzle ORM                             |
| Validation    | Zod                                     |

### Future Mobile Application

A mobile application will be developed during a later stage of the project.

The mobile application will allow users to:

- View inventory
- Search products
- Check stock levels
- Receive stock
- Record stock adjustments
- View stock movement history
- Scan product barcodes
- Receive low-stock notifications

The mobile application will use the same PostgreSQL-backed system and backend APIs as the web application.

The exact mobile technology will be decided during the mobile-development phase.

---

# Architecture

The initial system will use a relatively simple architecture:

```text
                         Users
                           |
              +------------+------------+
              |                         |
              v                         v
        Web Application           Mobile Application
          (Next.js)                (Future Stage)
              |                         |
              +------------+------------+
                           |
                           v
                   Application Backend
                    (Next.js Backend)
                           |
                           v
                     Drizzle ORM
                           |
                           v
                      PostgreSQL
```

The web application will be developed first.

The mobile application will be introduced later and will communicate with the same backend and database.

---

# Database

## PostgreSQL

**PostgreSQL is the primary database for the project.**

It will store:

- Products
- Categories
- Stock levels
- Stock movements
- Suppliers
- Purchases
- Users
- User roles
- Sales
- Other application data

PostgreSQL was selected because it provides:

- Reliable relational data storage
- Strong transaction support
- Foreign keys and constraints
- Excellent querying capabilities
- Good support for reporting
- Strong ecosystem support
- Easy integration with Drizzle ORM
- A good foundation for future growth

---

# Database Architecture

The database will initially contain the following core tables:

```text
categories
    |
    +----< products
                |
                +----< stock_movements
```

Additional tables will be introduced as new features are implemented.

A possible future database structure:

```text
users
  |
  +----< stock_movements
  |
  +----< sales

categories
  |
  +----< products
              |
              +----< stock_movements
              |
              +----< sale_items
              |
              +----< purchase_items

suppliers
  |
  +----< purchases
              |
              +----< purchase_items

sales
  |
  +----< sale_items
```

---

# Development Roadmap

The project will be developed incrementally.

## Phase 1 — Project Setup

- [ ] Create Next.js project
- [ ] Configure TypeScript
- [ ] Configure Tailwind CSS
- [ ] Configure shadcn/ui
- [ ] Set up PostgreSQL
- [ ] Configure Drizzle ORM
- [ ] Configure database migrations
- [ ] Establish project structure

---

## Phase 2 — Product Management

- [ ] Create categories
- [ ] Create products
- [ ] Edit products
- [ ] Deactivate products
- [ ] Search products
- [ ] Filter products
- [ ] Product details page

---

## Phase 3 — Inventory Management

- [ ] Receive stock
- [ ] Remove stock
- [ ] Stock adjustments
- [ ] Record damaged stock
- [ ] Record expired stock
- [ ] Record returned stock
- [ ] Stock movement history
- [ ] Low-stock detection
- [ ] Out-of-stock detection

---

## Phase 4 — Dashboard

- [ ] Total product count
- [ ] Total inventory value
- [ ] Low-stock products
- [ ] Out-of-stock products
- [ ] Recent stock movements
- [ ] Inventory statistics

---

## Phase 5 — Reports

- [ ] Current inventory report
- [ ] Stock movement report
- [ ] Low-stock report
- [ ] Out-of-stock report
- [ ] Inventory valuation
- [ ] Expiry report

---

## Phase 6 — Authentication & Users

- [ ] User authentication
- [ ] User accounts
- [ ] Roles and permissions
- [ ] Admin functionality
- [ ] Staff functionality
- [ ] Activity tracking

---

## Phase 7 — Suppliers & Purchases

- [ ] Supplier management
- [ ] Purchase records
- [ ] Purchase history
- [ ] Purchase pricing
- [ ] Purchase orders
- [ ] Supplier-specific reports

---

## Phase 8 — Barcode Support

- [ ] Product barcode field
- [ ] Barcode search
- [ ] Barcode scanning
- [ ] Camera-based scanning
- [ ] Barcode-based stock operations

---

# Phase 9 — Mobile Application

After the core web application is stable, a dedicated mobile application will be developed.

The mobile application will share the same backend and PostgreSQL database.

### Initial Mobile Features

```text
Login
  |
  v
Dashboard
  |
  +-- Products
  |
  +-- Search
  |
  +-- Scan Barcode
  |
  +-- Receive Stock
  |
  +-- Adjust Stock
  |
  +-- Stock History
  |
  +-- Low Stock
```

The mobile application will be designed primarily for quick, everyday inventory operations.

For example:

```text
Staff receives delivery
        |
        v
Open mobile app
        |
        v
Scan barcode
        |
        v
Product found
        |
        v
Enter quantity
        |
        v
Confirm
        |
        v
Stock updated
```

This should make inventory management possible without requiring staff to sit at a computer.

---

# Phase 10 — Point of Sale (POS)

A POS system can be added after the inventory system is stable.

The eventual workflow could be:

```text
Customer Purchase
       |
       v
     POS
       |
       +------> Sale Record
       |
       +------> Stock Movement
       |
       v
Inventory Updated
```

This will allow sales to automatically reduce inventory.

---

# Phase 11 — Advanced Features

Potential future features include:

- [ ] Multiple store/branch support
- [ ] Inventory transfers between stores
- [ ] Advanced analytics
- [ ] Sales analytics
- [ ] Profit reports
- [ ] Expiry notifications
- [ ] Low-stock notifications
- [ ] Push notifications
- [ ] Offline mobile support
- [ ] Data synchronization
- [ ] Automated backups
- [ ] Export to CSV/Excel
- [ ] GST/invoice support

---

# Long-Term Architecture

The intended long-term system will look approximately like this:

```text
                         ┌──────────────────┐
                         │   Web Application │
                         │     Next.js      │
                         └────────┬─────────┘
                                  │
                                  │
                         ┌────────▼─────────┐
                         │                  │
                         │     Backend      │
                         │                  │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    v                           v
           ┌────────────────┐          ┌────────────────┐
           │ PostgreSQL     │          │ Future Services │
           │                │          │                │
           │ Inventory      │          │ Notifications  │
           │ Products       │          │ File Storage   │
           │ Sales          │          │ Analytics      │
           │ Purchases      │          │ etc.           │
           └────────────────┘          └────────────────┘
                    ▲
                    │
                    │
           ┌────────┴────────┐
           │                 │
           │                 │
     ┌─────┴─────┐     ┌─────┴─────┐
     │   Mobile  │     │   Future  │
     │    App    │     │   Clients │
     │           │     │           │
     └───────────┘     └───────────┘
```

The architecture should remain simple until there is a genuine need to introduce additional services.

---

# Project Development Philosophy

The project will follow these principles:

### 1. Build the web application first

The web application will establish the core business logic and inventory workflows.

### 2. PostgreSQL is the source of truth

Inventory and transactional data will be stored in PostgreSQL.

### 3. Maintain an audit trail

Every stock change should have a corresponding stock movement.

### 4. Keep business logic centralized

The web and mobile applications should use the same backend business rules rather than independently implementing inventory calculations.

### 5. Mobile comes after the core system

The mobile application will be developed once the core inventory functionality is stable.

### 6. Avoid premature complexity

The project will initially avoid unnecessary:

```text
Microservices
Kubernetes
Message queues
Redis
Multiple databases
Complex infrastructure
```

These technologies can be introduced later if actual requirements justify them.

---

# Recommended Development Order

The overall development path is:

```text
Next.js Setup
      ↓
PostgreSQL Setup
      ↓
Drizzle ORM
      ↓
Database Schema
      ↓
Product Management
      ↓
Stock Management
      ↓
Dashboard
      ↓
Reports
      ↓
Authentication
      ↓
Suppliers & Purchases
      ↓
Barcode Scanning
      ↓
Web Application Stable
      ↓
Mobile Application
      ↓
POS
      ↓
Advanced Features
```

The goal is to have a **fully functional inventory management system before beginning mobile development**, so the mobile application becomes another client for an already-established system rather than duplicating the core business logic.
