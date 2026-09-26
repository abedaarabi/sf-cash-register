import {
  IconBanknote,
  IconCalculator,
  IconCard,
  IconChart,
  IconCheckCircle,
  IconCocktail,
  IconReport,
} from "../ui/icons";

export const features = [
  {
    title: "Register close-out",
    body: "Enter the notes and coins once and get a live counted total next to the opening FDC of the shift.",
    icon: IconCalculator,
  },
  {
    title: "Every payment type",
    body: "Both card terminals, MobilePay and invoices are captured per shift, next to product sales.",
    icon: IconCard,
  },
  {
    title: "Cash out with a reason",
    body: "Log withdrawals as they happen and review them later grouped by reason, with totals per group.",
    icon: IconBanknote,
  },
  {
    title: "Daily reports",
    body: "Each closed register becomes a card with expected cash, difference, income and the shift's comments.",
    icon: IconReport,
  },
  {
    title: "Income charts",
    body: "Product sales per closing day, over any date range you pick, with the period total on top.",
    icon: IconChart,
  },
  {
    title: "Drinks & recipes",
    body: "The full menu with recipes, preparation and prices — readable on every phone behind the bar.",
    icon: IconCocktail,
  },
];

export const steps = [
  {
    title: "Count the drawer",
    body: "Type the number of each note and coin. The running total does the math while you count.",
  },
  {
    title: "Log the shift",
    body: "Card terminals, MobilePay, invoices and product sales, plus any cash out and why it left the till.",
  },
  {
    title: "Close and review",
    body: "Submit once. The report shows up under Reports with the expected cash and the difference.",
  },
];

export const highlights = [
  "Works on the phone in your pocket",
  "Opening FDC carried between shifts",
  "Admin overview of every closed day",
];

export const CheckIcon = IconCheckCircle;
