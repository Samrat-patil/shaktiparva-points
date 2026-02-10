# Deployment Guide - Shaktiparva'26 Dashboard

This guide will help you deploy the Shaktiparva'26 Points Dashboard and set up daily updates.

## Quick Start (5 Minutes)

### Option 1: GitHub Pages (Recommended)

**Step 1: Create GitHub Repository**
1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Name it: `shaktiparva-2026-dashboard`
4. Make it Public
5. Click "Create repository"

**Step 2: Upload Files**
1. Click "uploading an existing file"
2. Drag and drop all these files:
   - index.html
   - app.jsx
   - styles.css
   - data.json
   - shaktiparvalogo_withoutbg.png
   - README.md
3. Click "Commit changes"

**Step 3: Enable GitHub Pages**
1. Go to Settings → Pages (left sidebar)
2. Under "Source", select "Deploy from a branch"
3. Select branch: `main` and folder: `/ (root)`
4. Click Save
5. Wait 2-3 minutes

**Step 4: Access Your Site**
Your site will be live at: `https://YOUR-USERNAME.github.io/shaktiparva-2026-dashboard/`

### Daily Updates on GitHub

**Method A: GitHub Web Interface** (No technical knowledge needed)
1. Go to your repository on GitHub
2. Click on `data.json`
3. Click the pencil icon (Edit this file)
4. Update the points
5. Scroll down and click "Commit changes"
6. Your site updates automatically in 1-2 minutes!

**Method B: Using Git** (For regular updates)
```bash
# One-time setup
git clone https://github.com/YOUR-USERNAME/shaktiparva-2026-dashboard.git
cd shaktiparva-2026-dashboard

# Daily updates
# 1. Edit data.json with your text editor
# 2. Then run:
git add data.json
git commit -m "Update points - [Date]"
git push

# Site updates automatically!
```

---

## Option 2: Netlify (Even Easier!)

**Step 1: Sign Up**
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub (or email)

**Step 2: Deploy**
1. Click "Add new site" → "Deploy manually"
2. Drag the entire project folder into the upload area
3. Wait 30 seconds
4. Done! Your site is live

**Step 3: Get Your URL**
- Netlify gives you: `https://random-name.netlify.app`
- You can change the name in Site settings

**Daily Updates on Netlify**
1. Go to your site dashboard
2. Click "Deploys"
3. Click "Deploy settings" → scroll to "File browser"
4. Edit `data.json`
5. Save → Site updates instantly!

---

## Option 3: Vercel (Fast & Free)

**Step 1: Sign Up**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

**Step 2: Import Repository**
1. Click "Add New" → "Project"
2. Import your GitHub repository
3. Click "Deploy"
4. Done!

**Your URL:** `https://your-project.vercel.app`

**Daily Updates:**
Just update `data.json` on GitHub, Vercel auto-deploys!

---

## Data Update Methods

### Method 1: Direct JSON Editing (Simple)

Open `data.json` and update points:

```json
"FY": {
  "CS": {
    "Cricket": 10,     ← Change this number
    "Kho-Kho": 0,
    ...
  }
}
```

**Remember:**
- Update only FY, SY, TY, or LY sections
- TOTAL is calculated automatically
- Keep the JSON format (commas, quotes, brackets)

### Method 2: Using the Update Script (Advanced)

**Interactive Mode:**
```bash
python update-points.py

# Follow the prompts:
# 1. Select "Update points for a match"
# 2. Enter year, branch, sport, points
# 3. Script auto-calculates totals
# 4. Save and exit
```

**Command Line Mode:**
```bash
# Quick update
python update-points.py FY CS Cricket 10

# Multiple updates
python update-points.py FY ELEC Kho-Kho 8
python update-points.py SY ENTC Cricket 10
python update-points.py TY MANU Cricket 7
```

**Check Branch Summary:**
```bash
python update-points.py
# Select option 2
# Enter branch name (e.g., CS)
```

---

## Custom Domain (Optional)

### GitHub Pages
1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In repository Settings → Pages
3. Enter your custom domain
4. Update DNS records at your domain provider

### Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS

---

## Backup Strategy

### Automatic Backups (GitHub)
- Every commit is a backup
- View history: Repository → "Commits"
- Restore: Click any commit → "Browse files" → download

### Manual Backups
```bash
# Before big updates
cp data.json data.json.backup

# Restore if needed
cp data.json.backup data.json
```

---

## Troubleshooting

### Site Not Updating
1. **Clear browser cache**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Check deployment**: GitHub Pages takes 1-2 minutes
3. **Check JSON syntax**: Use [jsonlint.com](https://jsonlint.com)

### Logo Not Showing
- Ensure `shaktiparvalogo_withoutbg.png` is uploaded
- Check file name matches exactly (case-sensitive)

### Data Not Loading
- Open browser console (F12)
- Look for error messages
- Check if `data.json` is valid JSON

### Mobile Issues
- Make sure viewport meta tag is present
- Test on actual devices, not just browser DevTools

---

## Performance Tips

1. **Optimize images**: Keep logo under 200KB
2. **Don't edit live data during matches**: Use a staging version first
3. **Test JSON changes**: Use jsonlint.com before committing

---

## Security

- No login system = No passwords to manage
- Data is public (as intended)
- GitHub/Netlify/Vercel handle all security
- Use HTTPS (automatic on all platforms)

---

## Support Checklist

Before asking for help:
- [ ] Checked if data.json is valid JSON
- [ ] Cleared browser cache
- [ ] Checked browser console for errors
- [ ] Tried on different browser
- [ ] Waited 2-3 minutes after update

---

## Quick Reference

**Update Points:**
1. Edit `data.json`
2. Commit/Upload
3. Wait 1-2 minutes
4. Clear cache if needed

**Check Current Points:**
Visit your live URL in incognito mode

**Test Locally:**
```bash
python -m http.server 8000
# Open: http://localhost:8000
```

---

## Contact & Credits

**Repository:** [Your GitHub URL]
**Live Site:** [Your Deployment URL]
**Last Updated:** February 2026

**For Issues:** Create an issue on GitHub or contact the tech team.

---

**Happy Tracking! 🏆**
