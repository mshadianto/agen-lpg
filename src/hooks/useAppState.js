import { useState, useEffect, useCallback, useMemo } from "react";
import { PRODUCTS } from "../constants/products";
import { CUSTOMERS } from "../constants/customers";
import { PANGKALAN_DATA } from "../constants/pangkalan";
import { STATUS, DSTATUS } from "../constants/status";
import { ROLES } from "../constants/roles";
import { HET_CONFIG, INITIAL_HET_LOG } from "../constants/het";
import { DRIVER_ROUTES, RECONCILIATION } from "../constants/driver";
import { SALES_LEADS, CONSUMERS, COMPLIANCE_ITEMS } from "../constants/sales";
import { genOrders, genDist, genNotifications, genPayments } from "../utils/generators";
import { fmt, fmtRp } from "../utils/format";

export default function useAppState() {
  const [dark, setDark] = useState(false);
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [products, setProducts] = useState(PRODUCTS);
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [orders, setOrders] = useState(() => genOrders());
  const [pangkalan, setPangkalan] = useState(PANGKALAN_DATA);
  const [dist, setDist] = useState(() => genDist());
  const [sidebar, setSidebar] = useState(false);
  const [modal, setModal] = useState({ t: null, d: null });
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [pkTab, setPkTab] = useState("dir");
  const [detailPk, setDetailPk] = useState(null);
  const [notifs, setNotifs] = useState(genNotifications);
  const [showNotif, setShowNotif] = useState(false);
  const [orderFilter, setOrderFilter] = useState("all");
  const [liveTime, setLiveTime] = useState(new Date());
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [routes] = useState(DRIVER_ROUTES);
  const [recon, setRecon] = useState(RECONCILIATION);
  const [leads, setLeads] = useState(SALES_LEADS);
  const [consumers, setConsumers] = useState(CONSUMERS);
  const [compliance] = useState(COMPLIANCE_ITEMS);
  const [hetLog, setHetLog] = useState(INITIAL_HET_LOG);
  const [payments] = useState(() => genPayments());
  const [pgTab, setPgTab] = useState("overview");

  useEffect(() => {
    const t = setInterval(() => setLiveTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const toast_ = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // ─── HET ───
  const checkHET = useCallback(
    (productId, price, actor, actorRole) => {
      const hetRule = HET_CONFIG.rates.find((r) => r.productId === productId);
      if (!hetRule || price <= hetRule.het) return false;
      const diff = price - hetRule.het;
      const pctOver = Math.round((diff / hetRule.het) * 1000) / 10;
      const prod = products.find((p) => p.id === productId);
      const violation = {
        id: Math.max(0, ...hetLog.map((l) => l.id)) + 1,
        date: new Date().toISOString(),
        actor,
        actorRole,
        productId,
        productName: prod?.name || `Produk #${productId}`,
        priceSold: price,
        het: hetRule.het,
        diff,
        pctOver,
        action: "flagged",
        resolvedBy: null,
        resolvedAt: null,
        notes: `Harga ${fmtRp(price)} melebihi HET ${fmtRp(hetRule.het)} (+${pctOver}%)`,
      };
      setHetLog((prev) => [violation, ...prev]);
      return true;
    },
    [products, hetLog]
  );

  const resolveHetFlag = useCallback(
    (id) => {
      setHetLog(
        hetLog.map((l) =>
          l.id === id
            ? { ...l, action: "resolved", resolvedBy: ROLES[role]?.label || "Admin", resolvedAt: new Date().toISOString() }
            : l
        )
      );
      toast_("Pelanggaran HET ditandai resolved");
    },
    [hetLog, role, toast_]
  );

  // ─── HANDLERS ───
  const addOrder = useCallback(
    (d) => {
      const prod = products.find((p) => p.id === +d.productId);
      const cust = customers.find((c) => c.id === +d.customerId);
      if (!prod || !cust) return;
      if (prod.stock < d.qty) {
        toast_("Stok tidak mencukupi!", "error");
        return;
      }
      const hetRule = HET_CONFIG.rates.find((r) => r.productId === prod.id);
      if (hetRule && prod.price > hetRule.het) {
        checkHET(prod.id, prod.price, cust.name, "customer_order");
        toast_(`Harga ${prod.name} melebihi HET! Tercatat di audit trail.`, "error");
      }
      setOrders((prev) => [
        {
          id: Math.max(0, ...prev.map((o) => o.id)) + 1,
          cid: cust.id,
          cname: cust.name,
          pid: prod.id,
          pname: prod.name,
          qty: +d.qty,
          price: prod.price,
          total: prod.price * +d.qty,
          profit: (prod.price - prod.cost) * +d.qty,
          status: "pending",
          date: new Date().toISOString(),
          note: d.note || "",
        },
        ...prev,
      ]);
      setProducts(products.map((p) => (p.id === prod.id ? { ...p, stock: p.stock - +d.qty } : p)));
      setCustomers(customers.map((c) => (c.id === cust.id ? { ...c, orders: c.orders + 1 } : c)));
      setModal({ t: null });
      toast_("Pesanan baru ditambahkan!");
    },
    [products, customers, checkHET, toast_]
  );

  const upOrd = useCallback(
    (id, s) => {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: s } : o)));
      toast_(`Pesanan #${id}: ${STATUS[s].l}`);
    },
    [toast_]
  );

  const addProd = useCallback(
    (d) => {
      const newId = Math.max(0, ...products.map((p) => p.id)) + 1;
      const price = +d.price;
      const hetRule =
        HET_CONFIG.rates.find((r) => r.productId === newId) ||
        HET_CONFIG.rates.find((r) => d.name.includes(r.name.match(/\d+/)?.[0]));
      if (hetRule && price > hetRule.het) {
        checkHET(hetRule.productId, price, ROLES[role]?.label || "Admin", role || "admin");
        toast_(`Harga Rp ${fmt(price)} melebihi HET Rp ${fmt(hetRule.het)}! Audit trail dicatat.`, "error");
      }
      setProducts((prev) => [
        ...prev,
        {
          id: newId,
          name: d.name,
          short: d.name.match(/\d+/)?.[0] + " kg" || "",
          price,
          cost: +d.cost,
          stock: +d.stock,
          min: +d.min,
          type: d.type,
        },
      ]);
      setModal({ t: null });
      toast_("Produk ditambahkan!");
    },
    [products, role, checkHET, toast_]
  );

  const addCust = useCallback(
    (d) => {
      setCustomers((prev) => [
        ...prev,
        { id: Math.max(0, ...prev.map((c) => c.id)) + 1, name: d.name, phone: d.phone, addr: d.addr, type: d.type, orders: 0 },
      ]);
      setModal({ t: null });
      toast_("Pelanggan ditambahkan!");
    },
    [toast_]
  );

  const restock = useCallback(
    (id, q) => {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: p.stock + +q } : p)));
      toast_("Stok ditambahkan!");
      setModal({ t: null });
    },
    [toast_]
  );

  const addPk = useCallback(
    (d) => {
      setPangkalan((prev) => [
        ...prev,
        {
          id: Math.max(0, ...prev.map((p) => p.id)) + 1,
          name: d.name,
          owner: d.owner,
          phone: d.phone,
          addr: d.addr,
          kel: d.kel,
          kec: d.kec,
          status: "active",
          rating: 0,
          join: new Date().toISOString().slice(0, 10),
          qm: +d.qm,
          qu: 0,
          s3: 0,
          s5: 0,
          s12: 0,
          td: 0,
          ld: null,
        },
      ]);
      setModal({ t: null });
      toast_("Pangkalan ditambahkan!");
    },
    [toast_]
  );

  const distribute = useCallback(
    (d) => {
      const pk = pangkalan.find((p) => p.id === +d.pkid);
      if (!pk) return;
      const q3 = +d.q3 || 0,
        q5 = +d.q5 || 0,
        q12 = +d.q12 || 0;
      const p3 = products.find((p) => p.id === 1),
        p5 = products.find((p) => p.id === 2),
        p12 = products.find((p) => p.id === 3);
      if (p3 && p3.stock < q3) { toast_("Stok 3 kg tidak cukup!", "error"); return; }
      if (p5 && p5.stock < q5) { toast_("Stok 5.5 kg tidak cukup!", "error"); return; }
      if (p12 && p12.stock < q12) { toast_("Stok 12 kg tidak cukup!", "error"); return; }
      const tt = q3 + q5 + q12;
      const tv = q3 * (p3?.cost || 0) + q5 * (p5?.cost || 0) + q12 * (p12?.cost || 0);
      setDist((prev) => [
        {
          id: Math.max(0, ...prev.map((d) => d.id)) + 1,
          pkid: pk.id,
          pkname: pk.name,
          owner: pk.owner,
          q3, q5, q12,
          total: tt,
          val: tv,
          status: "dispatched",
          date: new Date().toISOString(),
          note: d.note || "",
        },
        ...prev,
      ]);
      setProducts(
        products.map((p) => {
          if (p.id === 1) return { ...p, stock: p.stock - q3 };
          if (p.id === 2) return { ...p, stock: p.stock - q5 };
          if (p.id === 3) return { ...p, stock: p.stock - q12 };
          return p;
        })
      );
      setPangkalan(
        pangkalan.map((p) =>
          p.id === pk.id
            ? { ...p, s3: p.s3 + q3, s5: p.s5 + q5, s12: p.s12 + q12, qu: p.qu + q3, td: p.td + tt, ld: new Date().toISOString() }
            : p
        )
      );
      setModal({ t: null });
      toast_(`${tt} tabung didistribusikan ke ${pk.name}!`);
    },
    [pangkalan, products, toast_]
  );

  const upDist = useCallback(
    (id, s) => {
      setDist((prev) => prev.map((d) => (d.id === id ? { ...d, status: s } : d)));
      toast_(`Distribusi #${id}: ${DSTATUS[s].l}`);
    },
    [toast_]
  );

  const togPk = useCallback(
    (id) => {
      setPangkalan((prev) =>
        prev.map((p) => (p.id !== id ? p : { ...p, status: p.status === "active" ? "suspended" : "active" }))
      );
      toast_("Status pangkalan diperbarui!");
    },
    [toast_]
  );

  const markAllRead = useCallback(() => setNotifs((prev) => prev.map((n) => ({ ...n, read: true }))), []);

  const exportCSV = useCallback(() => {
    toast_("Data pesanan di-export (simulasi)!");
  }, [toast_]);

  // ─── COMPUTED ───
  const del = useMemo(() => orders.filter((o) => o.status === "delivered"), [orders]);
  const pend = useMemo(() => orders.filter((o) => o.status === "pending"), [orders]);
  const rev = useMemo(() => del.reduce((s, o) => s + o.total, 0), [del]);
  const profit = useMemo(() => del.reduce((s, o) => s + o.profit, 0), [del]);
  const totStock = useMemo(() => products.reduce((s, p) => s + p.stock, 0), [products]);
  const lowStock = useMemo(() => products.filter((p) => p.stock <= p.min), [products]);
  const activePk = useMemo(() => pangkalan.filter((p) => p.status === "active"), [pangkalan]);
  const pendDist = useMemo(() => dist.filter((d) => d.status === "pending" || d.status === "dispatched"), [dist]);
  const openHetFlags = useMemo(() => hetLog.filter((l) => l.action === "flagged"), [hetLog]);

  const filteredOrders = useMemo(() => {
    let o = orders;
    if (orderFilter !== "all") o = o.filter((x) => x.status === orderFilter);
    if (search) o = o.filter((x) => x.cname.toLowerCase().includes(search.toLowerCase()) || x.pname.toLowerCase().includes(search.toLowerCase()));
    return o;
  }, [orders, orderFilter, search]);

  // ─── NAV ───
  const nav = useMemo(() => {
    const all = [
      { id: "dashboard", l: "Dashboard", ic: "grid", r: ["pangkalan", "driver", "sales", "owner"] },
      { id: "orders", l: "Pesanan", ic: "cart", b: pend.length || null, r: ["pangkalan", "owner"] },
      { id: "consumers", l: "Konsumen Akhir", ic: "users", r: ["pangkalan"] },
      { id: "pangkalan", l: "Pangkalan", ic: "store", b: pendDist.length || null, r: ["pangkalan", "sales", "owner"] },
      { id: "stock", l: "Stok", ic: "pkg", b: lowStock.length > 0 ? "!" : null, r: ["pangkalan", "owner"] },
      { id: "het", l: "HET Compliance", ic: "alert", b: openHetFlags.length > 0 ? openHetFlags.length : null, r: ["pangkalan", "owner"] },
      { id: "routes", l: "Rute & Logistik", ic: "truck", r: ["driver"] },
      { id: "reconciliation", l: "Rekonsiliasi", ic: "refresh", r: ["driver", "owner"] },
      { id: "salesLeads", l: "Akuisisi Mitra", ic: "target", r: ["sales"] },
      { id: "market", l: "Monitoring Pasar", ic: "activity", r: ["sales"] },
      { id: "customers", l: "Pelanggan", ic: "users", r: ["sales", "owner"] },
      { id: "delivery", l: "Pengiriman", ic: "truck", r: ["driver", "pangkalan"] },
      { id: "finance", l: "Keuangan", ic: "wallet", r: ["owner"] },
      { id: "payment", l: "Payment Gateway", ic: "cc", r: ["pangkalan", "owner"] },
      { id: "compliancePage", l: "Kepatuhan", ic: "layers", r: ["owner"] },
      { id: "integration", l: "Integrasi Pertamina", ic: "link", r: ["pangkalan", "owner"] },
      { id: "analytics", l: "Analytics AI", ic: "brain", r: ["owner", "sales"] },
    ];
    return role ? all.filter((n) => n.r.includes(role)) : all;
  }, [role, pend.length, pendDist.length, lowStock.length, openHetFlags.length]);

  return {
    // State
    dark, setDark, role, setRole, page, setPage,
    products, customers, orders, pangkalan, dist,
    sidebar, setSidebar, modal, setModal, search, setSearch,
    toast, pkTab, setPkTab, detailPk, setDetailPk,
    notifs, showNotif, setShowNotif, orderFilter, setOrderFilter,
    liveTime, sideCollapsed, setSideCollapsed,
    routes, recon, setRecon, leads, setLeads, consumers, setConsumers,
    compliance, hetLog, setHetLog, payments, pgTab, setPgTab,
    // Computed
    del, pend, rev, profit, totStock, lowStock, activePk, pendDist,
    openHetFlags, filteredOrders, nav,
    // Handlers
    toast_, addOrder, upOrd, addProd, addCust, restock, addPk,
    distribute, upDist, togPk, markAllRead, exportCSV,
    checkHET, resolveHetFlag,
  };
}
