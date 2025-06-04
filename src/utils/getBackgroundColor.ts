function getBackgroundColor(element: HTMLElement) {
    let current = element.parentElement;

    while (current) {
        const bgColor = window.getComputedStyle(current).backgroundColor;
        const opacity = parseFloat(window.getComputedStyle(current).opacity);

        // Create temporary element to parse color
        const tempEl = document.createElement("div");
        tempEl.style.color = bgColor;
        document.body.appendChild(tempEl);
        const computedColor = window.getComputedStyle(tempEl).color;
        document.body.removeChild(tempEl);

        // Parse RGB values
        const match = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*[\d.]+)?\)/);

        if (match) {
            const r = parseInt(match[1]);
            const g = parseInt(match[2]);
            const b = parseInt(match[3]);
            const a = match[4] ? parseFloat(match[4].split(",")[1]) : 1;

            // Check if color is visible (non-transparent and opacity > 0)
            if (a > 0 && opacity > 0 && !(r === 0 && g === 0 && b === 0 && a === 0)) {
                return bgColor;
            }
        } else if (bgColor !== "transparent") {
            // Handle named colors, hex, hsl, etc.
            return bgColor;
        }

        current = current.parentElement;
    }

    return null; // No visible background found
}

export default getBackgroundColor;
