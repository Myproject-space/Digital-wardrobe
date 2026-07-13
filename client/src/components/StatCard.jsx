function StatCard({ icon, title, count }) {
  return (
    <div className="col-6 mb-3">
      <div
        className="card p-3 text-center shadow-sm stat-card"
        style={{ borderRadius: "18px" }}
      >
        <div style={{ fontSize: "32px" }}>
          {icon}
        </div>

        <h6 className="mt-2 mb-1">
          {title}
        </h6>

        <h3 className="fw-bold text-primary">
          {count}
        </h3>
      </div>
    </div>
  );
}

export default StatCard;