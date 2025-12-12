import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockVictims, mockMedicalRecords, mockRequests, mockRemarks } from "@/data/mockData";
import { 
  CreditCard, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus,
  Stethoscope,
  ClipboardList,
  MessageSquarePlus
} from "lucide-react";
import { toast } from "sonner";

const VictimRegistration = () => {
  const [selectedVictim, setSelectedVictim] = useState(mockVictims[0]);
  const [newRequest, setNewRequest] = useState({ type: "", item: "" });
  const [newRemark, setNewRemark] = useState("");

  const getMedicalRecord = (victimId: string) => 
    mockMedicalRecords.find(r => r.victimId === victimId);

  const getVictimRequests = (victimId: string) =>
    mockRequests.filter(r => r.victimId === victimId);

  const getVictimRemarks = (victimId: string) =>
    mockRemarks.filter(r => r.victimId === victimId);

  const handleAddRequest = () => {
    if (newRequest.type && newRequest.item) {
      toast.success("Request submitted successfully");
      setNewRequest({ type: "", item: "" });
    }
  };

  const handleAddRemark = () => {
    if (newRemark.trim()) {
      toast.success("Medical remark added");
      setNewRemark("");
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="critical">Critical</Badge>;
      case "warning":
        return <Badge variant="warning">Attention</Badge>;
      default:
        return <Badge variant="success">Normal</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      case "approved":
        return <Badge variant="info"><CheckCircle2 className="mr-1 h-3 w-3" />Approved</Badge>;
      case "fulfilled":
        return <Badge variant="success"><CheckCircle2 className="mr-1 h-3 w-3" />Fulfilled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const selectedMedical = getMedicalRecord(selectedVictim.id);
  const selectedRequests = getVictimRequests(selectedVictim.id);
  const selectedRemarks = getVictimRemarks(selectedVictim.id);

  return (
    <PageLayout 
      title="Victim Registration" 
      subtitle="Manage victim check-ins, medical records, and requests"
    >
      <div className="space-y-6">
        {/* MyKad Scan Simulation */}
        <Card className="border-primary/20 bg-accent/30">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">MyKad Scanner Ready</p>
              <p className="text-sm text-muted-foreground">Scan victim's MyKad to auto-populate details</p>
            </div>
            <Button variant="default">
              Simulate Scan
            </Button>
          </CardContent>
        </Card>

        {/* Victim Details Table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardList className="h-5 w-5 text-primary" />
              Registered Victims
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>NRIC</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>Bed</TableHead>
                    <TableHead>Medical Status</TableHead>
                    <TableHead>Registered</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVictims.map((victim) => {
                    const medical = getMedicalRecord(victim.id);
                    return (
                      <TableRow 
                        key={victim.id}
                        className={`cursor-pointer transition-colors ${selectedVictim.id === victim.id ? 'bg-accent' : 'hover:bg-muted/50'}`}
                        onClick={() => setSelectedVictim(victim)}
                      >
                        <TableCell className="font-mono text-sm">{victim.id}</TableCell>
                        <TableCell className="font-medium">{victim.name}</TableCell>
                        <TableCell className="font-mono text-sm">{victim.nric}</TableCell>
                        <TableCell>{victim.age} / {victim.gender}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{victim.bedNumber}</Badge>
                        </TableCell>
                        <TableCell>
                          {medical && getSeverityBadge(medical.severity)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(victim.registeredAt).toLocaleTimeString('en-MY', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Selected Victim Details */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Medical Records */}
          <Card className={selectedMedical?.severity === 'critical' ? 'border-destructive/50' : ''}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Medical Record
                </span>
                {selectedMedical && getSeverityBadge(selectedMedical.severity)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedMedical ? (
                <>
                  {selectedMedical.severity === 'critical' && (
                    <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                      <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-destructive">Critical Conditions Detected</p>
                        <p className="text-sm text-muted-foreground">This patient requires priority medical attention</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Blood Type</p>
                      <p className="font-semibold">{selectedMedical.bloodType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Checkup</p>
                      <p className="font-semibold">
                        {new Date(selectedMedical.lastCheckup).toLocaleTimeString('en-MY', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Conditions</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMedical.conditions.map((condition, i) => (
                        <Badge key={i} variant={selectedMedical.severity === 'critical' ? 'critical' : 'secondary'}>
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Medications</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedMedical.medications.map((med, i) => (
                        <Badge key={i} variant="outline">{med}</Badge>
                      ))}
                    </div>
                  </div>

                  {selectedMedical.allergies.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Allergies</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMedical.allergies.map((allergy, i) => (
                          <Badge key={i} variant="destructive">{allergy}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground">No medical records found</p>
              )}
            </CardContent>
          </Card>

          {/* Requests Panel */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ClipboardList className="h-5 w-5 text-primary" />
                Victim Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Request List */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedRequests.length > 0 ? (
                  selectedRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium text-sm">{request.item}</p>
                        <p className="text-xs text-muted-foreground">{request.type}</p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No requests submitted</p>
                )}
              </div>

              {/* Add New Request */}
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-3">Add New Request</p>
                <div className="space-y-3">
                  <Select 
                    value={newRequest.type} 
                    onValueChange={(value) => setNewRequest({...newRequest, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Supplies">Supplies</SelectItem>
                      <SelectItem value="Medical">Medical</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Food">Food & Water</SelectItem>
                      <SelectItem value="Hygiene">Hygiene</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    placeholder="Describe the request..."
                    value={newRequest.item}
                    onChange={(e) => setNewRequest({...newRequest, item: e.target.value})}
                  />
                  <Button onClick={handleAddRequest} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Submit Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctor/Nurse Remarks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquarePlus className="h-5 w-5 text-primary" />
              Medical Remarks for {selectedVictim.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Existing Remarks */}
            <div className="space-y-3">
              {selectedRemarks.length > 0 ? (
                selectedRemarks.map((remark) => (
                  <div 
                    key={remark.id} 
                    className={`rounded-lg border p-4 ${
                      remark.severity === 'critical' ? 'border-destructive/30 bg-destructive/5' :
                      remark.severity === 'warning' ? 'border-warning/30 bg-warning/5' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{remark.doctorName}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(remark.createdAt).toLocaleString('en-MY')}
                      </span>
                    </div>
                    <p className="text-sm">{remark.remark}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No medical remarks yet</p>
              )}
            </div>

            {/* Add New Remark */}
            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-3">Add Medical Remark</p>
              <div className="space-y-3">
                <Textarea 
                  placeholder="Enter medical observations, recommendations, or notes..."
                  value={newRemark}
                  onChange={(e) => setNewRemark(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddRemark}>
                  <MessageSquarePlus className="mr-2 h-4 w-4" />
                  Add Remark
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default VictimRegistration;
