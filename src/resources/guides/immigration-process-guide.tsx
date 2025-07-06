import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';

// Register fonts for professional PDF appearance
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v1/helvetica-regular.ttf' },
    { src: 'https://fonts.gstatic.com/s/helvetica/v1/helvetica-bold.ttf', fontWeight: 'bold' },
  ],
});

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2 solid #6B1F2E',
    paddingBottom: 20,
  },
  logo: {
    width: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    color: '#6B1F2E',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1F2937',
    fontWeight: 'bold',
    marginBottom: 15,
    backgroundColor: '#F3F4F6',
    padding: 10,
  },
  subsectionTitle: {
    fontSize: 16,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
  },
  paragraph: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 10,
    textAlign: 'justify',
  },
  list: {
    marginLeft: 20,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 5,
    lineHeight: 1.6,
  },
  checklistBox: {
    border: '1 solid #D1D5DB',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
  },
  checklistItem: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 8,
    paddingLeft: 20,
  },
  timelineContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  timelineDot: {
    width: 10,
    height: 10,
    backgroundColor: '#6B1F2E',
    borderRadius: 5,
    marginRight: 10,
    marginTop: 5,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  timelineDescription: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 1.5,
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    border: '1 solid #F59E0B',
    padding: 15,
    marginVertical: 15,
  },
  warningText: {
    fontSize: 11,
    color: '#92400E',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 10,
    borderTop: '1 solid #E5E7EB',
    paddingTop: 10,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 10,
    color: '#6B7280',
  },
});

// Immigration Process Guide PDF Document
const ImmigrationGuideDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>2024 Immigration Process Guide</Text>
        <Text style={styles.subtitle}>Your Complete Guide to U.S. Immigration</Text>
        <Text style={styles.date}>Published by Vasquez Law Firm, PLLC | Updated: January 2024</Text>
      </View>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          Navigating the U.S. immigration system can be complex and overwhelming. This comprehensive guide 
          provides essential information about various immigration processes, timelines, and requirements. 
          While this guide offers valuable insights, it's important to consult with an experienced immigration 
          attorney for personalized advice regarding your specific situation.
        </Text>
      </View>

      {/* Types of Visas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Visa Types</Text>
        
        <Text style={styles.subsectionTitle}>Family-Based Immigration</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Immediate Relatives (IR): Spouses, unmarried children under 21, and parents of U.S. citizens</Text>
          <Text style={styles.listItem}>• Family Preference Categories (F1-F4): Other family relationships with annual limits</Text>
          <Text style={styles.listItem}>• K-1 Fiancé(e) Visa: For foreign fiancé(e)s of U.S. citizens</Text>
        </View>

        <Text style={styles.subsectionTitle}>Employment-Based Immigration</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• EB-1: Priority workers (extraordinary ability, researchers, executives)</Text>
          <Text style={styles.listItem}>• EB-2: Advanced degree professionals and exceptional ability</Text>
          <Text style={styles.listItem}>• EB-3: Skilled workers, professionals, and other workers</Text>
          <Text style={styles.listItem}>• EB-4: Special immigrants (religious workers, etc.)</Text>
          <Text style={styles.listItem}>• EB-5: Investors</Text>
        </View>

        <Text style={styles.subsectionTitle}>Humanitarian Protections</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Asylum: Protection for those fleeing persecution</Text>
          <Text style={styles.listItem}>• U Visa: Victims of certain crimes</Text>
          <Text style={styles.listItem}>• T Visa: Victims of human trafficking</Text>
          <Text style={styles.listItem}>• VAWA: Violence Against Women Act protections</Text>
        </View>
      </View>

      {/* Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Typical Immigration Timeline</Text>
        <View style={styles.timelineContainer}>
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>1. Initial Consultation (1-2 weeks)</Text>
              <Text style={styles.timelineDescription}>
                Meet with an attorney to assess eligibility and determine the best path forward
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>2. Document Preparation (2-4 weeks)</Text>
              <Text style={styles.timelineDescription}>
                Gather required documents, translations, and complete necessary forms
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>3. Application Filing (1 week)</Text>
              <Text style={styles.timelineDescription}>
                Submit petition to USCIS with supporting documentation
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>4. USCIS Processing (6-24+ months)</Text>
              <Text style={styles.timelineDescription}>
                Wait for USCIS review, respond to any requests for evidence (RFE)
              </Text>
            </View>
          </View>

          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>5. Interview/Decision (1-3 months)</Text>
              <Text style={styles.timelineDescription}>
                Attend interview if required and receive final decision
              </Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.pageNumber}>Page 1 of 3</Text>
    </Page>

    {/* Page 2 */}
    <Page size="A4" style={styles.page}>
      {/* Document Checklist */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Essential Documents Checklist</Text>
        
        <View style={styles.checklistBox}>
          <Text style={styles.subsectionTitle}>Personal Documents</Text>
          <Text style={styles.checklistItem}>☐ Valid passport (all pages)</Text>
          <Text style={styles.checklistItem}>☐ Birth certificate (with certified translation)</Text>
          <Text style={styles.checklistItem}>☐ Marriage certificate (if applicable)</Text>
          <Text style={styles.checklistItem}>☐ Divorce decrees (if applicable)</Text>
          <Text style={styles.checklistItem}>☐ Police certificates from all countries of residence</Text>
          <Text style={styles.checklistItem}>☐ Military records (if applicable)</Text>
          <Text style={styles.checklistItem}>☐ Court records (if any arrests or convictions)</Text>
        </View>

        <View style={styles.checklistBox}>
          <Text style={styles.subsectionTitle}>Financial Documents</Text>
          <Text style={styles.checklistItem}>☐ Tax returns (last 3 years)</Text>
          <Text style={styles.checklistItem}>☐ W-2s or 1099s</Text>
          <Text style={styles.checklistItem}>☐ Pay stubs (recent 6 months)</Text>
          <Text style={styles.checklistItem}>☐ Bank statements</Text>
          <Text style={styles.checklistItem}>☐ Employment verification letters</Text>
          <Text style={styles.checklistItem}>☐ Proof of assets (property deeds, investments)</Text>
        </View>

        <View style={styles.checklistBox}>
          <Text style={styles.subsectionTitle}>Immigration-Specific Documents</Text>
          <Text style={styles.checklistItem}>☐ Previous immigration applications</Text>
          <Text style={styles.checklistItem}>☐ I-94 arrival/departure records</Text>
          <Text style={styles.checklistItem}>☐ Previous visas</Text>
          <Text style={styles.checklistItem}>☐ USCIS notices and correspondence</Text>
          <Text style={styles.checklistItem}>☐ Sponsor's documents (if applicable)</Text>
        </View>
      </View>

      {/* Important Warnings */}
      <View style={styles.warningBox}>
        <Text style={[styles.warningText, { fontWeight: 'bold', marginBottom: 5 }]}>
          ⚠️ IMPORTANT WARNINGS:
        </Text>
        <Text style={styles.warningText}>
          • Never provide false information on immigration forms - this can lead to permanent inadmissibility
        </Text>
        <Text style={styles.warningText}>
          • Keep copies of all documents submitted to USCIS
        </Text>
        <Text style={styles.warningText}>
          • Notify USCIS of any address changes within 10 days
        </Text>
        <Text style={styles.warningText}>
          • Do not travel outside the U.S. without proper documentation
        </Text>
        <Text style={styles.warningText}>
          • Consult an attorney before accepting any plea deals in criminal cases
        </Text>
      </View>

      {/* Common Mistakes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Mistakes to Avoid</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            1. Missing deadlines: Always submit applications and responses before the deadline
          </Text>
          <Text style={styles.listItem}>
            2. Incomplete applications: Double-check that all sections are filled and signed
          </Text>
          <Text style={styles.listItem}>
            3. Insufficient evidence: Provide comprehensive documentation to support your case
          </Text>
          <Text style={styles.listItem}>
            4. DIY approach for complex cases: Seek professional help for complicated situations
          </Text>
          <Text style={styles.listItem}>
            5. Ignoring RFEs: Respond promptly and thoroughly to Requests for Evidence
          </Text>
        </View>
      </View>

      <Text style={styles.pageNumber}>Page 2 of 3</Text>
    </Page>

    {/* Page 3 */}
    <Page size="A4" style={styles.page}>
      {/* Resources and Next Steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Helpful Resources</Text>
        
        <Text style={styles.subsectionTitle}>Government Websites</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• USCIS.gov - U.S. Citizenship and Immigration Services</Text>
          <Text style={styles.listItem}>• Travel.State.gov - Visa bulletin and consular processing</Text>
          <Text style={styles.listItem}>• Justice.gov/EOIR - Immigration court information</Text>
          <Text style={styles.listItem}>• ICE.gov - Immigration and Customs Enforcement</Text>
        </View>

        <Text style={styles.subsectionTitle}>Processing Times and Case Status</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Check current processing times at: egov.uscis.gov/processing-times</Text>
          <Text style={styles.listItem}>• Track your case status at: egov.uscis.gov/casestatus</Text>
          <Text style={styles.listItem}>• Schedule appointments at: my.uscis.gov</text>
        </View>
      </View>

      {/* Next Steps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Next Steps</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            1. Schedule a consultation with an experienced immigration attorney
          </Text>
          <Text style={styles.listItem}>
            2. Begin gathering the required documents from the checklist
          </Text>
          <Text style={styles.listItem}>
            3. Obtain certified translations for any foreign language documents
          </Text>
          <Text style={styles.listItem}>
            4. Review your eligibility for different visa categories
          </Text>
          <Text style={styles.listItem}>
            5. Prepare financially for application fees and attorney costs
          </Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={[styles.section, { backgroundColor: '#F3F4F6', padding: 20, marginTop: 30 }]}>
        <Text style={[styles.sectionTitle, { backgroundColor: 'transparent', padding: 0 }]}>
          Get Professional Help
        </Text>
        <Text style={styles.paragraph}>
          Immigration law is complex and constantly changing. The Vasquez Law Firm has helped thousands 
          of clients navigate the immigration process successfully. Our experienced attorneys can:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Evaluate your eligibility for various immigration benefits</Text>
          <Text style={styles.listItem}>• Prepare and file your applications correctly</Text>
          <Text style={styles.listItem}>• Represent you in immigration court proceedings</Text>
          <Text style={styles.listItem}>• Handle complex cases and appeals</Text>
          <Text style={styles.listItem}>• Provide guidance in English and Spanish</Text>
        </View>
        
        <Text style={[styles.paragraph, { marginTop: 15, fontWeight: 'bold' }]}>
          Schedule Your Free Consultation Today
        </Text>
        <Text style={styles.paragraph}>
          Call: 1-866-302-3427{'\n'}
          Email: info@vasquezlawnc.com{'\n'}
          Website: www.vasquezlawnc.com
        </Text>
      </View>

      {/* Disclaimer */}
      <View style={[styles.warningBox, { position: 'absolute', bottom: 80, left: 40, right: 40 }]}>
        <Text style={[styles.warningText, { fontSize: 9 }]}>
          DISCLAIMER: This guide is for informational purposes only and does not constitute legal advice. 
          Immigration laws change frequently, and each case is unique. Please consult with a qualified 
          immigration attorney for advice specific to your situation.
        </Text>
      </View>

      <Text style={styles.pageNumber}>Page 3 of 3</Text>
    </Page>
  </Document>
);

// Component to render the download link
export const ImmigrationProcessGuide = () => {
  return (
    <PDFDownloadLink 
      document={<ImmigrationGuideDocument />} 
      fileName="2024-Immigration-Process-Guide-Vasquez-Law-Firm.pdf"
      className="inline-flex items-center gap-2 bg-[#6B1F2E] hover:bg-[#8B2635] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Preparing download...' : 'Download Immigration Guide (PDF)'
      }
    </PDFDownloadLink>
  );
};

export default ImmigrationProcessGuide;