// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 그라데이션 종류 확장
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at center, var(--tw-gradient-stops))',
      },
      colors: {
        // 커스텀 그라데이션 색상 정의
        'gradient-start': '#6EE7B7',
        'gradient-mid': '#3B82F6',
        'gradient-end': '#9333EA',
      },
    },
  },
  plugins: [],
};
