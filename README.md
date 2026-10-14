# LAX360 | Zepto-Reference Quick-Commerce Frontend Demo Prototype

An interactive, frontend-only quick-commerce demo prototype built for **LAX360**, benchmarked against Zepto's lightning-fast shopping and delivery experience.

---

## ⚡ Project Overview

This prototype delivers an end-to-end quick-commerce experience with **interactive order and delivery tracking**, featuring two interconnected presentation experiences:

1. **Customer Mobile Application**:
   - **Web Presentation Mode (`admin-panel/`)**: Vite + React JS (`.jsx`) + Tailwind CSS + React Router + Lucide Icons, rendered in a realistic smartphone bezel with dynamic island or full responsive mobile layout.
   - **Expo React Native App (`mobile-app/`)**: Pure JavaScript & JSX React Native app with React Navigation (Native Stack + Bottom Tabs), `@react-native-async-storage/async-storage`, and SVG schematic delivery tracking.
2. **Admin Operations Dashboard (`admin-panel/`)**:
   - Professional dark-store operations hub for live order queues, stage transitions, product catalog, categories, inventory alerts, delivery partner assignment, and live fleet telemetry.
3. **Synchronized Frontend Engine & Controllable Simulation**:
   - 100% shared state model across Customer and Admin screens.
   - Deterministic, controllable tracking simulation with real-time waypoint progression, animated rider marker, dynamic ETA countdown, and status synchronisation.

---

## 📂 Repository Structure

```text
zepto style mobile application/
├── admin-panel/               # Vite React JS Web App (Customer + Admin Dashboard)
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/         # Admin screens & operations layouts
│   │   │   ├── common/        # Top demo switcher toolbar & schematic tracking map
│   │   │   └── customer/      # Customer mobile screens (Home, Cart, Checkout, Tracking)
│   │   ├── context/           # AppContext state engine with localStorage persistence
│   │   ├── mock/              # Realistic multi-category seed dataset
│   │   ├── App.jsx            # All /app/* and /admin/* routes
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Tailwind CSS & Phone frame styling
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── mobile-app/                # Authentic Expo React Native Customer Mobile App
│   ├── src/
│   │   ├── components/        # Touch ProductCard, SVG SchematicTrackingMap
│   │   ├── context/           # React Native Context with AsyncStorage
│   │   ├── mock/              # Matching catalog and order seed data
│   │   ├── navigation/        # Bottom Tab Navigator + Native Stack Navigator
│   │   └── screens/           # Splash, Login, Home, Categories, Cart, Checkout, Tracking
│   ├── App.js                 # App root with SafeAreaProvider & NavigationContainer
│   ├── app.json               # Expo configuration
│   └── package.json
│
└── README.md                  # Complete documentation and presentation guide
```

---

## 🚀 How to Run Locally

### 1. Web Prototype & Admin Operations Dashboard (`admin-panel/`)

This is the recommended interface for desktop client presentations, as it allows seamless toggling between the **Customer Mobile View** and **Admin Dashboard** in a single browser window with live data synchronisation.

```bash
# Navigate to admin-panel
cd admin-panel

# Install dependencies (already prepared)
npm install

# Start Vite local development server
npm run dev
```

Open your browser at `http://localhost:5173`.

#### Suggested Presentation Routes:
- `/app` — Customer Mobile Home (promotional banners, 10-min delivery pill, category rails)
- `/app/categories` — Category split browser with sorting and in-stock filter
- `/app/product/:id` — Rich product detail with nutrition and storage instructions
- `/app/cart` — Cart drawer with free delivery meter, coupon drawer, and tip selector
- `/app/checkout` — Checkout with delivery instructions and mock payment selector
- `/app/track/:id` — **Live Schematic Route Tracking** with moving rider and dynamic ETA
- `/admin/dashboard` — Dark Store Operations Dashboard & Live Queue
- `/admin/orders` — Orders management with quick status transition buttons
- `/admin/orders/:id` — Detailed order view with partner assignment and live route
- `/admin/delivery-tracking` — Fleet Overview Map with all active riders
- `/admin/products` — Product catalog management (add, edit, delete, SKU)
- `/admin/inventory` — Stock levels with low-stock alerts and quick restock buttons
- `/admin/coupons` — Promo code engine with instant active toggles
- `/admin/reports` — Fulfillment SLA metrics and CSV/JSON data export

---

### 2. Customer Mobile App Direct Web Runner (`mobile-app/`)

The customer mobile app can be launched and tested **directly in any web browser** without requiring Expo Go, Metro Bundler, or any emulator or external platform:

```bash
# Navigate to mobile-app
cd mobile-app

# Install dependencies (if not already done)
npm install

# Start Vite browser development server on port 5174
npm run dev
```

Open your browser at **`http://localhost:5174`**.

- **Realistic Phone Frame**: Renders the authentic customer experience within an iPhone mockup bezel (with status bar, dynamic island, and location pill), plus a toggle to expand to full browser width.
- **Instant Testing**: Hot module reloading in <200ms with zero Metro/Expo bundler dependencies.
- **Standalone or Parallel**: Can be run concurrently alongside `admin-panel` (port 5173 for admin operations, port 5174 for dedicated customer experience).

#### Customer App Direct Routes (`http://localhost:5174`):
- `/` — Splash Screen & quick-start guest entry
- `/app` — Customer Home (search, promo carousel, category rails, flash 10-min tags)
- `/app/login` — Simulated phone & OTP login
- `/app/categories` — Multi-category browser with sorting & stock filter
- `/app/product/:id` — Rich product detail with live cart steppers
- `/app/cart` — Cart drawer with free delivery progress meter, coupon drawer, and tip options
- `/app/checkout` — Checkout with delivery instructions, mock payment options & payment failure simulation
- `/app/order/:id` — Order confirmation with celebratory graphics and 10-min dispatch card
- `/app/orders` — Orders list with active orders live tracking badges
- `/app/orders/:id` — Detailed order timeline stepper and receipt breakdown
- `/app/track/:id` — **Live Interactive Schematic Route Tracking** with moving delivery partner, dynamic ETA, and mock call/message triggers
- `/app/profile` — User profile, saved addresses manager, FAQs modal, and Reset Demo Data button

---

## 🎯 Key Client Demonstration Workflows

### Workflow 1: Customer Order to Admin Fulfillment
1. Open `/app` in your browser.
2. Browse products, add **Fresh Alphonso Mangoes** and **Himalayan Pink Salt Chips** to cart.
3. Click **View Cart** → Enter coupon code `LAXFIRST` (Flat ₹100 discount).
4. Click **Proceed to Checkout** → Select payment method (UPI / Card / COD).
5. Click **Place Order** → View celebratory confirmation screen with unique order ID `#LX-XXXXX`.
6. Switch to the **Admin Dashboard** using the top toolbar.
7. Observe the newly created order appearing immediately in the **Live Fulfillment Queue**.
8. Click **Advance Stage →** or open `/admin/orders/:id` to assign a delivery partner (e.g. *Vikram Sharma*).

### Workflow 2: Interactive Delivery Tracking Simulation
1. Navigate to `/app/track/:id` (or click "Live Tracking" from the top demo bar).
2. Observe the schematic Bandra West street grid with the Dark Store origin, route polyline, and customer destination.
3. Use the **Simulation Controls Bar**:
   - Click **Play / Pause** to toggle animated rider progression.
   - Click **Step Next (+15%)** to instantly fast-forward delivery waypoints.
   - Change speed between **1x**, **2x**, and **5x**.
4. Observe the rider marker moving in real time, street names updating ("Passing Khar Telephone Exchange..."), and ETA counting down until "Delivered".
5. Both the customer tracking screen and admin fleet dashboard reflect the exact same telemetry.

### Workflow 3: Payment Error Edge Case Simulation
1. At checkout, toggle **Demo Simulation: Simulate Failure**.
2. Click **Pay & Place Order**.
3. Observe the graceful error banner explaining the mock payment decline with instant retry options.
4. Toggle back to **Simulate Success** to complete checkout.

### Workflow 4: Inventory & Catalog Updates
1. Go to `/admin/products` or `/admin/inventory`.
2. Edit a product's price or set its stock to `0`.
3. Switch to `/app` (Customer view): observe the out-of-stock badge disabling the Add button and price updates reflected instantaneously without page reload.

### Workflow 5: Factory Demo Reset
- Click **Reset Demo** in the top presentation toolbar (or in Customer Profile) at any point to restore factory seed catalogs, coupons, and orders.

---

## 🔒 Scope & Compliance

- **Frontend Only**: No external backend or database server required.
- **Simulated GPS**: Clean schematic vector road network with deterministic waypoint interpolation; no external Google Maps API key required.
- **Mock Payments**: Safe demo simulation with instant visual feedback.
- **Persistence**: Browser `localStorage` for the web prototype; `AsyncStorage` for the Expo mobile app.
