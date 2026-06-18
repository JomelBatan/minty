/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // --- Brand Colors ---
        toastedWaffle: "#A0522D",
        meltedButter: "#FFD700",
        creamyBatter: "#FDF5E6",
        syrupGreen: "#4A9E24",
        darkSyrup: "#5C350D",
        berryRed: "#D9534F",

        // --- Second Set (Merged, no duplicates) ---
        waffleGolden: "#FFD262",
        creamNeutral: "#FBF7EF",
        mapleBrown: "#8B4513",
      },
    },
  },
  plugins: [],
};
