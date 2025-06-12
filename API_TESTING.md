# API Testing Guide with curl

This guide shows how to test the Items API endpoints using curl commands.

## Base URL
Set your API base URL to your deployed Cloudflare Worker:
```bash
export API_BASE="https://orbitsun.webr.win"
```

You can set this in your terminal session or add it to your shell profile.

## Items API Endpoints

### 1. List Items (GET)

#### Basic List
```bash
curl -X GET "$API_BASE/trpc/item.list?input=%7B%7D"
# Note: input parameter is required, use %7B%7D for empty object {}
```

#### List with Pagination
```bash
curl -X GET "$API_BASE/trpc/item.list?input=%7B%22page%22%3A1%2C%22limit%22%3A10%7D"
# Decoded: {"page":1,"limit":10}
```

#### List with Search
```bash
curl -X GET "$API_BASE/trpc/item.list?input=%7B%22search%22%3A%22Premium%22%2C%22page%22%3A1%2C%22limit%22%3A20%7D"
# Decoded: {"search":"Premium","page":1,"limit":20}
```

#### List with Filters
```bash
curl -X GET "$API_BASE/trpc/item.list?input=%7B%22category%22%3A1%2C%22status%22%3A1%2C%22page%22%3A1%2C%22limit%22%3A10%7D"
# Decoded: {"category":1,"status":1,"page":1,"limit":10}
```

**Category Values:**
- `1` = Packaging
- `2` = Label  
- `3` = Other

**Status Values:**
- `0` = Inactive
- `1` = Active

### 2. Get Item by ID (GET)

```bash
curl -X GET "$API_BASE/trpc/item.getById?input=%7B%22id%22%3A%22ITE250001%22%7D"
# Decoded: {"id":"ITE250001"}
```

### 3. Create Item (POST)

#### Basic Item Creation
```bash
curl -X POST "$API_BASE/trpc/item.create" \
  -H "Content-Type: application/json" \
  -d '{
    "item_name": "Premium Storage Box",
    "item_category": 1,
    "item_price_cents": 2500,
    "item_description": "High-quality storage box for professional use",
    "item_unit_name": "pieces"
  }'
```

#### Minimal Item Creation
```bash
curl -X POST "$API_BASE/trpc/item.create" \
  -H "Content-Type: application/json" \
  -d '{
    "item_name": "Basic Label",
    "item_category": 2,
    "item_price_cents": 150
  }'
```

### 4. Update Item (PUT)

#### Full Update
```bash
curl -X POST "$API_BASE/trpc/item.update" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "ITE250001",
    "item_name": "Updated Premium Box",
    "item_category": 1,
    "item_price_cents": 3000,
    "item_description": "Updated description",
    "item_unit_name": "boxes",
    "item_status": 1
  }'
```

#### Partial Update (Name Only)
```bash
curl -X POST "$API_BASE/trpc/item.update" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "ITE250001",
    "item_name": "New Item Name"
  }'
```

#### Status Update (Deactivate)
```bash
curl -X POST "$API_BASE/trpc/item.update" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "ITE250001",
    "item_status": 0
  }'
```

### 5. Delete Item (DELETE)

```bash
curl -X POST "$API_BASE/trpc/item.delete" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "ITE250001"
  }'
```

## Expected Response Formats

### Success Response Format
```json
{
  "result": {
    "data": {
      // Response data here
    }
  }
}
```

### Error Response Format
```json
{
  "error": {
    "message": "Error description",
    "code": -32600,
    "data": {
      "code": "BAD_REQUEST",
      "httpStatus": 400
    }
  }
}
```

## Example Responses

### List Items Response
```json
{
  "result": {
    "data": {
      "data": [
        {
          "id": "ITE250001",
          "item_name": "Premium Storage Box",
          "item_category": 1,
          "item_price_cents": 2500,
          "item_description": "High-quality storage box",
          "item_unit_name": "pieces",
          "item_status": 1,
          "created_at": 1703123456,
          "updated_at": 1703123456,
          "created_by": "system",
          "updated_by": "system"
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 20,
        "total": 1,
        "totalPages": 1
      }
    }
  }
}
```

### Create Item Response
```json
{
  "result": {
    "data": {
      "id": "ITE250002",
      "item_name": "Premium Storage Box",
      "item_category": 1,
      "item_price_cents": 2500,
      "item_description": "High-quality storage box",
      "item_unit_name": "pieces",
      "item_status": 1,
      "created_at": 1703123456,
      "updated_at": 1703123456,
      "created_by": "system",
      "updated_by": "system"
    }
  }
}
```

## Testing Script

Create a test script `test-items-api.sh`:

```bash
#!/bin/bash

# Set your API base URL
API_BASE="https://orbitsun.webr.win"

echo "🧪 Testing Items API"
echo "===================="

# Test 1: Create an item
echo "📝 Creating item..."
CREATE_RESPONSE=$(curl -s -X POST "$API_BASE/trpc/item.create" \
  -H "Content-Type: application/json" \
  -d '{
    "item_name": "Test Item",
    "item_category": 1,
    "item_price_cents": 1999,
    "item_description": "Test description",
    "item_unit_name": "pieces"
  }')

echo "Create Response: $CREATE_RESPONSE"

# Extract item ID from response
ITEM_ID=$(echo $CREATE_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Created Item ID: $ITEM_ID"

# Test 2: Get the created item
echo "📖 Getting item by ID..."
curl -s -X POST "$API_BASE/trpc/item.getById" \
  -H "Content-Type: application/json" \
  -d "{\"id\": \"$ITEM_ID\"}" | jq '.'

# Test 3: Update the item
echo "✏️ Updating item..."
curl -s -X POST "$API_BASE/trpc/item.update" \
  -H "Content-Type: application/json" \
  -d "{
    \"id\": \"$ITEM_ID\",
    \"item_name\": \"Updated Test Item\",
    \"item_price_cents\": 2499
  }" | jq '.'

# Test 4: List items
echo "📋 Listing items..."
curl -s -X POST "$API_BASE/trpc/item.list" \
  -H "Content-Type: application/json" \
  -d '{"limit": 5}' | jq '.'

# Test 5: Delete the item
echo "🗑️ Deleting item..."
curl -s -X POST "$API_BASE/trpc/item.delete" \
  -H "Content-Type: application/json" \
  -d "{\"id\": \"$ITEM_ID\"}" | jq '.'

echo "✅ Testing complete!"
```

Make it executable and run:
```bash
chmod +x test-items-api.sh
./test-items-api.sh
```

## Debugging Tips

### Pretty Print JSON Responses
Add `| jq '.'` to any curl command:
```bash
curl -X POST "$API_BASE/trpc/item.list" \
  -H "Content-Type: application/json" \
  -d '{}' | jq '.'
```

### Check HTTP Status Codes
Add `-w "%{http_code}"` to see status codes:
```bash
curl -w "%{http_code}" -X POST "$API_BASE/trpc/item.create" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

### Verbose Output
Add `-v` for detailed request/response info:
```bash
curl -v -X POST "$API_BASE/trpc/item.list" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Common Error Cases

### Validation Errors
```bash
# Missing required field
curl -X POST "$API_BASE/trpc/item.create" \
  -H "Content-Type: application/json" \
  -d '{
    "item_category": 1,
    "item_price_cents": 100
  }'
# Error: item_name is required
```

### Invalid Category
```bash
curl -X POST "$API_BASE/trpc/item.create" \
  -H "Content-Type: application/json" \
  -d '{
    "item_name": "Test",
    "item_category": 999,
    "item_price_cents": 100
  }'
# Error: Invalid category value
```

### Item Not Found
```bash
curl -X POST "$API_BASE/trpc/item.getById" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "INVALID_ID"
  }'
# Error: Item not found
```