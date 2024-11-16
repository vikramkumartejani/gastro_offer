export default function handler(req, res) {
    const orders = [
      {
        location: "Zurich",
        date: "11/01/2024",
        status: "Confirmed",
        amount: "CHF 1500",
        description: "The offer has been accepted by the restaurant.",
      },
      {
        location: "Zurich",
        date: "11/01/2024",
        status: "In Review",
        amount: "CHF 1500",
        description: "The offer is being reviewed by the restaurant.",
      },
      {
        location: "Las Vegas",
        date: "11/01/2024",
        status: "Adjusted",
        amount: "CHF 1500",
        description: "The offer has been updated by the restaurant and is waiting for your review.",
      },
      {
        location: "Las Vegas",
        date: "11/01/2024",
        status: "Accepted",
        amount: "CHF 1500",
        description: "The offer has been accepted by the restaurant and is waiting for your final confirmation.",
      },
      {
        location: "Las Vegas",
        date: "11/01/2024",
        status: "Cancelled",
        amount: "CHF 1500",
        description: "Order has been cancelled and your whole amount is refunded to your account back.",
      },
    ];
    res.status(200).json(orders);
  }
  