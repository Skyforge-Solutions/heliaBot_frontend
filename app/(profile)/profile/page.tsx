'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { CheckCircle, LogOut, User, Eye, EyeOff, Pencil, Trash2, Plus, X, Save } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

// Define user data type
type ChildData = {
  name: string;
  age: number;
  gender: string;
  description: string;
};

type UserData = {
  name: string;
  email: string;
  isVerified: boolean;
  dob: string;
  preferences: {
    communicationStyle: string;
    timeWithChildren: string;
    gender: string;
    techExpertise: string;
  };
  children: Array<ChildData>;
};

export default function ProfilePage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isEditingChild, setIsEditingChild] = useState<number | null>(null);
  const [childFormData, setChildFormData] = useState<ChildData>({
    name: '',
    age: 0,
    gender: '',
    description: ''
  });
  const [childFormErrors, setChildFormErrors] = useState<{
    name?: string;
    age?: string;
    gender?: string;
  }>({});
  
  // Use resolvedTheme instead of managing a separate state
  // This avoids the hydration mismatch issue
  
  // Fetch user data from API
  const { data: userData, error, isLoading, mutate } = useSWR<UserData>('/api/profile', fetcher, {
    // Fallback to empty data structure if API fails
    fallbackData: {
      name: '',
      email: '',
      isVerified: false,
      dob: '',
      preferences: {
        communicationStyle: '',
        timeWithChildren: '',
        gender: '',
        techExpertise: '',
      },
      children: [],
    },
  });

  // We don't need formData anymore since we're using userData directly
  // and updating it via mutate

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  // Handle preference changes
  const handlePreferenceChange = (field: string, value: string) => {
    if (!userData) return;
    
    // Update userData via mutate
    mutate({
      ...userData,
      preferences: {
        ...userData.preferences,
        [field]: value
      }
    }, false);

    // In a real app, we would save this to the backend
    // For now, we'll just show a toast notification
    toast.success(`${field} updated to ${value}`);
  };

  // Handle child form input changes
  const handleChildInputChange = (field: keyof ChildData, value: string | number) => {
    setChildFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for the field being edited
    if (childFormErrors[field as keyof typeof childFormErrors]) {
      setChildFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Validate child form data
  const validateChildForm = (): boolean => {
    const errors: {
      name?: string;
      age?: string;
      gender?: string;
    } = {};
    
    // Check for empty name
    if (!childFormData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    // Check for duplicate name if adding a new child
    if (isAddingChild && userData?.children.some(child => 
      child.name.toLowerCase() === childFormData.name.toLowerCase())) {
      errors.name = 'A child with this name already exists';
    }
    
    // Check for duplicate name if editing (excluding the current child)
    if (isEditingChild !== null && userData?.children.some((child, index) => 
      index !== isEditingChild && 
      child.name.toLowerCase() === childFormData.name.toLowerCase())) {
      errors.name = 'A child with this name already exists';
    }
    
    // Check age range
    if (childFormData.age < 0 || childFormData.age > 18) {
      errors.age = 'Age must be between 0 and 18';
    }
    
    // Check gender
    if (!childFormData.gender) {
      errors.gender = 'Gender is required';
    }
    
    setChildFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Add a new child
  const handleAddChild = () => {
    if (!validateChildForm() || !userData) return;
    
    // Create a new children array with the new child
    const updatedChildren = [...userData.children, childFormData];
    
    // Update the userData via mutate to avoid state conflicts
    mutate({
      ...userData,
      children: updatedChildren
    }, false);
    
    // Reset form and close add mode
    setChildFormData({
      name: '',
      age: 0,
      gender: '',
      description: ''
    });
    setIsAddingChild(false);
    
    toast.success('Child added successfully');
  };

  // Start editing a child
  const handleStartEditChild = (index: number) => {
    if (!userData) return;
    
    setIsEditingChild(index);
    setChildFormData({
      ...userData.children[index]
    });
  };

  // Save edited child
  const handleSaveEditChild = () => {
    if (!validateChildForm() || !userData || isEditingChild === null) return;
    
    const updatedChildren = [...userData.children];
    updatedChildren[isEditingChild] = childFormData;
    
    // Update the userData via mutate to avoid state conflicts
    mutate({
      ...userData,
      children: updatedChildren
    }, false);
    
    // Reset form and close edit mode
    setChildFormData({
      name: '',
      age: 0,
      gender: '',
      description: ''
    });
    setIsEditingChild(null);
    
    toast.success('Child updated successfully');
  };

  // Cancel add/edit child
  const handleCancelChildForm = () => {
    setChildFormData({
      name: '',
      age: 0,
      gender: '',
      description: ''
    });
    setChildFormErrors({});
    setIsAddingChild(false);
    setIsEditingChild(null);
  };

  // Delete a child
  const handleDeleteChild = (index: number) => {
    if (!userData) return;
    
    const updatedChildren = userData.children.filter((_, i) => i !== index);
    
    // Update the userData via mutate to avoid state conflicts
    mutate({
      ...userData,
      children: updatedChildren
    }, false);
    
    toast.success('Child removed successfully');
  };

  // Handle sign out
  const handleSignOut = () => {
    // This would be connected to authentication system in a real app
    toast.success('Signed out successfully');
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 md:px-8 min-h-screen">
      {isLoading ? (
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-60" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              {/* Use a div with background image instead of Next.js Image component to avoid hydration issues */}
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url('https://avatar.vercel.sh/user@example.com')` }}
                role="img"
                aria-label="User avatar"
              />
            </div>
            <div>
              <CardTitle className="text-2xl">User Profile</CardTitle>
              <CardDescription>
                View and manage your profile information
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          {/* User Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">User Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  value={userData.name}
                  readOnly
                  className="bg-gray-50 dark:bg-gray-800"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    value={userData.email}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800 pr-10"
                  />
                  {userData.isVerified && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={showPassword ? "mypassword123" : "••••••••"}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="dob" className="text-sm font-medium">
                  Date of Birth
                </label>
                <Input
                  id="dob"
                  type="date"
                  value={userData.dob}
                  readOnly
                  className="bg-gray-50 dark:bg-gray-800"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Preferences Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="communication-style" className="text-sm font-medium">
                  Communication Style
                </label>
                <Select 
                  value={userData.preferences.communicationStyle || ''}
                  onValueChange={(value) => handlePreferenceChange('communicationStyle', value)}
                >
                  <SelectTrigger id="communication-style">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Friendly">Friendly</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="time-with-children" className="text-sm font-medium">
                  Time Spent with Children
                </label>
                <Select 
                  value={userData.preferences.timeWithChildren || ''}
                  onValueChange={(value) => handlePreferenceChange('timeWithChildren', value)}
                >
                  <SelectTrigger id="time-with-children">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<1hr">&lt;1hr</SelectItem>
                    <SelectItem value="1-3hrs">1-3hrs</SelectItem>
                    <SelectItem value="3-5hrs">3-5hrs</SelectItem>
                    <SelectItem value="5+hrs">5+hrs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="gender" className="text-sm font-medium">
                  Gender
                </label>
                <Select 
                  value={userData.preferences.gender || ''}
                  onValueChange={(value) => handlePreferenceChange('gender', value)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="tech-expertise" className="text-sm font-medium">
                  Tech Expertise
                </label>
                <Select 
                  value={userData.preferences.techExpertise || ''}
                  onValueChange={(value) => handlePreferenceChange('techExpertise', value)}
                >
                  <SelectTrigger id="tech-expertise">
                    <SelectValue placeholder="Select expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle between light and dark theme
              </p>
            </div>
            <Switch
              checked={resolvedTheme === 'dark'}
              onCheckedChange={handleThemeToggle}
              aria-label="Toggle dark mode"
            />
          </div>

          <Separator />

          {/* Children Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Children</h3>
              {!isAddingChild && isEditingChild === null && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsAddingChild(true)}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Child
                </Button>
              )}
            </div>
            
            {/* Add/Edit Child Form */}
            {(isAddingChild || isEditingChild !== null) && (
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium">
                    {isAddingChild ? 'Add New Child' : 'Edit Child'}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancelChildForm}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="child-name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="child-name"
                      value={childFormData.name}
                      onChange={(e) => handleChildInputChange('name', e.target.value)}
                      className={childFormErrors.name ? 'border-red-500' : ''}
                    />
                    {childFormErrors.name && (
                      <p className="text-xs text-red-500">{childFormErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="child-age" className="text-sm font-medium">
                      Age
                    </label>
                    <Input
                      id="child-age"
                      type="number"
                      min="0"
                      max="18"
                      value={childFormData.age}
                      onChange={(e) => handleChildInputChange('age', parseInt(e.target.value) || 0)}
                      className={childFormErrors.age ? 'border-red-500' : ''}
                    />
                    {childFormErrors.age && (
                      <p className="text-xs text-red-500">{childFormErrors.age}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="child-gender" className="text-sm font-medium">
                      Gender
                    </label>
                    <Select
                      value={childFormData.gender}
                      onValueChange={(value) => handleChildInputChange('gender', value)}
                    >
                      <SelectTrigger id="child-gender" className={childFormErrors.gender ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {childFormErrors.gender && (
                      <p className="text-xs text-red-500">{childFormErrors.gender}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2 col-span-1 md:col-span-2">
                    <label htmlFor="child-description" className="text-sm font-medium">
                      Description
                    </label>
                    <Input
                      id="child-description"
                      value={childFormData.description}
                      onChange={(e) => handleChildInputChange('description', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={isAddingChild ? handleAddChild : handleSaveEditChild}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" />
                    {isAddingChild ? 'Add' : 'Save'}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Children List */}
            {userData.children && userData.children.length > 0 ? (
              <div className="space-y-4">
                {userData.children.map((child, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div></div> {/* Empty div for flex spacing */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStartEditChild(index)}
                          disabled={isAddingChild || isEditingChild !== null}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteChild(index)}
                          disabled={isAddingChild || isEditingChild !== null}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Name</p>
                        <p className="text-sm">{child.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Age</p>
                        <p className="text-sm">{child.age}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Gender</p>
                        <p className="text-sm">{child.gender}</p>
                      </div>
                      <div className="col-span-1 md:col-span-3 space-y-1">
                        <p className="text-sm font-medium">Description</p>
                        <p className="text-sm">{child.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No children added yet
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-6">
          <Button 
            variant="destructive" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </CardFooter>
      </Card>
      )}
    </div>
  );
}
