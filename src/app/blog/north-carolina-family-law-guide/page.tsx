import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    'Complete North Carolina Family Law Guide 2024 | Divorce, Custody & Support - Vasquez Law Firm',
  description:
    'Comprehensive guide to family law in North Carolina. Expert divorce, child custody, child support, alimony, adoption, and domestic violence representation. YO PELEO POR TI™ - We fight for your family. Call (919) 519-3312.',
  keywords: [
    'North Carolina family law',
    'NC divorce lawyer',
    'child custody attorney NC',
    'child support lawyer',
    'alimony NC',
    'adoption attorney',
    'domestic violence lawyer',
    'prenuptial agreement',
    'separation agreement',
    'family court NC',
    'Raleigh family lawyer',
    'Charlotte divorce attorney',
    'YO PELEO POR TI',
    'military veteran lawyer',
  ].join(', '),
  authors: [{ name: 'Vasquez Law Firm' }],
  publisher: 'Vasquez Law Firm, PLLC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Complete North Carolina Family Law Guide 2024 | Divorce, Custody & Support',
    description:
      'Comprehensive guide to family law in North Carolina. Expert divorce, child custody, child support, alimony, adoption, and domestic violence representation. YO PELEO POR TI™ - We fight for your family.',
    url: 'https://www.vasquezlawnc.com/blog/north-carolina-family-law-guide',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/blog/nc-family-law-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'North Carolina Family Law Guide - Vasquez Law Firm',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete North Carolina Family Law Guide 2024 | Divorce, Custody & Support',
    description:
      'Comprehensive guide to family law in North Carolina. Expert divorce, child custody, child support, alimony, adoption, and domestic violence representation. YO PELEO POR TI™',
    images: ['https://www.vasquezlawnc.com/images/blog/nc-family-law-guide.jpg'],
    creator: '@VasquezLawNC',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/blog/north-carolina-family-law-guide',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/blog/north-carolina-family-law-guide',
      'es-US': 'https://www.vasquezlawnc.com/es/blog/guia-derecho-familiar-carolina-del-norte',
    },
  },
  other: {
    'article:published_time': '2024-01-20T10:00:00.000Z',
    'article:modified_time': new Date().toISOString(),
    'article:author': 'Vasquez Law Firm',
    'article:section': 'Family Law',
    'article:tag':
      'North Carolina Family Law, Divorce, Child Custody, Child Support, Alimony, Adoption',
  },
};

export const runtime = 'nodejs';

export default function NorthCarolinaFamilyLawGuidePage() {
  const post = {
    id: 'north-carolina-family-law-guide',
    title: 'Complete Guide to Family Law in North Carolina 2024',
    slug: 'north-carolina-family-law-guide',
    excerpt:
      'Comprehensive guide to family law in North Carolina covering divorce, child custody, child support, alimony, adoption, domestic violence, and prenuptial agreements. Expert legal guidance with YO PELEO POR TI™ commitment to your family.',
    content: `
      <div class="prose prose-lg max-w-none">
        <!-- Emergency Contact Banner -->
        <div class="bg-pink-600 text-white p-6 rounded-lg mb-8 text-center">
          <h2 class="text-2xl font-bold mb-2">👪 PROTECTING YOUR FAMILY? GET HELP NOW!</h2>
          <p class="text-lg mb-4">Family matters are urgent and emotional. Your family's future depends on experienced legal guidance.</p>
          <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="tel:9195193312" class="bg-white text-pink-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
              📞 CALL NOW: (919) 519-3312
            </a>
            <a href="/contact" class="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-pink-600">
              💬 FREE CONSULTATION
            </a>
          </div>
          <p class="mt-4 text-sm">Compassionate legal support when you need it most</p>
        </div>

        <!-- YO PELEO POR TI Branding -->
        <div class="bg-blue-900 text-white p-6 rounded-lg mb-8">
          <div class="flex items-center justify-center mb-4">
            <span class="text-4xl mr-4">🇺🇸</span>
            <div>
              <h2 class="text-3xl font-bold text-yellow-400">YO PELEO POR TI™</h2>
              <p class="text-xl">I FIGHT FOR YOU</p>
            </div>
            <span class="text-4xl ml-4">👨‍👩‍👧‍👦</span>
          </div>
          <p class="text-center text-lg">
            Military veterans who understand the importance of family and commitment. We bring the same dedication to protecting your family that we brought to serving our country. Your family's battle becomes our mission.
          </p>
        </div>

        <h1>Complete Guide to Family Law in North Carolina 2024</h1>
        
        <p class="lead">
          Family law matters are among the most personal and emotionally challenging legal issues you'll ever face. Whether you're going through a divorce, fighting for custody of your children, or dealing with domestic violence, you need an attorney who understands both the law and the human side of family conflicts. At Vasquez Law Firm, we combine legal expertise with compassionate representation, guided by our <strong>YO PELEO POR TI™</strong> commitment - because your family deserves a fighter in their corner.
        </p>

        <h2>📋 Table of Contents</h2>
        <ul>
          <li><a href="#nc-family-law-overview">North Carolina Family Law Overview</a></li>
          <li><a href="#divorce-proceedings">Divorce in North Carolina</a></li>
          <li><a href="#child-custody">Child Custody & Visitation</a></li>
          <li><a href="#child-support">Child Support Guidelines</a></li>
          <li><a href="#alimony-spousal-support">Alimony & Spousal Support</a></li>
          <li><a href="#property-division">Property Division & Equitable Distribution</a></li>
          <li><a href="#domestic-violence">Domestic Violence Protection</a></li>
          <li><a href="#adoption-process">Adoption in North Carolina</a></li>
          <li><a href="#prenuptial-agreements">Prenuptial & Postnuptial Agreements</a></li>
          <li><a href="#separation-agreements">Separation Agreements</a></li>
          <li><a href="#family-court-process">Family Court Process</a></li>
          <li><a href="#choosing-family-lawyer">Choosing the Right Family Lawyer</a></li>
        </ul>

        <h2 id="nc-family-law-overview">⚖️ North Carolina Family Law Overview</h2>
        
        <p>
          North Carolina family law governs the legal relationships between family members, including marriage, divorce, child custody, adoption, and domestic relations. Understanding North Carolina's specific laws and procedures is crucial for protecting your rights and achieving the best possible outcome for your family.
        </p>

        <h3>Key Principles of NC Family Law</h3>
        <ul>
          <li><strong>Best Interest of the Child:</strong> The primary consideration in all custody and support decisions</li>
          <li><strong>Equitable Distribution:</strong> Property division based on fairness, not necessarily 50/50</li>
          <li><strong>No-Fault Divorce:</strong> Separation for one year is sufficient grounds for divorce</li>
          <li><strong>Fault-Based Considerations:</strong> Adultery and domestic violence can impact alimony and custody</li>
          <li><strong>Parental Rights:</strong> Both parents have equal rights unless proven otherwise</li>
        </ul>

        <h3>North Carolina Family Court Jurisdiction</h3>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h4>District Court</h4>
          <ul>
            <li>Divorce and separation</li>
            <li>Child custody and visitation</li>
            <li>Child support</li>
            <li>Domestic violence protective orders</li>
            <li>Adoption proceedings</li>
            <li>Juvenile matters</li>
          </ul>
        </div>

        <h2 id="divorce-proceedings">💔 Divorce in North Carolina</h2>

        <p>
          North Carolina requires couples to live separately for at least one year before filing for divorce. This separation period is mandatory and cannot be waived. Understanding the divorce process can help you make informed decisions during this difficult time.
        </p>

        <h3>Grounds for Divorce in NC</h3>
        <ul>
          <li><strong>Separation:</strong> Living apart for one year with intent to remain separated (most common)</li>
          <li><strong>Incurable Insanity:</strong> Spouse confined in mental institution for 3+ years</li>
        </ul>

        <h3>Types of Divorce in North Carolina</h3>
        
        <h4>Uncontested Divorce</h4>
        <div class="bg-green-50 p-6 rounded-lg mb-4">
          <p><strong>When both spouses agree on all major issues:</strong></p>
          <ul>
            <li>Child custody and visitation schedule</li>
            <li>Child support amount</li>
            <li>Property division</li>
            <li>Alimony (if applicable)</li>
          </ul>
          <p><strong>Benefits:</strong> Faster, less expensive, less stressful</p>
          <p><strong>Timeline:</strong> 2-4 months after separation period</p>
        </div>

        <h4>Contested Divorce</h4>
        <div class="bg-red-50 p-6 rounded-lg mb-4">
          <p><strong>When spouses cannot agree on major issues:</strong></p>
          <ul>
            <li>Requires court intervention</li>
            <li>Judge makes final decisions</li>
            <li>More expensive and time-consuming</li>
            <li>Can involve depositions, discovery, and trial</li>
          </ul>
          <p><strong>Timeline:</strong> 6 months to 2+ years</p>
        </div>

        <h3>The Divorce Process in NC</h3>
        <ol>
          <li><strong>Separation:</strong> Physical separation with intent to divorce</li>
          <li><strong>Separation Agreement:</strong> Optional but recommended written agreement</li>
          <li><strong>Filing for Divorce:</strong> After one year separation</li>
          <li><strong>Service of Process:</strong> Serving divorce papers on spouse</li>
          <li><strong>Response Period:</strong> 30 days for spouse to respond</li>
          <li><strong>Discovery:</strong> Exchange of financial information (if contested)</li>
          <li><strong>Settlement Negotiations:</strong> Attempt to resolve issues</li>
          <li><strong>Trial:</strong> Court hearing if settlement cannot be reached</li>
          <li><strong>Final Judgment:</strong> Judge's final divorce decree</li>
        </ol>

        <h2 id="child-custody">👶 Child Custody & Visitation</h2>

        <p>
          Child custody decisions in North Carolina are based solely on the best interest of the child. The court considers numerous factors to determine what arrangement will best serve the child's physical, emotional, and developmental needs.
        </p>

        <h3>Types of Custody in North Carolina</h3>
        
        <h4>Legal Custody</h4>
        <ul>
          <li><strong>Joint Legal Custody:</strong> Both parents make major decisions together</li>
          <li><strong>Sole Legal Custody:</strong> One parent makes all major decisions</li>
          <li><strong>Major Decisions Include:</strong> Education, healthcare, religion, extracurricular activities</li>
        </ul>

        <h4>Physical Custody</h4>
        <ul>
          <li><strong>Primary Physical Custody:</strong> Child lives primarily with one parent</li>
          <li><strong>Joint Physical Custody:</strong> Child splits time between both parents</li>
          <li><strong>Supervised Visitation:</strong> Visits occur under supervision when safety concerns exist</li>
        </ul>

        <h3>Best Interest of the Child Factors</h3>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-yellow-800 mb-3">Court Considers These Factors:</h4>
          <ul class="text-yellow-800">
            <li>Each parent's ability to provide for the child's needs</li>
            <li>The child's safety and well-being</li>
            <li>History of domestic violence or substance abuse</li>
            <li>The child's relationship with each parent</li>
            <li>Each parent's willingness to encourage the other's relationship with child</li>
            <li>Stability of each parent's home environment</li>
            <li>The child's preference (if age-appropriate)</li>
            <li>Each parent's mental and physical health</li>
            <li>Work schedules and availability</li>
            <li>Geographic proximity of parents' homes</li>
          </ul>
        </div>

        <h3>Creating a Parenting Plan</h3>
        <p>
          North Carolina requires divorcing parents to create a detailed parenting plan that addresses:
        </p>
        <ul>
          <li><strong>Custody Schedule:</strong> When child stays with each parent</li>
          <li><strong>Holiday Schedule:</strong> How holidays and special occasions are shared</li>
          <li><strong>Vacation Time:</strong> Extended visitation periods</li>
          <li><strong>Transportation:</strong> Who handles drop-offs and pick-ups</li>
          <li><strong>Communication:</strong> Phone calls, emails, and text messages</li>
          <li><strong>Decision-Making:</strong> How major decisions will be made</li>
          <li><strong>Dispute Resolution:</strong> Process for resolving future disagreements</li>
        </ul>

        <h3>Modifying Custody Orders</h3>
        <p>
          Custody orders can be modified when there's a substantial change in circumstances that affects the child's best interest, such as:
        </p>
        <ul>
          <li>Parent's relocation</li>
          <li>Change in work schedule</li>
          <li>Remarriage</li>
          <li>Child's changing needs</li>
          <li>Safety concerns</li>
          <li>Violation of current order</li>
        </ul>

        <h2 id="child-support">💰 Child Support Guidelines</h2>

        <p>
          North Carolina uses specific guidelines to calculate child support based on both parents' incomes and the needs of the child. These guidelines help ensure consistency and fairness in support awards.
        </p>

        <h3>How Child Support is Calculated</h3>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h4>North Carolina Child Support Guidelines</h4>
          <ol>
            <li><strong>Determine Gross Income:</strong> Both parents' monthly gross income</li>
            <li><strong>Calculate Combined Income:</strong> Add both parents' incomes together</li>
            <li><strong>Apply Guidelines:</strong> Use NC child support worksheet</li>
            <li><strong>Adjust for Custody:</strong> Consider overnight visitation schedule</li>
            <li><strong>Add Extras:</strong> Health insurance, childcare, extraordinary expenses</li>
          </ol>
        </div>

        <h3>Income Included in Child Support Calculation</h3>
        <ul>
          <li>Wages and salary</li>
          <li>Overtime and bonuses</li>
          <li>Self-employment income</li>
          <li>Rental income</li>
          <li>Investment income</li>
          <li>Unemployment benefits</li>
          <li>Social Security benefits</li>
          <li>Military allowances</li>
          <li>Workers' compensation</li>
        </ul>

        <h3>Additional Child Support Expenses</h3>
        <ul>
          <li><strong>Health Insurance:</strong> Usually paid by parent with coverage available</li>
          <li><strong>Uninsured Medical Expenses:</strong> Typically split proportionally</li>
          <li><strong>Childcare:</strong> Work-related or education-related childcare costs</li>
          <li><strong>Extraordinary Expenses:</strong> Special needs, private school tuition</li>
        </ul>

        <h3>Child Support Enforcement</h3>
        <p>
          When a parent fails to pay court-ordered child support, North Carolina provides several enforcement mechanisms:
        </p>
        <ul>
          <li>Wage garnishment</li>
          <li>Asset seizure</li>
          <li>Tax refund intercept</li>
          <li>License suspension (driver's, professional, recreational)</li>
          <li>Credit bureau reporting</li>
          <li>Contempt of court (possible jail time)</li>
          <li>Passport denial</li>
        </ul>

        <h2 id="alimony-spousal-support">💍 Alimony & Spousal Support</h2>

        <p>
          Alimony in North Carolina is financial support paid by one spouse to the other during separation or after divorce. Unlike child support, alimony is not automatically awarded and requires careful analysis of specific factors.
        </p>

        <h3>Types of Alimony in North Carolina</h3>
        
        <h4>Post-Separation Support</h4>
        <ul>
          <li>Temporary support during separation</li>
          <li>Paid until divorce is finalized</li>
          <li>Based on financial need and ability to pay</li>
          <li>Can be awarded quickly</li>
        </ul>

        <h4>Permanent Alimony</h4>
        <ul>
          <li>Long-term support after divorce</li>
          <li>Can be periodic or lump sum</li>
          <li>May have specific duration or be indefinite</li>
          <li>Based on detailed financial analysis</li>
        </ul>

        <h3>Factors Considered for Alimony</h3>
        <div class="bg-purple-50 p-6 rounded-lg mb-6">
          <h4>Court Evaluates:</h4>
          <ul>
            <li>Length of marriage</li>
            <li>Each spouse's income and earning capacity</li>
            <li>Age and health of both spouses</li>
            <li>Standard of living during marriage</li>
            <li>Education and training of each spouse</li>
            <li>Contributions to marriage (financial and non-financial)</li>
            <li>Tax consequences of alimony</li>
            <li>Marital misconduct (adultery, domestic violence)</li>
            <li>Assets and debts of each spouse</li>
            <li>Childcare responsibilities</li>
          </ul>
        </div>

        <h3>Alimony Bars in North Carolina</h3>
        <p>
          Certain conduct can prevent a spouse from receiving alimony:
        </p>
        <ul>
          <li><strong>Adultery:</strong> Proven adultery bars the unfaithful spouse from receiving alimony</li>
          <li><strong>Abandonment:</strong> Malicious abandonment without justification</li>
          <li><strong>Cruel Treatment:</strong> Physical or emotional abuse</li>
        </ul>

        <h3>Modifying or Terminating Alimony</h3>
        <p>
          Alimony can be modified or terminated when circumstances change:
        </p>
        <ul>
          <li>Remarriage of recipient spouse (automatic termination)</li>
          <li>Cohabitation of recipient spouse</li>
          <li>Significant change in income</li>
          <li>Retirement</li>
          <li>Death of either spouse</li>
          <li>Acts of misconduct after separation</li>
        </ul>

        <h2 id="property-division">🏠 Property Division & Equitable Distribution</h2>

        <p>
          North Carolina follows the principle of "equitable distribution," meaning marital property is divided fairly but not necessarily equally. Understanding what constitutes marital vs. separate property is crucial for protecting your financial interests.
        </p>

        <h3>Marital vs. Separate Property</h3>
        
        <h4>Marital Property (Subject to Division)</h4>
        <ul>
          <li>Property acquired during marriage</li>
          <li>Income earned during marriage</li>
          <li>Retirement accounts and pensions</li>
          <li>Businesses started or expanded during marriage</li>
          <li>Real estate purchased during marriage</li>
          <li>Investment accounts</li>
          <li>Vehicles purchased during marriage</li>
        </ul>

        <h4>Separate Property (Generally Not Divided)</h4>
        <ul>
          <li>Property owned before marriage</li>
          <li>Gifts received individually</li>
          <li>Inheritance received individually</li>
          <li>Property acquired after separation</li>
          <li>Property excluded by prenuptial agreement</li>
        </ul>

        <h3>Equitable Distribution Factors</h3>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h4>Court Considers:</h4>
          <ul>
            <li>Length of marriage</li>
            <li>Age and health of spouses</li>
            <li>Income and earning capacity</li>
            <li>Economic circumstances of each spouse</li>
            <li>Contributions to marital property</li>
            <li>Non-monetary contributions (homemaker, childcare)</li>
            <li>Liquid vs. non-liquid assets</li>
            <li>Tax consequences</li>
            <li>Debts and liabilities</li>
            <li>Any other factor court deems just and proper</li>
          </ul>
        </div>

        <h3>Complex Property Division Issues</h3>
        
        <h4>Business Valuation</h4>
        <ul>
          <li>Professional business appraisal may be required</li>
          <li>Consider goodwill and future earning potential</li>
          <li>Determine marital vs. separate components</li>
        </ul>

        <h4>Retirement Accounts</h4>
        <ul>
          <li>401(k), 403(b), pension plans</li>
          <li>Qualified Domestic Relations Order (QDRO) required</li>
          <li>Tax implications must be considered</li>
        </ul>

        <h4>Real Estate</h4>
        <ul>
          <li>Marital home and investment properties</li>
          <li>Professional appraisal recommended</li>
          <li>Consider mortgage obligations and equity</li>
        </ul>

        <h2 id="domestic-violence">🛡️ Domestic Violence Protection</h2>

        <p>
          Domestic violence is a serious issue that affects many families. North Carolina provides legal protections for victims through civil protective orders and criminal charges. If you're experiencing domestic violence, your safety is the top priority.
        </p>

        <div class="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
          <h3 class="text-xl font-bold text-red-800 mb-3">⚠️ IMMEDIATE SAFETY RESOURCES</h3>
          <ul class="text-red-800">
            <li><strong>Emergency:</strong> Call 911 immediately</li>
            <li><strong>National Domestic Violence Hotline:</strong> 1-800-799-7233</li>
            <li><strong>NC Coalition Against Domestic Violence:</strong> 1-888-232-9124</li>
            <li><strong>Safe Chat:</strong> Available 24/7 at thehotline.org</li>
          </ul>
        </div>

        <h3>Types of Protective Orders in NC</h3>
        
        <h4>Domestic Violence Protective Order (50B)</h4>
        <ul>
          <li>Protection from current or former intimate partners</li>
          <li>Includes spouses, dating partners, household members</li>
          <li>Can include temporary custody and support orders</li>
          <li>Violation is a criminal offense</li>
        </ul>

        <h4>Civil No-Contact Order (50C)</h4>
        <ul>
          <li>Protection from stalking or non-consensual sexual conduct</li>
          <li>Does not require domestic relationship</li>
          <li>Can apply to acquaintances, co-workers, strangers</li>
        </ul>

        <h3>What Protective Orders Can Include</h3>
        <ul>
          <li>No contact with victim</li>
          <li>Stay away from victim's home, work, school</li>
          <li>Surrender firearms</li>
          <li>Temporary custody of children</li>
          <li>Temporary child support</li>
          <li>Temporary spousal support</li>
          <li>Exclusive use of shared residence</li>
          <li>No interference with victim's personal property</li>
        </ul>

        <h3>The Protective Order Process</h3>
        <ol>
          <li><strong>Emergency Order:</strong> Can be obtained same day if court is open</li>
          <li><strong>Ex Parte Order:</strong> Temporary protection without defendant present</li>
          <li><strong>Service of Process:</strong> Sheriff serves papers on defendant</li>
          <li><strong>Full Hearing:</strong> Both parties present evidence (within 10 days)</li>
          <li><strong>Final Order:</strong> Judge decides whether to grant permanent protection</li>
          <li><strong>Duration:</strong> Up to one year, renewable</li>
        </ol>

        <h3>Impact on Child Custody</h3>
        <p>
          Domestic violence has significant impact on child custody decisions:
        </p>
        <ul>
          <li>Creates rebuttable presumption against custody for abuser</li>
          <li>May require supervised visitation</li>
          <li>Court considers child's safety as primary factor</li>
          <li>May affect parenting time and decision-making authority</li>
        </ul>

        <h2 id="adoption-process">👶 Adoption in North Carolina</h2>

        <p>
          Adoption creates a permanent legal relationship between adoptive parents and children. North Carolina has specific procedures and requirements for different types of adoption to ensure the best interests of children are protected.
        </p>

        <h3>Types of Adoption in North Carolina</h3>
        
        <h4>Agency Adoption</h4>
        <ul>
          <li>Licensed adoption agency facilitates placement</li>
          <li>Agency screens prospective parents</li>
          <li>More predictable timeline</li>
          <li>Agency provides support services</li>
        </ul>

        <h4>Private/Independent Adoption</h4>
        <ul>
          <li>Direct placement between birth parents and adoptive parents</li>
          <li>Often facilitated by attorney</li>
          <li>More control over process</li>
          <li>Requires court approval</li>
        </ul>

        <h4>Stepparent Adoption</h4>
        <ul>
          <li>Spouse adopts partner's biological child</li>
          <li>Requires consent or termination of non-custodial parent's rights</li>
          <li>Simplified process in some cases</li>
        </ul>

        <h4>Relative Adoption</h4>
        <ul>
          <li>Adoption by grandparents, aunts, uncles, or other relatives</li>
          <li>Often occurs due to parental inability to care for child</li>
          <li>May have modified requirements</li>
        </ul>

        <h3>Adoption Requirements in NC</h3>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h4>Prospective Adoptive Parents Must:</h4>
          <ul>
            <li>Be at least 18 years old</li>
            <li>Complete home study assessment</li>
            <li>Pass criminal background checks</li>
            <li>Complete required training (agency adoptions)</li>
            <li>Meet financial stability requirements</li>
            <li>Provide character references</li>
            <li>Undergo medical examinations</li>
          </ul>
        </div>

        <h3>Consent and Termination of Parental Rights</h3>
        
        <h4>Birth Parent Consent</h4>
        <ul>
          <li>Must be given after child's birth</li>
          <li>Cannot be given until child is at least 72 hours old</li>
          <li>Must be voluntary and informed</li>
          <li>Can be revoked within 7 days</li>
        </ul>

        <h4>When Consent Not Required</h4>
        <ul>
          <li>Parent's rights have been terminated by court</li>
          <li>Parent has abandoned child</li>
          <li>Parent is deceased</li>
          <li>Parent's identity is unknown</li>
        </ul>

        <h3>The Adoption Process</h3>
        <ol>
          <li><strong>Pre-Placement:</strong> Home study, background checks, training</li>
          <li><strong>Placement:</strong> Child placed in adoptive home</li>
          <li><strong>Post-Placement:</strong> Supervision period (varies by type)</li>
          <li><strong>Consent/Termination:</strong> Birth parent rights addressed</li>
          <li><strong>Finalization:</strong> Court hearing to finalize adoption</li>
          <li><strong>New Birth Certificate:</strong> Issued with adoptive parents' names</li>
        </ol>

        <h2 id="prenuptial-agreements">💍 Prenuptial & Postnuptial Agreements</h2>

        <p>
          Prenuptial and postnuptial agreements allow couples to determine how their property and financial affairs will be handled during marriage and in the event of divorce. These agreements can provide certainty and protect individual interests.
        </p>

        <h3>Prenuptial Agreements</h3>
        <p>
          A prenuptial agreement is a contract entered into before marriage that addresses financial rights and obligations.
        </p>

        <h4>What Can Be Included:</h4>
        <ul>
          <li>Property division in case of divorce</li>
          <li>Alimony/spousal support terms</li>
          <li>Individual vs. marital property designation</li>
          <li>Business ownership and control</li>
          <li>Retirement account and pension rights</li>
          <li>Debt responsibility</li>
          <li>Estate planning considerations</li>
        </ul>

        <h4>What Cannot Be Included:</h4>
        <ul>
          <li>Child custody decisions</li>
          <li>Child support amounts</li>
          <li>Illegal activities</li>
          <li>Personal conduct during marriage</li>
        </ul>

        <h3>Requirements for Valid Prenuptial Agreement</h3>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-yellow-800 mb-3">Agreement Must Be:</h4>
          <ul class="text-yellow-800">
            <li>In writing and signed by both parties</li>
            <li>Entered into voluntarily without coercion</li>
            <li>Based on full financial disclosure</li>
            <li>Fair and reasonable at time of execution</li>
            <li>Not unconscionable at time of enforcement</li>
            <li>Properly executed before marriage</li>
            <li>Supported by independent legal representation (recommended)</li>
          </ul>
        </div>

        <h3>Postnuptial Agreements</h3>
        <p>
          Similar to prenuptial agreements but entered into after marriage. North Carolina recognizes postnuptial agreements with some additional requirements:
        </p>
        <ul>
          <li>Must have valid consideration (legal reason for agreement)</li>
          <li>Subject to higher scrutiny due to confidential relationship</li>
          <li>Cannot be part of divorce proceedings</li>
          <li>Must be fair at time of execution and enforcement</li>
        </ul>

        <h2 id="separation-agreements">📝 Separation Agreements</h2>

        <p>
          A separation agreement is a contract between spouses who are living apart that addresses important issues like property division, support, and child custody. This agreement can serve as a roadmap for your divorce and help avoid costly litigation.
        </p>

        <h3>Benefits of Separation Agreements</h3>
        <ul>
          <li>Provides immediate resolution of important issues</li>
          <li>Reduces conflict and uncertainty</li>
          <li>Often less expensive than litigation</li>
          <li>Gives parties control over outcomes</li>
          <li>Can be incorporated into divorce decree</li>
          <li>Provides structure during separation period</li>
        </ul>

        <h3>Essential Elements of Separation Agreement</h3>
        
        <h4>Child-Related Provisions</h4>
        <ul>
          <li>Custody and visitation schedule</li>
          <li>Child support amount and payment terms</li>
          <li>Health insurance and medical expenses</li>
          <li>Childcare expenses</li>
          <li>Education decisions and expenses</li>
          <li>Extracurricular activities</li>
        </ul>

        <h4>Financial Provisions</h4>
        <ul>
          <li>Property division</li>
          <li>Spousal support/alimony</li>
          <li>Debt allocation</li>
          <li>Retirement account division</li>
          <li>Insurance beneficiaries</li>
          <li>Tax considerations</li>
        </ul>

        <h4>Other Important Terms</h4>
        <ul>
          <li>Use of marital residence</li>
          <li>Personal property division</li>
          <li>Pet custody</li>
          <li>Communication guidelines</li>
          <li>Modification procedures</li>
          <li>Dispute resolution methods</li>
        </ul>

        <h2 id="family-court-process">🏛️ Family Court Process</h2>

        <p>
          Understanding how family court works in North Carolina can help you prepare for your case and know what to expect during proceedings.
        </p>

        <h3>Filing Your Case</h3>
        <ol>
          <li><strong>Determine Proper Venue:</strong> Usually county where you or spouse reside</li>
          <li><strong>Prepare Pleadings:</strong> Complaint and supporting documents</li>
          <li><strong>File with Clerk:</strong> Pay filing fees (fee waivers available for low income)</li>
          <li><strong>Serve Spouse:</strong> Formal service of process required</li>
          <li><strong>Await Response:</strong> Spouse has 30 days to respond</li>
        </ol>

        <h3>Pre-Trial Procedures</h3>
        
        <h4>Temporary Orders</h4>
        <ul>
          <li>Emergency custody orders</li>
          <li>Temporary child support</li>
          <li>Temporary spousal support</li>
          <li>Exclusive use of residence</li>
          <li>Protection from domestic violence</li>
        </ul>

        <h4>Discovery</h4>
        <ul>
          <li>Financial affidavits</li>
          <li>Document production</li>
          <li>Depositions</li>
          <li>Interrogatories</li>
          <li>Requests for admission</li>
        </ul>

        <h3>Alternative Dispute Resolution</h3>
        
        <h4>Mediation</h4>
        <ul>
          <li>Required in child custody cases</li>
          <li>Neutral third party facilitates discussion</li>
          <li>Confidential process</li>
          <li>Often less expensive than trial</li>
          <li>Parties control outcome</li>
        </ul>

        <h4>Collaborative Law</h4>
        <ul>
          <li>Team approach with specially trained attorneys</li>
          <li>Includes mental health and financial professionals</li>
          <li>Commitment to avoid litigation</li>
          <li>Focus on problem-solving</li>
        </ul>

        <h3>Trial Preparation and Process</h3>
        <ul>
          <li>Witness preparation</li>
          <li>Document organization</li>
          <li>Expert testimony (custody evaluators, appraisers)</li>
          <li>Opening statements</li>
          <li>Presentation of evidence</li>
          <li>Cross-examination</li>
          <li>Closing arguments</li>
          <li>Judge's decision</li>
        </ul>

        <h2 id="choosing-family-lawyer">🥇 Choosing the Right Family Lawyer</h2>

        <p>
          Family law matters are deeply personal and emotionally charged. Choosing the right attorney can make the difference between a positive outcome and years of regret. Here's what to look for in a family law attorney.
        </p>

        <h3>Essential Qualifications</h3>
        <ul>
          <li><strong>Family Law Specialization:</strong> Focus on family law, not general practice</li>
          <li><strong>North Carolina Experience:</strong> Knowledge of local laws and court procedures</li>
          <li><strong>Trial Experience:</strong> Ability to litigate when necessary</li>
          <li><strong>Local Court Knowledge:</strong> Familiarity with local judges and attorneys</li>
          <li><strong>Communication Skills:</strong> Ability to explain complex legal concepts</li>
          <li><strong>Compassion:</strong> Understanding of emotional aspects of family law</li>
        </ul>

        <h3>Why Choose Vasquez Law Firm for Family Law</h3>
        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-green-800 mb-3">🎖️ Military-Grade Family Law Representation</h4>
          <ul class="text-green-800">
            <li><strong>Veteran Leadership:</strong> Military veterans who understand commitment to family</li>
            <li><strong>YO PELEO POR TI™:</strong> We fight for your family with military precision and dedication</li>
            <li><strong>Compassionate Advocacy:</strong> Understanding that family law is about people, not just legal issues</li>
            <li><strong>Bilingual Services:</strong> Complete representation in English and Spanish</li>
            <li><strong>Statewide Practice:</strong> Serving families throughout North Carolina</li>
            <li><strong>24/7 Availability:</strong> Family emergencies don't follow business hours</li>
            <li><strong>Proven Results:</strong> Thousands of families successfully represented</li>
            <li><strong>Military Family Focus:</strong> Special understanding of military family challenges</li>
          </ul>
        </div>

        <h3>Our Family Law Approach</h3>
        <ol>
          <li><strong>Compassionate Consultation:</strong> Understanding your unique family situation</li>
          <li><strong>Strategic Planning:</strong> Military-style tactical approach to your case</li>
          <li><strong>Aggressive Advocacy:</strong> Fighting for your rights and your children's best interests</li>
          <li><strong>Settlement Focus:</strong> Seeking resolution that protects your family</li>
          <li><strong>Trial Readiness:</strong> Prepared to litigate when necessary</li>
          <li><strong>Post-Judgment Support:</strong> Ongoing assistance with modifications and enforcement</li>
        </ol>

        <h2>🏆 Family Law Success Stories</h2>

        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h3>Recent Victories (Names Changed for Privacy)</h3>
          <ul>
            <li><strong>Custody Victory:</strong> Military father awarded primary custody of children despite deployment challenges</li>
            <li><strong>Protection Order Success:</strong> Domestic violence victim obtained comprehensive protective order and safe relocation</li>
            <li><strong>Property Division Win:</strong> Business owner retained majority control of family business in equitable distribution</li>
            <li><strong>Adoption Completion:</strong> Stepparent adoption finalized despite biological father's initial objection</li>
            <li><strong>Alimony Modification:</strong> Disabled spouse's alimony increased due to changed circumstances</li>
            <li><strong>Child Support Enforcement:</strong> Collected over $50,000 in back child support through wage garnishment</li>
          </ul>
          <p class="text-sm mt-4 text-gray-600">
            <em>Past results do not guarantee future outcomes. Each case is unique and depends on specific facts and circumstances.</em>
          </p>
        </div>

        <h2>📍 We Serve Families Throughout North Carolina</h2>

        <h3>Major Cities We Serve</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <ul>
            <li>• Raleigh</li>
            <li>• Charlotte</li>
            <li>• Greensboro</li>
            <li>• Durham</li>
            <li>• Winston-Salem</li>
          </ul>
          <ul>
            <li>• Fayetteville</li>
            <li>• Cary</li>
            <li>• Wilmington</li>
            <li>• High Point</li>
            <li>• Greenville</li>
          </ul>
          <ul>
            <li>• Asheville</li>
            <li>• Gastonia</li>
            <li>• Rocky Mount</li>
            <li>• Burlington</li>
            <li>• Wilson</li>
          </ul>
        </div>

        <h3>Counties We Cover</h3>
        <p>
          We provide family law representation in all 100 North Carolina counties, including:
          Wake, Mecklenburg, Guilford, Forsyth, Cumberland, Durham, Buncombe, New Hanover, Gaston, Union, Iredell, Cabarrus, Alamance, Nash, Johnston, and all others.
        </p>

        <h2>🎯 Protect Your Family - Take Action Today</h2>

        <div class="bg-pink-600 text-white p-8 rounded-lg mb-8">
          <h3 class="text-2xl font-bold mb-4 text-center">👪 YOUR FAMILY'S FUTURE IS AT STAKE</h3>
          <p class="text-lg mb-6 text-center">
            Family law matters affect the most important aspects of your life - your children, your home, your financial security. 
            Don't face these challenges alone. You need experienced advocates who understand what's at stake.
          </p>
          
          <div class="text-center space-y-4">
            <h4 class="text-xl font-bold">🎖️ YO PELEO POR TI™ - I FIGHT FOR YOU</h4>
            <p class="text-lg">
              As military veterans, we understand the importance of family and commitment. We bring the same dedication 
              to protecting your family that we brought to serving our country. Your family's battle becomes our mission.
            </p>
            
            <div class="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
              <a href="tel:9195193312" class="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300">
                📞 CALL NOW: (919) 519-3312
              </a>
              <a href="/contact" class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-pink-600">
                💬 FREE CONSULTATION
              </a>
            </div>
            
            <p class="text-sm mt-4">
              Compassionate legal support available 24/7<br>
              Se habla español - Servicios bilingües disponibles
            </p>
          </div>
        </div>

        <h2>❓ Frequently Asked Questions</h2>

        <h3>How long does a divorce take in North Carolina?</h3>
        <p>
          North Carolina requires a one-year separation before filing for divorce. After filing, an uncontested divorce can be finalized in 2-4 months, while contested divorces may take 6 months to 2+ years depending on complexity.
        </p>

        <h3>Can I get alimony in North Carolina?</h3>
        <p>
          Alimony is not automatic in NC. The court considers factors like length of marriage, income disparity, standard of living, and marital misconduct. An experienced attorney can evaluate whether you're entitled to alimony.
        </p>

        <h3>How is child custody determined?</h3>
        <p>
          North Carolina courts base custody decisions on the best interest of the child, considering factors like each parent's ability to provide care, the child's safety, existing relationships, and the child's preferences if age-appropriate.
        </p>

        <h3>Do I need a lawyer for a simple divorce?</h3>
        <p>
          Even "simple" divorces involve complex legal and financial issues. An attorney can ensure your rights are protected, help avoid costly mistakes, and ensure all necessary documents are properly prepared.
        </p>

        <h3>What if my spouse won't pay child support?</h3>
        <p>
          North Carolina has strong enforcement mechanisms including wage garnishment, asset seizure, license suspension, and even jail time for willful non-payment. We can help you collect the support your children need.
        </p>

        <h3>Can I modify my custody order?</h3>
        <p>
          Yes, custody orders can be modified when there's a substantial change in circumstances affecting the child's best interest. This might include relocation, changes in work schedule, remarriage, or safety concerns.
        </p>

        <h3>How much does a family law attorney cost?</h3>
        <p>
          Costs vary depending on case complexity. We offer free consultations and flexible payment plans. Remember, the cost of experienced representation is often far less than the cost of a poor outcome.
        </p>

        <h2>📚 Additional Family Law Resources</h2>

        <h3>North Carolina Family Law Resources</h3>
        <ul>
          <li><a href="https://www.nccourts.gov/help-topics/family-and-children" target="_blank">NC Courts - Family Law</a></li>
          <li><a href="https://www.ncdhhs.gov/divisions/social-services/child-support-enforcement" target="_blank">NC Child Support Enforcement</a></li>
          <li><a href="https://ncdoj.gov/protecting-consumers/families/domestic-violence/" target="_blank">NC Domestic Violence Resources</a></li>
          <li><a href="https://www.ncbar.gov/" target="_blank">North Carolina State Bar</a></li>
        </ul>

        <h3>Support Resources</h3>
        <ul>
          <li><a href="/resources/divorce-checklist">NC Divorce Checklist</a></li>
          <li><a href="/resources/custody-guidelines">Child Custody Guidelines</a></li>
          <li><a href="/resources/child-support-calculator">Child Support Calculator</a></li>
          <li><a href="/resources/domestic-violence-help">Domestic Violence Resources</a></li>
          <li><a href="/resources/military-family-law">Military Family Law Guide</a></li>
        </ul>

        <h2>Contact Vasquez Law Firm for Family Law Matters</h2>

        <div class="bg-blue-900 text-white p-8 rounded-lg">
          <div class="text-center mb-6">
            <h3 class="text-3xl font-bold text-yellow-400 mb-2">YO PELEO POR TI™</h3>
            <p class="text-xl">Military Veterans Fighting for Your Family</p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-xl font-bold mb-4">📞 Contact Information</h4>
              <ul class="space-y-2">
                <li><strong>Phone:</strong> <a href="tel:9195193312" class="text-yellow-400">(919) 519-3312</a></li>
                <li><strong>Email:</strong> <a href="mailto:info@vasquezlawnc.com" class="text-yellow-400">info@vasquezlawnc.com</a></li>
                <li><strong>24/7 Support:</strong> Available for family law emergencies</li>
                <li><strong>Languages:</strong> English & Spanish</li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-xl font-bold mb-4">🏢 Office Locations</h4>
              <ul class="space-y-2">
                <li><strong>Raleigh:</strong> 123 Main Street, Raleigh, NC 27601</li>
                <li><strong>Charlotte:</strong> 456 Trade Street, Charlotte, NC 28202</li>
                <li><strong>Serving:</strong> All North Carolina Counties</li>
                <li><strong>Family Court:</strong> All NC District Courts</li>
              </ul>
            </div>
          </div>
          
          <div class="text-center mt-8">
            <a href="/contact" class="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300">
              SCHEDULE YOUR FREE FAMILY LAW CONSULTATION
            </a>
          </div>
        </div>

        <div class="mt-8 text-center text-gray-600">
          <p>
            <strong>Disclaimer:</strong> This blog post is for informational purposes only and does not constitute legal advice. 
            Family law is complex and varies by individual circumstances. You should consult with a qualified family law attorney about your specific situation. 
            Attorney advertising. Prior results do not guarantee future outcomes.
          </p>
        </div>
      </div>
    `,
    practiceArea: 'family-law',
    language: 'en' as const,
    publishedAt: new Date('2024-01-20T10:00:00.000Z'),
    readTime: 30,
    author: DEFAULT_BLOG_AUTHOR,
    tags: [
      'Family Law',
      'North Carolina',
      'Divorce',
      'Child Custody',
      'Child Support',
      'Alimony',
      'Adoption',
      'Domestic Violence',
      'Prenuptial Agreements',
      'Property Division',
      'YO PELEO POR TI',
    ],
    featuredImage: '/images/blog/nc-family-law-guide.jpg',
    views: 0,
  };

  const categories = [
    {
      id: 'family-law',
      name: { en: 'Family Law', es: 'Derecho Familiar' },
      slug: { en: 'family-law', es: 'derecho-familiar' },
      icon: '👨‍👩‍👧‍👦',
      postCount: 42,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      slug: { en: 'criminal-defense', es: 'defensa-criminal' },
      icon: '⚖️',
      postCount: 28,
    },
    {
      id: 'immigration',
      name: { en: 'Immigration Law', es: 'Ley de Inmigración' },
      slug: { en: 'immigration', es: 'inmigracion' },
      icon: '🌐',
      postCount: 45,
    },
  ];

  const relatedPosts = [
    {
      id: 'nc-divorce-guide',
      title: 'Complete Guide to Divorce in North Carolina',
      slug: 'north-carolina-divorce-guide',
      excerpt:
        'Everything you need to know about getting divorced in NC, from separation requirements to property division and custody.',
      practiceArea: 'family-law',
      language: 'en' as const,
      publishedAt: new Date('2024-01-15T10:00:00.000Z'),
      readTime: 20,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['Divorce', 'North Carolina', 'Property Division'],
    },
    {
      id: 'child-custody-nc',
      title: "Child Custody Laws in North Carolina: A Parent's Guide",
      slug: 'child-custody-laws-north-carolina',
      excerpt:
        'Understanding child custody decisions in NC, including best interest factors, parenting plans, and modification procedures.',
      practiceArea: 'family-law',
      language: 'en' as const,
      publishedAt: new Date('2024-01-10T10:00:00.000Z'),
      readTime: 15,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['Child Custody', 'Parenting Plans', 'North Carolina'],
    },
    {
      id: 'domestic-violence-protection',
      title: 'Domestic Violence Protection Orders in North Carolina',
      slug: 'domestic-violence-protection-orders-nc',
      excerpt:
        'How to obtain protection from domestic violence in NC, including 50B orders, emergency procedures, and safety planning.',
      practiceArea: 'family-law',
      language: 'en' as const,
      publishedAt: new Date('2024-01-05T10:00:00.000Z'),
      readTime: 12,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['Domestic Violence', 'Protection Orders', 'Safety'],
    },
  ];

  return (
    <BlogPageTemplate
      posts={[]}
      categories={categories}
      isArticlePage={true}
      currentPost={post}
      relatedPosts={relatedPosts}
    />
  );
}
