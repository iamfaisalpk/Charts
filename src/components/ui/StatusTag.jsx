const StatusTag = ({ status = "pending" }) => {
  const normalizedStatus = String(status).toLowerCase();
  const baseClassName =
    "inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize";

  return (
    <>
      {normalizedStatus === "resolved" ? (
        <span
          className={`${baseClassName} border-emerald-200 bg-emerald-100 text-emerald-800`}
        >
          resolved
        </span>
      ) : normalizedStatus === "rejected" ? (
        <span className={`${baseClassName} border-red-200 bg-red-100 text-red-800`}>
          rejected
        </span>
      ) : (
        <span
          className={`${baseClassName} border-amber-200 bg-amber-100 text-amber-800`}
        >
          pending
        </span>
      )}
    </>
  );
};

export default StatusTag;
