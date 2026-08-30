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

###### ------------------------------------------------------------------

###### ------------------------------------------------------------------

###### ------------------------- U I ------------------------------------

###### ------------------------------------------------------------------

Design a complete, modern UI/UX system for a web-based **Grocery Store Inventory Management System**.

## Product Context

The application is designed for small and medium-sized grocery stores. It allows store owners and staff to manage products, categories, inventory, stock movements, purchases, and reports.

The application will initially be a **desktop-first web application**, but the design should also be responsive and work well on tablets.

A mobile application will be developed in a later stage using the same backend and database, so the web UI should establish a clear and reusable design system.

The application should feel:

- Clean
- Modern
- Practical
- Professional
- Friendly
- Easy to learn
- Fast to navigate
- Suitable for everyday store operations

Avoid making it look like a corporate enterprise ERP. It should feel like a polished SaaS product designed specifically for small grocery businesses.

---

# Design Direction

Use a clean, minimal dashboard aesthetic with:

- Light background
- Clear visual hierarchy
- Generous spacing
- Rounded cards and controls
- Subtle borders and shadows
- Highly readable typography
- Clear status indicators
- Simple icons
- Consistent spacing
- Accessible contrast

Use a restrained color palette.

The primary brand color should be a fresh green associated with groceries, freshness, and inventory.

Use neutral colors for most of the interface and reserve stronger colors for:

- Success
- Warning
- Error
- Low stock
- Out of stock
- Important actions

Do not overuse bright colors.

The interface should prioritize usability over decoration.

---

# Global Layout

Use a standard application layout:

┌─────────────────────────────────────────────────────────────┐
│ Logo / Store Name Search Notifications │
├───────────────┬─────────────────────────────────────────────┤
│ │ │
│ Dashboard │ │
│ Products │ │
│ Categories │ Main Content │
│ Inventory │ │
│ Purchases │ │
│ Reports │ │
│ │ │
│ │ │
│ Settings │ │
│ │ │
│ User Profile │ │
└───────────────┴─────────────────────────────────────────────┘

Use a persistent left sidebar on desktop.

The sidebar should be collapsible.

On smaller screens, convert the sidebar into a mobile/tablet navigation pattern.

---

# Brand / Header

Create a simple placeholder brand identity.

Use the name:

**Grocin**

The logo should be simple and modern, potentially incorporating a grocery basket, shopping bag, leaf, or abstract inventory symbol.

The header should contain:

- Store name
- Global search
- Notification icon
- User profile
- Optional quick-add button

---

# Screen 1 — Dashboard

Create the main inventory dashboard.

Header:

**Dashboard**

Subtitle:

"Overview of your store inventory"

Include summary cards:

1. Total Products
2. Low Stock
3. Out of Stock
4. Inventory Value

Example:

Total Products
248

Low Stock
12

Out of Stock
4

Inventory Value
₹1,42,500

Below the cards, create:

### Low Stock Products

A table showing:

- Product
- Category
- Current Stock
- Minimum Stock
- Status
- Action

Example:

Rice 5kg | Rice & Grains | 4 | 10 | Low Stock | View

Milk 1L | Dairy | 6 | 15 | Low Stock | View

Sugar 1kg | Grocery | 3 | 8 | Low Stock | View

### Recent Stock Movements

Show:

- Product
- Movement type
- Quantity
- Date
- User

Examples:

Rice 5kg | Purchase | +50 | Today

Milk 1L | Sale | -5 | Today

Sugar 1kg | Adjustment | -2 | Yesterday

Add a "View All" action.

---

# Screen 2 — Products

Create a complete product management page.

Header:

**Products**

Primary action:

**+ Add Product**

Include:

- Search bar
- Category filter
- Stock status filter
- Active/inactive filter
- Sort control

Product table:

| Product | SKU | Category | Stock | Price | Status | Actions |

Example products:

Rice 5kg
RICE-5KG-001
Rice & Grains
25
₹320
In Stock

Milk 1L
MILK-1L-001
Dairy
4
₹65
Low Stock

Sugar 1kg
SUGAR-1KG-001
Grocery
0
₹55
Out of Stock

Use status badges.

Provide row actions such as:

- View
- Edit
- Adjust Stock
- Deactivate

---

# Screen 3 — Add Product

Create a clean product creation form.

Title:

**Add Product**

Organize the form into logical sections.

### Basic Information

- Product Name
- SKU
- Barcode
- Brand
- Category

### Pricing

- Cost Price
- Selling Price

### Inventory

- Unit
- Initial Stock
- Minimum Stock
- Maximum Stock

### Additional Information

- Expiry Date
- Product Status

Buttons:

**Cancel**

**Save Product**

The form should clearly indicate required fields.

Use helpful validation states.

---

# Screen 4 — Product Details

Create a detailed product page.

Header:

**Rice 5kg**

Show:

- Product image placeholder
- Product name
- SKU
- Barcode
- Category
- Brand
- Current stock
- Stock status
- Cost price
- Selling price

Include a prominent stock summary:

Current Stock
25

Minimum Stock
10

Status
In Stock

Then create:

### Stock Movement History

Table:

Date | Type | Quantity | Reference | Notes

Example:

30 Aug | Purchase | +50 | PO-001 | Weekly stock delivery

29 Aug | Sale | -10 | SALE-105 | Customer purchase

28 Aug | Adjustment | -2 | ADJ-001 | Physical count

Actions:

- Edit Product
- Adjust Stock
- Add Stock

---

# Screen 5 — Inventory / Stock Management

Create a dedicated inventory page.

Header:

**Inventory**

Include quick actions:

**Receive Stock**

**Adjust Stock**

**Record Damage**

**Record Expiry**

Show inventory table:

Product | Current Stock | Minimum | Maximum | Status

Provide filters for:

- Category
- Stock status
- Expiry
- Recently updated

Use visual indicators for low and out-of-stock products.

---

# Screen 6 — Receive Stock

Create a stock receiving workflow.

Title:

**Receive Stock**

Form:

Product
[Search/select product]

Quantity
[Input]

Supplier
[Select supplier]

Cost Price
[Input]

Reference
[Input]

Notes
[Textarea]

Show a preview:

Product: Rice 5kg

Current Stock: 25

Quantity Received: +50

New Stock: 75

Primary button:

**Receive Stock**

The interface should make the stock change extremely clear before confirmation.

---

# Screen 7 — Stock Adjustment

Create a stock adjustment interface.

Title:

**Adjust Stock**

Show:

Product

Current System Stock

Physical Stock

Difference

Reason

Example:

System Stock: 50

Physical Stock: 47

Difference: -3

Reason:
"Physical stock count"

Primary action:

**Confirm Adjustment**

Make potentially destructive inventory changes visually clear and require confirmation.

---

# Screen 8 — Categories

Create a category management page.

Header:

**Categories**

Primary action:

**+ Add Category**

Display categories as clean cards or a table.

Examples:

Rice & Grains
32 products

Beverages
45 products

Snacks
51 products

Dairy
28 products

Each category should have:

- Name
- Description
- Number of products
- Edit action
- Delete/deactivate action

---

# Screen 9 — Stock Movement History

Create a page showing the complete inventory audit trail.

Header:

**Stock Movements**

Include filters:

- Product
- Movement Type
- Date Range
- User

Movement types:

PURCHASE
SALE
RETURN
DAMAGE
EXPIRY
ADJUSTMENT

Table:

Date | Product | Type | Quantity | Reference | User

Use positive/negative visual indicators for quantities.

---

# Screen 10 — Reports

Create a reports dashboard.

Title:

**Reports**

Create report cards:

- Current Inventory
- Low Stock
- Out of Stock
- Inventory Valuation
- Stock Movements
- Expiring Products

Include date filters where appropriate.

Provide export actions:

**Export CSV**

**Export Excel**

---

# Screen 11 — Settings

Create a simple settings page.

Sections:

### Store Information

- Store Name
- Address
- Phone
- Email

### Inventory Settings

- Default minimum stock
- Allow negative stock
- Default unit

### User Settings

- Profile
- Password
- Notifications

---

# Responsive Design

Design desktop and tablet versions.

The application must remain usable on smaller screens.

For smaller screens:

- Collapse sidebar
- Use responsive tables
- Convert complex tables into cards when necessary
- Keep primary actions easily accessible
- Make forms single-column
- Maintain readable font sizes
- Avoid horizontal scrolling wherever possible

---

# Component Design System

Create reusable UI components for:

### Buttons

- Primary
- Secondary
- Destructive
- Ghost
- Icon

### Inputs

- Text
- Number
- Search
- Select
- Date
- Textarea

### Status Badges

- In Stock
- Low Stock
- Out of Stock
- Active
- Inactive

### Cards

- Summary cards
- Product cards
- Category cards
- Report cards

### Tables

- Sortable columns
- Pagination
- Row actions
- Empty states
- Loading states

### Feedback

- Success toast
- Error toast
- Warning alert
- Confirmation dialog

---

# Important UX Requirements

The application will be used frequently by store staff, so prioritize speed and simplicity.

Users should be able to:

- Find a product quickly
- See current stock immediately
- Add stock with minimal clicks
- Adjust stock safely
- Identify low-stock items instantly
- Search by barcode/SKU/product name
- Understand why stock changed

Avoid unnecessary animations.

Avoid excessive popups.

Avoid complicated navigation.

Primary workflows should require as few steps as reasonably possible.

---

# Empty States

Design empty states for:

- No products
- No categories
- No stock movements
- No low-stock products
- No search results
- No reports

Example:

"No products yet"

"Add your first product to start managing your inventory."

Button:

"+ Add Product"

---

# Loading States

Design loading states for:

- Dashboard
- Product table
- Product details
- Stock movements
- Reports

Use skeleton loaders rather than blocking the entire page.

---

# Error States

Create clear error states for:

- Database errors
- Failed product creation
- Failed stock update
- Invalid form input
- Network failure

Errors should explain what happened and what the user can do next.

---

# Accessibility

The UI should follow good accessibility practices.

Ensure:

- Sufficient color contrast
- Clear focus states
- Keyboard navigation
- Descriptive labels
- Accessible buttons
- Icons paired with labels where necessary
- Status should not rely on color alone

---

# Design Deliverables

Create:

1. Complete dashboard
2. Product list
3. Add product form
4. Product details
5. Inventory page
6. Receive stock form
7. Stock adjustment form
8. Categories
9. Stock movement history
10. Reports
11. Settings
12. Responsive/tablet versions
13. Reusable component/design system
14. Empty states
15. Loading states
16. Error states
17. Confirmation dialogs

Maintain consistent spacing, typography, colors, components, and interaction patterns across all screens.

The final design should be realistic enough to implement directly in a **Next.js + TypeScript + Tailwind CSS + shadcn/ui** application.
