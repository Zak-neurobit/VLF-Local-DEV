# GoHighLevel MCP Integration Guide

## ✅ Setup Complete!

The GoHighLevel MCP (Model Context Protocol) server has been configured for your Claude Desktop application.

## 🚀 Quick Start

1. **Restart Claude Desktop** to activate the integration
2. Look for "gohighlevel" in the MCP servers list (bottom of Claude interface)
3. Start using GHL commands directly in Claude!

## 📋 What You Can Do Now

### Contact Management

```
- "Search for contacts with email domain @gmail.com"
- "Show me contacts created in the last 7 days"
- "Update contact John Doe's phone number"
- "Add a tag 'Hot Lead' to contact ID xxx"
```

### Opportunity/Pipeline Management

```
- "Show me all opportunities in the 'New Lead' stage"
- "Move opportunity XYZ to 'Qualified' stage"
- "Create a new opportunity for contact John Smith"
- "List opportunities worth over $5000"
```

### Calendar & Appointments

```
- "Show my appointments for this week"
- "Book an appointment for John Doe next Tuesday at 2pm"
- "Check calendar availability for tomorrow"
```

### Communication

```
- "Send an SMS to contact John Doe"
- "Email all contacts with tag 'Follow Up'"
- "Show recent conversations with contact XYZ"
```

### Automation & Workflows

```
- "Add contact to workflow 'New Client Onboarding'"
- "Remove contact from all workflows"
- "Show active workflow enrollments"
```

## 🔧 Configuration Details

Your MCP configuration is stored at:

```
~/.config/claude/claude_desktop_config.json
```

Current setup:

- **API Key**: pit-074ed...fff (masked for security)
- **Location ID**: bd05Y9SlF1EmxJDB9hvR

## 🔒 Security Notes

1. Your GHL API key is stored locally on your machine
2. Never share your `claude_desktop_config.json` file
3. The API key has full access to your GHL account - treat it like a password

## 🛠️ Troubleshooting

If the integration isn't working:

1. **Check MCP Server Status**
   - Look at the bottom of Claude Desktop
   - "gohighlevel" should show as connected

2. **Verify Credentials**
   - Ensure your API key is still valid in GHL
   - Check Settings > API Keys in your GHL account

3. **Re-run Setup**

   ```bash
   cd /Users/williamvasquez/Documents/VLF\ Website
   node scripts/setup-ghl-mcp.js
   ```

4. **Check Logs**
   - Claude Desktop logs can help diagnose connection issues

## 📚 Advanced Usage

### Bulk Operations

```
- "Update all contacts with tag 'Cold' to tag 'Warm'"
- "Export all contacts from California"
- "Add all recent leads to nurture campaign"
```

### Reporting

```
- "Show conversion rates by pipeline stage"
- "List top performing campaigns"
- "Generate weekly lead summary"
```

### Integration with VLF Website

Now Claude can:

- Sync website leads directly to GHL
- Update contact records based on website activity
- Trigger GHL workflows from website events
- Pull GHL data for website personalization

## 🎯 Best Practices

1. **Use specific queries** - "Show contacts tagged 'Immigration' created this month"
2. **Batch operations** - Process multiple records at once when possible
3. **Test first** - Try operations on single records before bulk changes
4. **Keep context** - Claude remembers your GHL data during the conversation

## 📞 Support

- **GHL MCP Documentation**: https://help.gohighlevel.com/support/solutions/articles/155000005741
- **GHL API Reference**: https://developers.gohighlevel.com/
- **VLF Integration Issues**: Check `/src/services/ghl/` in the codebase

---

_Last updated: December 30, 2024_
_MCP Server Version: Latest from @gohighlevel/mcp-server_
