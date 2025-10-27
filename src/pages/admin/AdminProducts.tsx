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
  const { adminToken } = useAdminAuth();

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

  // Image upload state
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!adminToken) return;
      
      try {
        setIsLoading(true);
        setError(null);

        // Fetch products
        const productsResponse = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (productsResponse.ok) {
          const productsData = await productsResponse.json();
          setProducts(productsData.data?.products || productsData.data || []);
          setPagination(productsData.data?.pagination);
        } else {
          throw new Error('Failed to fetch products');
        }

        // Fetch categories for dropdown
        const categoriesResponse = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.PUBLIC.CATEGORIES), {
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
  }, [adminToken]);

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
    if (selectedImages.length === 0) return;

    try {
      const formData = new FormData();
      
      // Add each image to the form data
      selectedImages.forEach((image, index) => {
        formData.append('image', image);
      });

      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS}/${productId}/images`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to upload images');
      }

      const data = await response.json();
      console.log('Images uploaded successfully:', data);
      return data;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  const handleCreateProduct = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

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

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.PUBLIC.PRODUCTS), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Product created successfully:', data);
        
        // Get the product ID from the response
        const productId = data.data?.product_id || data.data?.id || data.product_id || data.id;
        
        if (productId && selectedImages.length > 0) {
          try {
            await uploadImages(productId);
            console.log('Images uploaded successfully');
          } catch (imageError) {
            console.warn('Product created but images failed to upload:', imageError);
            // Don't throw here - product was created successfully
          }
        }
        
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
        
        // Refresh products list
        window.location.reload();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setError(error instanceof Error ? error.message : 'Failed to create product');
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
    setIsEditModalOpen(true);
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleDelete = (productId: number) => {
    // Implement delete logic
    console.log('Delete product:', productId);
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
                <label className="text-sm font-medium text-gray-700">Product Name</label>
                <Input 
                  placeholder="Enter product name" 
                  defaultValue={selectedProduct?.name || ''}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <Input 
                  placeholder="Select category" 
                  defaultValue={selectedProduct?.category || ''}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Price</label>
                <Input 
                  placeholder="0.00" 
                  type="number" 
                  step="0.01"
                  defaultValue={selectedProduct?.price || ''}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Stock Quantity</label>
                <Input 
                  placeholder="0" 
                  type="number"
                  defaultValue={selectedProduct?.stock || ''}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md"
                rows={3}
                placeholder="Enter product description"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditModalOpen(false)}>
                Update Product
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
