
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, RefreshCw, Eye, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface License {
  license_id: string;
  customer_name: string;
  contact_email: string;
  license_key: string;
  license_type: string;
  status: string;
  expires_at: string | null;
  max_users: number;
  max_patients: number;
  created_at: string;
}

export const LicenseManager: React.FC = () => {
  const { toast } = useToast();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [filteredLicenses, setFilteredLicenses] = useState<License[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchLicenses = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest('/api/rpc/get_all_licenses');

      setLicenses(data || []);
      setFilteredLicenses(data || []);
    } catch (error) {
      console.error('Error fetching licenses:', error);
      toast({
        title: "Error",
        description: "An error occurred while fetching licenses",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredLicenses(licenses);
    } else {
      const filtered = licenses.filter(license =>
        license.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.contact_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.license_key.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLicenses(filtered);
    }
  }, [searchTerm, licenses]);

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

  const getStatusBadge = (status: string, expiresAt: string | null) => {
    if (status === 'active' && expiresAt && new Date(expiresAt) < new Date()) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      case 'suspended':
        return <Badge variant="secondary">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLicenseTypeBadge = (type: string) => {
    switch (type) {
      case 'trial':
        return <Badge variant="secondary">Trial</Badge>;
      case 'premium':
        return <Badge variant="default">Premium</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          Loading licenses...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          License Management
        </CardTitle>
        <CardDescription>
          View and manage all generated licenses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by clinic, email, or license key..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={fetchLicenses}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clinic</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>License Key</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Users/Patients</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLicenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? 'No licenses match your search' : 'No licenses found'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredLicenses.map((license) => (
                  <TableRow key={license.license_id}>
                    <TableCell className="font-medium">
                      {license.customer_name}
                    </TableCell>
                    <TableCell>{license.contact_email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {license.license_key}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(license.license_key)}
                        >
                          {copiedKey === license.license_key ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getLicenseTypeBadge(license.license_type)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(license.status, license.expires_at)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{license.max_users} users</div>
                        <div className="text-muted-foreground">
                          {license.max_patients.toLocaleString()} patients
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {license.expires_at ? (
                        <div className="text-sm">
                          {new Date(license.expires_at).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Never</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(license.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>
            Showing {filteredLicenses.length} of {licenses.length} licenses
          </span>
          <div className="flex gap-4">
            <span>Active: {licenses.filter(l => l.status === 'active').length}</span>
            <span>Trial: {licenses.filter(l => l.license_type === 'trial').length}</span>
            <span>Premium: {licenses.filter(l => l.license_type === 'premium').length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
