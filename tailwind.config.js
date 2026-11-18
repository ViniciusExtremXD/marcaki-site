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
        /* Sistema institucional: tinta quase preta violeta, névoa para superfícies alternadas, linhas finas */
        tinta: {
          DEFAULT: "#15122B",
          2: "#55516B",
          3: "#8A8699",
        },
        linha: "#E6E3EC",
        papel: "#FFFFFF",
        nevoa: "#F5F4F8",
        noite: "#170D33",
        ok: "#15803D",
        furo: "#DC2626",
      },
      fontFamily: {
        display: ['"Newsreader Variable"', "Georgia", "serif"],
        sans: ['"Hanken Grotesk Variable"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        ui: ['"Hanken Grotesk Variable"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
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
      /* Sombras discretas, uma camada só: o acabamento vem das linhas finas, não de sombra */
      boxShadow: {
        soft: "0 1px 2px rgba(21,18,43,0.04), 0 4px 12px -6px rgba(21,18,43,0.08)",
        card: "0 1px 2px rgba(21,18,43,0.04), 0 12px 32px -16px rgba(21,18,43,0.16)",
        lift: "0 1px 2px rgba(21,18,43,0.05), 0 24px 48px -24px rgba(21,18,43,0.22)",
        phone: "0 1px 2px rgba(21,18,43,0.08), 0 40px 80px -36px rgba(21,18,43,0.45)",
        roxo: "0 8px 20px -10px rgba(124,58,237,0.45)",
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
