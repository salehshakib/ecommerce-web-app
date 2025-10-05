# Image Upload System

This system provides server-side image upload to Cloudinary with URL return for database storage.

## Environment Variables Required

Add these to your `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Usage Examples

### 1. Using the ServerImageUpload Component

```tsx
import { ServerImageUpload } from "@/components/ui/server-image-upload";

function ProductForm() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <ServerImageUpload
      value={imageUrl}
      onChange={setImageUrl}
      onRemove={() => setImageUrl("")}
      onUploadComplete={(response) => {
        console.log("Upload complete:", response);
        // Save response.url to your database
      }}
      label="Product Image"
      placeholder="Upload product image"
      maxSizeMB={5}
    />
  );
}
```

### 2. Using the useImageUpload Hook

```tsx
import { useImageUpload } from "@/hooks/use-image-upload";

function CustomUpload() {
  const { upload, isUploading, error, getImageUrl } = useImageUpload({
    maxSizeMB: 10,
    onSuccess: (response) => {
      console.log("Uploaded:", response.url);
      // Save to database
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      upload(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={isUploading} />
      {error && <p className="error">{error}</p>}
      {getImageUrl() && <img src={getImageUrl()!} alt="Uploaded" />}
    </div>
  );
}
```

### 3. Using the Utility Functions Directly

```tsx
import { uploadImage, deleteImage, validateImageFile } from "@/utils/image-upload";

async function handleUpload(file: File) {
  // Validate first
  const validation = validateImageFile(file, 10);
  if (!validation.isValid) {
    alert(validation.error);
    return;
  }

  // Upload
  const response = await uploadImage(file);

  if (response.success) {
    console.log("Image URL for database:", response.url);
    console.log("Public ID for deletion:", response.public_id);

    // Save response.url to your database
    await saveToDatabase({ imageUrl: response.url });
  } else {
    console.error("Upload failed:", response.error);
  }
}

async function handleDelete(imageUrl: string) {
  const publicId = extractPublicIdFromUrl(imageUrl);
  if (publicId) {
    const response = await deleteImage(publicId);
    console.log("Delete result:", response.success);
  }
}
```

### 4. API Endpoints

The system provides these endpoints:

- `POST /api/upload/image` - Upload image, returns URL and metadata
- `DELETE /api/upload/image?public_id=xxx` - Delete image by public_id

### 5. Database Integration

Store the returned URL in your database:

```tsx
// Example with a product form
const handleSubmit = async (formData) => {
  const productData = {
    name: formData.name,
    price: formData.price,
    image: imageUrl, // This is the Cloudinary URL
    // ... other fields
  };

  await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
};
```

## Features

- ✅ Server-side upload to Cloudinary
- ✅ Returns URL for database storage
- ✅ File validation (type, size)
- ✅ Drag & drop support
- ✅ Progress indication
- ✅ Image deletion
- ✅ Automatic image optimization
- ✅ Error handling
- ✅ TypeScript support

## Image Storage

Images are stored in Cloudinary with:
- Folder: `perfume-ecommerce/`
- Auto optimization (quality, format)
- Size limit: 1000x1000px max
- Supported formats: JPEG, PNG, GIF, WebP