# Shaktiparva'26 - Points Dashboard

A beautiful, responsive web application for tracking sports points across different branches and years for the Shaktiparva'26 annual sports festival.

## Features

✨ **Beautiful Design**
- Modern dark theme with golden accents
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- No scrollbars - optimized layouts

🎯 **Comprehensive Points Tracking**
- Points for 9 branches: CS, ELEC, ENTC, MECH, INSTRU, MANU, META, CIVIL, AI&ROBO
- 4 year categories: First Year, Second Year, Third Year, Final Year
- Automatic total calculation across all years
- Color-coded branches for easy identification

📊 **Interactive Features**
- Click on points to see detailed breakdown
- Year-wise breakdown for total points
- Sport-wise breakdown for individual years
- Automatic sorting by points (highest first)
- Medal-style ranking badges

## File Structure

```
shaktiparva-dashboard/
├── index.html          # Main HTML file
├── app.jsx            # React application
├── styles.css         # All CSS styles
├── data.json          # Points data (update daily)
├── shaktiparvalogo_withoutbg.png  # Logo
└── README.md          # This file
```

## How to Update Daily Points

### Option 1: Direct JSON Editing (Recommended)

1. Open `data.json` in any text editor
2. Update the points for each sport under the appropriate year and branch
3. The TOTAL section will automatically calculate when you refresh
4. Save the file
5. Commit and push to GitHub (if using GitHub Pages)

**Example:**
```json
"FY": {
  "CS": {
    "Cricket": 10,    // Update this value
    "Kho-Kho": 0,
    // ... other sports
  }
}
```

### Option 2: Using a Simple Update Script

Create a file `update-points.js` to make updates easier:

```javascript
const fs = require('fs');
const data = require('./data.json');

// Update function
function updatePoints(year, branch, sport, points) {
  data[year][branch][sport] = points;
  
  // Recalculate TOTAL
  data.TOTAL[branch][sport] = 
    (data.FY[branch][sport] || 0) +
    (data.SY[branch][sport] || 0) +
    (data.TY[branch][sport] || 0) +
    (data.LY[branch][sport] || 0);
}

// Example: Update CS FY Cricket to 10 points
updatePoints('FY', 'CS', 'Cricket', 10);

// Save
fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
console.log('Points updated successfully!');
```

## Deployment Options

### Option 1: GitHub Pages (Free, Recommended)

1. Create a GitHub repository
2. Push all files to the repository
3. Go to Settings → Pages
4. Select branch: `main` and folder: `/ (root)`
5. Save and wait for deployment
6. Your site will be live at: `https://yourusername.github.io/repo-name`

**Daily Updates:**
- Edit `data.json` on GitHub directly or via Git
- Changes appear instantly after commit

### Option 2: Netlify (Free, Drag & Drop)

1. Go to [netlify.com](https://netlify.com)
2. Sign up for free
3. Drag and drop your project folder
4. Site goes live immediately
5. Get a URL like: `https://your-site.netlify.app`

**Daily Updates:**
- Use Netlify's online file editor
- Or connect to GitHub for automatic updates

### Option 3: Vercel (Free, Fast)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Auto-deploys on every commit

### Option 4: Local Server (For Testing)

```bash
# Option A: Using Python
python -m http.server 8000

# Option B: Using Node.js
npx http-server

# Then open: http://localhost:8000
```

## Branch Colors

Each branch has a unique color for easy identification:

- **CS**: Blue (#3b82f6)
- **ELEC**: Yellow (#eab308)
- **ENTC**: Green (#10b981)
- **MECH**: Red (#ef4444)
- **INSTRU**: Purple (#a855f7)
- **MANU**: Orange (#f97316)
- **META**: Cyan (#06b6d4)
- **CIVIL**: Lime (#84cc16)
- **AI&ROBO**: Pink (#ec4899)

## Sports List

The system tracks points for:

**Team Sports:**
- Cricket, Kho-Kho, Kabaddi, Volleyball, Futsal, Tug of War, Hockey, Box Cricket, Basketball

**Individual Sports:**
- Badminton, Table Tennis, Carrom, Chess

**Athletics:**
- 4x100 Relay, 100m, 200m, Shot Put, Javelin Throw, Discus Throw, Indoor Rowing

## Data Structure

```json
{
  "FY": { "BRANCH": { "SPORT": points } },
  "SY": { "BRANCH": { "SPORT": points } },
  "TY": { "BRANCH": { "SPORT": points } },
  "LY": { "BRANCH": { "SPORT": points } },
  "TOTAL": { "BRANCH": { "SPORT": total_points } }
}
```

**Important:** The TOTAL section is calculated by summing FY + SY + TY + LY for each branch and sport.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --accent-gold: #f59e0b;
  --accent-flame: #ff6b35;
  /* ... other colors */
}
```

### Change Logo
Replace `shaktiparvalogo_withoutbg.png` with your logo (recommended size: 512x512px, PNG format)

### Change Fonts
Edit the Google Fonts link in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

## Troubleshooting

**Problem:** Logo doesn't appear
- Make sure `shaktiparvalogo_withoutbg.png` is in the same folder as `index.html`

**Problem:** Data doesn't update
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check if `data.json` is properly formatted (use [jsonlint.com](https://jsonlint.com))

**Problem:** Modal doesn't close
- Check browser console for errors (F12)
- Ensure React libraries are loading properly

## Performance

- Fast loading (< 1 second)
- Optimized animations
- Minimal dependencies
- Works offline after first load

## License

Free to use for educational purposes.

## Credits

Designed for Shaktiparva'26 Annual Sports Festival

---

**Need Help?** Check the issues section or contact the development team.

**Last Updated:** February 2026
