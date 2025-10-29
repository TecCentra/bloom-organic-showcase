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
  Eye,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { buildApiUrl, API_CONFIG } from '@/lib/config';
import { Label } from '@/components/ui/label';
import { 
  Loader2,
  RefreshCw
} from 'lucide-react';
import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';
import { useMaterialToast } from '@/hooks/useMaterialToast';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const AdminProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { adminToken } = useAdminAuth();
  const { confirm } = useMaterialConfirm();
  const { toast } = useMaterialToast();

  // Form state for creating products
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    stock_quantity: '',
    sku: '',
    category_id: '',
    is_active: true
  });

  // Form state for editing products
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category_id: '',
  });

  // Image upload state
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!adminToken) return;
      
      try {
        setIsLoading(true);
        setError(null);

        // Fetch products with pagination
        const productsResponse = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS}?page=${currentPage}&limit=10`), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          const productsList = productsData.data?.products || productsData.data || [];
          
          // Sort by created_at descending (newest first)
          const sortedProducts = [...productsList].sort((a, b) => {
            const dateA = new Date(a.created_at || 0).getTime();
            const dateB = new Date(b.created_at || 0).getTime();
            return dateB - dateA; // Descending order
          });
          
          setProducts(sortedProducts);
          setPagination(productsData.data?.pagination);
        } else {
          throw new Error('Failed to fetch products');
        }

        // Fetch categories for dropdown
        const categoriesResponse = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.CATEGORIES}?includeProducts=false`), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          if (categoriesData.data && categoriesData.data.categories) {
            setCategories(categoriesData.data.categories);
          } else if (categoriesData.data && Array.isArray(categoriesData.data)) {
            setCategories(categoriesData.data);
          } else if (Array.isArray(categoriesData)) {
            setCategories(categoriesData);
          }
        } else {
          console.warn('Failed to fetch categories');
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [adminToken, currentPage]);

  // Helper function to get category name from category_id
  const getCategoryName = (categoryId: string | number | null | undefined) => {
    if (!categoryId) return 'No Category';
    
    const categoryIdStr = categoryId.toString();
    const category = categories.find(
      cat => (cat.category_id || cat.id)?.toString() === categoryIdStr
    );
    
    return category?.name || 'No Category';
  };

  const filteredProducts = Array.isArray(products) ? products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category_name && product.category_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.category_id && getCategoryName(product.category_id).toLowerCase().includes(searchTerm.toLowerCase())) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files);
      setSelectedImages(prev => [...prev, ...newImages]);
      
      // Create preview URLs
      const newPreviews = newImages.map(file => URL.createObjectURL(file));
      setImagePreview(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => {
      URL.revokeObjectURL(prev[index]); // Clean up the object URL
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadImages = async (productId: string) => {
    if (selectedImages.length === 0) {
      console.log('No images to upload');
      return;
    }

    try {
      console.log('📸 Starting image upload for product:', productId);
      console.log('Number of images to upload:', selectedImages.length);
      
      const formData = new FormData();
      
      // Add each image to the form data
      selectedImages.forEach((image, index) => {
        console.log(`Adding image ${index + 1}:`, {
          name: image.name,
          type: image.type,
          size: image.size
        });
        formData.append('image', image);
      });

      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS}/${productId}/images`);
      console.log('Upload URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
        body: formData,
      });

      console.log('Image upload response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Image upload failed:', errorData);
        throw new Error(errorData.message || 'Failed to upload images');
      }

      const data = await response.json();
      console.log('✅ Images uploaded successfully:', data);
      return data;
    } catch (error) {
      console.error('❌ Error uploading images:', error);
      throw error;
    }
  };

  const handleCreateProduct = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      console.log('🚀 Starting product creation...');
      console.log('Form data:', formData);
      console.log('Selected images count:', selectedImages.length);

      const slug = formData.slug || generateSlug(formData.name);
      
      const payload = {
        name: formData.name,
        slug: slug,
        description: formData.description,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        sku: formData.sku,
        category_id: formData.category_id,
        is_active: formData.is_active
      };

      console.log('Product payload:', payload);

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Product creation response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Product created successfully:', data);
        console.log('Full response structure:', JSON.stringify(data, null, 2));
        
        // Get the product ID from the response - try multiple possible locations
        const productId = data.data?.product_id || 
                         data.data?.product?.product_id || 
                         data.data?.id || 
                         data.product_id || 
                         data.id;
        
        console.log('Extracted product ID:', productId);
        console.log('Response data.data:', data.data);
        
        if (!productId) {
          console.error('❌ No product ID found in response');
          console.error('Response data structure:', data);
          toast({
            title: 'Warning',
            description: 'Product created but could not upload images (no product ID)',
            variant: 'default',
          });
          
          // Still close modal and refresh
          setIsCreateModalOpen(false);
          setFormData({
            name: '',
            slug: '',
            description: '',
            price: '',
            stock_quantity: '',
            sku: '',
            category_id: '',
            is_active: true
          });
          setSelectedImages([]);
          setImagePreview([]);
          
          setTimeout(() => {
            window.location.reload();
          }, 1500);
          return; // Exit early
        }
        
        // Only proceed with images if we have a product ID
        if (selectedImages.length > 0) {
          console.log('📤 Proceeding to upload images...');
          try {
            await uploadImages(productId);
            console.log('✅ All images uploaded successfully!');
            toast({
              title: 'Success',
              description: `Product created with ${selectedImages.length} image(s)`,
              variant: 'success',
            });
          } catch (imageError) {
            console.warn('⚠️ Product created but images failed to upload:', imageError);
            toast({
              title: 'Partial Success',
              description: 'Product created but some images failed to upload',
              variant: 'default',
            });
          }
        } else {
          toast({
            title: 'Success',
            description: 'Product created successfully',
            variant: 'success',
          });
        }
        
        // Close modal and clear form
        setIsCreateModalOpen(false);
        setFormData({
          name: '',
          slug: '',
          description: '',
          price: '',
          stock_quantity: '',
          sku: '',
          category_id: '',
          is_active: true
        });
        
        // Clear images
        setSelectedImages([]);
        setImagePreview([]);
        
        // Wait a bit longer before refresh to ensure images are uploaded
        console.log('⏳ Waiting before refresh...');
        setTimeout(() => {
          console.log('🔄 Refreshing page...');
          window.location.reload();
        }, 1500);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Product creation failed:', errorData);
        throw new Error(errorData.message || 'Failed to create product');
      }
    } catch (error) {
      console.error('❌ Error creating product:', error);
      setError(error instanceof Error ? error.message : 'Failed to create product');
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create product',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenCreateModal = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      price: '',
      stock_quantity: '',
      sku: '',
      category_id: '',
      is_active: true
    });
    setSelectedImages([]);
    setImagePreview([]);
    setError(null);
    setIsCreateModalOpen(true);
  };

  const getStatusBadge = (product: any) => {
    if (!product.is_active) {
      return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
    }
    if (product.stock_quantity === 0) {
      return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">Active</Badge>;
  };

  const getPrimaryImage = (images: any[]) => {
    if (!images || images.length === 0) return null;
    const primaryImage = images.find(img => img.is_primary);
    return primaryImage || images[0];
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    // Populate edit form with product data
    setEditFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      stock_quantity: product.stock_quantity || '',
      category_id: product.category_id || '',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      setIsSubmitting(true);

      // Prepare payload with only the fields that can be updated
      const payload: any = {};
      
      if (editFormData.name && editFormData.name !== selectedProduct.name) {
        payload.name = editFormData.name;
      }
      if (editFormData.price && editFormData.price !== selectedProduct.price) {
        payload.price = parseFloat(editFormData.price as string);
      }
      if (editFormData.stock_quantity && editFormData.stock_quantity !== selectedProduct.stock_quantity) {
        payload.stock_quantity = parseInt(editFormData.stock_quantity as string);
      }
      if (editFormData.description && editFormData.description !== selectedProduct.description) {
        payload.description = editFormData.description;
      }
      if (editFormData.category_id && editFormData.category_id !== selectedProduct.category_id) {
        payload.category_id = editFormData.category_id;
      }

      // Check if there are any changes
      if (Object.keys(payload).length === 0) {
        toast({
          title: 'No Changes',
          description: 'No changes were made to the product',
          variant: 'default',
        });
        setIsEditModalOpen(false);
        return;
      }

      const response = await fetch(
        buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS}/${selectedProduct.product_id}`),
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update product');
      }

      const updatedProduct = await response.json();

      // Update product in local state
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.product_id === selectedProduct.product_id
            ? { ...p, ...payload, updated_at: new Date().toISOString() }
            : p
        )
      );

      toast({
        title: 'Product Updated',
        description: `${editFormData.name} has been successfully updated`,
        variant: 'success',
      });

      setIsEditModalOpen(false);
      setSelectedProduct(null);
    } catch (err: any) {
      console.error('Error updating product:', err);
      toast({
        title: 'Update Failed',
        description: err.message || 'Failed to update product. Please try again.',
        variant: 'destructive',
        action: {
          label: 'Retry',
          onClick: () => handleUpdateProduct(),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (productId: number) => {
    const product = products.find(p => p.product_id === productId);
    const productName = product?.name || 'this product';
    
    const confirmed = await confirm({
      title: 'Delete Product',
      message: `Are you sure you want to delete "${productName}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmColor: 'error',
    });

    if (!confirmed) return;

    try {
      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS}/${productId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to delete product');
      }

      // Remove product from local state
      setProducts(prevProducts => prevProducts.filter(p => p.product_id !== productId));

      toast({
        title: 'Product Deleted',
        description: `${productName} has been successfully deleted`,
        variant: 'success',
      });
    } catch (err: any) {
      console.error('Error deleting product:', err);
      toast({
        title: 'Delete Failed',
        description: err.message || 'Failed to delete product. Please try again.',
        variant: 'destructive',
        action: {
          label: 'Retry',
          onClick: () => handleDelete(productId),
        },
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 text-sm">Manage your product inventory</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleOpenCreateModal}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      {isLoading ? (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading products...</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">All Products ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const primaryImage = getPrimaryImage(product.images);
                return (
                  <TableRow key={product.product_id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                        {primaryImage ? (
                          <img
                            src={primaryImage.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="w-full h-full bg-gray-100 flex items-center justify-center"
                          style={{ display: primaryImage ? 'none' : 'flex' }}
                        >
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category_name || getCategoryName(product.category_id)}</TableCell>
                    <TableCell>KSH {parseFloat(product.price).toFixed(2)}</TableCell>
                    <TableCell>{product.stock_quantity}</TableCell>
                    <TableCell>{getStatusBadge(product)}</TableCell>
                    <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewProduct(product)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.product_id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {/* Pagination Controls */}
          {pagination && pagination.pages > 1 && (
            <div className="mt-4 flex justify-end">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {[...Array(pagination.pages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNum === 1 ||
                      pageNum === pagination.pages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNum)}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return <PaginationItem key={pageNum}>...</PaginationItem>;
                    }
                    return null;
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                      className={currentPage === pagination.pages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
      )}

      {/* Create Product Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productName" className="text-sm font-medium text-gray-700">
                  Product Name *
                </Label>
                <Input
                  id="productName"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="productSlug" className="text-sm font-medium text-gray-700">
                  Slug
                </Label>
                <Input
                  id="productSlug"
                  placeholder="auto-generated-from-name"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from name</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productSku" className="text-sm font-medium text-gray-700">
                  SKU *
                </Label>
                <Input
                  id="productSku"
                  placeholder="Enter SKU"
                  value={formData.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="productCategory" className="text-sm font-medium text-gray-700">
                  Category *
                </Label>
                <select
                  id="productCategory"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={formData.category_id}
                  onChange={(e) => handleInputChange('category_id', e.target.value)}
                >
                  <option value="">Select a category</option>
                  {Array.isArray(categories) && categories.map((category) => (
                    <option key={category.category_id || category.id} value={category.category_id || category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productPrice" className="text-sm font-medium text-gray-700">
                  Price *
                </Label>
                <Input
                  id="productPrice"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="productStock" className="text-sm font-medium text-gray-700">
                  Stock Quantity *
                </Label>
                <Input
                  id="productStock"
                  placeholder="0"
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => handleInputChange('stock_quantity', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="productDescription" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <textarea
                id="productDescription"
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="productActive"
                checked={formData.is_active}
                onChange={(e) => handleInputChange('is_active', e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="productActive" className="text-sm font-medium text-gray-700">
                Active
              </Label>
            </div>

            {/* Image Upload Section */}
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Product Images
              </Label>
              <div className="mt-2">
                <input
                  type="file"
                  id="productImages"
                  multiple
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <label
                  htmlFor="productImages"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select Images
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  You can select multiple images. Supported formats: JPG, PNG, GIF
                </p>
              </div>

              {/* Image Preview */}
              {imagePreview.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Selected Images ({imagePreview.length}):
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imagePreview.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsCreateModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleCreateProduct}
                disabled={isSubmitting || !formData.name || !formData.sku || !formData.price || !formData.stock_quantity || !formData.category_id}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Product'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Product Name *</label>
                <Input 
                  placeholder="Enter product name" 
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={editFormData.category_id}
                  onChange={(e) => setEditFormData({ ...editFormData, category_id: e.target.value })}
                  disabled={isSubmitting}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.category_id || category.id} value={category.category_id || category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Price (KSH) *</label>
                <Input 
                  placeholder="0.00" 
                  type="number" 
                  step="0.01"
                  min="0"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Stock Quantity *</label>
                <Input 
                  placeholder="0" 
                  type="number"
                  min="0"
                  value={editFormData.stock_quantity}
                  onChange={(e) => setEditFormData({ ...editFormData, stock_quantity: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter product description"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateProduct}
                disabled={isSubmitting || !editFormData.name || !editFormData.price || !editFormData.stock_quantity}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Product'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Product Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Product Details - {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Product Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedProduct.name}</p>
                    <p><span className="font-medium">SKU:</span> {selectedProduct.sku}</p>
                    <p><span className="font-medium">Price:</span> KSH {parseFloat(selectedProduct.price).toFixed(2)}</p>
                    <p><span className="font-medium">Stock Quantity:</span> {selectedProduct.stock_quantity}</p>
                    <p><span className="font-medium">Category:</span> {selectedProduct.category_name || getCategoryName(selectedProduct.category_id)}</p>
                    <p><span className="font-medium">Status:</span> {getStatusBadge(selectedProduct)}</p>
                    <p><span className="font-medium">Created:</span> {new Date(selectedProduct.created_at).toLocaleString()}</p>
                    <p><span className="font-medium">Updated:</span> {new Date(selectedProduct.updated_at).toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Description</h3>
                  <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                </div>
              </div>
              
              {/* Product Images */}
              {selectedProduct.images && selectedProduct.images.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Product Images ({selectedProduct.images.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedProduct.images.map((image: any, index: number) => (
                      <div key={image.image_id} className="relative">
                        <img
                          src={image.image_url}
                          alt={image.alt_text || `Product image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                        <div className="mt-2 text-xs text-gray-500">
                          <p>Primary: {image.is_primary ? 'Yes' : 'No'}</p>
                          <p>Created: {new Date(image.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => {
                  setIsViewModalOpen(false);
                  handleEdit(selectedProduct);
                }}>
                  Edit Product
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
