"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { regions } from "@/data/region";
import { provinces } from "@/data/province";
import { cities } from "@/data/cities";
import { barangay } from "@/data/barangay";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    contact_number: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    street_address: "",
    postal_code: "",
  });

  const [filteredProvinces, setFilteredProvinces] = useState<any[]>([]);
  const [filteredCities, setFilteredCities] = useState<any[]>([]);
  const [filteredBarangays, setFilteredBarangays] = useState<any[]>([]);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Missing authentication token.");
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Backend returns plain user object now
        setAdmin(res.data);

        // Initialize dependent dropdowns
        if (res.data.region) {
          setFilteredProvinces(
            provinces.filter((p) => p.region_code === res.data.region)
          );
        }
        if (res.data.province) {
          setFilteredCities(
            cities.filter((c) => c.province_code === res.data.province)
          );
        }
        if (res.data.city) {
          setFilteredBarangays(
            barangay.filter((b) => b.city_code === res.data.city)
          );
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load admin profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(`${API_BASE_URL}/api/user/profile`, admin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  // 🧩 Dropdown handlers
  const handleRegionChange = (regionCode: string) => {
    setAdmin({
      ...admin,
      region: regionCode,
      province: "",
      city: "",
      barangay: "",
    });
    setFilteredProvinces(provinces.filter((p) => p.region_code === regionCode));
    setFilteredCities([]);
    setFilteredBarangays([]);
  };

  const handleProvinceChange = (provinceCode: string) => {
    setAdmin({
      ...admin,
      province: provinceCode,
      city: "",
      barangay: "",
    });
    setFilteredCities(cities.filter((c) => c.province_code === provinceCode));
    setFilteredBarangays([]);
  };

  const handleCityChange = (cityCode: string) => {
    setAdmin({
      ...admin,
      city: cityCode,
      barangay: "",
    });
    setFilteredBarangays(barangay.filter((b) => b.city_code === cityCode));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="max-w-3xl mx-auto shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
          <CardDescription>
            View and update your admin account details.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSave} className="space-y-5">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={admin.name}
                  onChange={(e) =>
                    setAdmin({ ...admin, name: e.target.value })
                  }
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  value={admin.email}
                  onChange={(e) =>
                    setAdmin({ ...admin, email: e.target.value })
                  }
                  placeholder="Email address"
                  type="email"
                />
              </div>

              <div>
                <Label>Contact Number</Label>
                <Input
                  value={admin.contact_number || ""}
                  onChange={(e) =>
                    setAdmin({ ...admin, contact_number: e.target.value })
                  }
                  placeholder="09XXXXXXXXX"
                />
              </div>
            </div>

            {/* Address Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Region Dropdown */}
              <div>
                <Label>Region</Label>
                <select
                  value={admin.region || ""}
                  onChange={(e) => handleRegionChange(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r.region_code} value={r.region_code}>
                      {r.region_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Province Dropdown */}
              <div>
                <Label>Province</Label>
                <select
                  value={admin.province || ""}
                  onChange={(e) => handleProvinceChange(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Select Province</option>
                  {filteredProvinces.map((p) => (
                    <option key={p.province_code} value={p.province_code}>
                      {p.province_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Dropdown */}
              <div>
                <Label>City</Label>
                <select
                  value={admin.city || ""}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Select City</option>
                  {filteredCities.map((c) => (
                    <option key={c.city_code} value={c.city_code}>
                      {c.city_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Barangay Dropdown */}
              <div>
                <Label>Barangay</Label>
                <select
                  value={admin.barangay || ""}
                  onChange={(e) =>
                    setAdmin({ ...admin, barangay: e.target.value })
                  }
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Select Barangay</option>
                  {filteredBarangays.map((b) => (
                    <option key={b.brgy_code} value={b.brgy_code}>
                      {b.brgy_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Street Address</Label>
                <Input
                  value={admin.street_address || ""}
                  onChange={(e) =>
                    setAdmin({ ...admin, street_address: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Postal Code</Label>
                <Input
                  value={admin.postal_code || ""}
                  onChange={(e) =>
                    setAdmin({ ...admin, postal_code: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
