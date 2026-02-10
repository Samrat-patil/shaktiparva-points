#!/usr/bin/env python3
"""
Shaktiparva'26 Points Update Script
Simple script to update points and automatically recalculate totals
"""

import json
import sys

DATA_FILE = 'data.json'

# Branch and sport lists
BRANCHES = ['CS', 'ELEC', 'ENTC', 'MECH', 'INSTRU', 'MANU', 'META', 'CIVIL', 'AI&ROBO']
YEARS = ['FY', 'SY', 'TY', 'LY']

def load_data():
    """Load the current data from JSON file"""
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_data(data):
    """Save data back to JSON file"""
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"✅ Data saved to {DATA_FILE}")

def recalculate_totals(data):
    """Recalculate all TOTAL points from FY, SY, TY, LY"""
    print("🔄 Recalculating totals...")
    
    for branch in BRANCHES:
        if branch not in data['TOTAL']:
            data['TOTAL'][branch] = {}
        
        # Get all sports from any year
        all_sports = set()
        for year in YEARS:
            if branch in data[year]:
                all_sports.update(data[year][branch].keys())
        
        # Calculate totals for each sport
        for sport in all_sports:
            total = 0
            for year in YEARS:
                if branch in data[year] and sport in data[year][branch]:
                    total += data[year][branch][sport]
            
            data['TOTAL'][branch][sport] = total
    
    print("✅ Totals recalculated")
    return data

def update_points(data, year, branch, sport, points):
    """Update points for a specific year/branch/sport"""
    if year not in YEARS + ['TOTAL']:
        print(f"❌ Invalid year: {year}. Must be one of {YEARS}")
        return False
    
    if branch not in BRANCHES:
        print(f"❌ Invalid branch: {branch}. Must be one of {BRANCHES}")
        return False
    
    if year == 'TOTAL':
        print("❌ Cannot directly update TOTAL. Update individual years instead.")
        return False
    
    # Ensure branch exists in year
    if branch not in data[year]:
        data[year][branch] = {}
    
    # Update the points
    old_points = data[year][branch].get(sport, 0)
    data[year][branch][sport] = points
    
    print(f"✅ Updated {year} - {branch} - {sport}: {old_points} → {points}")
    return True

def show_branch_summary(data, branch):
    """Show summary for a specific branch"""
    print(f"\n{'='*60}")
    print(f"📊 SUMMARY FOR {branch}")
    print(f"{'='*60}\n")
    
    for year in YEARS + ['TOTAL']:
        if branch in data[year]:
            total = sum(data[year][branch].values())
            print(f"{year:12} : {total:3} points")
            
            # Show non-zero sports
            sports_list = [(sport, pts) for sport, pts in data[year][branch].items() if pts > 0]
            if sports_list:
                sports_list.sort(key=lambda x: x[1], reverse=True)
                for sport, pts in sports_list:
                    print(f"  └─ {sport:30} : {pts}")
    print()

def interactive_update():
    """Interactive mode for updating points"""
    print("\n🏆 Shaktiparva'26 Points Update Tool")
    print("="*60)
    
    data = load_data()
    
    while True:
        print("\nOptions:")
        print("1. Update points for a match")
        print("2. View branch summary")
        print("3. Recalculate totals and save")
        print("4. Exit")
        
        choice = input("\nSelect option (1-4): ").strip()
        
        if choice == '1':
            print(f"\nYears: {', '.join(YEARS)}")
            year = input("Enter year: ").strip().upper()
            
            print(f"\nBranches: {', '.join(BRANCHES)}")
            branch = input("Enter branch: ").strip().upper()
            
            sport = input("Enter sport name: ").strip()
            
            try:
                points = int(input("Enter points: ").strip())
            except ValueError:
                print("❌ Invalid points. Must be a number.")
                continue
            
            if update_points(data, year, branch, sport, points):
                # Auto-recalculate totals
                data = recalculate_totals(data)
        
        elif choice == '2':
            print(f"\nBranches: {', '.join(BRANCHES)}")
            branch = input("Enter branch: ").strip().upper()
            
            if branch in BRANCHES:
                show_branch_summary(data, branch)
            else:
                print("❌ Invalid branch")
        
        elif choice == '3':
            data = recalculate_totals(data)
            save_data(data)
        
        elif choice == '4':
            save_confirm = input("\nSave changes before exiting? (y/n): ").strip().lower()
            if save_confirm == 'y':
                data = recalculate_totals(data)
                save_data(data)
            print("\n👋 Goodbye!")
            break
        
        else:
            print("❌ Invalid option")

def batch_update():
    """Batch update mode from command line"""
    if len(sys.argv) < 5:
        print("Usage: python update-points.py <year> <branch> <sport> <points>")
        print("Example: python update-points.py FY CS Cricket 10")
        sys.exit(1)
    
    year = sys.argv[1].upper()
    branch = sys.argv[2].upper()
    sport = sys.argv[3]
    points = int(sys.argv[4])
    
    data = load_data()
    
    if update_points(data, year, branch, sport, points):
        data = recalculate_totals(data)
        save_data(data)
        print(f"\n✨ Update complete!")
        show_branch_summary(data, branch)
    else:
        sys.exit(1)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        batch_update()
    else:
        interactive_update()
