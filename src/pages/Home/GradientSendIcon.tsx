const GradientSendIcon = () => (
  <svg
    className="size-6 sm:size-8 hover:-translate-y-px transition-transform"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-labelledby="sendIconTitle"
  >
    <title id="sendIconTitle">Send Icon</title>
    <defs>
      <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#4b90ff" }} />
        <stop offset="100%" style={{ stopColor: "#ff5546" }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#icon-gradient)"
      d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
    ></path>
  </svg>
);

export default GradientSendIcon;
