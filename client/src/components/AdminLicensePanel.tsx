
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Users, BarChart3 } from 'lucide-react';
import { LicenseGenerator } from './LicenseGenerator';
import { LicenseManager } from './LicenseManager';

export const AdminLicensePanel: React.FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-6 h-6" />
            License Administration
          </CardTitle>
          <CardDescription>
            Generate and manage licenses for clinic customers
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="generator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Generate License
          </TabsTrigger>
          <TabsTrigger value="manager" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Manage Licenses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          <LicenseGenerator />
        </TabsContent>

        <TabsContent value="manager">
          <LicenseManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
