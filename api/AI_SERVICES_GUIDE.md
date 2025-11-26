# AI Services Setup and Configuration

This document provides comprehensive setup instructions for the AI features in your CV application.

## Features Overview

Your application includes three powerful AI services:

1. **CV Parser** (`/api/parse-cv`) - Extracts structured data from CV text or LinkedIn profiles
2. **Text Rewriter** (`/api/rewrite`) - Enhances CV content with professional, ATS-friendly language
3. **Contact Handler** (`/api/contact`) - Manages contact form submissions with email notifications

## Environment Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key_here

# Optional: Rate limiting and monitoring
RATE_LIMIT_ENABLED=true
MAX_REQUESTS_PER_MINUTE=60
```

## API Keys Setup

### 1. OpenAI API Key
1. Visit [OpenAI API Dashboard](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add billing information (required for GPT-4o-mini)
4. Set usage limits for cost control

**Recommended Settings:**
- Model: `gpt-4o-mini` (cost-effective, high-quality)
- Monthly limit: $20-50 for moderate usage
- Rate limits: 500 requests/day for development

### 2. Resend API Key (for contact forms)
1. Visit [Resend Dashboard](https://resend.com)
2. Create account and verify domain (for production)
3. Generate API key
4. For development, you can use `re_123` as test key

## Model Configuration

The application uses optimized models for each service:

### CV Parser
- **Model**: `gpt-4o-mini`
- **Purpose**: Accurate data extraction from unstructured text
- **Temperature**: 0.1 (consistent parsing)
- **Max Tokens**: 2500 (comprehensive extraction)

### Text Rewriter
- **Model**: `gpt-4o-mini`
- **Purpose**: Professional content enhancement
- **Temperature**: 0.7 (balanced creativity/consistency)
- **Max Tokens**: 800 (detailed improvements)

## Frontend Integration

### CV Upload and Parsing
```typescript
import { parseTextToCV, parseURLToCV } from '../utils/aiParser';

// Parse file content
const cvData = await parseTextToCV(extractedText);

// Parse LinkedIn URL
const cvData = await parseURLToCV(linkedinUrl);
```

### AI Text Enhancement
```typescript
import { rewriteWithAI } from '../utils/aiRewrite';

// Enhance text with context
const enhanced = await rewriteWithAI(originalText, 'experience');
```

## Error Handling

The services include comprehensive error handling:

### Rate Limiting
- **429 responses**: Automatic retry with backoff
- **Frontend**: Graceful degradation with user feedback

### Content Validation
- **Input validation**: Length limits, format checks
- **Output validation**: Schema compliance for parsed data

### Network Issues
- **Timeouts**: 30s for parsing, 15s for rewriting
- **Retries**: Automatic retry for transient failures

## Performance Optimization

### Caching Strategy
- Implement Redis cache for repeated requests
- Cache parsed CV data for 1 hour
- Cache rewritten content for 24 hours

### Request Optimization
```typescript
// Debounce user input for rewrite requests
const debouncedRewrite = useMemo(
  () => debounce(rewriteWithAI, 1000),
  []
);
```

## Security Best Practices

1. **API Key Protection**
   - Never expose keys in frontend code
   - Use environment variables only
   - Rotate keys regularly

2. **Input Sanitization**
   - Validate all user inputs
   - Limit request sizes
   - Filter potentially harmful content

3. **Rate Limiting**
   - Implement per-user limits
   - Monitor unusual usage patterns
   - Block suspicious requests

## Monitoring and Analytics

### Key Metrics to Track
- **Usage**: Requests per day/user
- **Performance**: Response times, error rates
- **Quality**: User satisfaction with AI outputs
- **Costs**: OpenAI usage and billing

### Logging Setup
```typescript
// Enhanced logging for debugging
console.log('AI Request:', {
  service: 'parse-cv',
  inputLength: text.length,
  timestamp: new Date().toISOString()
});
```

## Cost Management

### Expected Costs (per 1000 requests)
- **CV Parsing**: ~$0.15 (gpt-4o-mini)
- **Text Rewriting**: ~$0.08 (gpt-4o-mini)
- **Total**: ~$0.23 per 1000 AI operations

### Cost Optimization
1. **Input preprocessing**: Clean and optimize input text
2. **Response caching**: Cache frequent requests
3. **Rate limiting**: Prevent abuse
4. **Model selection**: Use most cost-effective models

## Development vs Production

### Development
```bash
# Use lower rate limits
MAX_REQUESTS_PER_MINUTE=10

# Enable detailed logging
DEBUG_AI_REQUESTS=true
```

### Production
```bash
# Higher limits for production
MAX_REQUESTS_PER_MINUTE=100

# Monitoring and alerting
ENABLE_MONITORING=true
ALERT_EMAIL=admin@yourapp.com
```

## Testing

### Unit Tests
```typescript
// Test AI parsing
describe('CV Parser', () => {
  it('should extract personal info', async () => {
    const result = await parseTextToCV(mockCVText);
    expect(result.personalInfo?.fullName).toBeDefined();
  });
});
```

### Integration Tests
- Test complete upload → parse → display flow
- Verify error handling for various input types
- Test rate limiting behavior

## Troubleshooting

### Common Issues

1. **"API key missing" error**
   - Check `.env.local` file exists and is loaded
   - Verify environment variable names match exactly

2. **"Rate limit exceeded" error**
   - Reduce request frequency
   - Implement proper retry logic
   - Check OpenAI dashboard for limits

3. **"Parsing failed" error**
   - Ensure input text has sufficient content
   - Check for special characters or formatting issues
   - Review AI model response in logs

4. **"Network timeout" error**
   - Check internet connection
   - Verify API endpoints are accessible
   - Increase timeout values if needed

### Debug Mode
Set `DEBUG_AI=true` in environment to enable detailed logging:

```typescript
if (process.env.DEBUG_AI === 'true') {
  console.log('AI Debug:', { request, response, timing });
}
```

## Support and Resources

- **OpenAI Documentation**: https://platform.openai.com/docs
- **Resend Documentation**: https://resend.com/docs
- **Vercel Functions**: https://vercel.com/docs/functions
- **Error Monitoring**: Consider Sentry for production error tracking

## Updates and Maintenance

### Regular Tasks
1. **Weekly**: Monitor usage and costs
2. **Monthly**: Update API keys and review security
3. **Quarterly**: Evaluate new AI models and features
4. **As needed**: Update prompts based on user feedback

### Version Updates
- Keep OpenAI SDK updated for new features
- Monitor model deprecations and migrations
- Test new models for improved performance/cost

---

**Status**: ✅ Fully configured and ready for production
**Last Updated**: November 2025
**Next Review**: February 2026