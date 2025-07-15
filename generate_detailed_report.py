import os
import re

# Read the missing Spanish pages from our previous analysis
with open('english_pages.txt', 'r') as f:
    english_pages = [line.strip() for line in f.readlines()]

with open('spanish_pages.txt', 'r') as f:
    spanish_pages = [line.strip() for line in f.readlines()]

# Create detailed categorization
detailed_categories = {
    'Location Pages - Charlotte': [],
    'Location Pages - Raleigh': [],
    'Location Pages - Other Cities': [],
    'Near Me Pages - By City': {},
    'Practice Areas - Immigration': [],
    'Practice Areas - Criminal Defense': [],
    'Practice Areas - Personal Injury': [],
    'Practice Areas - Workers Compensation': [],
    'Practice Areas - Family Law': [],
    'Practice Areas - Traffic': [],
    'Blog Posts - Legal Updates': [],
    'Blog Posts - Educational': [],
    'Attorney Profiles': [],
    'Service & Conversion Pages': [],
    'Admin Pages (Low Priority)': []
}

# Check which English pages don't have Spanish equivalents
spanish_paths = set(p.replace('src/app/es/', '') for p in spanish_pages)

for page in english_pages:
    # Skip if Spanish version exists
    spanish_equivalent = page.replace('src/app/', 'es/')
    if any(sp.endswith(spanish_equivalent[6:]) for sp in spanish_pages):
        continue
    
    # Skip admin pages analysis (low priority)
    if '/admin/' in page:
        detailed_categories['Admin Pages (Low Priority)'].append(page)
        continue
    
    # Location pages
    if '/locations/charlotte/' in page:
        detailed_categories['Location Pages - Charlotte'].append(page)
    elif '/locations/raleigh/' in page:
        detailed_categories['Location Pages - Raleigh'].append(page)
    elif '/locations/' in page or '/contact/' in page and 'office-location' in page:
        detailed_categories['Location Pages - Other Cities'].append(page)
    
    # Near me pages
    elif '/near-me/' in page:
        city_match = re.search(r'/near-me/([^-]+)-', page)
        if city_match:
            city = city_match.group(1).title()
            if city not in detailed_categories['Near Me Pages - By City']:
                detailed_categories['Near Me Pages - By City'][city] = []
            detailed_categories['Near Me Pages - By City'][city].append(page)
    
    # Practice areas
    elif '/immigration/' in page or 'immigration' in page.lower():
        detailed_categories['Practice Areas - Immigration'].append(page)
    elif '/criminal-defense/' in page or 'criminal' in page.lower():
        detailed_categories['Practice Areas - Criminal Defense'].append(page)
    elif '/personal-injury/' in page or 'injury' in page.lower() or 'accident' in page.lower():
        detailed_categories['Practice Areas - Personal Injury'].append(page)
    elif '/workers-compensation/' in page or 'workers' in page.lower():
        detailed_categories['Practice Areas - Workers Compensation'].append(page)
    elif '/family-law/' in page or 'family' in page.lower() or 'divorce' in page.lower():
        detailed_categories['Practice Areas - Family Law'].append(page)
    elif '/traffic/' in page or 'traffic' in page.lower():
        detailed_categories['Practice Areas - Traffic'].append(page)
    
    # Blog posts
    elif '/blog/legal-update-' in page:
        detailed_categories['Blog Posts - Legal Updates'].append(page)
    elif '/blog/' in page:
        detailed_categories['Blog Posts - Educational'].append(page)
    
    # Attorney profiles
    elif '/attorneys/' in page:
        detailed_categories['Attorney Profiles'].append(page)
    
    # Service pages
    elif any(keyword in page for keyword in ['consultation', 'appointment', 'payment', 'quote', 'contact']):
        detailed_categories['Service & Conversion Pages'].append(page)

# Generate detailed report
print("=== DETAILED MISSING SPANISH PAGES REPORT ===\n")

# High priority sections
print("## HIGH PRIORITY - SERVICE & CONVERSION PAGES")
for page in detailed_categories['Service & Conversion Pages']:
    print(f"- {page}")

print("\n## HIGH PRIORITY - NEAR ME PAGES BY CITY")
for city, pages in sorted(detailed_categories['Near Me Pages - By City'].items()):
    print(f"\n### {city} ({len(pages)} pages)")
    for page in pages:
        service = page.split('/')[-2].replace('-near-me', '').replace(city.lower() + '-', '')
        print(f"- {service}")

print("\n## HIGH PRIORITY - MAIN LOCATION PAGES")
print(f"\n### Charlotte ({len(detailed_categories['Location Pages - Charlotte'])} pages)")
for page in detailed_categories['Location Pages - Charlotte'][:5]:
    print(f"- {page}")
if len(detailed_categories['Location Pages - Charlotte']) > 5:
    print(f"... and {len(detailed_categories['Location Pages - Charlotte']) - 5} more")

print(f"\n### Raleigh ({len(detailed_categories['Location Pages - Raleigh'])} pages)")
for page in detailed_categories['Location Pages - Raleigh'][:5]:
    print(f"- {page}")
if len(detailed_categories['Location Pages - Raleigh']) > 5:
    print(f"... and {len(detailed_categories['Location Pages - Raleigh']) - 5} more")

print("\n## PRACTICE AREA GAPS")
for area in ['Immigration', 'Criminal Defense', 'Personal Injury', 'Workers Compensation', 'Family Law']:
    key = f'Practice Areas - {area}'
    if detailed_categories[key]:
        print(f"\n### {area} ({len(detailed_categories[key])} missing pages)")
        for page in detailed_categories[key][:3]:
            print(f"- {page}")
        if len(detailed_categories[key]) > 3:
            print(f"... and {len(detailed_categories[key]) - 3} more")

