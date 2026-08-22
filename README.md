# 🌾 KrishiSetu AI – One Digital Bridge for Every Farmer

**KrishiSetu AI** is a full-stack, mobile-first, location-aware and AI-powered agricultural platform designed to connect farmers with essential agricultural services through a single digital application.

The platform brings together **farmers, buyers, tractor owners, farm labourers, nurseries, agri-suppliers, transport providers, irrigation dealers and other agricultural stakeholders**.

---

## 🚀 Key Features

### 👨‍🌾 Farmer Dashboard

* GPS-based nearby service discovery
* Configurable search radius from **2 km to 50 km**
* Weather and farming advisory
* 18 agricultural service categories
* Natural-language service search

### 📈 Sell Smart AI

* Mandi market price information
* Historical price visualization
* AI-assisted price forecasting
* **Simulated XGBoost + SARIMA** forecasting pipeline
* Best time-to-sell recommendation
* Best-market net-return calculation
* Nearby buyer matching

### 🤖 Ask Krishi AI

* Multilingual farming assistant
* Text-based agricultural queries
* Voice input and output
* Web Speech API integration
* Context-aware farming assistance

### 🌱 AI Crop Disease Scanner

* Upload or capture crop-leaf images
* Client-side image feature extraction
* Disease diagnosis simulation
* Confidence score
* Treatment recommendations
* Nearby verified pesticide dealers

### 🚜 Tractor & Labour Marketplace

* Tractor listings
* Farm labour listings
* Price comparison
* Counter-offer negotiation
* Booking confirmation

### 🤝 Farmer-to-Buyer Marketplace

* Crop listing creation
* Crop images and quantity
* Expected price
* Buyer negotiation
* Buyer trust badges

### 🏪 Agricultural Directory

* Nurseries
* Seeds
* Fertilizers
* Pesticides
* Organic manure
* Poultry waste
* Irrigation suppliers
* Agri-input stores

### 💧 Smart Irrigation

* Crop water requirement estimation
* Soil-moisture advisory
* Nearby irrigation dealer discovery

### 🗺️ Agri Map

Interactive map using **Leaflet** to display:

* Buyers
* Tractors
* Nurseries
* Mandis
* Suppliers
* Cold storage
* Agricultural services

### 📊 Farm Profit Calculator

Calculates estimated profit using:

**Revenue − Seed Cost − Fertilizer Cost − Labour Cost − Tractor Cost − Transport Cost**

### 👨‍💼 Admin Dashboard

* Provider onboarding
* Listing approval
* Market-price feed management
* Review moderation
* Trust management

---

## 🧠 AI/ML Technologies

| Feature           | Technology / Model                                 |
| ----------------- | -------------------------------------------------- |
| Price Forecasting | Simulated XGBoost + SARIMA                         |
| Disease Detection | Client-side image analysis + diagnostic simulation |
| Voice Assistant   | Web Speech API                                     |
| Image Processing  | Canvas 2D                                          |
| Recommendations   | Rule/context-based recommendation logic            |
| Maps              | Leaflet                                            |

> **Note:** The internship version uses simulated AI/ML components for demonstration. Production-grade ML model training is part of the future scope.

---

## 🛠️ Technology Stack

### Frontend

* Next.js 14
* React 18
* TypeScript
* Tailwind CSS

### Libraries

* Leaflet / React-Leaflet
* Recharts
* Framer Motion
* Lucide React
* Canvas Confetti

### Browser APIs

* Web Speech Recognition
* Speech Synthesis
* Canvas 2D

### Development Tools

* Visual Studio Code
* npm
* Git
* ESLint

### Runtime

* Node.js 18+

---

## 🏗️ System Architecture

```text
                    KrishiSetu AI
                         │
              ┌──────────▼──────────┐
              │ Presentation Layer  │
              │   Next.js + React   │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │ State & Persistence │
              │ LocalStorage + CRUD │
              └──────────┬──────────┘
                         │
             ┌───────────┴───────────┐
             │                       │
     ┌───────▼────────┐    ┌────────▼────────┐
     │   Data Layer   │    │  AI/ML Layer    │
     │ TypeScript +   │    │ Price Forecast  │
     │ Mock Datasets  │    │ Disease Scan    │
     └────────────────┘    │ Voice Assistant │
                           └─────────────────┘
```

The current implementation uses a **LocalStorage-synchronised state layer** instead of a live production backend.

---

## 📊 Dataset

The project uses **curated/mock agricultural datasets** focused on Karnataka for the internship demonstration.

Locations represented include:

* Bengaluru Rural
* Mandya
* Kolar
* Mysuru
* Belagavi
* Hassan
* Shimoga

Data models include:

* Users
* Farmer profiles
* Crop listings
* Tractor listings
* Labour listings
* Nursery listings
* Supplier products
* Market prices
* Price predictions
* Negotiations
* Bookings
* Buyer profiles
* Reviews
* Weather

Market-price information is designed around **Agmarknet historical data** and is clearly labelled in the application.

---

## 🌐 Supported Languages

The platform is designed to support:

* 🇮🇳 Kannada
* 🇮🇳 Hindi
* 🇮🇳 Telugu
* 🇮🇳 Tamil
* 🇮🇳 Marathi
* 🇬🇧 English

The multilingual interface is designed with rural and low-literacy users in mind.

---

## 👥 User Roles

The application supports 12 role perspectives:

```text
1. Farmer
2. Buyer
3. Tractor Owner
4. Tractor Driver
5. Farm Labourer
6. Nursery Owner
7. Agri Supplier
8. Transport Provider
9. Irrigation Dealer
10. Manure Supplier
11. Poultry-Waste Supplier
12. Administrator
```

---

## 📂 Project Structure

```text
KrishiSetu-AI/
│
├── app/
│   ├── farmer/
│   ├── market/
│   ├── sell-smart/
│   ├── krishi-ai/
│   ├── disease-scanner/
│   ├── tractor/
│   ├── labour/
│   ├── marketplace/
│   ├── directory/
│   ├── irrigation/
│   ├── map/
│   └── admin/
│
├── components/
├── data/
├── models/
├── services/
├── store/
├── public/
├── styles/
│
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/KrishiSetu-AI.git
```

### 2. Open the project

```bash
cd KrishiSetu-AI
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open in browser

```text
http://localhost:3000
```

---

## 🔨 Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---

## 🧪 Testing

The project was verified using:

* TypeScript build validation
* Module-wise testing
* LocalStorage persistence testing
* GPS radius testing
* AI price forecast testing
* Disease scanner testing
* Voice assistant testing
* Tractor negotiation testing
* Buyer trust testing
* Role-switching testing

## The internship report records successful completion of the listed test cases and manual verification flows.

## 🔐 Data Integrity

KrishiSetu AI follows a data-integrity-first approach.

The application avoids presenting:

* Fake phone numbers
* Fake businesses
* Fabricated live prices

Data is clearly labelled as:

```text
[Verified Provider Data]
[Agmarknet Historical Sync]
[External]
```

External shopping integrations are also clearly identified as external services.

---

## ⚠️ Current Limitations

The current internship version is a demonstration/production-representative application.

Current limitations include:

* LocalStorage instead of a live backend
* Simulated AI/ML models
* No production ML training
* No real payment gateway
* No production escrow
* Curated/mock demonstration datasets

---

## 🚀 Future Scope

Future development can include:

* Live Node.js/PostgreSQL backend
* Real authentication and authorization
* Real payment gateway
* Escrow system
* Production-trained disease classification model
* Real price forecasting models
* Larger Agmarknet datasets
* Remote-sensing data integration
* Push notifications
* Booking reminders
* Farmer pilot deployment
* Regional-dialect speech recognition

The report specifically identifies live backend persistence, payment integration, genuine ML training, notifications, pilot deployment, and improved regional speech recognition as future improvements.

---

## 🎓 Internship Information

**Project:** KrishiSetu AI – One Digital Bridge for Every Farmer
**Domain:** Artificial Intelligence & Agricultural Technology
**Program:** B.Tech CSE (Cyber Security)
**Institution:** Presidency University, Bengaluru
**Internship Environment:** NVIDIA AI Centre of Excellence
**Technology:** Next.js, React, TypeScript, Tailwind CSS, AI/ML, Computer Vision, Voice AI and GPS

The project was developed as an internship assignment covering requirements analysis, system design, implementation, AI/ML simulation, testing and verification.

---

## 📚 References

* Next.js
* React
* Tailwind CSS
* Agmarknet
* eNAM
* Leaflet
* Recharts
* MDN Web Speech API
* XGBoost
* SARIMA / Time Series Analysis
* Kisan Suvidha / mKisan

---

## 👨‍💻 Author

**Rajesh N**
**USN:** 20241CCS0156

**Presidency University, Bengaluru**

---

## ⭐ Project Summary

> **KrishiSetu AI connects farmers, agricultural services, markets and AI-powered decision support through one digital platform.**

**AI + Agriculture + GPS + Computer Vision + Voice AI + Market Intelligence + Marketplace**
