// Mock GoHighLevel service for local testing
import { NextRequest } from 'next/server';

interface GHLContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tags: string[];
  customFields: Record<string, any>;
  dateAdded: string;
  lastActivity: string;
}

interface GHLConversation {
  id: string;
  contactId: string;
  type: 'SMS' | 'Email' | 'Call';
  direction: 'inbound' | 'outbound';
  message: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  dateAdded: string;
}

interface GHLPipeline {
  id: string;
  name: string;
  stages: Array<{
    id: string;
    name: string;
    order: number;
  }>;
}

interface GHLOpportunity {
  id: string;
  contactId: string;
  pipelineId: string;
  stageId: string;
  name: string;
  value: number;
  status: 'open' | 'won' | 'lost' | 'abandoned';
  dateAdded: string;
}

class GHLMockService {
  private contacts: Map<string, GHLContact> = new Map();
  private conversations: Map<string, GHLConversation> = new Map();
  private pipelines: Map<string, GHLPipeline> = new Map();
  private opportunities: Map<string, GHLOpportunity> = new Map();

  constructor() {
    // Initialize with default pipeline
    this.pipelines.set('pipeline-1', {
      id: 'pipeline-1',
      name: 'Legal Services Pipeline',
      stages: [
        { id: 'stage-1', name: 'New Lead', order: 1 },
        { id: 'stage-2', name: 'Consultation Scheduled', order: 2 },
        { id: 'stage-3', name: 'Consultation Completed', order: 3 },
        { id: 'stage-4', name: 'Retained', order: 4 },
        { id: 'stage-5', name: 'Case Active', order: 5 },
        { id: 'stage-6', name: 'Case Closed', order: 6 },
      ],
    });

    // Initialize with test contacts
    this.createContact({
      firstName: 'Test',
      lastName: 'Client',
      email: 'test@example.com',
      phone: '+17045551234',
      tags: ['immigration', 'consultation-requested'],
    });
  }

  // Contact Management
  async createContact(data: Partial<GHLContact>): Promise<GHLContact> {
    const contact: GHLContact = {
      id: `contact-${Date.now()}`,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      tags: data.tags || [],
      customFields: data.customFields || {},
      dateAdded: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
    };

    this.contacts.set(contact.id, contact);
    return contact;
  }

  async getContact(contactId: string): Promise<GHLContact | null> {
    return this.contacts.get(contactId) || null;
  }

  async updateContact(contactId: string, data: Partial<GHLContact>): Promise<GHLContact | null> {
    const contact = this.contacts.get(contactId);
    if (!contact) return null;

    const updatedContact = {
      ...contact,
      ...data,
      id: contactId,
      lastActivity: new Date().toISOString(),
    };
    this.contacts.set(contactId, updatedContact);
    return updatedContact;
  }

  async listContacts(filters?: { tag?: string }): Promise<GHLContact[]> {
    let contacts = Array.from(this.contacts.values());

    if (filters?.tag) {
      contacts = contacts.filter(c => c.tags.includes(filters.tag!));
    }

    return contacts;
  }

  // Conversation Management
  async sendSMS(data: { contactId: string; message: string }): Promise<GHLConversation> {
    const conversation: GHLConversation = {
      id: `conv-${Date.now()}`,
      contactId: data.contactId,
      type: 'SMS',
      direction: 'outbound',
      message: data.message,
      status: 'sent',
      dateAdded: new Date().toISOString(),
    };

    this.conversations.set(conversation.id, conversation);

    // Simulate delivery
    setTimeout(() => {
      const conv = this.conversations.get(conversation.id);
      if (conv) {
        conv.status = 'delivered';
        this.conversations.set(conversation.id, conv);
      }
    }, 1000);

    return conversation;
  }

  async sendEmail(data: {
    contactId: string;
    subject: string;
    body: string;
  }): Promise<GHLConversation> {
    const conversation: GHLConversation = {
      id: `conv-${Date.now()}`,
      contactId: data.contactId,
      type: 'Email',
      direction: 'outbound',
      message: `Subject: ${data.subject}\n\n${data.body}`,
      status: 'sent',
      dateAdded: new Date().toISOString(),
    };

    this.conversations.set(conversation.id, conversation);
    return conversation;
  }

  async getConversations(contactId: string): Promise<GHLConversation[]> {
    return Array.from(this.conversations.values())
      .filter(c => c.contactId === contactId)
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
  }

  // Opportunity Management
  async createOpportunity(data: {
    contactId: string;
    name: string;
    value?: number;
    pipelineId?: string;
    stageId?: string;
  }): Promise<GHLOpportunity> {
    const opportunity: GHLOpportunity = {
      id: `opp-${Date.now()}`,
      contactId: data.contactId,
      pipelineId: data.pipelineId || 'pipeline-1',
      stageId: data.stageId || 'stage-1',
      name: data.name,
      value: data.value || 0,
      status: 'open',
      dateAdded: new Date().toISOString(),
    };

    this.opportunities.set(opportunity.id, opportunity);
    return opportunity;
  }

  async updateOpportunity(
    oppId: string,
    data: Partial<GHLOpportunity>
  ): Promise<GHLOpportunity | null> {
    const opp = this.opportunities.get(oppId);
    if (!opp) return null;

    const updatedOpp = { ...opp, ...data, id: oppId };
    this.opportunities.set(oppId, updatedOpp);
    return updatedOpp;
  }

  async getOpportunities(contactId?: string): Promise<GHLOpportunity[]> {
    let opps = Array.from(this.opportunities.values());

    if (contactId) {
      opps = opps.filter(o => o.contactId === contactId);
    }

    return opps;
  }

  // Webhook simulation
  async sendWebhook(event: any): Promise<void> {
    console.log('[GHL Mock] Webhook event:', event);
  }

  // Automation triggers
  async triggerWorkflow(workflowId: string, contactId: string): Promise<void> {
    console.log(`[GHL Mock] Triggering workflow ${workflowId} for contact ${contactId}`);

    // Simulate workflow actions
    if (workflowId === 'new-lead-nurture') {
      await this.sendSMS({
        contactId,
        message:
          'Thank you for contacting Vasquez Law Firm. We will review your inquiry and get back to you within 24 hours.',
      });

      await this.sendEmail({
        contactId,
        subject: 'Welcome to Vasquez Law Firm',
        body: 'Thank you for your interest in our legal services. Our team is reviewing your inquiry...',
      });
    }
  }
}

// Singleton instance
export const ghlMock = new GHLMockService();

// Express-like handler for API routes
export function handleGHLMockRequest(req: NextRequest, pathname: string) {
  const method = req.method;
  const parts = pathname.replace('/api/ghl/', '').split('/');

  if (parts[0] === 'contacts') {
    if (method === 'GET' && parts.length === 1) {
      const tag = new URL(req.url).searchParams.get('tag');
      return ghlMock.listContacts(tag ? { tag } : undefined);
    }
    if (method === 'GET' && parts.length === 2) {
      return ghlMock.getContact(parts[1]!);
    }
    if (method === 'POST' && parts.length === 1) {
      return req.json().then(data => ghlMock.createContact(data));
    }
    if (method === 'PUT' && parts.length === 2) {
      return req.json().then(data => ghlMock.updateContact(parts[1]!, data));
    }
  }

  if (parts[0] === 'conversations') {
    if (method === 'GET' && parts.length === 1) {
      const contactId = new URL(req.url).searchParams.get('contactId');
      return contactId ? ghlMock.getConversations(contactId) : [];
    }
    if (method === 'POST' && parts[1] === 'sms') {
      return req.json().then(data => ghlMock.sendSMS(data));
    }
    if (method === 'POST' && parts[1] === 'email') {
      return req.json().then(data => ghlMock.sendEmail(data));
    }
  }

  if (parts[0] === 'opportunities') {
    if (method === 'GET' && parts.length === 1) {
      const contactId = new URL(req.url).searchParams.get('contactId');
      return ghlMock.getOpportunities(contactId || undefined);
    }
    if (method === 'POST' && parts.length === 1) {
      return req.json().then(data => ghlMock.createOpportunity(data));
    }
    if (method === 'PUT' && parts.length === 2) {
      return req.json().then(data => ghlMock.updateOpportunity(parts[1]!, data));
    }
  }

  if (
    parts[0] === 'workflows' &&
    method === 'POST' &&
    parts.length === 3 &&
    parts[2] === 'trigger'
  ) {
    return req.json().then(data => ghlMock.triggerWorkflow(parts[1]!, data.contactId));
  }

  return null;
}
