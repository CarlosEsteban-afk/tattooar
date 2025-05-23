module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4E1C94",
        "primary-dark": "#2E076B",
        "primary-light": "#B1A9D1",
        accent: "#ec4899",
        "accent-light": "#f472b6",
        background: "#f9fafb",
        surface: "#ffffff",
        border: "#e5e7eb",
        muted: "#9F9CA3",
        text: "#1F1E24",
        "subtle-text": "#36343B",
        success: "#038A36",
        warning: "#deb978",
        error: "#B90000",
      },
    },
  },
  plugins: [],
}
