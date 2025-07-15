import os
import re

def normalize_path(path):
    """Normalize a path for comparison by removing 'es/' prefix and translating common Spanish terms"""
    # Remove the src/app/ prefix
    path = path.replace('src/app/', '')
    
    # Remove es/ prefix if present
    if path.startswith('es/'):
        path = path[3:]
    
    # Common Spanish to English translations for path comparison
    translations = {
        'abogados': 'attorneys',
        'acerca-de': 'about',
        'agentes': 'agents',
        'areas-de-practica': 'practice-areas',
        'compensacion-laboral': 'workers-compensation',
        'defensa-criminal': 'criminal-defense',
        'derecho-familia': 'family-law',
        'inmigracion': 'immigration',
        'lesiones-personales': 'personal-injury',
        'accidentes-auto': 'car-accidents',
        'cerca-de-mi': 'near-me',
        'contacto': 'contact',
        'ubicaciones': 'locations',
        'recursos': 'resources',
        'blog': 'blog',
        'infracciones-transito': 'traffic-tickets'
    }
    
    # Apply translations
    for spanish, english in translations.items():
        path = path.replace(spanish, english)
    
    return path

# Read pages
with open('english_pages.txt', 'r') as f:
    english_pages = [line.strip() for line in f.readlines()]

with open('spanish_pages.txt', 'r') as f:
    spanish_pages = [line.strip() for line in f.readlines()]

# Normalize paths for comparison
english_normalized = {normalize_path(p): p for p in english_pages}
spanish_normalized = {normalize_path(p): p for p in spanish_pages}

# Find missing Spanish pages
missing_spanish = []
for norm_path, orig_path in english_normalized.items():
    if norm_path not in spanish_normalized:
        missing_spanish.append(orig_path)

# Find Spanish pages without English equivalent
spanish_without_english = []
for norm_path, orig_path in spanish_normalized.items():
    if norm_path not in english_normalized:
        spanish_without_english.append(orig_path)

# Sort results
missing_spanish.sort()
spanish_without_english.sort()

print("=== PARITY ANALYSIS REPORT ===")
print(f"\nTotal English pages: {len(english_pages)}")
print(f"Total Spanish pages: {len(spanish_pages)}")
print(f"Coverage rate: {len(spanish_pages) / len(english_pages) * 100:.1f}%")

print(f"\n=== MISSING SPANISH PAGES ({len(missing_spanish)} total) ===")
print("\nBy Category:")

# Categorize missing pages
categories = {
    'Admin Pages': [],
    'Attorney Pages': [],
    'Practice Area Pages': [],
    'Location Pages': [],
    'Near Me Pages': [],
    'Blog/Content Pages': [],
    'Service Pages': [],
    'Contact Pages': [],
    'Other Pages': []
}

for page in missing_spanish:
    if '/admin/' in page:
        categories['Admin Pages'].append(page)
    elif '/attorneys/' in page:
        categories['Attorney Pages'].append(page)
    elif '/practice-areas/' in page or '/criminal-defense/' in page or '/immigration/' in page or '/personal-injury/' in page or '/family-law/' in page or '/workers-compensation/' in page:
        categories['Practice Area Pages'].append(page)
    elif '/locations/' in page or '/contact/' in page and 'office-location' in page:
        categories['Location Pages'].append(page)
    elif '/near-me/' in page:
        categories['Near Me Pages'].append(page)
    elif '/blog/' in page or '/category/' in page:
        categories['Blog/Content Pages'].append(page)
    elif any(keyword in page for keyword in ['consultation', 'appointments', 'payment', 'services', 'quote']):
        categories['Service Pages'].append(page)
    elif '/contact' in page:
        categories['Contact Pages'].append(page)
    else:
        categories['Other Pages'].append(page)

for category, pages in categories.items():
    if pages:
        print(f"\n{category}: {len(pages)} missing")
        for page in pages[:10]:  # Show first 10
            print(f"  - {page}")
        if len(pages) > 10:
            print(f"  ... and {len(pages) - 10} more")

