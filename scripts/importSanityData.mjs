import { createClient } from "@sanity/client";

global.Buffer = global.Buffer || require("buffer").Buffer; // Ensure Buffer is available

const client = createClient({
  projectId: "tslu02oh",
  dataset: "production",
  useCdn: false,
  token: "skqOVN8We25CL4M5wZLQAyG9XJx4KehtIWrQYFCf8Ggg9y2A2IuGqk57fPs0coEaPis2ndXc8VnwwqYAqHDRlR8E2M6FhR1e8S66PbrQ7hpq6lUjbgiDWzZFi63FAdzled196xfAe4rD0JisB6eOxyTOVNMToVw7Ml95XGEsbEJYbQ7QtMDq", // Replace with your token
  apiVersion: "2023-01-01", // Use the latest version
});

async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imageUrl}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, {
      filename: imageUrl.split("/").pop(),
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error("Failed to upload image:", error);
    return null;
  }
}

async function uploadProduct(product) {
  try {
    const imageId = await uploadImageToSanity(product.imageUrl);

    if (imageId) {
      const document = {
        _type: "product",
        name: product.name,
        description: product.description,
        price: product.price,
        image: {
          _type: "image",
          asset: {
            _ref: imageId,
          },
        },
        category: product.category,
        discountPercent: product.discountPercent,
        isNew: product.isNew,
        colors: product.colors,
        sizes: product.sizes,
      };

      const createdProduct = await client.create(document);
      console.log(`Product ${product.name} uploaded successfully:`, createdProduct);
    } else {
      console.log(`Image upload failed for product: ${product.name}`);
    }
  } catch (error) {
    console.error("Error uploading product:", error);
  }
}

async function importProducts() {
  try {
    const response = await fetch("https://template1-neon-nu.vercel.app/api/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();
    console.log("Products fetched successfully:", products);

    for (const product of products) {
      await uploadProduct(product);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

importProducts();
