import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockPPSLocations, mockResources } from "@/data/mockData";
import { 
  MapPin, 
  Users, 
  Bed, 
  Stethoscope, 
  Heart,
  Package,
  Plus,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Pill,
  Shirt
} from "lucide-react";
import { toast } from "sonner";

const PPSTracking = () => {
  const [selectedPPS, setSelectedPPS] = useState(mockPPSLocations[0]);

  const getOccupancyColor = (current: number, total: number) => {
    const percentage = (current / total) * 100;
    if (percentage >= 90) return "destructive";
    if (percentage >= 70) return "warning";
    return "success";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge variant="success"><CheckCircle2 className="mr-1 h-3 w-3" />Operational</Badge>;
      case "near-capacity":
        return <Badge variant="warning"><AlertTriangle className="mr-1 h-3 w-3" />Near Capacity</Badge>;
      case "full":
        return <Badge variant="critical"><AlertTriangle className="mr-1 h-3 w-3" />Full</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Food & Water":
        return <Droplets className="h-4 w-4" />;
      case "Medical":
        return <Pill className="h-4 w-4" />;
      case "Bedding":
        return <Bed className="h-4 w-4" />;
      case "Hygiene":
        return <Shirt className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStockStatus = (quantity: number, minStock: number) => {
    if (quantity <= minStock * 0.5) return { variant: "critical" as const, label: "Low Stock" };
    if (quantity <= minStock) return { variant: "warning" as const, label: "Reorder Soon" };
    return { variant: "success" as const, label: "In Stock" };
  };

  return (
    <PageLayout 
      title="Real-Time PPS Tracking" 
      subtitle="Monitor evacuation centers and resource allocation"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Map Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map Placeholder */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                PPS Locations Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-[300px] bg-gradient-to-br from-primary/5 to-accent/20">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                
                {/* PPS Markers */}
                <div className="absolute inset-0 p-4">
                  {mockPPSLocations.map((pps, index) => (
                    <button
                      key={pps.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                        selectedPPS.id === pps.id ? 'scale-125 z-10' : 'hover:scale-110'
                      }`}
                      style={{
                        left: `${20 + index * 30}%`,
                        top: `${30 + index * 20}%`,
                      }}
                      onClick={() => setSelectedPPS(pps)}
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg ${
                        pps.status === 'near-capacity' ? 'bg-warning' : 'bg-primary'
                      }`}>
                        <MapPin className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium px-2 py-1 rounded ${
                        selectedPPS.id === pps.id ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border'
                      }`}>
                        {pps.name.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border">
                  <p className="text-xs font-medium mb-2">Legend</p>
                  <div className="flex gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-primary" /> Operational
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-warning" /> Near Capacity
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected PPS Details */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{selectedPPS.name}</CardTitle>
                {getStatusBadge(selectedPPS.status)}
              </div>
              <p className="text-sm text-muted-foreground">{selectedPPS.address}</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Capacity */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Capacity</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{selectedPPS.currentOccupancy} / {selectedPPS.totalCapacity}</span>
                      <span className="text-muted-foreground">
                        {Math.round((selectedPPS.currentOccupancy / selectedPPS.totalCapacity) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(selectedPPS.currentOccupancy / selectedPPS.totalCapacity) * 100}
                      className="h-2"
                    />
                  </div>
                </div>

                {/* Beds Available */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Bed className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Beds Available</span>
                  </div>
                  <p className="text-2xl font-bold">{selectedPPS.bedsAvailable}</p>
                  <p className="text-xs text-muted-foreground">beds remaining</p>
                </div>

                {/* Volunteers */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Volunteers</span>
                  </div>
                  <p className="text-2xl font-bold">{selectedPPS.volunteers}</p>
                  <p className="text-xs text-muted-foreground">on duty</p>
                </div>

                {/* Medical Staff */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Stethoscope className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Medical Staff</span>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-lg font-bold">{selectedPPS.doctors}</p>
                      <p className="text-xs text-muted-foreground">Doctors</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{selectedPPS.nurses}</p>
                      <p className="text-xs text-muted-foreground">Nurses</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Last updated: {new Date(selectedPPS.lastUpdated).toLocaleString('en-MY')}
              </p>
            </CardContent>
          </Card>

          {/* Resource Inventory */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5 text-primary" />
                  Resource Inventory
                </CardTitle>
                <Button size="sm" onClick={() => toast.success("Resource registration opened")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Resource
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Min Stock</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockResources.map((resource) => {
                      const status = getStockStatus(resource.quantity, resource.minStock);
                      return (
                        <TableRow key={resource.id}>
                          <TableCell className="font-medium">{resource.name}</TableCell>
                          <TableCell>
                            <span className="flex items-center gap-2">
                              {getCategoryIcon(resource.category)}
                              {resource.category}
                            </span>
                          </TableCell>
                          <TableCell>
                            {resource.quantity} {resource.unit}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {resource.minStock} {resource.unit}
                          </TableCell>
                          <TableCell>
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Quick Actions & All PPS List */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Resource registration modal")}>
                <Package className="mr-2 h-4 w-4" />
                Register New Resources
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Transfer resources modal")}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Transfer Resources
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Request supplies modal")}>
                <Plus className="mr-2 h-4 w-4" />
                Request Supplies
              </Button>
            </CardContent>
          </Card>

          {/* All PPS List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">All PPS Centers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockPPSLocations.map((pps) => (
                <button
                  key={pps.id}
                  className={`w-full text-left rounded-lg border p-3 transition-colors ${
                    selectedPPS.id === pps.id 
                      ? 'border-primary bg-accent' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedPPS(pps)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{pps.name}</span>
                    {getStatusBadge(pps.status)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Occupancy</span>
                      <span>{pps.currentOccupancy}/{pps.totalCapacity}</span>
                    </div>
                    <Progress 
                      value={(pps.currentOccupancy / pps.totalCapacity) * 100}
                      className="h-1.5"
                    />
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-warning/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg bg-warning/10 p-3 border border-warning/20">
                <p className="text-sm font-medium">Dewan Komuniti Setapak</p>
                <p className="text-xs text-muted-foreground">Near capacity (98.7%)</p>
              </div>
              <div className="rounded-lg bg-destructive/10 p-3 border border-destructive/20">
                <p className="text-sm font-medium">Low Stock Alert</p>
                <p className="text-xs text-muted-foreground">Blankets below minimum (85/100)</p>
              </div>
              <div className="rounded-lg bg-destructive/10 p-3 border border-destructive/20">
                <p className="text-sm font-medium">Critical Medical Supply</p>
                <p className="text-xs text-muted-foreground">Insulin Pens running low (12/20)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default PPSTracking;
