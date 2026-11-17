/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Roxo Marcaki (#7C3AED = 600) até o roxo noite (900) — ver Livro da Marca */
        roxo: {
          50: "#F7F4FF",
          100: "#F1ECFE",
          200: "#E2D7FD",
          300: "#C8B2FB",
          400: "#A684F7",
          500: "#8F5CF4",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#4A1BA0",
          900: "#2A1065",
          950: "#190940",
        },
        /* Amarelo marca-texto: só para destacar (nunca texto sobre fundo claro) */
        marca: {
          DEFAULT: "#FFE14D",
          soft: "#FFF1A6",
        },
        tinta: {
          DEFAULT: "#0F1123",
          2: "#4A4763",
          3: "#7B7794",
        },
        linha: "#E4DEF5",
        papel: "#FCFBFF",
        ok: "#15803D",
        furo: "#DC2626",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque Variable"', '"Inter Variable"', "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      borderRadius: {
        /* Cantos de 8px do app; peças grandes usam 2xl/3xl */
        DEFAULT: "8px",
        "4xl": "2rem",
      },
      /* Sombras em camadas, tingidas de roxo noite (nunca preto puro) */
      boxShadow: {
        soft: "0 1px 2px rgba(42,16,101,0.05), 0 6px 16px -8px rgba(42,16,101,0.12)",
        card: "0 1px 2px rgba(42,16,101,0.05), 0 8px 20px -10px rgba(42,16,101,0.14), 0 24px 48px -28px rgba(42,16,101,0.22)",
        lift: "0 1px 3px rgba(42,16,101,0.06), 0 14px 30px -14px rgba(42,16,101,0.22), 0 40px 80px -40px rgba(42,16,101,0.35)",
        phone: "0 2px 6px rgba(42,16,101,0.10), 0 30px 60px -20px rgba(42,16,101,0.45), 0 60px 120px -60px rgba(42,16,101,0.5)",
        roxo: "0 10px 24px -10px rgba(124,58,237,0.55)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        buzz: {
          "0%, 86%, 100%": { transform: "translateX(0) rotate(0)" },
          "88%": { transform: "translateX(-2px) rotate(-1deg)" },
          "90%": { transform: "translateX(2px) rotate(1deg)" },
          "92%": { transform: "translateX(-2px) rotate(-1deg)" },
          "94%": { transform: "translateX(2px) rotate(1deg)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.2, 0.6, 0.3, 1) infinite",
        float: "float 6s ease-in-out infinite",
        buzz: "buzz 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
