# N8N Webhook Integration Guide

## Overview
When a user uploads an image in SnapCut AI, the binary image data is sent to your n8n webhook. After processing, n8n should send the result back via a callback endpoint.

## Webhook Flow

### Step 1: Image Upload to N8N
**Endpoint:** `VITE_WEBHOOK_URL` (configured in .env.local)

**Request Format:**
```
POST https://your-n8n-instance/webhook/remove-background
Content-Type: multipart/form-data

Headers:
- X-Image-Name: original-filename.png
- X-Image-Type: image/png
- X-Image-Size: 12345
- X-Request-ID: req_1781177413000_abc123def456
- X-Callback-URL: http://localhost:8080/api/webhook/callback

Form fields:
- file: uploaded image binary
- requestId: req_1781177413000_abc123def456
- callbackUrl: http://localhost:8080/api/webhook/callback
- fileName: original-filename.png
- fileType: image/png
- fileSize: 12345
```

### Step 2: Process Image in N8N
In your n8n workflow:
1. Receive the binary image via webhook
2. Process the image (remove background)
3. Upload the result to Cloudinary or your storage
4. Get the processed image URL
5. Extract the `X-Request-ID` header from the incoming request
6. Extract the `X-Callback-URL` header from the incoming request

### Step 3: Send Result Back via Callback
**Endpoint:** Use the `X-Callback-URL` header value received from step 1

**Request Format:**
```javascript
// POST request
fetch(callbackUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    requestId: 'req_1781177413000_abc123def456',  // From X-Request-ID header
    url: 'https://res.cloudinary.com/dvppxqwjt/image/upload/v1781177413/snapcut/uploads/aqf2rxqb.png'
  })
})
```

**Response Example:**
```json
{
  "success": true,
  "message": "Result stored successfully",
  "requestId": "req_1781177413000_abc123def456"
}
```

## N8N Workflow Steps

### Example N8N Workflow Configuration:

1. **Webhook Node** (receive image)
   - Method: POST
   - Path: `/webhook/remove-background`
   - Extract headers: `X-Request-ID`, `X-Callback-URL`, `X-Image-Name`

2. **Image Processing** (your background removal logic)
   - Download/process the binary image from the webhook body
   - Remove the background
   - Upload result to Cloudinary or storage service

3. **HTTP Request Node** (send callback)
   - Method: POST
   - URL: Use the `X-Callback-URL` header
   - Body (JSON):
     ```json
     {
       "requestId": "{{ $node['Webhook'].context.headers['x-request-id'] }}",
       "url": "{{ $node['Upload'].json.url }}"
     }
     ```

## Key Points

- **Binary Data**: The webhook receives the image in the multipart `file` field
- **Request ID**: Always include the `X-Request-ID` header value in the callback
- **Callback URL**: Always use the `X-Callback-URL` header value for the response
- **Timeout**: Client polls for results with a 2-minute timeout
- **Storage**: Results are cached in memory for 1 hour

## Example Workflow Pseudocode (N8N)

```javascript
// 1. Receive webhook
const requestId = req.headers['x-request-id'];
const callbackUrl = req.headers['x-callback-url'];
const imageName = req.headers['x-image-name'];
const binaryData = req.body;

// 2. Process image (your custom logic)
const processedImageUrl = await removeBackground(binaryData);
// e.g., https://res.cloudinary.com/dvppxqwjt/image/upload/v1781177413/snapcut/uploads/aqf2rxqb.png

// 3. Send result back
await fetch(callbackUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    requestId: requestId,
    url: processedImageUrl
  })
});
```

## Environment Variables (SnapCut AI)

```
# .env.local
VITE_WEBHOOK_URL=https://your-n8n-instance/webhook/remove-background
VITE_APP_URL=http://localhost:8080  # or your production URL
```

## Testing the Integration

1. Upload an image via the UI
2. Check the browser console for the request ID
3. Check the server logs to see the webhook request with headers
4. Manually call the callback endpoint with test data to verify
5. Monitor the polling requests in the Network tab

## Troubleshooting

- **"Result not found"**: Ensure n8n is calling the callback URL correctly
- **"Polling timeout"**: Check n8n workflow execution logs for errors
- **"Missing headers"**: Verify headers are being passed correctly in the webhook request
