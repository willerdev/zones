import { ADMIN_STATS } from "@/lib/admin-data";
import { PRODUCTS } from "@/lib/data";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {ADMIN_STATS.map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-card border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-card border border-border/50">
          <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {[
              { id: "ZT-M3K2X1", customer: "James M.", total: "$3,299", status: "Processing" },
              { id: "ZT-L2J1W0", customer: "Emily W.", total: "$199", status: "Shipped" },
              { id: "ZT-K1I0V9", customer: "Robert C.", total: "$1,199", status: "Delivered" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-mono text-sm font-medium">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.total}</p>
                  <p className="text-xs text-muted-foreground">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border/50">
          <h2 className="text-lg font-bold mb-4">Low Stock Alerts</h2>
          <div className="space-y-3">
            {PRODUCTS.filter((p) => p.stock <= 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                </div>
                <span className="text-sm font-bold text-red-500">{product.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
