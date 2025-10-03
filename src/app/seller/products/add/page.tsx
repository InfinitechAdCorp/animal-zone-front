"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Package, DollarSign, FileText, Image as ImageIcon, Shield, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { createProduct } from "@/lib/api";

interface PetType {
  id: number;
  name: string;
}

interface ProductCategory {
  id: number;
  name: string;
}

const steps = ["Basic Information", "Pricing & Inventory", "Product Details", "Image", "Documents"];

export default function ProductListingPage() {
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [petTypes, setPetTypes] = useState<PetType[]>([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    productName: "",
    product_category_id: "",
    petType: [] as number[],
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "productImages") {
        const fileArray = Array.from(files);
        setForm({ ...form, productImages: fileArray });

        const previews = fileArray.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
      } else {
        setForm({ ...form, [name]: files[0] });
      }
    }
  };

  const handlePetTypeChange = (id: number) => {
    const updated = form.petType.includes(id)
      ? form.petType.filter((t) => t !== id)
      : [...form.petType, id];
    setForm({ ...form, petType: updated });
  };

  const removeImage = (index: number) => {
    const newImages = form.productImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setForm({ ...form, productImages: newImages });
    setImagePreviews(newPreviews);
  };

  const nextStep = () => {
    if (step === 0) {
      if (!form.productName || !form.brand || !form.product_category_id || !form.description) {
        toast.error("Please fill in all required fields");
        return;
      }
      if (form.petType.length === 0) {
        toast.error("Please select at least one pet type");
        return;
      }
    }
    if (step === 1) {
      if (!form.price || !form.stock) {
        toast.error("Please enter price and stock quantity");
        return;
      }
      if (parseFloat(form.price) <= 0) {
        toast.error("Price must be greater than 0");
        return;
      }
      if (parseInt(form.stock) < 0) {
        toast.error("Stock cannot be negative");
        return;
      }
    }
    if (step === 3) {
      if (form.productImages.length === 0) {
        toast.error("Please upload at least one product image");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "productImages") {
        form.productImages.forEach((file) =>
          formData.append("productImages[]", file)
        );
      } else if (key === "petType") {
        formData.append("petType", JSON.stringify(value));
      } else if (value) {
        formData.append(key, value as any);
      }
    });

    try {
      const successData = await createProduct(formData);
      console.log("✅ API Success:", successData);

      toast.success("Product listed successfully!");
      setForm({
        productName: "",
        product_category_id: "",
        petType: [],
        brand: "",
        description: "",
        price: "",
        stock: "",
        sku: "",
        weight: "",
        expirationDate: "",
        ingredients: "",
        productImages: [],
        fdaCertificate: null,
        productLabels: null,
      });
      setImagePreviews([]);
      setStep(0);
    } catch (err: any) {
      console.error("❌ API Error:", err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchPetTypes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pet-types`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch pet types");
        const data = await res.json();
        setPetTypes(data);
      } catch (err) {
        console.error("❌ Error fetching pet types:", err);
      } finally {
        setLoadingPets(false);
      }
    };

    fetchPetTypes();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product-categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("❌ Error fetching categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/seller/products">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-700 hover:text-green-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to My Products
            </Button>
          </Link>
        </div>

        <Card className="shadow-2xl rounded-2xl bg-white border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-6 py-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm font-medium text-green-100">
                  Step {step + 1} of {steps.length}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold mt-1">{steps[step]}</h2>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold">{Math.round(((step + 1) / steps.length) * 100)}%</div>
                <p className="text-xs text-green-100">Complete</p>
              </div>
            </div>
          </div>

          <CardContent className="p-6 sm:p-8 lg:p-10 space-y-8">
            <div className="mb-8">
              <div className="flex justify-between items-start gap-2 relative px-2">
                {steps.map((s, i) => (
                  <div key={s} className="flex-1 flex flex-col items-center relative z-10">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-white text-base sm:text-lg transition-all duration-300 shadow-lg ${
                        i < step
                          ? "bg-green-600 scale-95"
                          : i === step
                            ? "bg-green-800 scale-110 ring-4 ring-green-200"
                            : "bg-gray-300 scale-90"
                      }`}
                    >
                      {i < step ? <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" /> : i + 1}
                    </div>
                    <p
                      className={`text-[10px] sm:text-xs md:text-sm mt-2 text-center leading-tight px-1 max-w-[80px] sm:max-w-none font-medium ${
                        i <= step ? "text-green-800" : "text-gray-400"
                      }`}
                    >
                      {s}
                    </p>
                  </div>
                ))}
                <div className="absolute top-5 sm:top-6 md:top-7 left-0 right-0 h-1 bg-gray-200 -z-0 mx-8 sm:mx-10 md:mx-12">
                  <div
                    className="h-full bg-gradient-to-r from-green-600 to-green-800 transition-all duration-500 rounded-full"
                    style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Step 0: Basic Information */}
            {step === 0 && (
              <div className="space-y-5">
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg mb-6">
                  <p className="text-sm text-green-800 font-medium flex items-start">
                    <Package className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Let's start with the basics. Tell us about your product.</span>
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productName" className="text-sm font-semibold text-gray-700">
                      Product Name *
                    </Label>
                    <Input
                      id="productName"
                      name="productName"
                      value={form.productName}
                      onChange={handleChange}
                      required
                      className="rounded-lg mt-1.5 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="e.g., Premium Dog Food"
                    />
                  </div>
                  <div>
                    <Label htmlFor="brand" className="text-sm font-semibold text-gray-700">
                      Brand *
                    </Label>
                    <Input
                      id="brand"
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                      required
                      className="rounded-lg mt-1.5 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="e.g., Pedigree"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="product_category_id" className="text-sm font-semibold text-gray-700">
                      Category *
                    </Label>
                    <select
                      id="product_category_id"
                      name="product_category_id"
                      value={form.product_category_id}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm mt-1.5 h-11 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="sku" className="text-sm font-semibold text-gray-700">
                      SKU
                    </Label>
                    <Input
                      id="sku"
                      name="sku"
                      value={form.sku}
                      onChange={handleChange}
                      className="rounded-lg mt-1.5 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="Stock Keeping Unit"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Suitable for Pet Type *
                  </Label>
                  {loadingPets ? (
                    <p className="text-gray-500 text-sm">Loading pet types...</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {petTypes.map((type) => (
                        <label
                          key={type.id}
                          className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            form.petType.includes(type.id)
                              ? "border-green-800 bg-green-50 text-green-800"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={form.petType.includes(type.id)}
                            onChange={() => handlePetTypeChange(type.id)}
                            className="sr-only"
                          />
                          <span className="text-sm font-medium">{type.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                    Product Description *
                  </Label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-500 mt-1.5 resize-none"
                    placeholder="Describe your product, its benefits, and key features..."
                  />
                </div>
              </div>
            )}

            {/* Step 1: Pricing & Inventory */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg mb-6">
                  <p className="text-sm text-green-800 font-medium flex items-start">
                    <DollarSign className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Set your pricing and manage inventory levels.</span>
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
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
                      className="rounded-lg mt-1.5 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock" className="text-sm font-semibold text-gray-700">
                      Stock Quantity *
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={form.stock}
                      onChange={handleChange}
                      required
                      className="rounded-lg mt-1.5 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-sm font-semibold text-gray-700">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.01"
                      value={form.weight}
                      onChange={handleChange}
                      className="rounded-lg mt-1.5 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Product Details */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg mb-6">
                  <p className="text-sm text-green-800 font-medium flex items-start">
                    <FileText className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Add additional product information if applicable.</span>
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expirationDate" className="text-sm font-semibold text-gray-700">
                      Expiration Date (if applicable)
                    </Label>
                    <Input
                      id="expirationDate"
                      name="expirationDate"
                      type="date"
                      value={form.expirationDate}
                      onChange={handleChange}
                      className="rounded-lg mt-1.5 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ingredients" className="text-sm font-semibold text-gray-700">
                      Ingredients (if applicable)
                    </Label>
                    <Input
                      id="ingredients"
                      name="ingredients"
                      value={form.ingredients}
                      onChange={handleChange}
                      className="rounded-lg mt-1.5 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="e.g., Chicken, Rice, Vegetables"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Product Images */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg mb-6">
                  <p className="text-sm text-green-800 font-medium flex items-start">
                    <ImageIcon className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Upload high-quality images to showcase your product.</span>
                  </p>
                </div>

                <div>
                  <Label htmlFor="productImages" className="text-sm font-semibold text-gray-700">
                    Upload Product Image
                  </Label>
                  <Input
                    id="productImages"
                    name="productImages"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="rounded-lg mt-1.5 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
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
            )}

            {/* Step 4: Verification Documents */}
            {step === 4 && (
              <div className="space-y-5">
                <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg mb-6">
                  <p className="text-sm text-green-800 font-medium flex items-start">
                    <Shield className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Upload verification documents to ensure product quality and safety.</span>
                  </p>
                </div>

                <div>
                  <Label htmlFor="fdaCertificate" className="text-sm font-semibold text-gray-700">
                    FDA Certificate (for pet food, shampoo, essentials)
                  </Label>
                  <Input
                    id="fdaCertificate"
                    name="fdaCertificate"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="rounded-lg mt-1.5 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Required for food, grooming, and health products</p>
                  {form.fdaCertificate && (
                    <p className="text-xs text-green-700 mt-1.5 flex items-center">
                      <CheckCircle2 className="inline h-3 w-3 mr-1" />
                      {form.fdaCertificate.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="productLabels" className="text-sm font-semibold text-gray-700">
                    Product Labels & Expiration Dates
                  </Label>
                  <Input
                    id="productLabels"
                    name="productLabels"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="rounded-lg mt-1.5 h-11 border-gray-300 focus:border-green-500 focus:ring-green-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Clear photo of product label with expiration date</p>
                  {form.productLabels && (
                    <p className="text-xs text-green-700 mt-1.5 flex items-center">
                      <CheckCircle2 className="inline h-3 w-3 mr-1" />
                      {form.productLabels.name}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-6 border-t-2 border-gray-100">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="w-full sm:w-auto rounded-lg h-12 px-8 text-base font-medium border-2 border-gray-300 hover:bg-gray-50"
                >
                  ← Back
                </Button>
              )}
              <div className={step === 0 ? "w-full" : "w-full sm:w-auto sm:ml-auto"}>
                {step < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 w-full rounded-lg h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Continue →
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-700 to-emerald-600 hover:from-green-800 hover:to-emerald-700 w-full rounded-lg h-12 px-8 text-base font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit for Review"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}