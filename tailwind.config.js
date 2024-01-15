/** @type {import('tailwindcss').Config} */

module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: "#4b9c5c",
                green: {
                    50: "#f3faf4",
                    100: "#e4f4e7",
                    200: "#cae8d0",
                    300: "#a0d5aa",
                    400: "#6fb97e",
                    500: "#4b9c5c",
                    600: "#347441",
                    700: "#30653b",
                    800: "#2a5133",
                    900: "#24432b",
                    950: "#0f2415",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
