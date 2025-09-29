"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const steps = ["Account Info", "Business Info", "Verification Documents"];

export default function SellerRegisterPage() {
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    businessPermit: null as File | null,
    governmentIdType: "",
    governmentId: null as File | null,
    selfieWithId: null as File | null,
    proofOfAddress: null as File | null,
    fdaCertificate: null as File | null,
    productLabels: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    try {
      const res = await fetch("/api/seller/register", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Seller registered successfully!");
      } else {
        toast.error("Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl bg-white">
        <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-6">
          {/* Step Indicator */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-start gap-2 relative px-2">
              {steps.map((s, i) => (
                <div key={s} className="flex-1 flex flex-col items-center relative z-10">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-white text-sm sm:text-base transition-colors duration-300 ${
                      i <= step ? "bg-orange-500" : "bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm mt-1.5 sm:mt-2 text-center leading-tight px-1 max-w-[80px] sm:max-w-none">
                    {s}
                  </p>
                </div>
              ))}
              {/* Progress line */}
              <div className="absolute top-4 sm:top-5 md:top-6 left-0 right-0 h-0.5 sm:h-1 bg-gray-200 -z-0 mx-6 sm:mx-8 md:mx-10">
                <div
                  className="h-full bg-orange-500 transition-all duration-500"
                  style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Step Forms */}
          <div className="space-y-4 sm:space-y-5">
            {step === 0 && (
              <>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-4">
                  Account Info
                </h2>
                <div className="grid gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm sm:text-base">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="rounded-lg mt-1.5 h-10 sm:h-11"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm sm:text-base">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="rounded-lg mt-1.5 h-10 sm:h-11"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-sm sm:text-base">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="rounded-lg mt-1.5 h-10 sm:h-11"
                      placeholder="Create a password"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-4">
                  Business Info
                </h2>
                <div className="grid gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="companyName" className="text-sm sm:text-base">
                      Company / Shop Name
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      required
                      className="rounded-lg mt-1.5 h-10 sm:h-11"
                      placeholder="Enter your business name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessPermit" className="text-sm sm:text-base">
                      Business Permit (DTI/SEC, Mayor's Permit, BIR Certificate)
                    </Label>
                    <Input
                      id="businessPermit"
                      type="file"
                      name="businessPermit"
                      onChange={handleChange}
                      className="rounded-lg mt-1.5 h-10 sm:h-11 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      accept="image/*,.pdf"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-4">
                  Verification Documents
                </h2>
                <div className="grid gap-3 sm:gap-4">
                  <div>
                    <Label htmlFor="governmentIdType" className="text-sm sm:text-base">
                      Valid Government ID Type
                    </Label>
                    <select
                      id="governmentIdType"
                      name="governmentIdType"
                      value={form.governmentIdType}
                      onChange={(e) => setForm({ ...form, governmentIdType: e.target.value })}
                      required
                      className="flex h-10 sm:h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1.5"
                    >
                      <option value="">Select ID Type</option>
                      <option value="passport">Passport</option>
                      <option value="drivers-license">Driver's License</option>
                      <option value="umid">UMID</option>
                      <option value="philhealth">PhilHealth ID</option>
                      <option value="sss">SSS ID</option>
                      <option value="postal">Postal ID</option>
                      <option value="voters">Voter's ID</option>
                      <option value="prc">PRC ID</option>
                      <option value="senior">Senior Citizen ID</option>
                      <option value="pwd">PWD ID</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="governmentId" className="text-sm sm:text-base">
                      Upload Government ID
                    </Label>
                    <Input
                      id="governmentId"
                      type="file"
                      name="governmentId"
                      onChange={handleChange}
                      required
                      className="rounded-lg mt-1.5 h-10 sm:h-11 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      accept="image/*,.pdf"
                    />
                  </div>
                  <div>
                    <Label htmlFor="selfieWithId" className="text-sm sm:text-base">
                      Selfie with ID
                    </Label>
                    <Input
                      id="selfieWithId"
                      type="file"
                      name="selfieWithId"
                      onChange={handleChange}
                      className="rounded-lg mt-1.5 h-10 sm:h-11 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      accept="image/*"
                    />
                  </div>
                  <div>
                    <Label htmlFor="proofOfAddress" className="text-sm sm:text-base">
                      Proof of Address
                    </Label>
                    <Input
                      id="proofOfAddress"
                      type="file"
                      name="proofOfAddress"
                      onChange={handleChange}
                      className="rounded-lg mt-1.5 h-10 sm:h-11 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      accept="image/*,.pdf"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fdaCertificate" className="text-sm sm:text-base">
                      FDA Certificate
                    </Label>
                    <Input
                      id="fdaCertificate"
                      type="file"
                      name="fdaCertificate"
                      onChange={handleChange}
                      className="rounded-lg mt-1.5 h-10 sm:h-11 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      accept="image/*,.pdf"
                    />
                  </div>
                  <div>
                    <Label htmlFor="productLabels" className="text-sm sm:text-base">
                      Product Labels & Expiration Dates
                    </Label>
                    <Input
                      id="productLabels"
                      type="file"
                      name="productLabels"
                      onChange={handleChange}
                      className="rounded-lg mt-1.5 h-10 sm:h-11 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      accept="image/*,.pdf"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step Navigation */}
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4 sm:pt-6">
              {step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="w-full sm:w-auto rounded-lg h-10 sm:h-11 px-6 text-sm sm:text-base"
                >
                  Back
                </Button>
              )}
              <div className={step === 0 ? "w-full" : "w-full sm:w-auto sm:ml-auto"}>
                {step < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-orange-500 hover:bg-orange-600 w-full rounded-lg h-10 sm:h-11 px-6 text-sm sm:text-base"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-orange-500 hover:bg-orange-600 w-full rounded-lg h-10 sm:h-11 px-6 text-sm sm:text-base font-medium"
                  >
                    Submit Registration
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}