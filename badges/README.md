## 🌟 `Profile Badges`

Simple badge generator for my README, feel free to use them yourself.

### ➕ Contributing

1. Add an entry to the `manifest.json` file using the following format:
    ```
    {filename} | {text content} | {background color}
    ```
    - Fields are seperated with a vertical bar `( | )`
    - Leading and trailing whitespaces are trimmed
    - `{background color}` must be compatible with CSS

2. Place an SVG with the matching **filename** into the **images** directory
   - Foreground `(fill)` should be off-white or specifically `#f0f0f0`
   - Background should be transparent

3. Re-render all badges before committing by running the render.js script
   ```
   npm install
   node render.js
   ```