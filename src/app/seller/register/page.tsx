"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, FileText, X } from "lucide-react";
import { toast } from "sonner";
import { registerSeller } from "@/lib/api";

const steps = ["Account Info", "Business Info", "Verification Documents", "Review & Submit"];

export default function SellerRegisterPage() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    governmentIdType: "",
    governmentId: null as File | null,
    selfieWithId: null as File | null,
    proofOfAddress: null as File | null,
    businessPermitTypes: [] as string[],
    dtiSec: null as File | null,
    mayorsPermit: null as File | null,
    birCertificate: null as File | null,
    fdaCertificate: null as File | null,
    productLabels: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleCheckboxChange = (permitType: string) => {
    const updated = form.businessPermitTypes.includes(permitType)
      ? form.businessPermitTypes.filter(t => t !== permitType)
      : [...form.businessPermitTypes, permitType];
    setForm({ ...form, businessPermitTypes: updated });
  };

  const handleFileRemove = (fieldName: string) => {
    setForm({ ...form, [fieldName]: null });
  };

  const handleFileView = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    window.open(url, "_blank");
  };

  const nextStep = () => {
    if (step === 0) {
      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        toast.error("Please fill in all account information fields");
        return;
      }
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      if (form.password !== form.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (form.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
    }
    if (step === 1) {
      if (!form.companyName) {
        toast.error("Please enter your company name");
        return;
      }
      if (form.businessPermitTypes.length === 0) {
        toast.error("Please select at least one business permit type");
        return;
      }
      // Check if files are uploaded for selected permit types
      if (form.businessPermitTypes.includes('DTI/SEC') && !form.dtiSec) {
        toast.error("Please upload DTI/SEC document");
        return;
      }
      if (form.businessPermitTypes.includes("Mayor's Permit") && !form.mayorsPermit) {
        toast.error("Please upload Mayor's Permit");
        return;
      }
      if (form.businessPermitTypes.includes('BIR Certificate') && !form.birCertificate) {
        toast.error("Please upload BIR Certificate");
        return;
      }
    }
    if (step === 2) {
      if (!form.governmentIdType || !form.governmentId || !form.selfieWithId || 
          !form.proofOfAddress || !form.fdaCertificate || !form.productLabels) {
        toast.error("Please upload all required documents");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("password_confirmation", form.password);
    formData.append("company_name", form.companyName);
    formData.append("gov_id_type", form.governmentIdType);

    // Business permit types as JSON array
    formData.append("business_permit_types", JSON.stringify(form.businessPermitTypes));
    
    if (form.dtiSec) formData.append("dti_sec", form.dtiSec);
    if (form.mayorsPermit) formData.append("mayors_permit", form.mayorsPermit);
    if (form.birCertificate) formData.append("bir_certificate", form.birCertificate);
    if (form.governmentId) formData.append("gov_id", form.governmentId);
    if (form.selfieWithId) formData.append("selfie_with_id", form.selfieWithId);
    if (form.proofOfAddress) formData.append("proof_of_address", form.proofOfAddress);
    if (form.fdaCertificate) formData.append("fda_certificate", form.fdaCertificate);
    if (form.productLabels) formData.append("product_labels", form.productLabels);

    try {
      const data = await registerSeller(formData);
      console.log("✅ Success:", data);
      toast.success("Seller registered successfully! Your application is under review.", {
        duration: 5000,
      });

      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        governmentIdType: "",
        governmentId: null,
        selfieWithId: null,
        proofOfAddress: null,
        businessPermitTypes: [],
        dtiSec: null,
        mayorsPermit: null,
        birCertificate: null,
        fdaCertificate: null,
        productLabels: null,
      });

      setStep(0);
    } catch (err: any) {
      console.error("❌ Error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUploadField = ({ 
    label, 
    id, 
    name, 
    file 
  }: { 
    label: string; 
    id: string; 
    name: string; 
    file: File | null;
  }) => (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="flex gap-2">
        <Input 
          id={id} 
          name={name} 
          type="file" 
          onChange={handleChange}
          accept="image/*,.pdf"
          className="flex-1"
        />
        {file && (
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleFileView(file)}
              title="View file"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleFileRemove(name)}
              title="Remove file"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      {file && (
        <p className="text-xs text-gray-600 mt-1">
          <FileText className="inline h-3 w-3 mr-1" />
          {file.name}
        </p>
      )}
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl bg-white">
        <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10 space-y-6">
          {/* Step Indicator */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-start gap-2 relative px-2">
              {steps.map((s, i) => (
                <div
                  key={s}
                  className="flex-1 flex flex-col items-center relative z-10"
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-white text-sm sm:text-base transition-colors duration-300 ${
                      i <= step ? "bg-green-800" : "bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm mt-1.5 sm:mt-2 text-center leading-tight px-1 max-w-[80px] sm:max-w-none">
                    {s}
                  </p>
                </div>
              ))}
              <div className="absolute top-4 sm:top-5 md:top-6 left-0 right-0 h-0.5 sm:h-1 bg-gray-200 -z-0 mx-6 sm:mx-8 md:mx-10">
                <div
                  className="h-full bg-green-800 transition-all duration-500"
                  style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Step Forms */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    value={form.password} 
                    onChange={handleChange}
                    placeholder="Enter password (min. 8 characters)"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={form.confirmPassword} 
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Enter your company name" />
              </div>
              
              <div>
                <Label className="mb-2 block">Business Permits (Select all that apply)</Label>
                <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="dtiSec"
                      checked={form.businessPermitTypes.includes('DTI/SEC')}
                      onChange={() => handleCheckboxChange('DTI/SEC')}
                      className="mt-1 h-4 w-4 text-primary-800 rounded"
                    />
                    <div className="flex-1">
                      <Label htmlFor="dtiSec" className="font-medium cursor-pointer">DTI/SEC Registration</Label>
                      {form.businessPermitTypes.includes('DTI/SEC') && (
                        <div className="mt-2">
                          <FileUploadField 
                            label="" 
                            id="dtiSec" 
                            name="dtiSec" 
                            file={form.dtiSec}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="mayorsPermit"
                      checked={form.businessPermitTypes.includes("Mayor's Permit")}
                      onChange={() => handleCheckboxChange("Mayor's Permit")}
                      className="mt-1 h-4 w-4 text-primary-800 rounded"
                    />
                    <div className="flex-1">
                      <Label htmlFor="mayorsPermit" className="font-medium cursor-pointer">Mayor's Permit</Label>
                      {form.businessPermitTypes.includes("Mayor's Permit") && (
                        <div className="mt-2">
                          <FileUploadField 
                            label="" 
                            id="mayorsPermit" 
                            name="mayorsPermit" 
                            file={form.mayorsPermit}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="birCertificate"
                      checked={form.businessPermitTypes.includes('BIR Certificate')}
                      onChange={() => handleCheckboxChange('BIR Certificate')}
                      className="mt-1 h-4 w-4 text-primary-800 rounded"
                    />
                    <div className="flex-1">
                      <Label htmlFor="birCertificate" className="font-medium cursor-pointer">BIR Certificate of Registration</Label>
                      {form.businessPermitTypes.includes('BIR Certificate') && (
                        <div className="mt-2">
                          <FileUploadField 
                            label="" 
                            id="birCertificate" 
                            name="birCertificate" 
                            file={form.birCertificate}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="governmentIdType">Government ID Type</Label>
                <select
                  id="governmentIdType"
                  name="governmentIdType"
                  value={form.governmentIdType}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select ID Type</option>
                  <option value="Passport">Passport</option>
                  <option value="Driver's License">Driver's License</option>
                  <option value="UMID">UMID (Unified Multi-Purpose ID)</option>
                  <option value="PhilHealth ID">PhilHealth ID</option>
                  <option value="SSS ID">SSS ID</option>
                  <option value="Postal ID">Postal ID</option>
                  <option value="Voter's ID">Voter's ID</option>
                  <option value="PRC ID">PRC ID (Professional Regulation Commission)</option>
                  <option value="National ID">National ID (PhilSys)</option>
                </select>
              </div>
              <FileUploadField 
                label="Government ID" 
                id="governmentId" 
                name="governmentId" 
                file={form.governmentId}
              />
              <FileUploadField 
                label="Selfie with ID" 
                id="selfieWithId" 
                name="selfieWithId" 
                file={form.selfieWithId}
              />
              <FileUploadField 
                label="Proof of Address" 
                id="proofOfAddress" 
                name="proofOfAddress" 
                file={form.proofOfAddress}
              />
              <FileUploadField 
                label="FDA Certificate" 
                id="fdaCertificate" 
                name="fdaCertificate" 
                file={form.fdaCertificate}
              />
              <FileUploadField 
                label="Product Labels" 
                id="productLabels" 
                name="productLabels" 
                file={form.productLabels}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Review Your Information</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div>
                  <h4 className="font-semibold text-primary-600 mb-2">Account Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {form.name}</p>
                    <p><span className="font-medium">Email:</span> {form.email}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-primary-600 mb-2">Business Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Company Name:</span> {form.companyName}</p>
                    <p><span className="font-medium">Business Permit Types:</span> {form.businessPermitTypes.join(', ') || 'None'}</p>
                    
                    {form.businessPermitTypes.includes('DTI/SEC') && form.dtiSec && (
                      <div className="flex justify-between items-center">
                        <span><span className="font-medium">DTI/SEC:</span> {form.dtiSec?.name}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleFileView(form.dtiSec)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </div>
                    )}
                    
                    {form.businessPermitTypes.includes("Mayor's Permit") && form.mayorsPermit && (
                      <div className="flex justify-between items-center">
                        <span><span className="font-medium">Mayor's Permit:</span> {form.mayorsPermit?.name}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleFileView(form.mayorsPermit)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </div>
                    )}
                    
                    {form.businessPermitTypes.includes('BIR Certificate') && form.birCertificate && (
                      <div className="flex justify-between items-center">
                        <span><span className="font-medium">BIR Certificate:</span> {form.birCertificate?.name}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleFileView(form.birCertificate)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-primary-600 mb-2">Verification Documents</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span><span className="font-medium">Government ID Type:</span> {form.governmentIdType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span><span className="font-medium">Government ID:</span> {form.governmentId?.name}</span>
                      {form.governmentId && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleFileView(form.governmentId)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span><span className="font-medium">Selfie with ID:</span> {form.selfieWithId?.name}</span>
                      {form.selfieWithId && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleFileView(form.selfieWithId)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span><span className="font-medium">Proof of Address:</span> {form.proofOfAddress?.name}</span>
                      {form.proofOfAddress && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleFileView(form.proofOfAddress)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span><span className="font-medium">FDA Certificate:</span> {form.fdaCertificate?.name}</span>
                      {form.fdaCertificate && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleFileView(form.fdaCertificate)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span><span className="font-medium">Product Labels:</span> {form.productLabels?.name}</span>
                      {form.productLabels && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleFileView(form.productLabels)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-sm text-primary-800">
                  Please review all information carefully. Once submitted, your application will be sent for verification.
                </p>
              </div>
            </div>
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
                  className="bg-green-800 hover:bg-green-600 w-full rounded-lg h-10 sm:h-11 px-6 text-sm sm:text-base"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="bg-green-800 hover:bg-green-600 w-full rounded-lg h-10 sm:h-11 px-6 text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Confirm & Submit Registration"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}