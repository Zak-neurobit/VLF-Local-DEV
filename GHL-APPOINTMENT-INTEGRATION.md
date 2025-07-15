# GoHighLevel Appointment Integration Guide

## Overview

The appointment scheduling system now integrates directly with GoHighLevel (GHL) calendar and CRM. When appointments are booked through the AI assistant, the system will:

1. **Create/Update Contact** in GHL with client information
2. **Add to Main Pipeline** in the "New Leads" stage
3. **Book Appointment** in the GHL calendar
4. **Store Locally** for tracking and analytics

## Required Environment Variables

Add these to your `.env` file:

```bash
# GoHighLevel Integration
GHL_API_KEY="your_ghl_api_key_here"
GHL_LOCATION_ID="your_ghl_location_id_here"
GHL_CALENDAR_ID="your_ghl_calendar_id_here"
GHL_MAIN_PIPELINE_ID="your_main_pipeline_id_here"
GHL_NEW_LEADS_STAGE_ID="your_new_leads_stage_id_here"
GHL_DEFAULT_USER_ID="your_default_user_id_here"
```

## Getting GHL Credentials

### 1. API Key

- Go to Settings → Company → Agency Settings → Apps & Integrations
- Create a new API key with the following permissions:
  - Contacts: Read, Write
  - Calendars: Read, Write
  - Opportunities: Read, Write
  - Appointments: Read, Write

### 2. Location ID

- Go to Settings → Company → Locations
- Copy the Location ID from your law firm's location

### 3. Calendar ID

- Go to Settings → Calendars
- Find your main appointment calendar
- Copy the Calendar ID

### 4. Pipeline & Stage IDs

- Go to CRM → Pipelines
- Open your "Main Pipeline"
- Click on the "New Leads" stage
- Copy both the Pipeline ID and Stage ID from the URL

### 5. Default User ID

- Go to Settings → Users
- Find the user who should receive appointment assignments
- Copy the User ID

## Integration Workflow

### When an Appointment is Booked:

1. **Contact Creation/Update**:

   ```javascript
   // Creates contact with tags and custom fields
   {
     firstName: "John",
     lastName: "Doe",
     email: "john@example.com",
     phone: "+1234567890",
     tags: ["immigration", "consultation", "English Speaker", "Regular"],
     customFields: {
       practice_area: "immigration",
       appointment_type: "consultation",
       preferred_language: "en",
       consultation_notes: "Needs help with green card application",
       lead_source: "AI Assistant Booking"
     }
   }
   ```

2. **Pipeline Assignment**:

   - Creates opportunity in Main Pipeline
   - Sets stage to "New Leads"
   - Adds $500 monetary value (default consultation)
   - Assigns to default user

3. **Calendar Booking**:

   - Books appointment at selected time
   - Assigns to specific attorney
   - Includes client information and notes
   - Sends notifications to both client and attorney

4. **Local Storage**:
   - Stores appointment in local database
   - Links to GHL contact and appointment IDs
   - Tracks status and metadata

## Updated API Usage

### Booking an Appointment

The appointment booking now requires client information:

```javascript
const appointmentData = {
  userId: 'user123',
  practiceArea: 'immigration',
  appointmentType: 'consultation',
  duration: 60,
  isUrgent: false,
  language: 'en',
  location: 'virtual',
  notes: 'Client needs help with green card application',
  clientInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    source: 'Website Chat',
  },
};

// API call
const response = await fetch('/api/crewai/appointment-scheduling', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'book-appointment',
    ...appointmentData,
    slot: {
      date: '2024-01-15',
      time: '10:00 AM',
      attorneyId: '1',
      attorneyName: 'William Vasquez',
      location: 'Charlotte, NC Office',
    },
  }),
});
```

### Response Format

```javascript
{
  "success": true,
  "confirmationNumber": "appointment_123",
  "ghlContactId": "contact_456",
  "message": "Appointment successfully booked in GoHighLevel calendar and contact added to Main Pipeline",
  "appointmentDetails": {
    "date": "2024-01-15",
    "time": "10:00 AM",
    "attorney": "William Vasquez",
    "location": "Charlotte, NC Office",
    "clientName": "John Doe",
    "practiceArea": "immigration"
  }
}
```

## Error Handling

The system includes robust error handling:

- **GHL API Failures**: Falls back to local booking only
- **Duplicate Contacts**: Updates existing contact instead of creating new
- **Calendar Conflicts**: Checks availability before booking
- **Invalid Credentials**: Logs errors and provides clear error messages

## Testing

To test the integration:

1. Ensure all environment variables are set
2. Use the appointment booking API with valid client information
3. Check GHL for:
   - New contact with proper tags/fields
   - Opportunity in Main Pipeline → New Leads
   - Appointment in calendar

## Troubleshooting

### Common Issues

1. **"GHL API credentials not configured"**

   - Check that all GHL environment variables are set
   - Verify API key has correct permissions

2. **"Failed to create contact in CRM"**

   - Check API key permissions for Contacts
   - Verify Location ID is correct

3. **"Failed to schedule appointment in calendar"**

   - Check Calendar ID is correct
   - Verify API key has Calendar permissions
   - Ensure selected time slot is available

4. **"Pipeline assignment failed"**
   - Check Pipeline and Stage IDs
   - Verify API key has Opportunities permissions

### Logs

Check the application logs for detailed error information:

- All GHL API calls are logged with request/response details
- Failed operations include specific error messages
- Successful bookings log all GHL IDs for tracking

## Benefits

This integration provides:

✅ **Unified CRM**: All leads automatically in GHL
✅ **Automated Pipeline**: Leads enter sales process immediately  
✅ **Calendar Sync**: No double-booking or missed appointments
✅ **Contact Enrichment**: Detailed client information and preferences
✅ **Lead Tracking**: Complete audit trail from AI chat to closed case
✅ **Notification System**: Both client and attorney get confirmations

The appointment system now fully integrates your AI assistant with your existing business processes in GoHighLevel!
