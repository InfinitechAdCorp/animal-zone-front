"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const categories = [
  { value: "food", label: "Pet Food" },
  { value: "treats", label: "Treats & Snacks" },
  { value: "grooming", label: "Grooming & Hygiene" },
  { value: "toys", label: "Toys & Accessories" },
  { value: "health", label: "Health & Wellness" },
  { value: "clothing", label: "Clothing & Costumes" },
  { value: "supplies", label: "Supplies & Equipment" },
];

const petTypes = ["Dog", "Cat", "Bird", "Fish", "Rabbit", "Hamster", "Others"];

export default function ProductListingPage() {
  const [form, setForm] = useState({
    productName: "",
    category: "",
    petType: [] as string[],
    brand: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
    weight: "",
    expirationDate: "",
    ingredients: "",
    productImages: [] as File[],
    fdaCertificate: null as File | null,
    productLabels: null as File | null,
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "productImages") {
        const fileArray = Array.from(files);
        setForm({ ...form, productImages: fileArray });
        
        // Create image previews
        const previews = fileArray.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
      } else {
        setForm({ ...form, [name]: files[0] });
      }
    }
  };

  const handlePetTypeChange = (type: string) => {
    const updated = form.petType.includes(type)
      ? form.petType.filter(t => t !== type)
      : [...form.petType, type];
    setForm({ ...form, petType: updated });
  };

  const removeImage = (index: number) => {
    const newImages = form.productImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setForm({ ...form, productImages: newImages });
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.petType.length === 0) {
      toast.error("Please select at least one pet type");
      return;
    }

    if (form.productImages.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "productImages") {
        form.productImages.forEach(file => formData.append("productImages", file));
      } else if (key === "petType") {
        formData.append("petType", JSON.stringify(value));
      } else if (value) {
        formData.append(key, value as any);
      }
    });

    try {
      const res = await fetch("/api/seller/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Product listed successfully!");
        // Reset form or redirect
      } else {
        toast.error("Failed to list product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">List New Product</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Fill in the details to list your pet product</p>
        </div>

        <Card className="shadow-lg rounded-2xl bg-white">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Basic Information
                </h2>
                <div className="grid gap-4 sm:gap-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productName" className="text-sm sm:text-base">
                        Product Name *
                      </Label>
                      <Input
                        id="productName"
                        name="productName"
                        value={form.productName}
                        onChange={handleChange}
                        required
                        className="rounded-lg mt-1.5 h-10 sm:h-11"
                        placeholder="e.g., Premium Dog Food"
                      />
                    </div>
                    <div>
                      <Label htmlFor="brand" className="text-sm sm:text-base">
                        Brand *
                      </Label>
                      <Input
                        id="brand"
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        required
                        className="rounded-lg mt-1.5 h-10 sm:h-11"
                        placeholder="e.g., Pedigree"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-sm sm:text-base">
                        Category *
                      </Label>
                      <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="flex h-10 sm:h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 mt-1.5"
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="sku" className="text-sm sm:text-base">
                        SKU
                      </Label>
                      <Input
                        id="sku"
                        name="sku"
                        value={form.sku}
                        onChange={handleChange}
                        className="rounded-lg mt-1.5 h-10 sm:h-11"
                        placeholder="Stock Keeping Unit"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm sm:text-base mb-2 block">
                      Suitable for Pet Type *
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {petTypes.map(type => (
                        <label
                          key={type}
                          className={`flex items-center justify-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            form.petType.includes(type)
                              ? "border-orange-500 bg-orange-50 text-orange-700"
                              : "border-gray-200 hover:border-orange-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={form.petType.includes(type)}
                            onChange={() => handlePetTypeChange(type)}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm sm:text-base">
                      Product Description *
                    </Label>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 mt-1.5 resize-none"
                      placeholder="Describe your product, its benefits, and key features..."
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Pricing & Inventory
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-sm sm:text-base">
                      Price (₱) *
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      required
                      className="rounded-lg mt-1.5 h-10 sm:h-11"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock" className="text-sm sm:text-base">
                      Stock Quantity *
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={form.stock}
                      onChange={handleChange}
                      required
                      className="rounded-lg mt-1.5 h-10 sm:h-11"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-sm sm:text-base">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.01"
                      value={form.weight}
                      onChange={handleChange}
                      className="rounded-lg mt-1.5 h-10 sm:h-11"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Product Details
                </h2>
                <div className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expirationDate" className="text-sm sm:text-base">
                        Expiration Date (if applicable)
                      </Label>
                      <Input
                        id="expirationDate"
                        name="expirationDate"
                        type="date"
                        value={form.expirationDate}
                        onChange={handleChange}
                        className="rounded-lg mt-1.5 h-10 sm:h-11"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ingredients" className="text-sm sm:text-base">
                        Ingredients (if applicable)
                      </Label>
                      <Input
                        id="ingredients"
                        name="ingredients"
                        value={form.ingredients}
                        onChange={handleChange}
                        className="rounded-lg mt-1.5 h-10 sm:h-11"
                        placeholder="e.g., Chicken, Rice, Vegetables"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Images */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
                  Product Images
                </h2>
                <div>
                  <Label htmlFor="productImages" className="text-sm sm:text-base">
                    Upload Product Images * (Up to 5 images)
                  </Label>
                  <Input
                    id="productImages"
                    name="productImages"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="rounded-lg mt-1.5 h-10 sm:h-11 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload clear images of your product (JPG, PNG)</p>
                  
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 sm:h-28 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Verification Documents */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm mr-3">5</span>
                  Verification Documents
                </h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="fdaCertificate" className="text-sm sm:text-base">
                      FDA Certificate (for pet food, shampoo, essentials)
                    </Label>
                    <Input
                      id="fdaCertificate"
                      name="fdaCertificate"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="rounded-lg mt-1.5 h-10 sm:h-11 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Required for food, grooming, and health products</p>
                  </div>
                  <div>
                    <Label htmlFor="productLabels" className="text-sm sm:text-base">
                      Product Labels & Expiration Dates
                    </Label>
                    <Input
                      id="productLabels"
                      name="productLabels"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="rounded-lg mt-1.5 h-10 sm:h-11 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Clear photo of product label with expiration date</p>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto rounded-lg h-11 px-6"
                >
                  Save as Draft
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:flex-1 bg-orange-500 hover:bg-orange-600 rounded-lg h-11 px-6 font-medium"
                >
                  Submit for Review
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}