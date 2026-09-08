// Simulated order records — keyed by order number for the Track Order flow
// and listed for the Account > Orders page.

export const TIMELINE_STEPS = [
  "Order Placed",
  "Order Confirmed",
  "Processing",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export const orders = [
  {
    orderNumber: "NX-10482",
    email: "customer@example.com",
    phone: "+1 555 010 4820",
    status: "Out for Delivery", // one of TIMELINE_STEPS or "Cancelled"
    date: "2026-08-29",
    estimatedDelivery: "Sep 08, 2026",
    customerName: "Amelia Hart",
    address: "214 Willow Creek Lane, Austin, TX 78701, USA",
    items: [
      { id: "p1", name: "Classic Oversized Jacket", size: "M", qty: 1, price: 189, img: "jacket-1" },
      { id: "p2", name: "Premium Cotton T-Shirt", size: "L", qty: 2, price: 42, img: "tshirt-1" },
    ],
    subtotal: 273,
    shipping: 0,
    discount: 20,
    total: 253,
  },
  {
    orderNumber: "NX-10391",
    email: "customer@example.com",
    phone: "+1 555 010 4820",
    status: "Delivered",
    date: "2026-08-10",
    estimatedDelivery: "Aug 16, 2026",
    customerName: "Amelia Hart",
    address: "214 Willow Creek Lane, Austin, TX 78701, USA",
    items: [{ id: "p9", name: "Leather Jacket", size: "M", qty: 1, price: 420, img: "leather-jacket-1" }],
    subtotal: 420,
    shipping: 0,
    discount: 0,
    total: 420,
  },
  {
    orderNumber: "NX-10275",
    email: "customer@example.com",
    phone: "+1 555 010 4820",
    status: "Processing",
    date: "2026-09-02",
    estimatedDelivery: "Sep 12, 2026",
    customerName: "Amelia Hart",
    address: "214 Willow Creek Lane, Austin, TX 78701, USA",
    items: [{ id: "p11", name: "Tailored Wrap Dress", size: "S", qty: 1, price: 168, img: "dress-1" }],
    subtotal: 168,
    shipping: 8,
    discount: 0,
    total: 176,
  },
  {
    orderNumber: "NX-10198",
    email: "customer@example.com",
    phone: "+1 555 010 4820",
    status: "Cancelled",
    date: "2026-07-22",
    estimatedDelivery: "—",
    customerName: "Amelia Hart",
    address: "214 Willow Creek Lane, Austin, TX 78701, USA",
    items: [{ id: "p6", name: "Classic Sneakers", size: "42", qty: 1, price: 155, img: "sneaker-1" }],
    subtotal: 155,
    shipping: 0,
    discount: 0,
    total: 155,
  },
  {
    orderNumber: "NX-10501",
    email: "customer@example.com",
    phone: "+1 555 010 4820",
    status: "Shipped",
    date: "2026-09-04",
    estimatedDelivery: "Sep 10, 2026",
    customerName: "Amelia Hart",
    address: "214 Willow Creek Lane, Austin, TX 78701, USA",
    items: [{ id: "p14", name: "Structured Tote Bag", size: "One Size", qty: 1, price: 145, img: "bag-1" }],
    subtotal: 145,
    shipping: 0,
    discount: 0,
    total: 145,
  },
];

export const findOrder = (orderNumber, contact) => {
  const normalized = orderNumber.trim().toUpperCase().replace(/^#/, "");
  const order = orders.find(
    (o) => o.orderNumber.toUpperCase() === normalized
  );
  if (!order) return null;
  if (contact) {
    const c = contact.trim().toLowerCase();
    const matches =
      order.email.toLowerCase() === c || order.phone.replace(/\s/g, "") === c.replace(/\s/g, "");
    if (!matches) return null;
  }
  return order;
};
