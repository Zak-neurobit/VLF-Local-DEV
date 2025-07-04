// Vasquez site importer temporarily disabled for launch
export class VasquezSiteImporter {
  async initialize() {
    console.log('Site importer initialized (stub)');
  }

  async importFullSite() {
    console.log('Full site import skipped (stub)');
    return {
      pages: [],
      attorneys: [],
      practiceAreas: [],
    };
  }

  async importPage(url: string) {
    return {
      url,
      title: 'Imported Page',
      content: 'Content placeholder',
      images: [],
    };
  }

  async importAttorneys() {
    return [];
  }

  async importPracticeAreas() {
    return [];
  }

  async close() {
    console.log('Site importer closed');
  }
}

export default VasquezSiteImporter;
