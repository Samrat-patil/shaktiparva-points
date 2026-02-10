# Quick Start Guide - Shaktiparva'26 Dashboard

## 🚀 Get Your Website Online in 5 Minutes

### For Non-Technical Users (GitHub Pages Method)

**1. Create a GitHub Account** (if you don't have one)
   - Go to https://github.com
   - Click "Sign up"
   - Use your email and create a password

**2. Create a New Repository**
   - Click the "+" icon at top right
   - Click "New repository"
   - Repository name: `shaktiparva-dashboard`
   - Select "Public"
   - Click "Create repository"

**3. Upload Your Files**
   - Click "uploading an existing file"
   - Drag ALL these files into the upload area:
     * index.html
     * app.jsx
     * styles.css
     * data.json
     * shaktiparvalogo_withoutbg.png
     * README.md
     * update-points.py (optional)
   - Click "Commit changes"

**4. Enable GitHub Pages**
   - Click "Settings" (top menu)
   - Click "Pages" (left sidebar)
   - Under "Source": select "main" branch and "/ (root)" folder
   - Click "Save"
   - Wait 2-3 minutes

**5. Get Your Link**
   - A green box will appear with your link
   - It will look like: `https://yourusername.github.io/shaktiparva-dashboard/`
   - Share this link with everyone!

---

## 📝 How to Update Points Daily

### Easy Method: GitHub Web Editor

1. Go to your repository on GitHub
2. Click on the `data.json` file
3. Click the pencil icon (✏️) to edit
4. Find the section you want to update
5. Change the number
6. Scroll down and click "Commit changes"
7. Done! Website updates in 1-2 minutes

**Example:**
```json
"FY": {
  "CS": {
    "Cricket": 10,    ← Change this number
```

**Important:** 
- Only change numbers in FY, SY, TY, or LY sections
- Don't change TOTAL - it calculates automatically
- Keep all commas and quotes exactly as they are

---

## 🎨 What Each File Does

- **index.html** - The main page (don't edit unless you know HTML)
- **app.jsx** - The code that makes everything work (don't edit)
- **styles.css** - Colors and design (you can change colors here)
- **data.json** - ⭐ THIS IS WHAT YOU'LL UPDATE DAILY ⭐
- **shaktiparvalogo_withoutbg.png** - The logo image
- **README.md** - Instructions and documentation

---

## 🏆 Understanding the Data Structure

```json
{
  "FY": {           ← First Year
    "CS": {         ← Computer Science branch
      "Cricket": 10,     ← Sport and points
      "Kho-Kho": 0,
      ...
    },
    "ELEC": { ... },
    ...
  },
  "SY": { ... },    ← Second Year
  "TY": { ... },    ← Third Year  
  "LY": { ... },    ← Final Year (Last Year)
  "TOTAL": { ... }  ← DON'T EDIT - Auto-calculated
}
```

---

## ⚠️ Common Mistakes to Avoid

1. **Missing Comma**
   ```json
   ❌ "Cricket": 10
      "Kho-Kho": 5
   
   ✅ "Cricket": 10,
      "Kho-Kho": 5
   ```

2. **Editing TOTAL Section**
   - Don't manually change TOTAL
   - It's calculated from FY + SY + TY + LY

3. **Wrong Branch Name**
   - Use: CS, ELEC, ENTC, MECH, INSTRU, MANU, META, CIVIL, AI&ROBO
   - Exact spelling and capitalization matter!

---

## 🔧 Troubleshooting

**Problem: Website shows old data**
- Solution: Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**Problem: Logo not showing**
- Solution: Make sure logo file is uploaded and named exactly: `shaktiparvalogo_withoutbg.png`

**Problem: Data doesn't update**
- Solution: Wait 2-3 minutes after committing changes
- Check if JSON is valid at https://jsonlint.com

**Problem: Website broken after edit**
- Solution: Go to repository → Commits → click previous commit → find data.json → copy content → paste back

---

## 📱 Mobile Access

The dashboard works perfectly on:
- ✅ Phones (all sizes)
- ✅ Tablets
- ✅ Laptops
- ✅ Desktops

No separate mobile version needed!

---

## 🎯 Daily Workflow

**After each match:**
1. Open GitHub on your phone/computer
2. Go to your repository
3. Click `data.json` → Edit (pencil icon)
4. Find the year and branch
5. Update the sport points
6. Commit changes
7. Wait 1-2 minutes
8. Check website in incognito/private mode

---

## 💡 Pro Tips

1. **Bookmark your repository** for quick access
2. **Test changes** in a text editor first if unsure
3. **Use a laptop** for easier editing (but phone works too!)
4. **Keep a backup** of data.json on your computer
5. **Commit messages** should be clear: "Updated CS FY Cricket points to 10"

---

## 📊 Features You'll Love

✨ **Automatic Sorting** - Branches sorted by points (highest first)
🏅 **Medal Badges** - Top 3 get gold, silver, bronze
🎨 **Color Coded** - Each branch has unique color
📱 **Mobile Friendly** - Works on all devices
🔄 **Auto Totals** - TOTAL calculated automatically
💫 **Smooth Animations** - Beautiful transitions
🎯 **Click Points** - See detailed breakdown

---

## 🆘 Need Help?

**Before Asking:**
1. Read this guide again
2. Check DEPLOYMENT.md for detailed steps
3. Check README.md for technical details
4. Try on a different browser

**Still Stuck?**
- Check repository "Issues" tab
- Contact your tech team
- Include: what you tried, what happened, what you expected

---

## 📞 Quick Reference Card

**Your Repository URL:**
`https://github.com/YOUR-USERNAME/shaktiparva-dashboard`

**Your Live Website URL:**
`https://YOUR-USERNAME.github.io/shaktiparva-dashboard/`

**To Update Data:**
Repository → data.json → Edit → Change numbers → Commit

**To Change Logo:**
Repository → Upload files → Choose new logo → Commit

**To Restore Old Version:**
Repository → Commits → Find good version → Browse files → Copy data.json

---

## 🎓 Learning Resources

Want to customize more?

- **Change colors:** Edit styles.css
- **HTML basics:** https://www.w3schools.com/html/
- **JSON format:** https://www.json.org/
- **GitHub basics:** https://guides.github.com/

---

## ✅ Checklist Before Going Live

- [ ] All files uploaded
- [ ] GitHub Pages enabled
- [ ] Logo showing correctly
- [ ] Test data appears correctly
- [ ] Tested on mobile and desktop
- [ ] Shared link with team
- [ ] Bookmarked repository
- [ ] Know how to edit data.json

---

**You're All Set! 🎉**

Your Shaktiparva'26 dashboard is ready to track all the exciting matches!

**Remember:** The website updates automatically when you commit changes to data.json

**Good luck with the tournament! 🏆**
