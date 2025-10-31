//@ts-check
import sharp from "sharp"
import fs from "fs"

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf8"))
const gap = 4
const padding = 8
const fontSize = 14
const border = 4
const canvasHeight = 20

for await (const badge of manifest) {

    // Load and resize icon
    const icon = await sharp(`assets/${badge.id}.svg`)
        .resize(fontSize, fontSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer()

    // Create text SVG - render at a consistent height
    const textSvg = `
        <svg width="500" height="${canvasHeight}">
            <text 
                x="0" 
                y="${canvasHeight / 2}" 
                font-family="Poppins" 
                font-size="${fontSize}" 
                font-weight="600"
                fill="#f0f0f0" 
                dominant-baseline="middle"
            >${badge.label}</text>
        </svg>
    `

    // Render and trim to measure width, but keep original height
    const textRendered = await sharp(Buffer.from(textSvg)).png().toBuffer()
    const trimmed = await sharp(textRendered).trim({ threshold: 5 }).toBuffer()
    const trimmedMeta = await sharp(trimmed).metadata()
    const textWidth = trimmedMeta.width

    // Extract the text at full canvas height for consistent vertical alignment
    const textBuffer = await sharp(textRendered)
        .extract({ left: 0, top: 0, width: textWidth, height: canvasHeight })
        .toBuffer()
    const canvasWidth = Math.floor((padding * 2) + fontSize + gap + textWidth)

    // Create background with rounded corners
    const bgSvg = `
        <svg width="${canvasWidth}" height="${canvasHeight}">
            <rect 
                width="${canvasWidth}" 
                height="${canvasHeight}" 
                rx="${border}" 
                ry="${border}" 
                fill="${badge.color}"
            />
        </svg>
    `

    // Composite everything together
    const comp = await sharp(Buffer.from(bgSvg))
        .composite([
            { input: icon, left: padding, top: Math.floor((canvasHeight - fontSize) / 2) },
            { input: textBuffer, left: padding + fontSize + gap, top: 0 }
        ])
        .png()
        .toBuffer()

    // Write to Disk
    fs.writeFileSync(`generated/${badge.id}.png`, comp)
}