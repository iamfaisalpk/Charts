const Button = ({
  type = "button",
  children,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-70 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {loading ? "Signing in..." : children}
    </button>
  );
};

export default Button;
