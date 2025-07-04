# CodeAndChemistry - Save the Date

A premium, minimalistic save the date landing page celebrating the union of a techie and a biochemist.

## 🎨 Design Features

- **Premium white and gold color scheme** with champagne accents
- **Minimalistic and classy design** with elegant typography
- **Real-time countdown** to December 6, 2025
- **Dual theme integration** - coding and chemistry elements
- **Responsive design** that looks great on all devices
- **Smooth animations** and hover effects
- **Custom icons** representing both code and chemistry
- **Background video/image support** with elegant white overlays
- **Subtle themed doodles** scattered across the background

## 🎬 Background Media Setup

### Adding Your Own Video/Image:

1. **For Video Background:**
   - Add your video file as `public/wedding-bg.mp4`
   - Add a poster image as `public/wedding-poster.jpg`
   - Supported formats: MP4, WebM

2. **For Image Background:**
   - Add your image as `public/wedding-bg.jpg` (or .png)
   - Update the component in `app/page.tsx`:
   ```tsx
   <BackgroundMedia type="image" src="/wedding-bg.jpg" />
   ```

3. **Recommended Media:**
   - **Wedding photos** - engagement photos, couple shots
   - **Lab/workspace scenes** - coding setup, chemistry lab
   - **Abstract backgrounds** - geometric patterns, soft textures
   - **Nature scenes** - elegant landscapes, soft bokeh

### Media Specifications:
- **Video:** 1920x1080 or higher, 30fps, compressed for web
- **Image:** 1920x1080 or higher, optimized for web (< 2MB)
- **Style:** Soft, romantic, not too busy (white overlay will be applied)

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your background media:**
   - Place video: `public/wedding-bg.mp4`
   - Place poster: `public/wedding-poster.jpg`

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠 Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Custom animations** and transitions
- **Responsive design** principles

## 🎯 Key Elements

### Visual Theme
- Clean white background with subtle golden gradients
- Background video/image with white overlay for readability
- Custom icons for coding (< >) and chemistry (⚗️)
- Mathematical formula representation: Code + Chemistry = True Love
- Hashtag: #CodeAndChemistry
- Subtle themed doodles (coding, chemistry, sickle cells)

### Interactive Features
- Live countdown timer showing days, hours, minutes, and seconds
- Hover effects on countdown cards
- Smooth scroll animations
- Gradient text effects
- Auto-playing background video (muted)

### Typography
- **Yellowtail** for bride's elegant cursive name
- **JetBrains Mono** for groom's code-themed name
- **Inter** for clean body text

## 📱 Responsive Design

The page is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Color Palette

- **Primary:** White (#ffffff) with overlay
- **Gold:** Various shades from #d4af37 to #fad154
- **Champagne:** Warm golden tones
- **Text:** Elegant grays and black for readability
- **Doodles:** White and light gold overlays

## 🔧 Customization

You can easily customize:
- Wedding date in `components/countdown.tsx`
- Background media in `components/background-media.tsx`
- Color scheme in `tailwind.config.js`
- Content and messaging in `app/page.tsx`
- Typography in `app/globals.css`
- Doodle elements in `components/background-doodles.tsx`

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎉 Perfect for

- Save the date announcements
- Wedding websites
- Couple introductions
- Event countdowns
- Tech + Science themed celebrations

## 🎬 Media Ideas

- **Engagement photos** with soft lighting
- **Lab scenes** - chemistry equipment, coding workspace
- **Abstract textures** - soft, romantic backgrounds
- **Nature scenes** - soft bokeh, gentle movements

---

*Made with ❤️, code, and chemistry*