import axios from 'axios';

import { logger } from '@/lib/pino-logger';
// GHL API Configuration
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
const GHL_API_URL = process.env.GHL_API_URL || 'https://rest.gohighlevel.com/v1';

// Validate required environment variables
if (!GHL_API_KEY || !GHL_LOCATION_ID) {
  logger.warn(
    'GHL integration disabled: Missing GHL_API_KEY or GHL_LOCATION_ID environment variables'
  );
}

// GHL Contact Interface
export interface GHLContact {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  website?: string;
  timezone?: string;
  dnd?: boolean;
  tags?: string[];
  customFields?: Record<string, string>;
  source?: string;
  locationId?: string;
  contactType?: string;
}

// GHL Opportunity Interface
export interface GHLOpportunity {
  title: string;
  status: string;
  stageId: string;
  pipelineId: string;
  contactId: string;
  monetaryValue?: number;
  assignedTo?: string;
  notes?: string;
}

// GHL SMS Interface
export interface GHLSMSMessage {
  contactId: string;
  message: string;
  mediaUrl?: string;
}

// GHL Call Interface
export interface GHLCall {
  contactId: string;
  phoneNumber: string;
  agentId?: string;
}

/**
 * Create a contact in GoHighLevel
 */
export async function createGHLContact(data: GHLContact): Promise<any> {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    logger.warn('GHL API not configured, skipping contact creation');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const contactData = {
      ...data,
      locationId: data.locationId || GHL_LOCATION_ID,
    };

    const response = await axios.post(`${GHL_API_URL}/contacts/`, contactData, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    });

    logger.info('Successfully created GHL contact:', response.data?.contact?.id);
    return {
      success: true,
      contact: response.data,
      contactId: response.data?.contact?.id,
    };
  } catch (error: any) {
    logger.error('Error creating contact in GHL:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
}

/**
 * Update a contact in GoHighLevel
 */
export async function updateGHLContact(contactId: string, data: Partial<GHLContact>): Promise<any> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping contact update');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await axios.put(`${GHL_API_URL}/contacts/${contactId}`, data, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    logger.info('Successfully updated GHL contact:', contactId);
    return {
      success: true,
      contact: response.data,
    };
  } catch (error: any) {
    logger.error('Error updating contact in GHL:', {
      contactId,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
}

/**
 * Search for contacts in GoHighLevel
 */
export async function searchGHLContacts(query: string): Promise<any> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping contact search');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await axios.get(`${GHL_API_URL}/contacts/`, {
      params: {
        locationId: GHL_LOCATION_ID,
        query,
      },
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
      },
      timeout: 10000,
    });

    return {
      success: true,
      contacts: response.data.contacts || [],
      total: response.data.total || 0,
    };
  } catch (error: any) {
    logger.error('Error searching contacts in GHL:', {
      query,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
}

/**
 * Create an opportunity in GoHighLevel
 */
export async function createGHLOpportunity(data: GHLOpportunity): Promise<any> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping opportunity creation');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await axios.post(`${GHL_API_URL}/opportunities/`, data, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    logger.info('Successfully created GHL opportunity:', response.data?.opportunity?.id);
    return {
      success: true,
      opportunity: response.data,
      opportunityId: response.data?.opportunity?.id,
    };
  } catch (error: any) {
    logger.error('Error creating opportunity in GHL:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
}

/**
 * Send SMS through GoHighLevel
 */
export async function sendGHLSMS(data: GHLSMSMessage): Promise<any> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping SMS send');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await axios.post(
      `${GHL_API_URL}/conversations/messages`,
      {
        type: 'SMS',
        contactId: data.contactId,
        message: data.message,
        mediaUrl: data.mediaUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    logger.info('Successfully sent GHL SMS to contact:', data.contactId);
    return {
      success: true,
      message: response.data,
    };
  } catch (error: any) {
    logger.error('Error sending SMS in GHL:', {
      contactId: data.contactId,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
}

/**
 * Trigger a phone call through GoHighLevel
 */
export async function triggerGHLCall(data: GHLCall): Promise<any> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping call trigger');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    // Note: This endpoint may vary based on your GHL setup and phone system integration
    const response = await axios.post(
      `${GHL_API_URL}/phone/outbound`,
      {
        contactId: data.contactId,
        phoneNumber: data.phoneNumber,
        agentId: data.agentId,
      },
      {
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    logger.info('Successfully triggered GHL call to contact:', data.contactId);
    return {
      success: true,
      call: response.data,
    };
  } catch (error: any) {
    logger.error('Error triggering call in GHL:', {
      contactId: data.contactId,
      phoneNumber: data.phoneNumber,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
}

/**
 * Get contact by ID from GoHighLevel
 */
export async function getGHLContact(contactId: string): Promise<any> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping contact retrieval');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await axios.get(`${GHL_API_URL}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
      },
      timeout: 10000,
    });

    return {
      success: true,
      contact: response.data.contact,
    };
  } catch (error: any) {
    logger.error('Error getting contact from GHL:', {
      contactId,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
}

/**
 * Add tags to a contact in GoHighLevel
 */
export async function addGHLContactTags(contactId: string, tags: string[]): Promise<any> {
  if (!GHL_API_KEY) {
    logger.warn('GHL API not configured, skipping tag addition');
    return { success: false, error: 'GHL API not configured' };
  }

  try {
    const response = await axios.post(
      `${GHL_API_URL}/contacts/${contactId}/tags`,
      { tags },
      {
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    logger.info('Successfully added tags to GHL contact:', contactId);
    return {
      success: true,
      result: response.data,
    };
  } catch (error: any) {
    logger.error('Error adding tags to contact in GHL:', {
      contactId,
      tags,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
}

/**
 * Helper function to determine practice area tags based on form data
 */
export function getPracticeAreaTags(practiceArea?: string, additionalInfo?: string): string[] {
  const tags = ['Website Lead'];

  if (practiceArea) {
    const area = practiceArea.toLowerCase();

    if (area.includes('immigration')) {
      tags.push('Immigration Lead');
    } else if (area.includes('personal injury') || area.includes('accident')) {
      tags.push('Personal Injury Lead');
    } else if (area.includes('workers comp') || area.includes('workplace')) {
      tags.push('Workers Compensation Lead');
    } else if (area.includes('criminal') || area.includes('dui') || area.includes('dwi')) {
      tags.push('Criminal Defense Lead');
    } else if (area.includes('family') || area.includes('divorce')) {
      tags.push('Family Law Lead');
    } else if (area.includes('traffic') || area.includes('ticket')) {
      tags.push('Traffic Law Lead');
    } else {
      tags.push('General Legal Lead');
    }
  }

  // Check for urgency indicators
  if (additionalInfo) {
    const info = additionalInfo.toLowerCase();
    if (info.includes('urgent') || info.includes('emergency') || info.includes('asap')) {
      tags.push('Urgent Lead');
    }
  }

  return tags;
}

/**
 * Test GHL connection and configuration
 */
export async function testGHLConnection(): Promise<any> {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return {
      success: false,
      error: 'Missing GHL_API_KEY or GHL_LOCATION_ID environment variables',
    };
  }

  try {
    const response = await axios.get(`${GHL_API_URL}/locations/${GHL_LOCATION_ID}`, {
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
      },
      timeout: 10000,
    });

    return {
      success: true,
      location: response.data,
      message: 'GHL connection successful',
    };
  } catch (error: any) {
    logger.error('Error testing GHL connection:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
    };
  }
}
