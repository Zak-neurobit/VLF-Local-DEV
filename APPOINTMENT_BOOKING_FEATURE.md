# Appointment Booking Feature - Chatbot Integration

## Overview

The appointment booking feature has been successfully integrated into the existing chatbot with GHL (GoHighLevel) support. This allows users to schedule appointments directly through the chat interface.

## Features

### 1. Automatic Intent Detection

The chatbot automatically detects when users want to schedule an appointment by recognizing keywords like:

- English: "appointment", "schedule", "consultation", "meeting", "book"
- Spanish: "cita", "agendar", "consulta", "reunión", "reservar"

### 2. Conversation Flow

The booking process follows a natural conversation flow:

1. **Contact Information Collection**
   - First name
   - Last name
   - Email address
   - Phone number

2. **Practice Area Selection**
   - Immigration
   - Personal Injury
   - Criminal Defense
   - Family Law
   - Workers Compensation

3. **Slot Selection**
   - Shows 3 available time slots
   - User can select by number (1, 2, or 3)
   - Can request more options if needed

4. **Confirmation**
   - Appointment is booked in GHL
   - Confirmation number provided
   - SMS/Email notifications sent

### 3. GHL Integration

- Creates or updates contact in GHL
- Books appointment in GHL calendar
- Adds contact to Main Pipeline (New Leads stage)
- Sends confirmation via SMS
- Creates opportunity for tracking

### 4. Multi-language Support

- Full support for English and Spanish
- Automatic language detection based on user preference
- All prompts and confirmations in user's preferred language

## Usage Examples

### English Example

```
User: "I need to schedule an appointment for immigration consultation"
Bot: "To schedule your appointment, I'll need some information first. What is your first name?"
User: "John"
Bot: "Thank you John. What is your last name?"
... (continues through the flow)
```

### Spanish Example

```
User: "Necesito agendar una cita para consulta de inmigración"
Bot: "Para agendar su cita, primero necesito algunos datos. ¿Cuál es su nombre?"
User: "Juan"
Bot: "Gracias Juan. ¿Cuál es su apellido?"
... (continues through the flow)
```

## Technical Implementation

### Components

1. **Chat API Enhancement** (`/api/chat/route.ts`)
   - Integrated appointment booking handler
   - Maintains conversation state in session

2. **Appointment Booking Handler** (`/lib/chat/appointment-booking-handler.ts`)
   - Intent parsing
   - Conversation flow management
   - GHL API integration
   - Slot availability checking

3. **Chat Widget Updates** (`/components/ChatWidget/EnhancedChatWidget.tsx`)
   - Visual feedback for booking process
   - Confirmation display
   - Quick action button for scheduling

4. **GHL Service Integration** (`/services/gohighlevel/index.ts`)
   - Calendar slot fetching
   - Appointment creation
   - Contact management
   - SMS notifications

## Configuration Requirements

### Environment Variables

```env
GHL_API_KEY=your_ghl_api_key
GHL_LOCATION_ID=your_location_id
GHL_CALENDAR_ID=your_calendar_id
GHL_MAIN_PIPELINE_ID=your_pipeline_id
GHL_NEW_LEADS_STAGE_ID=your_stage_id
```

### Testing

Test endpoint available at: `/api/appointment/test-booking`

```bash
# Test the integration
node test-appointment-booking.js
```

## Future Enhancements

1. **Calendar Widget Integration**
   - Visual calendar for slot selection
   - Real-time availability updates

2. **Rescheduling/Cancellation**
   - Allow users to modify appointments
   - Automated reminders

3. **Attorney Selection**
   - Let users choose specific attorneys
   - Show attorney specializations

4. **Document Upload**
   - Allow document submission during booking
   - Automatic case file creation

5. **Payment Integration**
   - Collect consultation fees
   - Payment plan options

## Troubleshooting

### Common Issues

1. **GHL API Errors**: Ensure all environment variables are configured
2. **No Available Slots**: Check calendar configuration in GHL
3. **SMS Not Sending**: Verify GHL SMS credits and configuration

### Mock Mode

When GHL is not configured, the system uses mock data for testing:

- Generates sample available slots
- Simulates booking confirmation
- Returns test confirmation numbers
