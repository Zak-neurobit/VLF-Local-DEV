# Vercel Environment Variables - Ready to Copy

Copy and paste these into your Vercel project settings:

## Database

```
DATABASE_URL=postgresql://neondb_owner:npg_eCqcU6ELgvJ5@ep-old-mode-a4bj2csn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Authentication

```
NEXTAUTH_SECRET=dx2Y3dHnLOIZAgxlED+w4tqHMV5dF+bzsuPQJreAtkE=
NEXTAUTH_URL=https://vasquezlawfirm.com
```

## AI Services

```
OPENAI_API_KEY=sk-proj-UHlHyfBMqu-xJuNLlrKqmv3Cc_w1lK1ntoKC5u0i_NGo1xxZjFd-JXMhqTFd9YlmVS7TPlH82oT3BlbkFJjJ5-_ggs2fothBDwg0f63CjVsdOGye-UqXbCMdQro2sVkfr-9gPBYYjmkVZx26HsVn9WWw40A
```

## Voice Agent (Retell AI)

```
RETELL_API_KEY=2996bc9f-ca4e-422a-b64e-a09a3eaa9bc0
```

## GoHighLevel Integration

```
GHL_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6ImJkMDVZOVNsRjFFbXhKREI5aHZSIiwiY29tcGFueV9pZCI6InpFdkR3a0xBbzNCM1F4R3F3QUFkIiwidmVyc2lvbiI6MSwiaWF0IjoxNzExMDM1ODE0NDA3LCJzdWIiOiJ1c2VyX2lkIn0.hDnaMa6pU5dDUy9oq8DJfUJnWt54jd7rmUHAvbCUiGs
GHL_LOCATION_ID=bd05Y9SlF1EmxJDB9hvR
```

## How to Add to Vercel:

1. Go to: https://vercel.com/dashboard
2. Select your project: `vlf-website-fresh`
3. Click "Settings" → "Environment Variables"
4. For each variable above:
   - Name: The variable name (e.g., DATABASE_URL)
   - Value: Copy the entire value
   - Environment: Select all (Production, Preview, Development)
   - Click "Save"

## Important Security Notes:

- These are sensitive credentials - keep this file secure
- Delete this file after adding to Vercel
- Never commit these values to Git
- Consider rotating these keys periodically

## After Adding Variables:

1. Trigger a new deployment in Vercel
2. Check the deployment logs for any errors
3. Test the live site functionality
