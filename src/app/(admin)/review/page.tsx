"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Store, Package, AlertCircle, FileText, Shield } from 'lucide-react';

export default function AdminReviewPanel() {
  const [activeTab, setActiveTab] = useState('sellers');
  const [sellerApplications, setSellerApplications] = useState([
    {
      id: 1,
      businessName: "Pawfect Supplies Co.",
      ownerName: "John Martinez",
      email: "john@pawfect.com",
      phone: "+63 917 123 4567",
      businessType: "Pet Food Retailer",
      documents: ["Business Permit", "FDA License", "Tax ID"],
      dateApplied: "2025-09-25",
      status: "pending"
    },
    {
      id: 2,
      businessName: "Furry Friends Store",
      ownerName: "Maria Santos",
      email: "maria@furryfriends.ph",
      phone: "+63 918 234 5678",
      businessType: "Pet Accessories",
      documents: ["Business Permit", "DTI Registration"],
      dateApplied: "2025-09-26",
      status: "pending"
    },
    {
      id: 3,
      businessName: "Pet Care Philippines",
      ownerName: "Robert Chen",
      email: "robert@petcare.ph",
      phone: "+63 919 345 6789",
      businessType: "Pet Food & Supplies",
      documents: ["Business Permit", "FDA License", "Tax ID", "Mayor's Permit"],
      dateApplied: "2025-09-24",
      status: "pending"
    }
  ]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Dog Food - Chicken & Rice",
      seller: "Pawfect Supplies Co.",
      category: "Dog Food",
      price: "₱1,299",
      fdaApproved: true,
      hasProperLabels: true,
      isLegal: true,
      dateSubmitted: "2025-09-27",
      status: "pending",
      concerns: []
    },
    {
      id: 2,
      name: "Organic Cat Treats - Salmon",
      seller: "Furry Friends Store",
      category: "Cat Food",
      price: "₱599",
      fdaApproved: false,
      hasProperLabels: true,
      isLegal: true,
      dateSubmitted: "2025-09-28",
      status: "pending",
      concerns: ["Missing FDA approval documentation"]
    },
    {
      id: 3,
      name: "Natural Dog Supplements - Immunity Boost",
      seller: "Pet Care Philippines",
      category: "Supplements",
      price: "₱899",
      fdaApproved: true,
      hasProperLabels: false,
      isLegal: true,
      dateSubmitted: "2025-09-26",
      status: "pending",
      concerns: ["Incomplete ingredient labels"]
    },
    {
      id: 4,
      name: "Grain-Free Cat Food - Turkey",
      seller: "Pawfect Supplies Co.",
      category: "Cat Food",
      price: "₱1,499",
      fdaApproved: true,
      hasProperLabels: true,
      isLegal: true,
      dateSubmitted: "2025-09-29",
      status: "pending",
      concerns: []
    }
  ]);

  const handleSellerAction = (id, action) => {
    setSellerApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: action } : app
      )
    );
  };

  const handleProductAction = (id, action) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, status: action } : product
      )
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      approved: "bg-green-100 text-green-700 border-green-200",
      rejected: "bg-red-100 text-red-700 border-red-200"
    };
    
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const pendingSellers = sellerApplications.filter(app => app.status === 'pending').length;
  const pendingProducts = products.filter(prod => prod.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Review Panel</h1>
              <p className="text-gray-600">Manage seller applications and product approvals</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Pending Sellers</p>
              <Store className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{pendingSellers}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Pending Products</p>
              <Package className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{pendingProducts}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Approved Today</p>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Requires Action</p>
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{pendingSellers + pendingProducts}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('sellers')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'sellers'
                  ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Store className="w-5 h-5" />
                Seller Applications ({pendingSellers})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'products'
                  ? 'text-orange-600 border-b-2 border-orange-500 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Package className="w-5 h-5" />
                Product Approvals ({pendingProducts})
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'sellers' ? (
          <div className="space-y-4">
            {sellerApplications.map((application) => (
              <div key={application.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{application.businessName}</h3>
                        <p className="text-gray-600">{application.ownerName}</p>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Contact Information</p>
                        <p className="text-gray-900">{application.email}</p>
                        <p className="text-gray-900">{application.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Business Type</p>
                        <p className="text-gray-900">{application.businessType}</p>
                        <p className="text-sm text-gray-500 mt-1">Applied: {application.dateApplied}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Submitted Documents</p>
                      <div className="flex flex-wrap gap-2">
                        {application.documents.map((doc, index) => (
                          <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            <FileText className="w-4 h-4" />
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {application.status === 'pending' && (
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-40">
                      <Button
                        onClick={() => handleSellerAction(application.id, 'approved')}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleSellerAction(application.id, 'rejected')}
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-gray-600">by {product.seller}</p>
                      </div>
                      {getStatusBadge(product.status)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Product Details</p>
                        <p className="text-gray-900">Category: {product.category}</p>
                        <p className="text-gray-900 font-semibold">{product.price}</p>
                        <p className="text-sm text-gray-500 mt-1">Submitted: {product.dateSubmitted}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Compliance Check</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {product.fdaApproved ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                            <span className={`text-sm ${product.fdaApproved ? 'text-gray-900' : 'text-red-600 font-medium'}`}>
                              FDA Approved
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {product.hasProperLabels ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                            <span className={`text-sm ${product.hasProperLabels ? 'text-gray-900' : 'text-red-600 font-medium'}`}>
                              Proper Labels
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {product.isLegal ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                            <span className={`text-sm ${product.isLegal ? 'text-gray-900' : 'text-red-600 font-medium'}`}>
                              Legal Compliance
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {product.concerns.length > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-red-800 mb-1">Compliance Issues</p>
                            <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                              {product.concerns.map((concern, index) => (
                                <li key={index}>{concern}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {product.status === 'pending' && (
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-40">
                      <Button
                        onClick={() => handleProductAction(product.id, 'approved')}
                        className="bg-green-500 hover:bg-green-600 text-white"
                        disabled={product.concerns.length > 0}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleProductAction(product.id, 'rejected')}
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}