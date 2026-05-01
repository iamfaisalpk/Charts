const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/60 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
