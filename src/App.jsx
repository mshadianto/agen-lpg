import "./styles/global.css";
import { getTheme } from "./styles/theme";
import useAppState from "./hooks/useAppState";
import useAnalytics from "./hooks/useAnalytics";

// Layout
import { Sidebar, Topbar, RolePicker } from "./components/layout";
import DetailPanel from "./components/layout/DetailPanel";

// UI
import { Modal, Toast } from "./components/ui";

// Forms
import { OrderForm, ProdForm, CustForm, RestockForm, PkForm, DistForm } from "./components/forms";

// Pages
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Stock from "./pages/Stock";
import Customers from "./pages/Customers";
import Pangkalan from "./pages/Pangkalan";
import Delivery from "./pages/Delivery";
import Finance from "./pages/Finance";
import AnalyticsPage from "./pages/AnalyticsPage";
import HetCompliance from "./pages/HetCompliance";
import PaymentGateway from "./pages/PaymentGateway";
import Routes from "./pages/Routes";
import Reconciliation from "./pages/Reconciliation";
import SalesLeads from "./pages/SalesLeads";
import MarketMonitoring from "./pages/MarketMonitoring";
import CompliancePage from "./pages/CompliancePage";
import Consumers from "./pages/Consumers";

export default function App() {
  const state = useAppState();
  const analytics = useAnalytics({
    orders: state.orders,
    del: state.del,
    products: state.products,
    customers: state.customers,
    pangkalan: state.pangkalan,
    activePk: state.activePk,
    dist: state.dist,
    rev: state.rev,
  });

  const theme = getTheme(state.dark);
  const goBack = () => state.setPage("dashboard");

  return (
    <div
      style={{
        ...theme,
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "var(--bg)",
        minHeight: "100vh",
        display: "flex",
        color: "var(--text)",
        transition: "background 0.4s, color 0.4s",
      }}
    >
      {/* ═══ ROLE PICKER ═══ */}
      {!state.role && (
        <RolePicker
          dark={state.dark}
          setDark={state.setDark}
          onSelect={(k) => { state.setRole(k); state.setPage("dashboard"); }}
        />
      )}

      {state.role && (
        <>
          {/* ═══ SIDEBAR ═══ */}
          <Sidebar
            role={state.role}
            nav={state.nav}
            page={state.page}
            sideCollapsed={state.sideCollapsed}
            onToggle={() => state.setSideCollapsed(!state.sideCollapsed)}
            onNavigate={(id) => { state.setPage(id); state.setSidebar(false); state.setDetailPk(null); }}
            onChangeRole={() => { state.setRole(null); state.setPage("dashboard"); }}
          />

          {/* ═══ MAIN ═══ */}
          <div style={{ flex: 1, marginLeft: state.sideCollapsed ? 72 : 240, minHeight: "100vh", transition: "margin-left 0.3s" }}>
            <Topbar
              role={state.role}
              dark={state.dark}
              setDark={state.setDark}
              search={state.search}
              setSearch={state.setSearch}
              liveTime={state.liveTime}
              notifs={state.notifs}
              showNotif={state.showNotif}
              setShowNotif={state.setShowNotif}
              markAllRead={state.markAllRead}
              exportCSV={state.exportCSV}
            />
            <div style={{ padding: 24 }}>
              {/* ─── INLINE PAGES ─── */}
              {state.page === "dashboard" && (
                <Dashboard
                  orders={state.orders} del={state.del} products={state.products}
                  pangkalan={state.pangkalan} activePk={state.activePk}
                  dist={state.dist} pendDist={state.pendDist} pend={state.pend}
                  rev={state.rev} profit={state.profit} totStock={state.totStock}
                  lowStock={state.lowStock} setModal={state.setModal}
                  setPage={state.setPage} setPkTab={state.setPkTab}
                  dayLabels={analytics.dayLabels} last7Rev={analytics.last7Rev}
                  last7Ord={analytics.last7Ord} last7Dist={analytics.last7Dist}
                  last30Heat={analytics.last30Heat} forecast3kg={analytics.forecast3kg}
                />
              )}
              {state.page === "orders" && (
                <Orders
                  filteredOrders={state.filteredOrders} orders={state.orders}
                  orderFilter={state.orderFilter} setOrderFilter={state.setOrderFilter}
                  setModal={state.setModal} exportCSV={state.exportCSV}
                  upOrd={state.upOrd} search={state.search}
                />
              )}
              {state.page === "stock" && (
                <Stock products={state.products} del={state.del} setModal={state.setModal} />
              )}
              {state.page === "customers" && (
                <Customers customers={state.customers} search={state.search} setModal={state.setModal} />
              )}
              {state.page === "pangkalan" && (
                <Pangkalan
                  pangkalan={state.pangkalan} activePk={state.activePk}
                  dist={state.dist} pendDist={state.pendDist} products={state.products}
                  search={state.search} pkTab={state.pkTab} setPkTab={state.setPkTab}
                  setModal={state.setModal} setDetailPk={state.setDetailPk}
                  togPk={state.togPk} upDist={state.upDist} theme={theme}
                />
              )}
              {state.page === "delivery" && (
                <Delivery orders={state.orders} customers={state.customers} upOrd={state.upOrd} />
              )}
              {state.page === "finance" && (
                <Finance
                  del={state.del} pend={state.pend} rev={state.rev} profit={state.profit}
                  products={state.products} dayLabels={analytics.dayLabels} last7Rev={analytics.last7Rev}
                />
              )}
              {state.page === "analytics" && (
                <AnalyticsPage
                  last30Rev={analytics.last30Rev} day30Labels={analytics.day30Labels}
                  predRevenue={analytics.predRevenue} predOrders={analytics.predOrders}
                  stockForecasts={analytics.stockForecasts} fulfillment={analytics.fulfillment}
                  custAnalytics={analytics.custAnalytics} pkAnalytics={analytics.pkAnalytics}
                  anomalies={analytics.anomalies} lowStock={state.lowStock}
                  customers={state.customers} rev={state.rev}
                  dayLabels={analytics.dayLabels} last30Ord={analytics.last30Ord}
                />
              )}
            </div>
          </div>

          {/* ─── OVERLAY PAGES ─── */}
          {state.page === "consumers" && <Consumers consumers={state.consumers} onClose={goBack} />}
          {state.page === "routes" && <Routes routes={state.routes} onClose={goBack} />}
          {state.page === "reconciliation" && <Reconciliation recon={state.recon} onClose={goBack} />}
          {state.page === "salesLeads" && <SalesLeads leads={state.leads} onClose={goBack} />}
          {state.page === "market" && <MarketMonitoring pangkalan={state.pangkalan} activePk={state.activePk} leads={state.leads} onClose={goBack} />}
          {state.page === "compliancePage" && <CompliancePage compliance={state.compliance} onClose={goBack} />}
          {state.page === "het" && (
            <HetCompliance
              hetChecks={analytics.hetChecks} hetViolations={analytics.hetViolations}
              openHetFlags={state.openHetFlags} hetLog={state.hetLog}
              resolveHetFlag={state.resolveHetFlag} dark={state.dark} onClose={goBack}
            />
          )}
          {state.page === "payment" && (
            <PaymentGateway
              payments={state.payments} dayLabels={analytics.dayLabels}
              pgTab={state.pgTab} setPgTab={state.setPgTab}
              toast_={state.toast_} onClose={goBack}
            />
          )}

          {/* ─── MODALS ─── */}
          <Modal open={state.modal.t === "addOrder"} onClose={() => state.setModal({ t: null })} title="Pesanan Baru" wide>
            <OrderForm products={state.products} customers={state.customers} onSubmit={state.addOrder} onClose={() => state.setModal({ t: null })} />
          </Modal>
          <Modal open={state.modal.t === "addProd"} onClose={() => state.setModal({ t: null })} title="Tambah Produk">
            <ProdForm onSubmit={state.addProd} onClose={() => state.setModal({ t: null })} />
          </Modal>
          <Modal open={state.modal.t === "addCust"} onClose={() => state.setModal({ t: null })} title="Tambah Pelanggan">
            <CustForm onSubmit={state.addCust} onClose={() => state.setModal({ t: null })} />
          </Modal>
          <Modal open={state.modal.t === "restock"} onClose={() => state.setModal({ t: null })} title={`Restock: ${state.modal.d?.name}`}>
            <RestockForm product={state.modal.d} onSubmit={state.restock} onClose={() => state.setModal({ t: null })} />
          </Modal>
          <Modal open={state.modal.t === "addPk"} onClose={() => state.setModal({ t: null })} title="Pangkalan Baru" wide>
            <PkForm onSubmit={state.addPk} onClose={() => state.setModal({ t: null })} />
          </Modal>
          <Modal open={state.modal.t === "distribute"} onClose={() => state.setModal({ t: null })} title="Distribusi Stok" wide>
            <DistForm pks={state.activePk} products={state.products} pre={state.modal.d?.id} onSubmit={state.distribute} onClose={() => state.setModal({ t: null })} />
          </Modal>

          {/* ─── DETAIL PANEL ─── */}
          <DetailPanel detailPk={state.detailPk} dist={state.dist} onClose={() => state.setDetailPk(null)} />
        </>
      )}

      {/* ─── TOAST ─── */}
      <Toast toast={state.toast} />
    </div>
  );
}
