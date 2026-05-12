# ☽ Zakat Calculator

A beautifully designed, Islamic-inspired web application built with React that helps Muslims calculate their annual Zakat obligation during Ramadan.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)
![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=flat&logo=vite&logoColor=white)

---

## 📖 About

Zakat is one of the Five Pillars of Islam — an annual charitable giving obligation of **2.5%** of a Muslim's total accumulated wealth, provided it meets or exceeds the **Nisab threshold** (equivalent to 85 grams of gold).

This calculator provides an easy, accurate way to determine your Zakat obligation based on your assets, income, and deductions — all in one place.

---

## ✨ Features

- **Multi-currency support** — USD, EUR, GBP, SAR, MYR, PKR, BDT, IDR
- **Comprehensive wealth calculation** — covers assets, annual income, and deductions
- **Live Nisab threshold** — calculated dynamically based on 85g of gold
- **Visual progress indicator** — shows how your wealth compares to the Nisab
- **Animated result panel** — clear breakdown of your Zakat due
- **Helpful tooltips** — guidance on what to include in each field
- **Fully responsive** — works on desktop and mobile
- **No external dependencies** — pure React, no UI libraries needed

---

## 🧮 How It Calculates

The app follows the standard Hanafi/general Islamic finance methodology:

```
Net Zakatable Wealth = (Assets + Annual Income) - Deductions

Assets        = Cash/Savings + Gold & Silver + Investments + Business Assets
Annual Income = Salary + Rental Income + Other Income
Deductions    = Debts & Liabilities + Basic Living Expenses

If Net Zakatable Wealth ≥ Nisab → Zakat Due = Net Wealth × 2.5%
```

> **Note:** Nisab is calculated as: `85g × current gold price per gram (USD)`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/zakat-calculator.git

# Navigate into the project
cd zakat-calculator

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🗂️ Project Structure

```
zakat-calculator/
├── src/
│   ├── ZakatCalculator.jsx   # Main calculator component
│   └── main.jsx              # React entry point
├── public/
├── index.html
├── package.json
└── vite.config.js
```

---

## 🌍 Supported Currencies

| Currency | Code | Symbol |
|----------|------|--------|
| US Dollar | USD | $ |
| Euro | EUR | € |
| British Pound | GBP | £ |
| Saudi Riyal | SAR | ﷼ |
| Malaysian Ringgit | MYR | RM |
| Pakistani Rupee | PKR | ₨ |
| Bangladeshi Taka | BDT | ৳ |
| Indonesian Rupiah | IDR | Rp |

---

## ⚠️ Disclaimer

This calculator provides an **estimate** based on standard Islamic finance principles. Gold prices used are approximate and may not reflect real-time market values. For precise rulings on your specific situation, please consult a **qualified Islamic scholar**.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- Nisab calculation based on the **85 grams of gold** standard followed by the majority of scholars
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)

---

<p align="center">Made with ❤️ for the Muslim community</p>
