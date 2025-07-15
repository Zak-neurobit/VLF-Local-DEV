import { BlogPageTemplate } from '@/components/templates/BlogPageTemplate';
import { Metadata } from 'next';
import { DEFAULT_BLOG_AUTHOR } from '@/lib/blog/constants';

export const metadata: Metadata = {
  title:
    "Complete Guide to Workers' Compensation in North Carolina 2024 | Expert Legal Representation - Vasquez Law Firm",
  description:
    "Comprehensive guide to workers' compensation law in North Carolina. Expert representation for workplace injuries, denied claims, permanent disability, and third-party claims. YO PELEO POR TI™ - We fight for your benefits. Call (919) 519-3312.",
  keywords: [
    'North Carolina workers compensation',
    'NC workers comp lawyer',
    'workers compensation attorney NC',
    'workplace injury lawyer',
    'denied workers comp claim',
    'permanent disability benefits',
    'workers comp settlement',
    'third party claims',
    'return to work injury',
    'occupational injury attorney',
    'Raleigh workers compensation',
    'Charlotte workers comp lawyer',
    'YO PELEO POR TI',
    'military veteran lawyer',
    'workplace accident attorney',
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
    title:
      "Complete Guide to Workers' Compensation in North Carolina 2024 | Expert Legal Representation",
    description:
      "Comprehensive guide to workers' compensation law in North Carolina. Expert representation for workplace injuries, denied claims, permanent disability, and third-party claims. YO PELEO POR TI™ - We fight for your benefits.",
    url: 'https://www.vasquezlawnc.com/blog/north-carolina-workers-compensation-guide',
    siteName: 'Vasquez Law Firm',
    images: [
      {
        url: 'https://www.vasquezlawnc.com/images/blog/nc-workers-compensation-guide.jpg',
        width: 1200,
        height: 630,
        alt: "North Carolina Workers' Compensation Guide - Vasquez Law Firm",
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      "Complete Guide to Workers' Compensation in North Carolina 2024 | Expert Legal Representation",
    description:
      "Comprehensive guide to workers' compensation law in North Carolina. Expert representation for workplace injuries, denied claims, permanent disability, and third-party claims. YO PELEO POR TI™",
    images: ['https://www.vasquezlawnc.com/images/blog/nc-workers-compensation-guide.jpg'],
    creator: '@VasquezLawNC',
  },
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/blog/north-carolina-workers-compensation-guide',
    languages: {
      'en-US': 'https://www.vasquezlawnc.com/blog/north-carolina-workers-compensation-guide',
      'es-US':
        'https://www.vasquezlawnc.com/es/blog/guia-compensacion-trabajadores-carolina-del-norte',
    },
  },
  other: {
    'article:published_time': '2024-01-22T10:00:00.000Z',
    'article:modified_time': new Date().toISOString(),
    'article:author': 'Vasquez Law Firm',
    'article:section': 'Workers Compensation',
    'article:tag':
      'North Carolina Workers Compensation, Workplace Injuries, Denied Claims, Permanent Disability',
  },
};

export const runtime = 'nodejs';

export default function NorthCarolinaWorkersCompensationGuidePage() {
  const post = {
    id: 'north-carolina-workers-compensation-guide',
    title: "Complete Guide to Workers' Compensation in North Carolina 2024",
    slug: 'north-carolina-workers-compensation-guide',
    excerpt:
      "Comprehensive guide to workers' compensation law in North Carolina covering workplace injuries, filing claims, denied claims, permanent disability, medical treatment, and third-party claims. Expert legal representation with YO PELEO POR TI™ commitment.",
    content: `
      <div class="prose prose-lg max-w-none">
        <!-- Emergency Contact Banner -->
        <div class="bg-red-600 text-white p-6 rounded-lg mb-8 text-center">
          <h2 class="text-2xl font-bold mb-2">🚨 INJURED AT WORK? GET HELP NOW!</h2>
          <p class="text-lg mb-4">Don't let employers or insurance companies deny your rightful benefits. Time is critical for your claim.</p>
          <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href="tel:9195193312" class="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
              📞 CALL NOW: (919) 519-3312
            </a>
            <a href="/contact" class="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-red-600">
              💬 FREE CONSULTATION
            </a>
          </div>
          <p class="mt-4 text-sm">Immediate action protects your rights - Don't wait to get legal help</p>
        </div>

        <!-- YO PELEO POR TI Branding -->
        <div class="bg-blue-900 text-white p-6 rounded-lg mb-8">
          <div class="flex items-center justify-center mb-4">
            <span class="text-4xl mr-4">🇺🇸</span>
            <div>
              <h2 class="text-3xl font-bold text-yellow-400">YO PELEO POR TI™</h2>
              <p class="text-xl">I FIGHT FOR YOU</p>
            </div>
            <span class="text-4xl ml-4">⚔️</span>
          </div>
          <p class="text-center text-lg">
            Military precision meets legal excellence. As veterans who served our country with dedication and honor, we now serve YOU with the same unwavering commitment. Your fight for workers' compensation benefits becomes our mission.
          </p>
        </div>

        <h1>Complete Guide to Workers' Compensation in North Carolina 2024</h1>
        
        <p class="lead">
          If you've been injured at work in North Carolina, you're facing more than just physical pain and medical bills. You're dealing with insurance companies, potentially lost wages, and uncertainty about your future. At Vasquez Law Firm, we understand your struggle and bring military-grade dedication to fighting for your workers' compensation benefits with our <strong>YO PELEO POR TI™</strong> commitment - because we literally fight for you.
        </p>

        <h2>📋 Table of Contents</h2>
        <ul>
          <li><a href="#immediate-steps">Immediate Steps After a Workplace Injury</a></li>
          <li><a href="#nc-workers-comp-law">North Carolina Workers' Compensation Law Overview</a></li>
          <li><a href="#covered-injuries">What Injuries Are Covered</a></li>
          <li><a href="#filing-claims">How to File a Workers' Compensation Claim</a></li>
          <li><a href="#benefits-available">Types of Benefits Available</a></li>
          <li><a href="#denied-claims">Dealing with Denied Claims</a></li>
          <li><a href="#permanent-disability">Permanent Disability Benefits</a></li>
          <li><a href="#medical-treatment">Medical Treatment and Rights</a></li>
          <li><a href="#return-to-work">Return to Work Issues</a></li>
          <li><a href="#third-party-claims">Third-Party Claims and Personal Injury</a></li>
          <li><a href="#employer-tactics">Common Employer and Insurance Tactics</a></li>
          <li><a href="#choosing-attorney">When You Need an Attorney</a></li>
        </ul>

        <h2 id="immediate-steps">🚨 Immediate Steps After a Workplace Injury</h2>
        
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h3 class="text-xl font-bold text-yellow-800 mb-3">CRITICAL: Do These Things IMMEDIATELY</h3>
          <ol class="text-yellow-800">
            <li><strong>Get Medical Attention</strong> - Your health is the priority, even for seemingly minor injuries</li>
            <li><strong>Report the Injury Immediately</strong> - Tell your supervisor/employer right away (within 30 days required)</li>
            <li><strong>Document Everything</strong> - Photos of the scene, injuries, equipment involved</li>
            <li><strong>Get Witness Information</strong> - Names and contact info of anyone who saw the accident</li>
            <li><strong>Write Down What Happened</strong> - Detailed description while it's fresh in your memory</li>
            <li><strong>File Form 18</strong> - Complete the official injury report form</li>
            <li><strong>Keep All Records</strong> - Medical bills, correspondence, missed work documentation</li>
            <li><strong>Contact Vasquez Law Firm</strong> - Call (919) 519-3312 for legal guidance</li>
          </ol>
        </div>

        <h3>What NOT to Do After a Workplace Injury</h3>
        <ul>
          <li>❌ Do NOT delay reporting the injury to your employer</li>
          <li>❌ Do NOT sign any documents without legal review</li>
          <li>❌ Do NOT give recorded statements to insurance without an attorney</li>
          <li>❌ Do NOT accept quick settlement offers</li>
          <li>❌ Do NOT return to work if medically unsafe</li>
          <li>❌ Do NOT assume your claim will be approved automatically</li>
          <li>❌ Do NOT miss medical appointments or treatment</li>
        </ul>

        <h2 id="nc-workers-comp-law">⚖️ North Carolina Workers' Compensation Law Overview</h2>

        <h3>Who Is Covered Under NC Workers' Compensation</h3>
        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-green-800 mb-3">✅ Covered Employees</h4>
          <ul class="text-green-800">
            <li><strong>Most Employees:</strong> Full-time, part-time, temporary, and seasonal workers</li>
            <li><strong>Construction Workers:</strong> All construction industry employees</li>
            <li><strong>Agricultural Workers:</strong> If employer has 10+ regular employees</li>
            <li><strong>Railroad Workers:</strong> Certain categories covered</li>
            <li><strong>Domestic Workers:</strong> If working 20+ hours per week</li>
            <li><strong>Undocumented Workers:</strong> Still entitled to benefits under NC law</li>
          </ul>
        </div>

        <h3>Who Is NOT Covered</h3>
        <ul>
          <li>Independent contractors (though this is often disputed)</li>
          <li>Casual employees working less than 20 hours per week</li>
          <li>Federal employees (covered by federal workers' comp)</li>
          <li>Certain agricultural workers (farms with fewer than 10 employees)</li>
          <li>Some domestic workers</li>
        </ul>

        <h3>Time Limits in North Carolina Workers' Compensation</h3>
        <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-red-800 mb-3">⏰ CRITICAL DEADLINES</h4>
          <ul class="text-red-800">
            <li><strong>Report Injury:</strong> 30 days from date of accident or discovery</li>
            <li><strong>File Claim:</strong> 2 years from date of injury or last compensation payment</li>
            <li><strong>Occupational Disease:</strong> 2 years from discovery of disease</li>
            <li><strong>Appeal Denial:</strong> 30 days from denial notice</li>
            <li><strong>Medical Treatment:</strong> No specific deadline but don't delay</li>
          </ul>
          <p class="mt-4 font-bold">Missing these deadlines can permanently bar your claim!</p>
        </div>

        <h2 id="covered-injuries">🏥 What Injuries Are Covered</h2>

        <h3>Types of Covered Workplace Injuries</h3>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h4>Sudden Accident Injuries</h4>
          <ul>
            <li>Slips, trips, and falls at work</li>
            <li>Cuts, lacerations, and puncture wounds</li>
            <li>Burns from chemicals or equipment</li>
            <li>Broken bones and fractures</li>
            <li>Eye injuries from debris or chemicals</li>
            <li>Machinery accidents and crushing injuries</li>
            <li>Electric shock and electrocution</li>
            <li>Vehicle accidents during work</li>
          </ul>

          <h4>Repetitive Stress and Overuse Injuries</h4>
          <ul>
            <li>Carpal tunnel syndrome</li>
            <li>Back injuries from lifting</li>
            <li>Tendonitis and joint problems</li>
            <li>Hearing loss from workplace noise</li>
            <li>Vision problems from computer work</li>
            <li>Herniated discs from repetitive motion</li>
          </ul>

          <h4>Occupational Diseases</h4>
          <ul>
            <li>Lung diseases from asbestos exposure</li>
            <li>Chemical poisoning and exposure</li>
            <li>Skin conditions from workplace chemicals</li>
            <li>Cancer from workplace carcinogens</li>
            <li>Respiratory diseases from dust or fumes</li>
            <li>Infectious diseases contracted at work</li>
          </ul>
        </div>

        <h3>Proving Your Injury Is Work-Related</h3>
        <p>
          To receive workers' compensation benefits in North Carolina, you must prove:
        </p>
        <ol>
          <li><strong>Employment Relationship:</strong> You were an employee (not independent contractor)</li>
          <li><strong>Injury by Accident:</strong> A specific incident or gradual onset due to work</li>
          <li><strong>Arising Out of Employment:</strong> The injury happened because of your job</li>
          <li><strong>In Course of Employment:</strong> The injury occurred during work time/activities</li>
          <li><strong>Medical Evidence:</strong> Medical proof connecting the injury to work</li>
        </ol>

        <h3>Common Work-Related Injury Scenarios</h3>
        <ul>
          <li><strong>Construction Sites:</strong> Falls, equipment accidents, struck by objects</li>
          <li><strong>Manufacturing:</strong> Machinery accidents, repetitive motion injuries</li>
          <li><strong>Healthcare:</strong> Back injuries from lifting patients, needle sticks</li>
          <li><strong>Office Work:</strong> Carpal tunnel, falls, ergonomic injuries</li>
          <li><strong>Retail:</strong> Slips and falls, lifting injuries, violence from customers</li>
          <li><strong>Transportation:</strong> Vehicle accidents, loading/unloading injuries</li>
        </ul>

        <h2 id="filing-claims">📄 How to File a Workers' Compensation Claim</h2>

        <h3>Step-by-Step Filing Process</h3>
        <ol>
          <li><strong>Report to Employer:</strong> Immediately notify your supervisor or HR department</li>
          <li><strong>Complete Form 18:</strong> Fill out the "Notice to Employer of Accident" form</li>
          <li><strong>Seek Medical Treatment:</strong> Get immediate medical care from approved provider</li>
          <li><strong>File Form 18 with Industrial Commission:</strong> Submit within 30 days of injury</li>
          <li><strong>Employer Files Form 19:</strong> Employer must file "Employer's Report of Injury"</li>
          <li><strong>Insurance Investigation:</strong> Carrier investigates and makes coverage decision</li>
          <li><strong>Form 21 Decision:</strong> Insurance accepts or denies claim in writing</li>
          <li><strong>Begin Benefits:</strong> If accepted, benefits should start promptly</li>
        </ol>

        <h3>Required Forms and Documentation</h3>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-yellow-800 mb-3">📋 Essential Documents</h4>
          <ul class="text-yellow-800">
            <li><strong>Form 18:</strong> Notice to Employer of Accident (you file this)</li>
            <li><strong>Form 19:</strong> Employer's Report of Injury (employer files this)</li>
            <li><strong>Form 21:</strong> Admission or Denial of Claim (insurance company)</li>
            <li><strong>Medical Records:</strong> All treatment records and doctor reports</li>
            <li><strong>Wage Records:</strong> Pay stubs showing pre-injury earnings</li>
            <li><strong>Witness Statements:</strong> Written accounts from co-workers</li>
            <li><strong>Incident Reports:</strong> Any internal company accident reports</li>
          </ul>
        </div>

        <h3>The Insurance Company Investigation</h3>
        <p>
          After you file your claim, the insurance company will:
        </p>
        <ul>
          <li>Review your medical records and treatment</li>
          <li>Interview you about the accident</li>
          <li>Interview witnesses and co-workers</li>
          <li>Inspect the accident scene</li>
          <li>Review employment and payroll records</li>
          <li>Possibly conduct surveillance of your activities</li>
          <li>Have you examined by their doctor</li>
        </ul>

        <h2 id="benefits-available">💰 Types of Workers' Compensation Benefits Available</h2>

        <h3>Medical Benefits</h3>
        <div class="bg-green-50 p-6 rounded-lg mb-6">
          <h4>Covered Medical Expenses</h4>
          <ul>
            <li><strong>Emergency Treatment:</strong> Immediate care after injury</li>
            <li><strong>Doctor Visits:</strong> Approved physicians and specialists</li>
            <li><strong>Hospital Care:</strong> Inpatient and outpatient treatment</li>
            <li><strong>Surgery:</strong> Necessary surgical procedures</li>
            <li><strong>Physical Therapy:</strong> Rehabilitation and recovery</li>
            <li><strong>Prescription Medications:</strong> Related to work injury</li>
            <li><strong>Medical Equipment:</strong> Wheelchairs, braces, prosthetics</li>
            <li><strong>Mileage:</strong> Travel to approved medical appointments</li>
          </ul>
        </div>

        <h3>Wage Loss Benefits (Indemnity Benefits)</h3>
        <p>
          North Carolina provides different types of wage replacement based on your disability level:
        </p>

        <h4>Temporary Total Disability (TTD)</h4>
        <ul>
          <li><strong>When:</strong> Unable to work while recovering</li>
          <li><strong>Amount:</strong> 66⅔% of average weekly wage</li>
          <li><strong>Maximum:</strong> $1,065 per week (2024 rate)</li>
          <li><strong>Waiting Period:</strong> 7 days before benefits begin</li>
          <li><strong>Duration:</strong> Until you can return to work or reach maximum improvement</li>
        </ul>

        <h4>Temporary Partial Disability (TPD)</h4>
        <ul>
          <li><strong>When:</strong> Can work but at reduced capacity/wages</li>
          <li><strong>Amount:</strong> 66⅔% of wage loss difference</li>
          <li><strong>Example:</strong> If you earned $600/week but now earn $400, you get 66⅔% of $200 = $133</li>
        </ul>

        <h4>Permanent Partial Disability (PPD)</h4>
        <ul>
          <li><strong>When:</strong> Permanent impairment but can still work</li>
          <li><strong>Scheduled Injuries:</strong> Specific compensation for loss of body parts</li>
          <li><strong>Unscheduled Injuries:</strong> Based on percentage of total disability</li>
          <li><strong>Examples:</strong> Loss of finger (40 weeks), loss of hand (200 weeks)</li>
        </ul>

        <h4>Permanent Total Disability (PTD)</h4>
        <ul>
          <li><strong>When:</strong> Permanently unable to work in any capacity</li>
          <li><strong>Amount:</strong> 66⅔% of average weekly wage for life</li>
          <li><strong>Rare:</strong> Very difficult to prove in North Carolina</li>
        </ul>

        <h3>Death Benefits</h3>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h4>Survivor Benefits</h4>
          <ul>
            <li><strong>Burial Expenses:</strong> Up to $10,000 for funeral costs</li>
            <li><strong>Widow/Widower:</strong> 66⅔% of deceased worker's wage</li>
            <li><strong>Children:</strong> Additional benefits for dependent children</li>
            <li><strong>Duration:</strong> Until remarriage or death for spouse; age 18 for children</li>
            <li><strong>Maximum:</strong> Same as worker's maximum weekly benefit</li>
          </ul>
        </div>

        <h2 id="denied-claims">❌ Dealing with Denied Workers' Compensation Claims</h2>

        <h3>Common Reasons for Claim Denials</h3>
        <ul>
          <li><strong>Late Reporting:</strong> Failure to report within 30 days</li>
          <li><strong>Not Work-Related:</strong> Insurance claims injury didn't happen at work</li>
          <li><strong>Pre-existing Condition:</strong> Claiming injury was pre-existing</li>
          <li><strong>Independent Contractor:</strong> Disputing employee status</li>
          <li><strong>Intoxication:</strong> Claiming worker was drunk or on drugs</li>
          <li><strong>Intentional Injury:</strong> Alleging worker injured themselves on purpose</li>
          <li><strong>Outside Scope:</strong> Claiming injury occurred outside work duties</li>
          <li><strong>Medical Disputes:</strong> Disagreeing with treating doctor's opinion</li>
        </ul>

        <h3>What to Do When Your Claim Is Denied</h3>
        <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-red-800 mb-3">🚨 IMMEDIATE ACTION REQUIRED</h4>
          <ol class="text-red-800">
            <li><strong>Don't Panic:</strong> Denials are common and often overturned</li>
            <li><strong>Read the Denial Carefully:</strong> Understand the specific reasons</li>
            <li><strong>Gather Evidence:</strong> Collect medical records, witness statements</li>
            <li><strong>Request a Hearing:</strong> File Form 33 within 30 days</li>
            <li><strong>Continue Medical Treatment:</strong> Don't stop treating the injury</li>
            <li><strong>Contact an Attorney:</strong> Legal representation is crucial</li>
            <li><strong>Document Everything:</strong> Keep detailed records</li>
          </ol>
        </div>

        <h3>The Appeals Process</h3>
        <ol>
          <li><strong>Request for Hearing:</strong> File Form 33 with Industrial Commission</li>
          <li><strong>Mediation:</strong> Attempt to resolve dispute without trial</li>
          <li><strong>Discovery:</strong> Exchange evidence and information</li>
          <li><strong>Pre-trial Conference:</strong> Judge attempts settlement</li>
          <li><strong>Hearing:</strong> Trial before Deputy Commissioner</li>
          <li><strong>Opinion and Award:</strong> Judge's written decision</li>
          <li><strong>Appeal:</strong> Can appeal to Full Commission, then Court of Appeals</li>
        </ol>

        <h3>Building a Strong Case for Appeal</h3>
        <ul>
          <li><strong>Medical Evidence:</strong> Strong medical documentation of work-related injury</li>
          <li><strong>Witness Testimony:</strong> Co-workers who saw the accident</li>
          <li><strong>Expert Testimony:</strong> Medical experts supporting your case</li>
          <li><strong>Employment Records:</strong> Proving employee status and job duties</li>
          <li><strong>Incident Documentation:</strong> Photos, reports, safety violations</li>
          <li><strong>Credible Testimony:</strong> Consistent, honest account of events</li>
        </ul>

        <h2 id="permanent-disability">🦽 Permanent Disability Benefits</h2>

        <h3>Understanding Permanent Disability Ratings</h3>
        <p>
          When you reach "maximum medical improvement" (MMI), a doctor will assess your permanent impairment. This rating determines your ongoing benefits.
        </p>

        <h3>Scheduled vs. Unscheduled Injuries</h3>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-yellow-800 mb-3">📊 Scheduled Injuries (Specific Body Parts)</h4>
          <ul class="text-yellow-800">
            <li><strong>Arm:</strong> 240 weeks maximum</li>
            <li><strong>Hand:</strong> 200 weeks maximum</li>
            <li><strong>Thumb:</strong> 60 weeks maximum</li>
            <li><strong>First Finger:</strong> 40 weeks maximum</li>
            <li><strong>Leg:</strong> 200 weeks maximum</li>
            <li><strong>Foot:</strong> 144 weeks maximum</li>
            <li><strong>Eye:</strong> 120 weeks maximum</li>
            <li><strong>Hearing (one ear):</strong> 50 weeks maximum</li>
          </ul>
        </div>

        <h4>Unscheduled Injuries (Back, Neck, Head, etc.)</h4>
        <ul>
          <li>Based on percentage of total disability to the body as a whole</li>
          <li>Maximum of 300 weeks of benefits</li>
          <li>More complex evaluation process</li>
          <li>Considers impact on earning capacity</li>
        </ul>

        <h3>Factors Affecting Permanent Disability Ratings</h3>
        <ul>
          <li><strong>Medical Impairment:</strong> Objective medical findings</li>
          <li><strong>Functional Limitations:</strong> What you can and cannot do</li>
          <li><strong>Age and Education:</strong> Impact on future employability</li>
          <li><strong>Work Experience:</strong> Skills and transferable abilities</li>
          <li><strong>Pain and Suffering:</strong> Ongoing pain and limitations</li>
          <li><strong>Vocational Impact:</strong> Effect on ability to earn wages</li>
        </ul>

        <h3>Maximizing Your Permanent Disability Rating</h3>
        <ul>
          <li>Complete all recommended medical treatment</li>
          <li>Attend all medical appointments</li>
          <li>Be honest about limitations and pain levels</li>
          <li>Follow through with physical therapy</li>
          <li>Document daily limitations and difficulties</li>
          <li>Consider vocational rehabilitation assessment</li>
          <li>Get second medical opinions when appropriate</li>
        </ul>

        <h2 id="medical-treatment">🏥 Medical Treatment Rights and Issues</h2>

        <h3>Your Right to Medical Treatment</h3>
        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-green-800 mb-3">✅ Your Medical Rights</h4>
          <ul class="text-green-800">
            <li><strong>Immediate Care:</strong> Right to emergency treatment</li>
            <li><strong>Ongoing Treatment:</strong> All necessary medical care</li>
            <li><strong>Specialist Referrals:</strong> When needed for your condition</li>
            <li><strong>Second Opinions:</strong> Right to additional medical opinions</li>
            <li><strong>No Co-pays:</strong> No out-of-pocket costs for covered treatment</li>
            <li><strong>Prescription Coverage:</strong> All related medications</li>
            <li><strong>Mileage Reimbursement:</strong> Travel to medical appointments</li>
          </ul>
        </div>

        <h3>Choosing Your Doctor</h3>
        <p>
          In North Carolina, the insurance company initially controls medical treatment, but you have rights:
        </p>
        <ul>
          <li><strong>Initial Treatment:</strong> Insurance company chooses first doctor</li>
          <li><strong>Changing Doctors:</strong> Can request change for good cause</li>
          <li><strong>Second Opinions:</strong> Entitled to independent medical evaluation</li>
          <li><strong>Specialist Care:</strong> Must be provided when medically necessary</li>
          <li><strong>Emergency Care:</strong> Can go to any hospital in emergency</li>
        </ul>

        <h3>Independent Medical Examinations (IMEs)</h3>
        <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-red-800 mb-3">⚠️ Know Your Rights at IMEs</h4>
          <ul class="text-red-800">
            <li><strong>Purpose:</strong> Insurance company's doctor evaluates your condition</li>
            <li><strong>Attendance:</strong> Usually required to attend</li>
            <li><strong>Bring Advocate:</strong> Can bring someone with you</li>
            <li><strong>Record Exam:</strong> Allowed in some circumstances</li>
            <li><strong>Be Honest:</strong> Don't exaggerate or downplay symptoms</li>
            <li><strong>Stay Consistent:</strong> Keep accounts of limitations consistent</li>
            <li><strong>No Treatment:</strong> IME doctors don't provide treatment</li>
          </ul>
        </div>

        <h3>Common Medical Treatment Disputes</h3>
        <ul>
          <li><strong>Treatment Denials:</strong> Insurance refuses to authorize care</li>
          <li><strong>Surgery Approvals:</strong> Disputes over need for surgery</li>
          <li><strong>Medication Coverage:</strong> Refusing to pay for prescriptions</li>
          <li><strong>Physical Therapy:</strong> Limiting number of sessions</li>
          <li><strong>Specialist Referrals:</strong> Denying access to specialists</li>
          <li><strong>Medical Equipment:</strong> Refusing wheelchairs, braces, etc.</li>
        </ul>

        <h2 id="return-to-work">👷 Return to Work Issues</h2>

        <h3>Types of Return to Work</h3>
        <ol>
          <li><strong>Return to Same Job:</strong> Full recovery, same position and pay</li>
          <li><strong>Modified Duty:</strong> Same employer, different or lighter duties</li>
          <li><strong>Light Duty:</strong> Temporary restrictions until full recovery</li>
          <li><strong>New Employment:</strong> Different job due to permanent restrictions</li>
          <li><strong>Vocational Rehabilitation:</strong> Training for new career</li>
        </ol>

        <h3>Your Rights Regarding Return to Work</h3>
        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h4>Important Protections</h4>
          <ul>
            <li><strong>Medical Clearance:</strong> Doctor must approve return to work</li>
            <li><strong>Accommodation:</strong> Employer must reasonably accommodate restrictions</li>
            <li><strong>No Retaliation:</strong> Cannot be fired for filing workers' comp claim</li>
            <li><strong>Suitable Work:</strong> Offered job must be within your restrictions</li>
            <li><strong>Wage Loss:</strong> Compensation for reduced earning capacity</li>
            <li><strong>Right to Refuse:</strong> Can refuse unsuitable work offers</li>
          </ul>
        </div>

        <h3>Light Duty and Modified Work</h3>
        <p>
          When your doctor releases you for light duty, several things can happen:
        </p>
        <ul>
          <li><strong>Employer Offers Suitable Work:</strong> You must generally accept</li>
          <li><strong>No Suitable Work Available:</strong> Continue receiving wage benefits</li>
          <li><strong>Employer Refuses Light Duty:</strong> May continue wage benefits</li>
          <li><strong>You Refuse Suitable Work:</strong> May lose wage benefits</li>
        </ul>

        <h3>Vocational Rehabilitation</h3>
        <ul>
          <li><strong>When Available:</strong> If you cannot return to previous work</li>
          <li><strong>Services Provided:</strong> Job retraining, education, job placement</li>
          <li><strong>Funding:</strong> Up to $15,000 in North Carolina</li>
          <li><strong>Duration:</strong> Typically 2 years maximum</li>
          <li><strong>Cooperation Required:</strong> Must participate in good faith</li>
        </ul>

        <h2 id="third-party-claims">⚖️ Third-Party Claims and Additional Compensation</h2>

        <h3>When You Can File Additional Claims</h3>
        <p>
          Workers' compensation is usually your exclusive remedy against your employer, but you may have additional claims against third parties who contributed to your injury.
        </p>

        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-green-800 mb-3">💰 Third-Party Claim Opportunities</h4>
          <ul class="text-green-800">
            <li><strong>Motor Vehicle Accidents:</strong> Other drivers in work-related crashes</li>
            <li><strong>Defective Products:</strong> Manufacturers of dangerous equipment</li>
            <li><strong>Premises Liability:</strong> Property owners where you were injured</li>
            <li><strong>Subcontractors:</strong> Other companies working at your job site</li>
            <li><strong>Chemical Exposure:</strong> Companies that manufactured toxic substances</li>
            <li><strong>Equipment Manufacturers:</strong> Makers of defective machinery</li>
          </ul>
        </div>

        <h3>Benefits of Third-Party Claims</h3>
        <ul>
          <li><strong>Full Wage Recovery:</strong> 100% of lost wages vs. 66⅔% in workers' comp</li>
          <li><strong>Pain and Suffering:</strong> Compensation for pain (not available in workers' comp)</li>
          <li><strong>Future Losses:</strong> Full compensation for reduced earning capacity</li>
          <li><strong>No Benefit Caps:</strong> No maximum weekly benefit limits</li>
          <li><strong>Punitive Damages:</strong> Additional damages for gross negligence</li>
        </ul>

        <h3>Common Third-Party Scenarios</h3>
        <h4>Construction Site Accidents</h4>
        <ul>
          <li>Crane operator from different company causes accident</li>
          <li>Defective scaffolding manufactured by third party</li>
          <li>Property owner's negligent maintenance</li>
          <li>Subcontractor's unsafe work practices</li>
        </ul>

        <h4>Vehicle Accidents During Work</h4>
        <ul>
          <li>Delivery driver hit by negligent motorist</li>
          <li>Company vehicle with defective brakes</li>
          <li>Dangerous road conditions maintained by municipality</li>
          <li>Other driver under influence of alcohol/drugs</li>
        </ul>

        <h3>Coordination of Benefits</h3>
        <p>
          If you receive both workers' compensation and third-party recovery:
        </p>
        <ul>
          <li><strong>Subrogation:</strong> Workers' comp carrier may seek reimbursement</li>
          <li><strong>Credit:</strong> Third-party recovery may reduce future workers' comp benefits</li>
          <li><strong>Net Recovery:</strong> You keep the difference after reimbursement</li>
          <li><strong>Attorney Fees:</strong> Usually deducted from gross recovery</li>
        </ul>

        <h2 id="employer-tactics">🛡️ Common Employer and Insurance Company Tactics</h2>

        <h3>Employer Tactics to Watch For</h3>
        <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-red-800 mb-3">⚠️ Employer Red Flags</h4>
          <ul class="text-red-800">
            <li><strong>Discouraging Reports:</strong> Telling you not to file a claim</li>
            <li><strong>Blaming You:</strong> Claiming injury was your fault</li>
            <li><strong>Minimizing Injury:</strong> Saying injury isn't serious</li>
            <li><strong>Offering Light Duty Immediately:</strong> To avoid paying wage benefits</li>
            <li><strong>Surveillance:</strong> Following you to catch contradictory activities</li>
            <li><strong>Pressure to Return:</strong> Rushing you back to work</li>
            <li><strong>Retaliation:</strong> Making your work life difficult</li>
          </ul>
        </div>

        <h3>Insurance Company Tactics</h3>
        <ul>
          <li><strong>Delay Tactics:</strong> Hoping you'll give up or settle cheap</li>
          <li><strong>Surveillance:</strong> Videotaping your daily activities</li>
          <li><strong>Social Media Monitoring:</strong> Watching your online posts</li>
          <li><strong>Independent Medical Exams:</strong> Using doctors who favor denial</li>
          <li><strong>Recorded Statements:</strong> Trying to get contradictory statements</li>
          <li><strong>Quick Settlements:</strong> Low offers before you know true extent of injury</li>
          <li><strong>Claim Denials:</strong> Hoping you won't appeal</li>
        </ul>

        <h3>How to Protect Yourself</h3>
        <ul>
          <li><strong>Document Everything:</strong> Keep detailed records of all interactions</li>
          <li><strong>Follow Medical Advice:</strong> Attend all appointments and follow treatment</li>
          <li><strong>Be Consistent:</strong> Keep your account of the accident consistent</li>
          <li><strong>Avoid Social Media:</strong> Limit posts that could be taken out of context</li>
          <li><strong>Don't Give Recorded Statements:</strong> Without attorney present</li>
          <li><strong>Keep Working if Able:</strong> Don't stop light duty without medical excuse</li>
          <li><strong>Get Legal Help Early:</strong> Contact an attorney immediately</li>
        </ul>

        <h2 id="choosing-attorney">🥇 When You Need a Workers' Compensation Attorney</h2>

        <h3>Situations Requiring Legal Representation</h3>
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-yellow-800 mb-3">🚨 Get an Attorney If:</h4>
          <ul class="text-yellow-800">
            <li><strong>Claim Denied:</strong> Insurance company denies your claim</li>
            <li><strong>Serious Injury:</strong> Permanent disability or long-term treatment</li>
            <li><strong>Disputed Medical Care:</strong> Insurance refuses treatment</li>
            <li><strong>Return to Work Disputes:</strong> Problems with suitable work offers</li>
            <li><strong>Third-Party Claims:</strong> Additional parties may be liable</li>
            <li><strong>Retaliation:</strong> Employer treats you differently</li>
            <li><strong>Settlement Offers:</strong> Insurance offers settlement</li>
            <li><strong>Benefit Termination:</strong> Insurance stops paying benefits</li>
          </ul>
        </div>

        <h3>Why Choose Vasquez Law Firm for Workers' Compensation</h3>
        <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
          <h4 class="text-xl font-bold text-green-800 mb-3">🎖️ Military-Grade Workers' Comp Representation</h4>
          <ul class="text-green-800">
            <li><strong>Veteran Leadership:</strong> Military veterans who understand service and dedication</li>
            <li><strong>YO PELEO POR TI™:</strong> We literally fight for your benefits with military precision</li>
            <li><strong>Contingency Fees:</strong> No fee unless we win your case</li>
            <li><strong>Bilingual Services:</strong> Full representation in English and Spanish</li>
            <li><strong>Statewide Practice:</strong> Licensed throughout North Carolina</li>
            <li><strong>Industrial Commission Experience:</strong> Deep knowledge of NC workers' comp system</li>
            <li><strong>Maximum Benefits:</strong> Aggressive pursuit of all available compensation</li>
            <li><strong>Trial Ready:</strong> Prepared to take your case to hearing when necessary</li>
          </ul>
        </div>

        <h3>Our Workers' Compensation Process</h3>
        <ol>
          <li><strong>Free Consultation:</strong> Comprehensive case evaluation at no cost</li>
          <li><strong>Claim Investigation:</strong> Thorough review of your accident and injuries</li>
          <li><strong>Medical Coordination:</strong> Working with your doctors for proper treatment</li>
          <li><strong>Benefit Maximization:</strong> Ensuring you receive all entitled benefits</li>
          <li><strong>Appeals Representation:</strong> Fighting denied claims before Industrial Commission</li>
          <li><strong>Settlement Negotiation:</strong> Securing maximum compensation for permanent injuries</li>
          <li><strong>Third-Party Claims:</strong> Pursuing additional compensation from other liable parties</li>
          <li><strong>Ongoing Support:</strong> Assistance throughout your recovery process</li>
        </ol>

        <h2>📊 Workers' Compensation vs. Personal Injury: Key Differences</h2>

        <div class="overflow-x-auto mb-6">
          <table class="w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-100">
                <th class="border border-gray-300 p-3 text-left">Aspect</th>
                <th class="border border-gray-300 p-3 text-left">Workers' Compensation</th>
                <th class="border border-gray-300 p-3 text-left">Personal Injury Lawsuit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 p-3 font-semibold">Fault</td>
                <td class="border border-gray-300 p-3">No-fault system</td>
                <td class="border border-gray-300 p-3">Must prove negligence</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-semibold">Wage Benefits</td>
                <td class="border border-gray-300 p-3">66⅔% of wages</td>
                <td class="border border-gray-300 p-3">100% of lost wages</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3 font-semibold">Pain & Suffering</td>
                <td class="border border-gray-300 p-3">Not available</td>
                <td class="border border-gray-300 p-3">Available</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="border border-gray-300 p-3 font-semibold">Medical Benefits</td>
                <td class="border border-gray-300 p-3">100% coverage</td>
                <td class="border border-gray-300 p-3">100% if you win</td>
              </tr>
              <tr>
                <td class="border border-gray-300 p-3 font-semibold">Time to Resolution</td>
                <td class="border border-gray-300 p-3">Faster (months)</td>
                <td class="border border-gray-300 p-3">Slower (years)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>📍 We Serve All of North Carolina</h2>

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

        <h3>Industries We Represent</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <ul>
            <li>• Construction</li>
            <li>• Manufacturing</li>
            <li>• Healthcare</li>
            <li>• Transportation</li>
            <li>• Retail</li>
          </ul>
          <ul>
            <li>• Warehousing</li>
            <li>• Restaurant</li>
            <li>• Office Work</li>
            <li>• Government</li>
            <li>• Agriculture</li>
          </ul>
          <ul>
            <li>• Mining</li>
            <li>• Utilities</li>
            <li>• Education</li>
            <li>• Public Safety</li>
            <li>• And Many More</li>
          </ul>
        </div>

        <h2>🎯 Take Action Now - Your Benefits Depend On It</h2>

        <div class="bg-red-600 text-white p-8 rounded-lg mb-8">
          <h3 class="text-2xl font-bold mb-4 text-center">⏰ TIME IS CRITICAL FOR YOUR WORKERS' COMP CLAIM</h3>
          <p class="text-lg mb-6 text-center">
            Evidence disappears, deadlines pass, and insurance companies start building their defense immediately. 
            Don't let them deny your rightful benefits while you wait.
          </p>
          
          <div class="text-center space-y-4">
            <h4 class="text-xl font-bold">🎖️ YO PELEO POR TI™ - I FIGHT FOR YOU</h4>
            <p class="text-lg">
              As military veterans, we bring the same dedication to your fight for workers' compensation benefits that we brought to serving our country. 
              Your battle for rightful benefits becomes our mission.
            </p>
            
            <div class="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
              <a href="tel:9195193312" class="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300">
                📞 CALL NOW: (919) 519-3312
              </a>
              <a href="/contact" class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600">
                💬 FREE CONSULTATION
              </a>
            </div>
            
            <p class="text-sm mt-4">
              No fee unless we win your case - Immediate action protects your rights<br>
              Se habla español - Servicios bilingües disponibles
            </p>
          </div>
        </div>

        <h2>❓ Frequently Asked Questions</h2>

        <h3>Can I be fired for filing a workers' compensation claim?</h3>
        <p>
          No, North Carolina law prohibits retaliation for filing a workers' compensation claim. However, proving retaliation can be complex, and you should contact an attorney immediately if you face adverse employment actions.
        </p>

        <h3>What if my injury was my fault?</h3>
        <p>
          Workers' compensation is a "no-fault" system, meaning you can receive benefits even if the accident was partially or entirely your fault (except in cases of intentional self-injury or intoxication).
        </p>

        <h3>How much will a workers' compensation attorney cost?</h3>
        <p>
          We work on a contingency fee basis, meaning you pay nothing unless we win your case. Attorney fees are typically a percentage of benefits recovered and are regulated by North Carolina law.
        </p>

        <h3>Can I choose my own doctor for treatment?</h3>
        <p>
          Initially, the insurance company controls medical treatment, but you can request a change of physician for good cause, seek second opinions, and have rights to appropriate specialist care.
        </p>

        <h3>What if I have a pre-existing condition?</h3>
        <p>
          You can still receive workers' compensation benefits if your work injury aggravated or accelerated a pre-existing condition. The key is proving your work caused a significant worsening of the condition.
        </p>

        <h3>How long do workers' compensation benefits last?</h3>
        <p>
          It depends on your injury. Temporary benefits last until you can return to work or reach maximum medical improvement. Permanent partial disability benefits have specific time limits, while permanent total disability benefits can last for life.
        </p>

        <h2>📚 Additional Resources</h2>

        <h3>North Carolina Workers' Compensation Resources</h3>
        <ul>
          <li><a href="https://www.ic.nc.gov/" target="_blank">NC Industrial Commission</a></li>
          <li><a href="https://www.labor.nc.gov/" target="_blank">NC Department of Labor</a></li>
          <li><a href="https://www.osha.gov/" target="_blank">Occupational Safety and Health Administration</a></li>
          <li><a href="https://www.ncdoi.gov/" target="_blank">NC Department of Insurance</a></li>
        </ul>

        <h3>Related Legal Guides</h3>
        <ul>
          <li><a href="/blog/north-carolina-personal-injury-guide">Complete Personal Injury Guide</a></li>
          <li><a href="/resources/workplace-safety">Workplace Safety Rights</a></li>
          <li><a href="/resources/disability-benefits">Disability Benefits Information</a></li>
          <li><a href="/resources/employment-law">Employment Law Protection</a></li>
        </ul>

        <h2>Contact Vasquez Law Firm Today</h2>

        <div class="bg-blue-900 text-white p-8 rounded-lg">
          <div class="text-center mb-6">
            <h3 class="text-3xl font-bold text-yellow-400 mb-2">YO PELEO POR TI™</h3>
            <p class="text-xl">Military Veterans Fighting for Your Workers' Compensation Benefits</p>
          </div>
          
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h4 class="text-xl font-bold mb-4">📞 Contact Information</h4>
              <ul class="space-y-2">
                <li><strong>Phone:</strong> <a href="tel:9195193312" class="text-yellow-400">(919) 519-3312</a></li>
                <li><strong>Email:</strong> <a href="mailto:info@vasquezlawnc.com" class="text-yellow-400">info@vasquezlawnc.com</a></li>
                <li><strong>24/7 Emergency:</strong> Available for serious workplace injuries</li>
                <li><strong>Languages:</strong> English & Spanish</li>
                <li><strong>Fee:</strong> No fee unless we win</li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-xl font-bold mb-4">🏢 Office Locations</h4>
              <ul class="space-y-2">
                <li><strong>Raleigh:</strong> Serving Wake County and surrounding areas</li>
                <li><strong>Charlotte:</strong> Serving Mecklenburg County and surrounding areas</li>
                <li><strong>Serving:</strong> All of North Carolina</li>
                <li><strong>Home/Hospital Visits:</strong> Available for severely injured workers</li>
              </ul>
            </div>
          </div>
          
          <div class="text-center mt-8">
            <a href="/contact" class="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300">
              SCHEDULE YOUR FREE WORKERS' COMP CONSULTATION
            </a>
          </div>
        </div>

        <div class="mt-8 text-center text-gray-600">
          <p>
            <strong>Disclaimer:</strong> This blog post is for informational purposes only and does not constitute legal advice. 
            Every workers' compensation case is unique, and you should consult with a qualified attorney about your specific situation. 
            Attorney advertising. Prior results do not guarantee future outcomes.
          </p>
        </div>
      </div>
    `,
    practiceArea: 'workers-compensation',
    language: 'en' as const,
    publishedAt: new Date('2024-01-22T10:00:00.000Z'),
    readTime: 35,
    author: DEFAULT_BLOG_AUTHOR,
    tags: [
      'Workers Compensation',
      'North Carolina',
      'Workplace Injuries',
      'Denied Claims',
      'Permanent Disability',
      'Medical Treatment',
      'Return to Work',
      'Third Party Claims',
      'Industrial Commission',
      'YO PELEO POR TI',
    ],
    featuredImage: '/images/blog/nc-workers-compensation-guide.jpg',
    views: 0,
  };

  const categories = [
    {
      id: 'workers-compensation',
      name: { en: "Workers' Compensation", es: 'Compensación de Trabajadores' },
      slug: { en: 'workers-compensation', es: 'compensacion-trabajadores' },
      icon: '👷',
      postCount: 18,
    },
    {
      id: 'personal-injury',
      name: { en: 'Personal Injury', es: 'Lesiones Personales' },
      slug: { en: 'personal-injury', es: 'lesiones-personales' },
      icon: '🏥',
      postCount: 32,
    },
    {
      id: 'criminal-defense',
      name: { en: 'Criminal Defense', es: 'Defensa Criminal' },
      slug: { en: 'criminal-defense', es: 'defensa-criminal' },
      icon: '⚖️',
      postCount: 28,
    },
  ];

  const relatedPosts = [
    {
      id: 'workplace-injury-settlements',
      title: 'Maximizing Your Workplace Injury Settlement in North Carolina',
      slug: 'workplace-injury-settlements-north-carolina',
      excerpt:
        "Learn how to maximize your workers' compensation settlement in NC, including permanent disability ratings, third-party claims, and negotiation strategies.",
      practiceArea: 'workers-compensation',
      language: 'en' as const,
      publishedAt: new Date('2024-01-18T10:00:00.000Z'),
      readTime: 20,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['Workers Compensation', 'Settlements', 'North Carolina'],
    },
    {
      id: 'denied-workers-comp-claims',
      title: "What to Do When Your Workers' Comp Claim is Denied",
      slug: 'denied-workers-comp-claims-north-carolina',
      excerpt:
        "Complete guide to appealing denied workers' compensation claims in NC, including common denial reasons and strategies for winning appeals.",
      practiceArea: 'workers-compensation',
      language: 'en' as const,
      publishedAt: new Date('2024-01-15T10:00:00.000Z'),
      readTime: 18,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['Denied Claims', 'Workers Compensation Appeals', 'North Carolina'],
    },
    {
      id: 'construction-worker-rights',
      title: 'Construction Worker Rights and Safety in North Carolina',
      slug: 'construction-worker-rights-north-carolina',
      excerpt:
        "Know your rights as a construction worker in NC, including workers' comp benefits, safety protections, and third-party injury claims.",
      practiceArea: 'workers-compensation',
      language: 'en' as const,
      publishedAt: new Date('2024-01-12T10:00:00.000Z'),
      readTime: 16,
      author: DEFAULT_BLOG_AUTHOR,
      tags: ['Construction Workers', 'Workplace Safety', 'Workers Rights'],
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
