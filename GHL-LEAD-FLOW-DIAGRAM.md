# 📊 Lead Flow Diagram - Website to GoHighLevel

## 🎯 Lead Sources & Capture Points

```
┌─────────────────────────────────────────────────────────────┐
│                    VASQUEZ LAW WEBSITE                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📝 Contact Forms          💬 Chat Widget                  │
│  ├── /contact              ├── AI Assistant               │
│  ├── /es/contacto          └── Collects info              │
│  └── Practice area forms                                   │
│                                                             │
│  📱 Phone Calls            📧 Newsletter                   │
│  ├── Click-to-call         └── Footer signup              │
│  └── Tracked numbers                                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
```

## 🔄 Lead Processing Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    LEAD CAPTURE API                         │
│              /api/leads/capture endpoint                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Validate form data                                      │
│  2. Check reCAPTCHA (if enabled)                          │
│  3. Save to database                                       │
│  4. Send to GoHighLevel ──────────────┐                   │
│                                       │                    │
└───────────────────────────────────────┼────────────────────┘
                                        │
                                        ▼
```

## 🚀 GoHighLevel Processing

```
┌─────────────────────────────────────────────────────────────┐
│                     GOHIGHLEVEL                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📌 CONTACT CREATED with Tags:                             │
│  • website-lead                                            │
│  • practice-area-[immigration/personal-injury/etc]         │
│  • language-[en/es]                                        │
│  • urgency-[immediate/soon/planning]                       │
│  • source-[website-form/chat/phone]                        │
│                                                             │
│  🎯 OPPORTUNITY CREATED in Pipeline:                       │
│  • Pipeline: Website Leads                                 │
│  • Stage: New Lead                                         │
│  • Value: Based on practice area                           │
│                                                             │
│  📨 CAMPAIGN TRIGGERED:                                    │
│  • Immigration → Immigration Nurture Campaign              │
│  • Personal Injury → PI Nurture Campaign                  │
│  • Urgent → Immediate Response Campaign                    │
│  • Language-based selection (EN/ES)                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
```

## 📱 Automated Actions

```
┌─────────────────────────────────────────────────────────────┐
│                  IMMEDIATE ACTIONS                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📱 SMS (within 5 minutes):                                │
│  "Thank you for contacting Vasquez Law Firm..."           │
│                                                             │
│  📧 Email (within 10 minutes):                             │
│  Detailed information about their case type                │
│                                                             │
│  🔔 If URGENT:                                             │
│  • SMS to attorney team                                    │
│  • High-priority task created                              │
│  • Expedited follow-up sequence                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Follow-Up Sequences

```
Day 0 (Immediate):
├── SMS: Thank you message
├── Email: Welcome + next steps
└── Internal: Notify team if urgent

Day 1:
├── SMS: Check if they have questions
└── Email: Educational content for their practice area

Day 3:
├── SMS: Offer free consultation
└── Email: Success stories/testimonials

Day 7:
├── Email: Final follow-up
└── Move to long-term nurture

Ongoing:
├── Weekly tips (practice area specific)
├── Monthly newsletter
└── Special offers/updates
```

## 🏷️ Lead Tags Explained

### Practice Area Tags:

- `practice-area-immigration` → Immigration cases
- `practice-area-personalInjury` → Accident/injury cases
- `practice-area-criminal` → Criminal defense
- `practice-area-family` → Divorce/custody
- `practice-area-workersComp` → Workplace injuries
- `practice-area-traffic` → Traffic violations

### Urgency Tags:

- `urgency-immediate` → Need help TODAY
- `urgency-soon` → Within a week
- `urgency-planning` → Future planning

### Language Tags:

- `language-en` → English speaker
- `language-es` → Spanish speaker

### Source Tags:

- `source-website-form` → Form submission
- `source-website-chat` → Chat widget
- `source-phone-call` → Phone lead
- `source-referral` → Referral lead

## 📊 Pipeline Stages

```
Website Leads Pipeline:
│
├── 🆕 New Lead (automatic)
│   └── All leads start here
│
├── 📞 Contacted
│   └── First contact made
│
├── ✅ Qualified
│   └── Good fit for services
│
├── 📅 Appointment Scheduled
│   └── Consultation booked
│
├── 💼 Retained
│   └── Became a client!
│
└── ❌ Lost
    └── Not a fit/chose competitor
```

## 🔍 Tracking & Analytics

### What Gets Tracked:

- Form submissions by page
- Conversion rates by source
- Response times
- Campaign effectiveness
- Lead scores
- Pipeline movement

### Where to View:

1. **GHL Dashboard**: Real-time lead activity
2. **Website API**: `/api/leads/capture` (GET)
3. **GHL Reports**: Campaign performance
4. **Opportunities**: Pipeline analytics

## 🚨 Special Workflows

### Urgent Lead (Immediate Need):

```
Form Marked "Urgent"
    ↓
Tagged: urgency-immediate
    ↓
Triggers: Urgent Response Campaign
    ↓
Actions:
• SMS to lead in <2 minutes
• SMS to on-call attorney
• Create high-priority task
• Schedule callback within 1 hour
```

### Spanish Speaker:

```
Form in Spanish (/es/contacto)
    ↓
Tagged: language-es
    ↓
Triggers: Spanish campaign variant
    ↓
All communications in Spanish
```

### High-Value Lead (Personal Injury):

```
Personal Injury Form
    ↓
Tagged: practice-area-personalInjury
    ↓
Higher lead score assigned
    ↓
Attorney notified immediately
    ↓
Specialized PI campaign
```

## ✅ Success Metrics

- **Response Time**: <5 minutes (target: <2 min)
- **Contact Rate**: 80%+ within 24 hours
- **Conversion Rate**: Track by source/campaign
- **ROI**: Revenue per lead source

---

**Remember**: Every lead costs money to acquire. Fast response = higher conversion!
