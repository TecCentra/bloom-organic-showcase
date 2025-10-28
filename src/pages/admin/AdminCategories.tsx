// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from '@/components/ui/table';
// import { 
//   Plus, 
//   Search, 
//   Edit, 
//   Trash2, 
//   FolderOpen,
//   Image as ImageIcon
// } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// const AdminCategories: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   // Mock data - replace with actual API calls
//   const categories = [
//     {
//       id: 1,
//       name: 'Herbs & Spices',
//       description: 'Organic herbs and spices for cooking and wellness',
//       productCount: 24,
//       image: '/src/assets/category-herbs.jpg',
//       status: 'active',
//       createdAt: '2024-01-10'
//     },
//     {
//       id: 2,
//       name: 'Weight Loss',
//       description: 'Natural supplements for healthy weight management',
//       productCount: 18,
//       image: '/src/assets/category-weightloss.jpg',
//       status: 'active',
//       createdAt: '2024-01-08'
//     },
//     {
//       id: 3,
//       name: 'Gut Health',
//       description: 'Probiotics and digestive health products',
//       productCount: 12,
//       image: '/src/assets/category-guthealth.jpg',
//       status: 'active',
//       createdAt: '2024-01-05'
//     },
//     {
//       id: 4,
//       name: 'Cleansers',
//       description: 'Natural cleansing and detox products',
//       productCount: 8,
//       image: '/src/assets/category-cleansers.jpg',
//       status: 'inactive',
//       createdAt: '2024-01-03'
//     }
//   ];

//   const filteredCategories = categories.filter(category =>
//     category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     category.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'active':
//         return <Badge className="bg-green-100 text-green-800">Active</Badge>;
//       case 'inactive':
//         return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
//       default:
//         return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
//     }
//   };

//   const handleEdit = (category: any) => {
//     setSelectedCategory(category);
//     setIsEditModalOpen(true);
//   };

//   const handleDelete = (categoryId: number) => {
//     // Implement delete logic
//     console.log('Delete category:', categoryId);
//   };

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
//           <p className="text-gray-600 text-sm">Manage product categories</p>
//         </div>
//         <Button onClick={() => setIsCreateModalOpen(true)}>
//           <Plus className="h-4 w-4 mr-2" />
//           Add Category
//         </Button>
//       </div>

//       {/* Search */}
//       <Card>
//         <CardContent className="p-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               placeholder="Search categories..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Categories Table */}
//       <Card>
//         <CardHeader className="pb-3">
//           <CardTitle className="text-lg">All Categories ({filteredCategories.length})</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Image</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Products</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Created</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredCategories.map((category) => (
//                 <TableRow key={category.id}>
//                   <TableCell>
//                     <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//                       <FolderOpen className="h-6 w-6 text-gray-400" />
//                     </div>
//                   </TableCell>
//                   <TableCell className="font-medium">{category.name}</TableCell>
//                   <TableCell className="max-w-xs truncate">{category.description}</TableCell>
//                   <TableCell>{category.productCount}</TableCell>
//                   <TableCell>{getStatusBadge(category.status)}</TableCell>
//                   <TableCell>{category.createdAt}</TableCell>
//                   <TableCell>
//                     <div className="flex space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleEdit(category)}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleDelete(category.id)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Create Category Modal */}
//       <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Create New Category</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-medium text-gray-700">Category Name</label>
//               <Input placeholder="Enter category name" />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-700">Description</label>
//               <textarea 
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 rows={3}
//                 placeholder="Enter category description"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-700">Category Image</label>
//               <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                   <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
//                   <div className="flex text-sm text-gray-600">
//                     <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
//                       <span>Upload a file</span>
//                       <input type="file" className="sr-only" />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={() => setIsCreateModalOpen(false)}>
//                 Create Category
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Edit Category Modal */}
//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Edit Category</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-medium text-gray-700">Category Name</label>
//               <Input 
//                 placeholder="Enter category name" 
//                 defaultValue={selectedCategory?.name || ''}
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-700">Description</label>
//               <textarea 
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 rows={3}
//                 placeholder="Enter category description"
//                 defaultValue={selectedCategory?.description || ''}
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-700">Status</label>
//               <select className="w-full p-3 border border-gray-300 rounded-md">
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={() => setIsEditModalOpen(false)}>
//                 Update Category
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminCategories;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  FolderOpen,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { buildApiUrl, API_CONFIG } from '@/lib/config';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';
import { useMaterialToast } from '@/hooks/useMaterialToast';

const AdminCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { adminToken } = useAdminAuth();
  const { confirm } = useMaterialConfirm();
  const { toast } = useMaterialToast();

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent_id: ''
  });

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.CATEGORIES}?includeProducts=false`), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken && { 'Authorization': `Bearer ${adminToken}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Categories API response:', data); // Debug log
      
      // Handle different response structures
      let categoriesList = [];
      if (data.data && data.data.categories) {
        console.log('Setting categories from data.data.categories:', data.data.categories);
        categoriesList = data.data.categories;
      } else if (data.data && Array.isArray(data.data)) {
        console.log('Setting categories from data.data:', data.data);
        categoriesList = data.data;
      } else if (Array.isArray(data)) {
        console.log('Setting categories from data:', data);
        categoriesList = data;
      } else {
        console.log('No categories found, setting empty array');
        categoriesList = [];
      }
      
      // Sort by created_at descending (newest first)
      const sortedCategories = [...categoriesList].sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA; // Descending order
      });
      
      setCategories(sortedCategories);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = Array.isArray(categories) ? categories.filter(category =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Debug log to see what categories we have
  console.log('Categories state:', categories);
  console.log('Filtered categories:', filteredCategories);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleCreateCategory = async () => {
    try {
      setSubmitting(true);
      const slug = formData.slug || generateSlug(formData.name);
      
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.PUBLIC.CATEGORIES), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken && { 'Authorization': `Bearer ${adminToken}` }),
        },
        body: JSON.stringify({
          name: formData.name,
          slug: slug,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create category');
      }
      
      await fetchCategories();
      setIsCreateModalOpen(false);
      setFormData({ name: '', slug: '', description: '', parent_id: '' });
      toast({
        title: 'Success',
        description: 'Category created successfully',
        variant: 'success',
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
      console.error('Error creating category:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!selectedCategory) return;
    
    try {
      setSubmitting(true);
      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.CATEGORIES}/${selectedCategory.category_id || selectedCategory.id}`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken && { 'Authorization': `Bearer ${adminToken}` }),
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update category');
      }
      
      await fetchCategories();
      setIsEditModalOpen(false);
      setSelectedCategory(null);
      setFormData({ name: '', slug: '', description: '', parent_id: '' });
      toast({
        title: 'Success',
        description: 'Category updated successfully',
        variant: 'success',
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
      console.error('Error updating category:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    const confirmed = await confirm({
      title: 'Delete Category',
      message: 'Are you sure you want to delete this category? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmColor: 'error',
    });
    
    if (!confirmed) return;
    
    try {
      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.CATEGORIES}/${categoryId}`), {
        method: 'DELETE',
        headers: {
          ...(adminToken && { 'Authorization': `Bearer ${adminToken}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete category');
      }
      
      await fetchCategories();
      toast({
        title: 'Success',
        description: 'Category deleted successfully',
        variant: 'success',
      });
    } catch (err: any) {
      setError(err.message);
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
      console.error('Error deleting category:', err);
    }
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name || '',
      slug: category.slug || '',
      description: category.description || '',
      parent_id: category.parent_id || '',
    });
    setIsEditModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setFormData({ name: '', slug: '', description: '', parent_id: '' });
    setIsCreateModalOpen(true);
  };

  const getStatusBadge = (category: any) => {
    const isActive = category.status === 'active' || !category.status;
    return isActive 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-800">Error loading categories: {error}</p>
            <Button onClick={fetchCategories} className="mt-2">Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 text-sm">Manage product categories</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={fetchCategories} 
            variant="outline" 
            size="sm"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleOpenCreateModal}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">All Categories ({filteredCategories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No categories found
                  </TableCell>
                </TableRow>
              ) : (
                Array.isArray(filteredCategories) && filteredCategories.map((category) => (
                  <TableRow key={category.category_id || category.id}>
                    <TableCell>
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FolderOpen className="h-6 w-6 text-gray-400" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-sm text-gray-600">{category.slug}</TableCell>
                    <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                    <TableCell>{getStatusBadge(category)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(category.category_id || category.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Category Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Category Name *</label>
              <Input 
                placeholder="Enter category name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Slug</label>
              <Input 
                placeholder="auto-generated-from-name" 
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from name</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter category description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsCreateModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateCategory}
                disabled={submitting || !formData.name}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Category'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Category Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Category Name *</label>
              <Input 
                placeholder="Enter category name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Slug</label>
              <Input 
                placeholder="category-slug" 
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter category description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Parent Category ID</label>
              <Input 
                placeholder="Optional parent category ID" 
                value={formData.parent_id}
                onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty for top-level category</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateCategory}
                disabled={submitting || !formData.name}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Category'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategories;