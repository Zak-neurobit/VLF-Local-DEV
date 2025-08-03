# AWS S3 + CloudFront Deployment Guide

This guide will help you deploy the Vasquez Law Firm website (6,562+ static pages) to AWS S3 with CloudFront CDN.

## Prerequisites

1. **AWS Account**: Sign up at https://aws.amazon.com
2. **AWS CLI**: Install from https://aws.amazon.com/cli/
3. **Node.js**: v20+ (already installed)
4. **Sufficient RAM**: 16GB+ recommended for building all pages

## Step 1: Configure AWS CLI

```bash
aws configure
```

Enter your:

- AWS Access Key ID
- AWS Secret Access Key
- Default region: `us-east-1`
- Default output format: `json`

## Step 2: Create S3 Bucket

```bash
# Create bucket (replace with your domain)
aws s3 mb s3://vasquezlawnc.com

# Enable static website hosting
aws s3 website s3://vasquezlawnc.com \
  --index-document index.html \
  --error-document 404.html
```

## Step 3: Create Bucket Policy

Create `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::vasquezlawnc.com/*"
    }
  ]
}
```

Apply the policy:

```bash
aws s3api put-bucket-policy \
  --bucket vasquezlawnc.com \
  --policy file://bucket-policy.json
```

## Step 4: Create CloudFront Distribution

```bash
aws cloudfront create-distribution \
  --origin-domain-name vasquezlawnc.com.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html
```

Save the Distribution ID from the response.

## Step 5: Create Environment File

Create `.env.aws`:

```env
AWS_S3_BUCKET=vasquezlawnc.com
AWS_CLOUDFRONT_DISTRIBUTION_ID=EXAMPLEID123
AWS_REGION=us-east-1
```

## Step 6: Build the Full Static Site

```bash
# First, prepare all pages for static export
npm run prepare:static

# Then build all 6,562+ pages
npm run build:full
```

This will:

- Restore all location pages
- Configure Next.js for static export
- Build all pages with maximum memory allocation
- Show progress and final statistics

## Step 7: Deploy to AWS

```bash
npm run deploy:aws
```

This will:

- Sync all files to S3
- Set appropriate cache headers
- Create CloudFront invalidation
- Show the deployment URL

## Step 8: Configure Custom Domain (Optional)

1. In Route 53, create a hosted zone for vasquezlawnc.com
2. Create an A record pointing to CloudFront
3. Update CloudFront to use the custom domain
4. Add SSL certificate via ACM

## Build & Deploy in One Command

```bash
npm run build:deploy
```

## Cost Estimates

For 6,562 pages (~1GB):

- **S3 Storage**: ~$0.023/month
- **CloudFront**: ~$0.085/GB transferred
- **Total**: < $10/month for moderate traffic

## Monitoring

```bash
# Check S3 bucket size
aws s3 ls s3://vasquezlawnc.com --recursive --summarize

# View CloudFront metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name BytesDownloaded \
  --dimensions Name=DistributionId,Value=YOUR_DISTRIBUTION_ID \
  --start-time 2024-01-01T00:00:00Z \
  --end-time 2024-01-02T00:00:00Z \
  --period 3600 \
  --statistics Sum
```

## Troubleshooting

### Build Fails with Memory Error

Increase Node.js memory in `scripts/build-static-full.js`:

```javascript
NODE_OPTIONS: '--max-old-space-size=65536'; // 64GB
```

### 403 Forbidden Errors

Check bucket policy and CloudFront origin settings.

### Slow Build Times

The full build may take 15-30 minutes. This is normal for 6,562+ pages.

## Next Steps

1. Set up GitHub Actions for automated deployments
2. Configure CloudFront behaviors for optimal caching
3. Add monitoring and alerts
4. Set up staging environment
