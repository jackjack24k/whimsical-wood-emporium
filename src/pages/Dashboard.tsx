
import { useAuth } from '@/context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, User, Settings, LogOut, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  // Redirect to auth page if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // Get user's initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-3">
          <div className="bg-cream-light p-6 rounded-lg border sticky top-24">
            <div className="flex items-center space-x-3 mb-6">
              <Avatar className="h-12 w-12 border-2 border-sage">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                <AvatarFallback className="bg-sage text-white">
                  {user?.name ? getInitials(user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/dashboard" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  My Account
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/dashboard" className="flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  My Orders
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/dashboard" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-9">
          <h1 className="text-3xl font-serif font-bold text-wood-dark mb-6">My Dashboard</h1>
          
          <Tabs defaultValue="account">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    View and edit your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <p className="mt-1">{user?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email Address</label>
                      <p className="mt-1">{user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Account Type</label>
                      <p className="mt-1">{user?.isAdmin ? 'Administrator' : 'Customer'}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    View and track your orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                    <p className="mt-1 text-muted-foreground">
                      When you place orders, they'll appear here
                    </p>
                    <Button className="mt-4" asChild>
                      <Link to="/products">Start Shopping</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Update your password to keep your account secure
                      </p>
                      <Button className="mt-2" variant="outline">Change Password</Button>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-medium">Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure how you receive notifications about orders and updates
                      </p>
                      <Button className="mt-2" variant="outline">Manage Notifications</Button>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-medium text-red-600">Delete Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </p>
                      <Button className="mt-2" variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
