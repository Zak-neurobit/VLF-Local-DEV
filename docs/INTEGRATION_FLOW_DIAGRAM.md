# Retell-GoHighLevel Integration Flow Diagram

## Architecture Overview

```mermaid
graph TB
    subgraph "Website"
        A[Contact Form] --> B[Lead Capture API]
        C[Chat Widget] --> B
        D[Phone Call] --> E[Retell Voice Agent]
    end
    
    subgraph "GoHighLevel"
        F[Contact Database]
        G[Campaigns]
        H[SMS System]
        I[Pipeline Management]
        J[Calendar System]
        K[Task Management]
    end
    
    subgraph "Retell AI"
        L[Voice Agents]
        M[Call Processing]
        N[Speech Recognition]
        O[AI Response Engine]
        P[Call Analytics]
    end
    
    subgraph "VLF Backend"
        Q[GHL Service]
        R[Retell Service]
        S[Database]
        T[Webhook Handlers]
        U[Agent Manager]
    end
    
    subgraph "Integration Endpoints"
        V[/api/ghl/trigger-call]
        W[/api/ghl/send-sms]
        X[/api/webhooks/retell]
        Y[/api/webhooks/ghl]
    end
    
    %% Lead Flow
    B --> F
    F --> G
    G --> V
    
    %% Voice Call Flow
    V --> R
    R --> L
    L --> M
    M --> N
    N --> O
    O --> P
    P --> X
    X --> Q
    Q --> F
    
    %% SMS Flow
    Q --> W
    W --> H
    H --> F
    
    %% Task Creation
    Q --> K
    
    %% Appointment Scheduling
    Q --> J
    
    %% Data Storage
    R --> S
    Q --> S
    T --> S
```

## Detailed Call Flow

```mermaid
sequenceDiagram
    participant Website as Website Form
    participant GHL as GoHighLevel
    participant Backend as VLF Backend
    participant Retell as Retell AI
    participant DB as Database
    
    Note over Website, DB: 1. Lead Capture & Initial Processing
    Website->>GHL: Submit contact form
    GHL->>GHL: Create/update contact
    GHL->>GHL: Trigger voice call campaign
    
    Note over Website, DB: 2. Voice Call Initiation
    GHL->>Backend: POST /api/ghl/trigger-call
    Backend->>Backend: Validate payload
    Backend->>Backend: Select appropriate agent
    Backend->>Retell: Create phone call
    Backend->>DB: Log call initiation
    Backend->>GHL: Update contact with call info
    Backend->>GHL: Add note about call
    
    Note over Website, DB: 3. Call Execution
    Retell->>Retell: Dial contact
    Retell->>Retell: Connect to voice agent
    Retell->>Retell: Process conversation
    Retell->>Retell: Generate transcript
    
    Note over Website, DB: 4. Call Completion & Analysis
    Retell->>Backend: POST /api/webhooks/retell (call_ended)
    Backend->>DB: Update call status
    Backend->>Backend: Analyze call outcome
    Backend->>GHL: Update contact with results
    Backend->>GHL: Add detailed call notes
    
    Note over Website, DB: 5. Follow-up Actions
    alt Call Connected Successfully
        Backend->>Backend: POST /api/ghl/send-sms (post-call)
        Backend->>GHL: Send thank you SMS
        Backend->>GHL: Create follow-up task
    else Voicemail Left
        Backend->>GHL: Trigger voicemail follow-up campaign
    else No Answer
        Backend->>GHL: Schedule callback task
    end
    
    Note over Website, DB: 6. Appointment Scheduling (if applicable)
    alt Appointment Requested
        Backend->>GHL: Create calendar event
        Backend->>GHL: Send appointment confirmation SMS
        Backend->>GHL: Set up reminder campaign
    end
```

## SMS Coordination Flow

```mermaid
flowchart TD
    A[SMS Trigger Event] --> B{Trigger Type}
    
    B --> C[Post-Call SMS]
    B --> D[Appointment Reminder]
    B --> E[Follow-up Sequence]
    B --> F[Custom Message]
    
    C --> G[Get Contact Info]
    D --> G
    E --> G
    F --> G
    
    G --> H[Select Template]
    H --> I[Replace Variables]
    I --> J[Send via GHL]
    J --> K[Log in Database]
    K --> L[Update Contact]
    L --> M[Create Follow-up Task if needed]
    
    subgraph "Template Variables"
        N[firstName, lastName]
        O[practiceArea]
        P[attorneyName]
        Q[appointmentDate/Time]
        R[Custom Metadata]
    end
    
    I -.-> N
    I -.-> O
    I -.-> P
    I -.-> Q
    I -.-> R
```

## Agent Selection Logic

```mermaid
flowchart TD
    A[Incoming Call Request] --> B{Practice Area Specified?}
    
    B -->|Yes| C{Language Preference}
    B -->|No| D[Use General Agent]
    
    C -->|English| E[Practice Area Agent EN]
    C -->|Spanish| F[Practice Area Agent ES]
    C -->|Not Specified| G[Detect from Contact Profile]
    
    G --> H{Contact Language in GHL}
    H -->|Spanish| F
    H -->|English or Unknown| E
    
    E --> I[Immigration Agent EN]
    E --> J[Personal Injury Agent EN]
    E --> K[Criminal Defense Agent EN]
    E --> L[General Agent EN]
    
    F --> M[Immigration Agent ES]
    F --> N[General Agent ES]
    
    I --> O[Load Agent Configuration]
    J --> O
    K --> O
    L --> O
    M --> O
    N --> O
    D --> O
    
    O --> P[Create Retell Call]
```

## Database Interaction Patterns

```mermaid
erDiagram
    VoiceCall ||--o{ SmsLog : "triggers"
    VoiceCall ||--o{ Task : "creates"
    VoiceCall }o--|| Contact : "belongs to"
    
    VoiceCall {
        string id PK
        string retellCallId UK
        string ghlContactId FK
        string agentId
        string status
        string outcome
        json metadata
    }
    
    SmsLog {
        string id PK
        string ghlContactId FK
        string relatedCallId FK
        string triggerType
        string status
        json metadata
    }
    
    Contact {
        string id PK
        string phone UK
        string email
        string name
        boolean smsOptIn
        json metadata
    }
    
    Task {
        string id PK
        string relatedCallId FK
        string title
        string type
        string priority
        datetime dueDate
    }
```

## Error Handling & Fallbacks

```mermaid
flowchart TD
    A[API Request] --> B{Request Valid?}
    
    B -->|No| C[Return 400 Error]
    B -->|Yes| D[Process Request]
    
    D --> E{External API Call}
    
    E -->|Success| F[Update Database]
    E -->|Network Error| G[Retry Logic]
    E -->|Auth Error| H[Log & Alert]
    E -->|Rate Limited| I[Queue for Later]
    
    G --> J{Retry Count < 3?}
    J -->|Yes| K[Wait & Retry]
    J -->|No| L[Log Failure]
    
    K --> E
    
    F --> M[Return Success]
    H --> N[Return 500 Error]
    I --> O[Return 202 Accepted]
    L --> N
    
    N --> P[Create Support Task]
    P --> Q[Send Admin Alert]
```

## Integration Health Monitoring

```mermaid
graph LR
    subgraph "Monitoring Points"
        A[API Response Times]
        B[Webhook Delivery Status]
        C[Call Success Rates]
        D[SMS Delivery Rates]
        E[Database Performance]
        F[Error Frequencies]
    end
    
    subgraph "Alerting System"
        G[Email Alerts]
        H[Slack Notifications]
        I[Dashboard Warnings]
        J[PagerDuty Integration]
    end
    
    subgraph "Actions"
        K[Auto-Retry Failed Calls]
        L[Failover to Backup Systems]
        M[Scale Resources]
        N[Manual Intervention]
    end
    
    A --> G
    B --> H
    C --> I
    D --> G
    E --> J
    F --> I
    
    G --> K
    H --> L
    I --> M
    J --> N
```

## Practice Area Routing

```mermaid
flowchart LR
    A[Contact] --> B{Tags Analysis}
    
    B --> C[Immigration Tags]
    B --> D[Personal Injury Tags]
    B --> E[Criminal Defense Tags]
    B --> F[Family Law Tags]
    B --> G[Workers Comp Tags]
    B --> H[General/Unknown]
    
    C --> I[Immigration Agent]
    D --> J[Personal Injury Agent]
    E --> K[Criminal Defense Agent]
    F --> L[Family Law Agent]
    G --> M[Workers Comp Agent]
    H --> N[General Reception Agent]
    
    subgraph "Tag Examples"
        O[immigration, visa, green-card]
        P[accident, injury, medical]
        Q[arrest, DUI, criminal]
        R[divorce, custody, family]
        S[workplace, injury, workers]
    end
    
    C -.-> O
    D -.-> P
    E -.-> Q
    F -.-> R
    G -.-> S
```

## Campaign Trigger Mapping

```mermaid
graph TB
    subgraph "Lead Sources"
        A[Website Form]
        B[Chat Widget]
        C[Phone Inquiry]
        D[Referral]
        E[Social Media]
    end
    
    subgraph "GHL Campaigns"
        F[Hot Lead Campaign]
        G[Warm Lead Campaign]
        H[Cold Lead Campaign]
        I[Emergency Campaign]
        J[Follow-up Campaign]
    end
    
    subgraph "Voice Call Types"
        K[Immediate Consultation]
        L[Scheduled Callback]
        M[Follow-up Check]
        N[Appointment Reminder]
        O[Emergency Response]
    end
    
    A --> F
    B --> F
    C --> I
    D --> G
    E --> H
    
    F --> K
    G --> L
    H --> M
    I --> O
    J --> M
```

This integration architecture provides a comprehensive solution for connecting GoHighLevel's CRM and campaign management with Retell AI's voice capabilities, creating a seamless flow from lead capture to voice engagement to follow-up automation.