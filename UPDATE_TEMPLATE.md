# Data Update Template

Use this template to prepare your updates before editing data.json

## Match Result Entry Template

**Date:** _____________
**Sport:** _____________
**Year:** FY / SY / TY / LY (circle one)

### Winner
**Branch:** _____________
**Points:** 10 / 8 / 5 (for winner)

### Runner-up  
**Branch:** _____________
**Points:** 7 / 5 / 3 (for runner-up)

---

## Points Reference (from your table)

### Major Sports
- Cricket: Winner 10, Runner-up 7
- Kho-Kho: Winner 8, Runner-up 5
- Kabaddi: Winner 8, Runner-up 5
- Volleyball: Winner 8, Runner-up 5
- Futsal: Winner 8, Runner-up 5
- Tug of War: Winner 8, Runner-up 5
- Hockey: Winner 8, Runner-up 5

### Medium Sports
- Box Cricket: Winner 5, Runner-up 3
- Basketball: Winner 5, Runner-up 3
- Badminton: Winner 5, Runner-up 3

### Small Events
- Athletics - 4x100 Relay: Winner 3, Runner-up 2
- Athletics - 100m: Winner 2, Runner-up 1
- Athletics - 200m: Winner 2, Runner-up 1
- Shot Put: Winner 2, Runner-up 1
- Javelin Throw: Winner 2, Runner-up 1
- Discus Throw: Winner 2, Runner-up 1
- Indoor Rowing: Winner 2, Runner-up 1
- Table Tennis: Winner 2, Runner-up 1
- Carrom: Winner 2, Runner-up 1
- Chess: Winner 2, Runner-up 1

### No Points
- Fun Games: Winner 0, Runner-up 0

---

## Daily Update Checklist

For each match completed:

- [ ] Record sport name
- [ ] Record year (FY/SY/TY/LY)
- [ ] Record winner branch and points
- [ ] Record runner-up branch and points
- [ ] Open data.json on GitHub
- [ ] Find the correct year section
- [ ] Update winner's points
- [ ] Update runner-up's points
- [ ] Commit changes with clear message
- [ ] Wait 2 minutes and verify on live site

---

## Example Updates

### Example 1: FY Cricket Match
- Winner: CS (10 points)
- Runner-up: ENTC (7 points)

**Changes in data.json:**
```json
"FY": {
  "CS": {
    "Cricket": 10,    ← Change from 0 to 10
  },
  "ENTC": {
    "Cricket": 7,     ← Change from 0 to 7
  }
}
```

### Example 2: SY Badminton Match
- Winner: CS (5 points)
- Runner-up: MECH (3 points)

**Changes in data.json:**
```json
"SY": {
  "CS": {
    "Badminton": 5,    ← Change from 0 to 5
  },
  "MECH": {
    "Badminton": 3,    ← Change from 0 to 3
  }
}
```

### Example 3: TY Chess Match
- Winner: CS (2 points)
- Runner-up: ELEC (1 point)

**Changes in data.json:**
```json
"TY": {
  "CS": {
    "Chess": 2,        ← Change from 0 to 2
  },
  "ELEC": {
    "Chess": 1,        ← Change from 0 to 1
  }
}
```

---

## Batch Update Form (for end of day)

**Date:** _____________

| Time | Sport | Year | Winner | W Pts | Runner-up | R Pts | Updated? |
|------|-------|------|--------|-------|-----------|-------|----------|
| __:__ | _____ | ____ | ______ | _____ | _________ | _____ | [ ] |
| __:__ | _____ | ____ | ______ | _____ | _________ | _____ | [ ] |
| __:__ | _____ | ____ | ______ | _____ | _________ | _____ | [ ] |
| __:__ | _____ | ____ | ______ | _____ | _________ | _____ | [ ] |
| __:__ | _____ | ____ | ______ | _____ | _________ | _____ | [ ] |

---

## Branch Abbreviations Reference

- CS = Computer Science
- ELEC = Electronics
- ENTC = Electronics & Telecommunication
- MECH = Mechanical
- INSTRU = Instrumentation
- MANU = Manufacturing
- META = Metallurgy
- CIVIL = Civil
- AI&ROBO = AI & Robotics

**Note:** AI&ROBO has no Final Year (LY)

---

## JSON Editing Tips

1. **Always keep the format:**
   ```json
   "Sport Name": number,
   ```

2. **Last item in each branch has NO comma after:**
   ```json
   "Cricket": 10,
   "Kho-Kho": 8,
   "Chess": 2      ← No comma here (last item)
   ```

3. **Check your work:**
   - Copy entire data.json content
   - Paste into https://jsonlint.com
   - Click "Validate JSON"
   - If green ✓ = Good!
   - If red ✗ = Fix the error shown

4. **Common errors:**
   - Missing comma between items
   - Extra comma after last item
   - Misspelled sport name
   - Wrong branch name
   - Editing TOTAL section (don't do this!)

---

## Verification Steps

After updating data.json:

1. **Immediate check:**
   - Did commit succeed? (green checkmark on GitHub)
   
2. **Wait 2 minutes**

3. **Browser check:**
   - Open site in incognito/private window
   - Check if points updated correctly
   - Check if TOTAL updated correctly
   - Check if ranking changed

4. **Mobile check:**
   - Open on phone
   - Verify display is correct
   - Test clicking on points

5. **If something's wrong:**
   - Go to repository
   - Click "Commits"
   - Find last working version
   - Copy data.json from there
   - Paste back and commit

---

## Contact Information

**Primary updater:** _____________
**Backup updater:** _____________
**Tech support:** _____________

**Repository URL:** _____________
**Live site URL:** _____________

---

## Notes Section

Use this space for special notes, unusual results, or things to remember:

___________________________________________________________________

___________________________________________________________________

___________________________________________________________________

___________________________________________________________________
