const KhanDark = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 6 240 44" width="280" height="80" className="hidden dark:block">
      <polygon points="36,8 58,8 70,28 58,48 36,48 24,28" fill="#00FF7F" />

      <circle cx="47" cy="20" r="5" fill="black" />
      <path d="M35 42 C35 34 41 28 47 26 C53 28 59 34 59 42" fill="black" />
      <path d="M47 30 C47 30 38 30 36 36 C38 38 44 36 47 30Z" fill="#00FF7F" opacity="0.6" />
      <path d="M47 30 C47 30 56 30 58 36 C56 38 50 36 47 30Z" fill="#00FF7F" opacity="0.6" />

      <text
        x="82"
        y="35"
        fontFamily="'Helvetica Neue', Arial, sans-serif"
        fontSize="22"
        fontWeight="700"
        fill="white"
        letterSpacing="-0.3"
      >
        Khan Academy
      </text>
    </svg>
  )
}

export default KhanDark
