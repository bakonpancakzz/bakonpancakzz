## 🌟 `Profile Badges`

Simple badge generator for my README, feel free to use them yourself.

### ➕ Contributing

1. Install [Poppins SemiBold](https://fonts.google.com/specimen/Poppins) Font

2. Add an entry to the `manifest.json` file using the following format:  
   `{ "id": "<filename>", "label": "<text>>", "color": "#<rgb hex>" }`

3. Place an SVG with the matching **filename** into the **images** directory
   - Foreground `(fill)` should be off-white or specifically `#f0f0f0`
   - Background should be transparent

4. Re-render all badges before committing by running the render.js script
   ```
   npm install
   node render.js
   ```