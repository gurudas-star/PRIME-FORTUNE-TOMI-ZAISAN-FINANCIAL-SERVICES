/**
 * PRIME FORTUNE TOMI ZAISAN FINANCIAL SERVICES
 * Interactive EMI & Loan Amortization Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Calculator DOM Elements
  const loanAmountSlider = document.getElementById('calc-amount');
  const loanTenureSlider = document.getElementById('calc-tenure');
  const loanRateSlider = document.getElementById('calc-rate');

  const amountDisplay = document.getElementById('display-amount');
  const tenureDisplay = document.getElementById('display-tenure');
  const rateDisplay = document.getElementById('display-rate');

  const monthlyEmiDisplay = document.getElementById('res-monthly-emi');
  const principalDisplay = document.getElementById('res-principal');
  const totalInterestDisplay = document.getElementById('res-total-interest');
  const totalAmountDisplay = document.getElementById('res-total-amount');

  const chartPrincipalCircle = document.getElementById('chart-principal-circle');
  const loanTypeButtons = document.querySelectorAll('.calc-type-btn');

  // Loan presets configuration
  const loanPresets = {
    housing: {
      amount: 4500000,
      minAmount: 500000,
      maxAmount: 100000000,
      stepAmount: 100000,
      tenure: 20,
      minTenure: 1,
      maxTenure: 30,
      rate: 8.5,
      minRate: 7.5,
      maxRate: 15
    },
    business: {
      amount: 2500000,
      minAmount: 300000,
      maxAmount: 150000000,
      stepAmount: 100000,
      tenure: 5,
      minTenure: 1,
      maxTenure: 15,
      rate: 11.5,
      minRate: 9.0,
      maxRate: 20
    },
    property: {
      amount: 5000000,
      minAmount: 1000000,
      maxAmount: 200000000,
      stepAmount: 200000,
      tenure: 15,
      minTenure: 1,
      maxTenure: 25,
      rate: 9.25,
      minRate: 8.5,
      maxRate: 16
    },
    gold: {
      amount: 500000,
      minAmount: 50000,
      maxAmount: 20000000,
      stepAmount: 25000,
      tenure: 2,
      minTenure: 1,
      maxTenure: 5,
      rate: 8.9,
      minRate: 7.9,
      maxRate: 16
    },
    private: {
      amount: 1500000,
      minAmount: 200000,
      maxAmount: 50000000,
      stepAmount: 50000,
      tenure: 3,
      minTenure: 1,
      maxTenure: 7,
      rate: 13.0,
      minRate: 10.5,
      maxRate: 24
    }
  };

  // Helper: Format Indian Rupee Currency
  function formatINR(val) {
    if (isNaN(val)) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(Math.round(val));
  }

  // Core EMI Calculation Function
  function calculateEMI() {
    if (!loanAmountSlider || !loanTenureSlider || !loanRateSlider) return;

    const principal = parseFloat(loanAmountSlider.value) || 0;
    const years = parseFloat(loanTenureSlider.value) || 1;
    const annualRate = parseFloat(loanRateSlider.value) || 0;

    const monthlyRate = (annualRate / 12) / 100;
    const totalMonths = years * 12;

    let monthlyEMI = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (monthlyRate > 0) {
      monthlyEMI = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      totalPayment = monthlyEMI * totalMonths;
      totalInterest = totalPayment - principal;
    } else {
      monthlyEMI = principal / totalMonths;
      totalPayment = principal;
      totalInterest = 0;
    }

    // Update Text Displays
    amountDisplay.textContent = formatINR(principal);
    tenureDisplay.textContent = `${years} ${years > 1 ? 'Years' : 'Year'}`;
    rateDisplay.textContent = `${annualRate.toFixed(2)}%`;

    monthlyEmiDisplay.textContent = formatINR(monthlyEMI);
    principalDisplay.textContent = formatINR(principal);
    totalInterestDisplay.textContent = formatINR(totalInterest);
    totalAmountDisplay.textContent = formatINR(totalPayment);

    // Update SVG Doughnut Chart
    if (chartPrincipalCircle) {
      const circumference = 2 * Math.PI * 50; // r=50 -> ~314.159
      const principalPercentage = totalPayment > 0 ? (principal / totalPayment) : 1;
      const strokeDashoffset = circumference * (1 - principalPercentage);
      
      chartPrincipalCircle.style.strokeDasharray = `${circumference}`;
      chartPrincipalCircle.style.strokeDashoffset = `${strokeDashoffset}`;
    }
  }

  // Bind Slider Events
  if (loanAmountSlider && loanTenureSlider && loanRateSlider) {
    loanAmountSlider.addEventListener('input', calculateEMI);
    loanTenureSlider.addEventListener('input', calculateEMI);
    loanRateSlider.addEventListener('input', calculateEMI);
  }

  // Switch Loan Type Presets
  loanTypeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      loanTypeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const type = btn.getAttribute('data-type');
      const preset = loanPresets[type] || loanPresets.housing;

      loanAmountSlider.min = preset.minAmount;
      loanAmountSlider.max = preset.maxAmount;
      loanAmountSlider.step = preset.stepAmount;
      loanAmountSlider.value = preset.amount;

      loanTenureSlider.min = preset.minTenure;
      loanTenureSlider.max = preset.maxTenure;
      loanTenureSlider.value = preset.tenure;

      loanRateSlider.min = preset.minRate;
      loanRateSlider.max = preset.maxRate;
      loanRateSlider.value = preset.rate;

      // Update limits labels in UI if present
      const minAmountLabel = document.getElementById('calc-min-amount');
      const maxAmountLabel = document.getElementById('calc-max-amount');
      if (minAmountLabel) minAmountLabel.textContent = formatINR(preset.minAmount);
      if (maxAmountLabel) maxAmountLabel.textContent = formatINR(preset.maxAmount);

      calculateEMI();
    });
  });

  // Initial Calculation Run
  calculateEMI();
});
