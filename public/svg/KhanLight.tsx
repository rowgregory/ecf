const KhanLight = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 115" width="280" height="80" className="block dark:hidden">
      <path
        d="M50 8 L92 31 L92 84 L50 107 L8 84 L8 31 Z"
        fill="#14BF96"
        stroke="#14BF96"
        stroke-linejoin="round"
        stroke-width="8"
      />
      <circle cx="50" cy="36" r="10" fill="white" />
      <path d="M48 58 C48 58 30 56 28 70 C28 70 40 80 50 68 C50 68 52 60 48 58Z" fill="white" />
      <path d="M52 58 C52 58 70 56 72 70 C72 70 60 80 50 68 C50 68 48 60 52 58Z" fill="white" />

      <text
        x="82"
        y="35"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="black"
        letterSpacing="-0.3"
      >
        Khan Academy
      </text>
    </svg>
  )
}

export default KhanLight
