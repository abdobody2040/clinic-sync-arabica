
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Copy, Check, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface LicenseForm {
  clinic_name: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  license_type: 'trial' | 'premium';
  duration_days?: number;
}

interface GeneratedLicense {
  customer_id: string;
  license_key: string;
  expires_at: string;
  clinic_name: string;
  license_type: string;
}

export const LicenseGenerator: React.FC = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [form, setForm] = useState<LicenseForm>({
    clinic_name: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    license_type: 'trial',
    duration_days: 30
  });
  const [generatedLicense, setGeneratedLicense] = useState<GeneratedLicense | null>(null);

  const handleFormChange = (field: keyof LicenseForm, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateLicense = async () => {
    if (!form.clinic_name || !form.contact_email) {
      toast({
        title: "Validation Error",
        description: "Clinic name and email are required",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.rpc('create_customer_license', {
        p_clinic_name: form.clinic_name,
        p_contact_email: form.contact_email,
        p_contact_phone: form.contact_phone || null,
        p_address: form.address || null,
        p_license_type: form.license_type,
        p_duration_days: form.license_type === 'trial' ? (form.duration_days || 30) : 365
      });

      if (error) {
        console.error('License generation error:', error);
        toast({
          title: "Generation Failed",
          description: error.message || "Failed to generate license",
          variant: "destructive"
        });
        return;
      }

      const licenseData = data?.[0];
      if (licenseData) {
        setGeneratedLicense({
          customer_id: licenseData.customer_id,
          license_key: licenseData.license_key,
          expires_at: licenseData.expires_at,
          clinic_name: form.clinic_name,
          license_type: form.license_type
        });

        toast({
          title: "License Generated Successfully",
          description: `${form.license_type.toUpperCase()} license created for ${form.clinic_name}`,
        });

        // Reset form
        setForm({
          clinic_name: '',
          contact_email: '',
          contact_phone: '',
          address: '',
          license_type: 'trial',
          duration_days: 30
        });
      }

    } catch (error) {
      console.error('License generation failed:', error);
      toast({
        title: "Generation Failed",
        description: "An error occurred while generating the license",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(text);
      toast({
        title: "Copied",
        description: "License key copied to clipboard",
      });
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const getLicenseTypeInfo = (type: string) => {
    switch (type) {
      case 'trial':
        return {
          badge: 'secondary',
          users: 1,
          patients: 50,
          features: 'Basic features only'
        };
      case 'premium':
        return {
          badge: 'default',
          users: 20,
          patients: 10000,
          features: 'Full features including API access'
        };
      default:
        return { badge: 'secondary', users: 1, patients: 50, features: 'Basic features' };
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            License Generator
          </CardTitle>
          <CardDescription>
            Generate unique license keys for clinics purchasing your software
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinic_name">Clinic Name *</Label>
              <Input
                id="clinic_name"
                placeholder="Enter clinic name"
                value={form.clinic_name}
                onChange={(e) => handleFormChange('clinic_name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email *</Label>
              <Input
                id="contact_email"
                type="email"
                placeholder="contact@clinic.com"
                value={form.contact_email}
                onChange={(e) => handleFormChange('contact_email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                placeholder="+1 234 567 8900"
                value={form.contact_phone}
                onChange={(e) => handleFormChange('contact_phone', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="license_type">License Type</Label>
              <Select
                value={form.license_type}
                onValueChange={(value: 'trial' | 'premium') => handleFormChange('license_type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trial">Trial - 1 user, 50 patients</SelectItem>
                  <SelectItem value="premium">Premium - 20 users, 10,000 patients</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              placeholder="Enter clinic address"
              value={form.address}
              onChange={(e) => handleFormChange('address', e.target.value)}
              rows={2}
            />
          </div>

          {form.license_type === 'trial' && (
            <div className="space-y-2">
              <Label htmlFor="duration_days">Trial Duration (Days)</Label>
              <Input
                id="duration_days"
                type="number"
                min="1"
                max="365"
                value={form.duration_days}
                onChange={(e) => handleFormChange('duration_days', parseInt(e.target.value) || 30)}
              />
            </div>
          )}

          <Button 
            onClick={handleGenerateLicense}
            disabled={isGenerating}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating License...' : 'Generate License'}
          </Button>
        </CardContent>
      </Card>

      {generatedLicense && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">License Generated Successfully!</CardTitle>
            <CardDescription className="text-green-600">
              New license created for {generatedLicense.clinic_name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-green-700">License Key</Label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 px-3 py-2 bg-white border rounded font-mono text-sm">
                    {generatedLicense.license_key}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generatedLicense.license_key)}
                  >
                    {copiedKey === generatedLicense.license_key ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-green-700">License Type</Label>
                <div className="mt-1">
                  <Badge variant={getLicenseTypeInfo(generatedLicense.license_type).badge as any}>
                    {generatedLicense.license_type.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <Label className="text-green-700">Max Users</Label>
                <p className="font-semibold">{getLicenseTypeInfo(generatedLicense.license_type).users}</p>
              </div>
              <div>
                <Label className="text-green-700">Max Patients</Label>
                <p className="font-semibold">{getLicenseTypeInfo(generatedLicense.license_type).patients.toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-green-700">Expires</Label>
                <p className="font-semibold">
                  {new Date(generatedLicense.expires_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="text-sm text-green-600 bg-white p-3 rounded border">
              <strong>Features:</strong> {getLicenseTypeInfo(generatedLicense.license_type).features}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
