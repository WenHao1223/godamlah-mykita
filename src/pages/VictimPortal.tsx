import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { mockMissingReports, mockVictims, mockRequests } from "@/data/mockData";
import { 
  UserCircle, 
  Search,
  PawPrint,
  Plus,
  Clock,
  CheckCircle2,
  MapPin,
  Phone,
  AlertCircle,
  Package
} from "lucide-react";
import { toast } from "sonner";

const VictimPortal = () => {
  // Simulating logged in victim
  const currentVictim = mockVictims[1]; // Siti Nurhaliza
  
  const [newMissing, setNewMissing] = useState({
    type: "",
    name: "",
    relationship: "",
    description: "",
    lastLocation: "",
    phone: "",
  });

  const [newRequest, setNewRequest] = useState({
    category: "",
    item: "",
    quantity: "",
    urgency: "",
  });

  const handleSubmitMissing = () => {
    if (newMissing.type && newMissing.name && newMissing.description) {
      toast.success("Missing report submitted successfully");
      setNewMissing({
        type: "",
        name: "",
        relationship: "",
        description: "",
        lastLocation: "",
        phone: "",
      });
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleSubmitRequest = () => {
    if (newRequest.category && newRequest.item) {
      toast.success("Request submitted successfully");
      setNewRequest({
        category: "",
        item: "",
        quantity: "",
        urgency: "",
      });
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "searching":
        return <Badge variant="warning"><Clock className="mr-1 h-3 w-3" />Searching</Badge>;
      case "found":
        return <Badge variant="success"><CheckCircle2 className="mr-1 h-3 w-3" />Found</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const myRequests = mockRequests.filter(r => r.victimId === currentVictim.id);
  const myMissingReports = mockMissingReports.filter(r => r.reporterId === currentVictim.id);

  return (
    <PageLayout 
      title="Victim Portal" 
      subtitle="Report missing persons/pets and submit new requests"
    >
      <div className="space-y-6">
        {/* User Info Card */}
        <Card className="border-primary/20 bg-accent/30">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <UserCircle className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Logged in via MyDigitalID</p>
              <p className="font-semibold text-lg">{currentVictim.name}</p>
              <p className="text-sm text-muted-foreground">
                <MapPin className="inline h-3 w-3 mr-1" />
                {currentVictim.ppsLocation} · Bed {currentVictim.bedNumber}
              </p>
            </div>
            <Badge variant="info">Verified</Badge>
          </CardContent>
        </Card>

        <Tabs defaultValue="missing" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="missing" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Missing Reports
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              My Requests
            </TabsTrigger>
          </TabsList>

          {/* Missing Reports Tab */}
          <TabsContent value="missing" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Report New Missing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    Report Missing Person / Pet
                  </CardTitle>
                  <CardDescription>
                    Help us locate your loved ones or pets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Type *</Label>
                    <Select 
                      value={newMissing.type}
                      onValueChange={(value) => setNewMissing({...newMissing, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="person">
                          <span className="flex items-center gap-2">
                            <UserCircle className="h-4 w-4" />
                            Person
                          </span>
                        </SelectItem>
                        <SelectItem value="pet">
                          <span className="flex items-center gap-2">
                            <PawPrint className="h-4 w-4" />
                            Pet
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input 
                      placeholder="Full name"
                      value={newMissing.name}
                      onChange={(e) => setNewMissing({...newMissing, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Relationship</Label>
                    <Input 
                      placeholder="e.g., Father, Sister, Pet Cat"
                      value={newMissing.relationship}
                      onChange={(e) => setNewMissing({...newMissing, relationship: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description *</Label>
                    <Textarea 
                      placeholder="Age, appearance, what they were wearing, any identifying features..."
                      value={newMissing.description}
                      onChange={(e) => setNewMissing({...newMissing, description: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Last Known Location</Label>
                    <Input 
                      placeholder="Where were they last seen?"
                      value={newMissing.lastLocation}
                      onChange={(e) => setNewMissing({...newMissing, lastLocation: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Contact Number (if different from yours)</Label>
                    <Input 
                      placeholder="Alternative contact number"
                      value={newMissing.phone}
                      onChange={(e) => setNewMissing({...newMissing, phone: e.target.value})}
                    />
                  </div>

                  <Button onClick={handleSubmitMissing} className="w-full">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Submit Report
                  </Button>
                </CardContent>
              </Card>

              {/* My Missing Reports */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    My Reports
                  </CardTitle>
                  <CardDescription>
                    Track the status of your missing reports
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {myMissingReports.length > 0 ? (
                    myMissingReports.map((report) => (
                      <div key={report.id} className="rounded-lg border p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {report.type === 'person' ? (
                              <UserCircle className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <PawPrint className="h-5 w-5 text-muted-foreground" />
                            )}
                            <span className="font-medium">{report.name}</span>
                          </div>
                          {getStatusBadge(report.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{report.relationship}</p>
                        <p className="text-sm mb-2">{report.description}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {report.lastLocation}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Reported: {new Date(report.createdAt).toLocaleString('en-MY')}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No missing reports submitted</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Submit New Request */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    Submit New Request
                  </CardTitle>
                  <CardDescription>
                    Request supplies or assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select 
                      value={newRequest.category}
                      onValueChange={(value) => setNewRequest({...newRequest, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hygiene">Hygiene Products</SelectItem>
                        <SelectItem value="food">Food & Water</SelectItem>
                        <SelectItem value="medical">Medical Supplies</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="baby">Baby Supplies</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Item Description *</Label>
                    <Input 
                      placeholder="What do you need?"
                      value={newRequest.item}
                      onChange={(e) => setNewRequest({...newRequest, item: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input 
                      placeholder="How many?"
                      value={newRequest.quantity}
                      onChange={(e) => setNewRequest({...newRequest, quantity: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Urgency</Label>
                    <Select 
                      value={newRequest.urgency}
                      onValueChange={(value) => setNewRequest({...newRequest, urgency: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Can wait a few days</SelectItem>
                        <SelectItem value="normal">Normal - Within 24 hours</SelectItem>
                        <SelectItem value="high">High - Urgent need</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleSubmitRequest} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Submit Request
                  </Button>

                  {/* Quick Request Buttons */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-3">Quick Requests</p>
                    <div className="flex flex-wrap gap-2">
                      {["Sanitary Pads", "Milk", "Diapers", "Blanket", "Phone Charger"].map((item) => (
                        <Button 
                          key={item}
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setNewRequest({...newRequest, item, category: 'hygiene'});
                            toast.info(`${item} added to request`);
                          }}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* My Requests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    My Requests
                  </CardTitle>
                  <CardDescription>
                    Track the status of your requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {myRequests.length > 0 ? (
                    myRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium text-sm">{request.item}</p>
                          <p className="text-xs text-muted-foreground">{request.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(request.createdAt).toLocaleString('en-MY')}
                          </p>
                        </div>
                        <Badge 
                          variant={
                            request.status === 'fulfilled' ? 'success' :
                            request.status === 'approved' ? 'info' :
                            'warning'
                          }
                        >
                          {request.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                          {request.status === 'approved' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                          {request.status === 'fulfilled' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No requests submitted yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="bg-muted/50">
          <CardContent className="flex items-center gap-4 py-4">
            <Phone className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium">Need immediate help?</p>
              <p className="text-sm text-muted-foreground">
                Contact the PPS help desk or call the emergency hotline: <span className="font-mono font-medium">999</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default VictimPortal;
