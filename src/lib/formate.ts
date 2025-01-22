// utils/formatCurrency.ts
export function formatCurrency(amount: number, currency: string): string {
    // Check if the currency is PKR
    if (currency === "PKR") {
      return new Intl.NumberFormat("en-PK", {
        style: "currency",
        currency: "PKR",
      }).format(amount);
    }
  
    // Handle other currencies or default to a generic format
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD", // Default to USD if not PKR
    }).format(amount);
  }
  