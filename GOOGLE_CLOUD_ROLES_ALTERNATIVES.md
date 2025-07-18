# Google Cloud IAM Roles - Alternative Names

If you can't find the exact role names, here are the alternatives to look for:

## For Natural Language API:

Try these in order:

1. **"Cloud Natural Language Viewer"** - Read-only access (sufficient)
2. **"Cloud Natural Language Editor"** - Read/write access
3. **"Cloud Natural Language API Editor"** - API specific
4. **"Natural Language User"** - Basic user access

Or search for these keywords:

- "Natural Language"
- "Language"
- "NLP"

## For Translation API:

Try these in order:

1. **"Cloud Translation API Editor"** - Most common
2. **"Cloud Translation API User"** - Basic access
3. **"Translation Editor"** - Simplified name
4. **"Cloud Translation User"** - Alternative name

Or search for:

- "Translation"
- "Translate"

## Complete List of Roles to Add:

1. **Document AI**

   - Look for: "Document AI API User"
   - Role ID: `roles/documentai.apiUser`

2. **Natural Language**

   - Look for: "Cloud Natural Language Viewer" or "Editor"
   - Role ID: `roles/cloudnaturallanguage.viewer`
   - Alternative: `roles/cloudnaturallanguage.editor`

3. **Translation**

   - Look for: "Cloud Translation API Editor"
   - Role ID: `roles/cloudtranslate.editor`
   - Alternative: `roles/cloudtranslate.user`

4. **Storage**

   - Look for: "Storage Object Admin"
   - Role ID: `roles/storage.objectAdmin`

5. **Firestore/Datastore**
   - Look for: "Cloud Datastore User"
   - Role ID: `roles/datastore.user`

## Alternative Approach:

If you still can't find specific roles, you can use these broader roles that include the necessary permissions:

### Option 1: Use Pre-defined Roles

- **"Editor"** - Broad access (includes all APIs)
- **"Cloud API User"** - Access to most cloud APIs

### Option 2: Use Basic Roles for Each Service

Instead of specific API roles, grant these:

- **"Viewer"** for read access
- **"Editor"** for read/write access

For each service (Natural Language, Translation, etc.)

## To Find Roles More Easily:

1. In the role selector, click "Filter"
2. Under "Type", select "Predefined"
3. Under "Service", select:
   - "Cloud Natural Language API"
   - "Cloud Translation API"
   - etc.

This will show only roles for that specific service.

## If All Else Fails:

Grant the **"Editor"** role temporarily to get things working, then refine permissions later. This gives broad access but is less secure than specific roles.
