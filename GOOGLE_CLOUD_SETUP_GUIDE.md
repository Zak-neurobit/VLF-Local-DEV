# Google Cloud Setup Guide for Vasquez Law Firm

## Step-by-Step Instructions with Exact Roles

### Step 1: Create Google Cloud Account

1. Go to https://console.cloud.google.com
2. Sign in with your Google account
3. You'll get $300 free credits for 90 days (no auto-charge)

### Step 2: Create a New Project

1. Click the project dropdown at the top
2. Click "New Project"
3. Name: `vasquez-law-website` (or similar)
4. Click "Create"
5. Wait for project creation (takes ~30 seconds)
6. Make sure the new project is selected in the dropdown

### Step 3: Enable Required APIs

Navigate to **APIs & Services > Library** and enable each of these:

1. **Document AI API**

   - Search for "Document AI"
   - Click on it and press "Enable"
   - Used for: Analyzing legal documents, OCR

2. **Cloud Natural Language API**

   - Search for "Natural Language"
   - Click and enable
   - Used for: Understanding client queries
   - **Note**: If you can't find specific Natural Language roles later, the Editor role will cover this

3. **Cloud Translation API**

   - Search for "Cloud Translation API"
   - Click and enable
   - Used for: Spanish/English translations

4. **Cloud Storage API**

   - Search for "Cloud Storage"
   - Click and enable
   - Used for: Storing documents

5. **Firestore API**

   - Search for "Firestore"
   - Click and enable
   - Used for: Agent memory and learning

6. **Maps JavaScript API** (if not already enabled)
   - Search for "Maps JavaScript API"
   - Click and enable
   - Used for: Office location maps

**Important**: Make sure each API shows "API Enabled" with a green checkmark before proceeding.

### Step 4: Create Service Account

1. Go to **IAM & Admin > Service Accounts**
2. Click **"Create Service Account"**
3. Fill in:
   - **Service account name**: `crewai-agents`
   - **Service account ID**: (auto-fills) `crewai-agents`
   - **Description**: `Service account for CrewAI autonomous agents`
4. Click **"Create and Continue"**

### Step 5: Assign Roles (Simplified Approach)

Since some specific API roles might not be visible, use this simplified approach:

**Option A: Quick Setup (Recommended)**

1. Click **"Add Role"**
2. Search for **"Editor"**
3. Select **"Editor"** role
4. This gives access to all the APIs we need
5. Click **"Continue"**

**Option B: Individual Roles (If Available)**
If you prefer more granular permissions, try to find these:

1. **For Document AI**

   - Search: "Document AI"
   - Select any Document AI related role

2. **For Storage**

   - Search: "Storage Object"
   - Select: "Storage Object Admin" or "Storage Object User"

3. **For Firestore**

   - Search: "Datastore" or "Firestore"
   - Select: "Cloud Datastore User" or similar

4. **For APIs (Natural Language, Translation)**
   - If specific roles aren't showing, the Editor role covers these

**Note**: The "Editor" role is sufficient for all CrewAI functionality. You can always refine permissions later once the APIs are working.

After adding the role(s), click **"Continue"**

### Step 6: Skip Grant Users Access

- Just click **"Done"** (you don't need to grant additional users)

### Step 7: Create and Download JSON Key

1. You'll see your service account listed
2. Click on the email (crewai-agents@your-project.iam.gserviceaccount.com)
3. Go to **"Keys"** tab
4. Click **"Add Key" > "Create new key"**
5. Choose **JSON** format
6. Click **"Create"**
7. The file will download automatically

### Step 8: Configure the Credentials

1. The downloaded file will be named something like `vasquez-law-website-xxxxx.json`
2. Rename it to `google-credentials.json`
3. Move it to your project root: `/Users/williamvasquez/Documents/VLF Website/`
4. The file should look like this:

```json
{
  "type": "service_account",
  "project_id": "vasquez-law-website",
  "private_key_id": "xxxxxxxxxxxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nxxxxxx\n-----END PRIVATE KEY-----\n",
  "client_email": "crewai-agents@vasquez-law-website.iam.gserviceaccount.com",
  "client_id": "xxxxxxxxxxxxx",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

### Step 9: Update Environment Variables

Add these to your `.env.local`:

```env
# Google Cloud Configuration
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
GOOGLE_CLOUD_PROJECT=vasquez-law-website
```

### Step 10: Enable Billing (Required for APIs)

1. Go to **Billing** in the navigation menu
2. Link a billing account (you won't be charged during free trial)
3. Your $300 credits will be used first

### Step 11: Create a Storage Bucket (Optional but Recommended)

1. Go to **Cloud Storage > Buckets**
2. Click **"Create Bucket"**
3. Name: `vasquez-law-documents` (must be globally unique)
4. Location: Choose region closest to your users
5. Storage class: Standard
6. Access control: Uniform
7. Click **"Create"**

### Step 12: Initialize Firestore (For Agent Memory)

1. Go to **Firestore**
2. Click **"Create Database"**
3. Choose **"Native mode"**
4. Select location (same as your bucket region)
5. Click **"Create"**

## Verification Checklist

- [ ] Project created
- [ ] All 6 APIs enabled
- [ ] Service account created with 5 roles
- [ ] JSON key downloaded
- [ ] File renamed to `google-credentials.json`
- [ ] File placed in project root
- [ ] Environment variables updated
- [ ] Billing enabled (free trial active)
- [ ] Storage bucket created (optional)
- [ ] Firestore initialized (optional)

## Cost Estimates

With Google Cloud free tier and $300 credits:

- **Document AI**: 1,000 pages/month free
- **Translation**: 500,000 characters/month free
- **Natural Language**: 5,000 units/month free
- **Storage**: 5GB free
- **Firestore**: 1GB storage, 50K reads/day free

For a law firm website, you'll likely stay within free tier limits.

## Troubleshooting

**"API not enabled" error**:

- Double-check all APIs are enabled in the Library

**"Permission denied" error**:

- Verify all 5 roles are assigned to service account
- Check JSON file is in correct location
- Ensure GOOGLE_APPLICATION_CREDENTIALS path is correct

**"Billing required" error**:

- Enable billing (you have $300 free credits)

## Next Steps

Once configured:

1. Test with: `npx tsx scripts/test-google-cloud.ts`
2. Restart your development server
3. CrewAI agents will now have full Google Cloud capabilities
