import { Package, ShoppingCart, Users, BarChart3 } from "lucide-react";

export const ADMIN_STATS = [
  { label: "Total Products", value: 12, icon: Package, change: "+12%" },
  { label: "Orders Today", value: 24, icon: ShoppingCart, change: "+8%" },
  { label: "Customers", value: "1,284", icon: Users, change: "+15%" },
  { label: "Revenue (MTD)", value: "$48,392", icon: BarChart3, change: "+22%" },
];
