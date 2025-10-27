import React, { useState } from 'react';
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
  Upload, 
  Search, 
  Trash2, 
  Eye,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Download,
  RefreshCw
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const AdminImageManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock data - replace with actual API calls
  const images = [
    {
      id: 1,
      filename: 'organic-honey-1.jpg',
      originalName: 'organic_honey_product.jpg',
      url: '/src/assets/product-honey.jpg',
      size: '2.4 MB',
      dimensions: '1200x800',
      mimeType: 'image/jpeg',
      productId: 'PROD-001',
      productName: 'Organic Honey',
      uploadedAt: '2024-01-15 14:30:00',
      uploadedBy: 'admin@example.com',
      status: 'verified',
      altText: 'Organic honey jar with golden liquid'
    },
    {
      id: 2,
      filename: 'herbal-tea-blend.jpg',
      originalName: 'tea_blend_product.jpg',
      url: '/src/assets/product-tea.jpg',
      size: '1.8 MB',
      dimensions: '1000x667',
      mimeType: 'image/jpeg',
      productId: 'PROD-002',
      productName: 'Herbal Tea Blend',
      uploadedAt: '2024-01-15 14:25:00',
      uploadedBy: 'admin@example.com',
      status: 'verified',
      altText: 'Herbal tea blend in glass jar'
    },
    {
      id: 3,
      filename: 'coconut-oil-product.jpg',
      originalName: 'coconut_oil.jpg',
      url: '/src/assets/product-oil.jpg',
      size: '3.2 MB',
      dimensions: '1500x1000',
      mimeType: 'image/jpeg',
      productId: 'PROD-003',
      productName: 'Coconut Oil',
      uploadedAt: '2024-01-15 14:20:00',
      uploadedBy: 'admin@example.com',
      status: 'pending',
      altText: 'Coconut oil in glass bottle'
    },
    {
      id: 4,
      filename: 'granola-bowl.jpg',
      originalName: 'granola_product.jpg',
      url: '/src/assets/product-granola.jpg',
      size: '2.1 MB',
      dimensions: '1100x733',
      mimeType: 'image/jpeg',
      productId: 'PROD-004',
      productName: 'Organic Granola',
      uploadedAt: '2024-01-15 14:15:00',
      uploadedBy: 'admin@example.com',
      status: 'error',
      altText: 'Organic granola in wooden bowl'
    }
  ];

  const filteredImages = images.filter(image =>
    image.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.originalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <RefreshCw className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <ImageIcon className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleUpload = async (files: FileList) => {
    // Implement upload logic
    console.log('Uploading files:', files);
    setUploadProgress(0);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }
    
    setIsUploadModalOpen(false);
  };

  const handleDeleteImage = (imageId: number) => {
    // Implement delete logic
    console.log('Delete image:', imageId);
  };

  const handleDownloadImage = (image: any) => {
    if (!image || !image.url) {
      alert('No image URL available for download');
      return;
    }

    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = image.url;
    link.download = image.filename || image.originalName || 'image';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVerifyImage = (imageId: number) => {
    // Implement verification logic
    console.log('Verify image:', imageId);
  };

  const handleViewImage = (image: any) => {
    setSelectedImage(image);
    setIsViewModalOpen(true);
  };

  const imageStats = {
    total: images.length,
    verified: images.filter(img => img.status === 'verified').length,
    pending: images.filter(img => img.status === 'pending').length,
    error: images.filter(img => img.status === 'error').length,
    totalSize: images.reduce((sum, img) => sum + parseFloat(img.size), 0).toFixed(1)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Image Management</h1>
          <p className="text-gray-600 mt-2">Manage product images, uploads, and verification</p>
        </div>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Images
        </Button>
      </div>

      {/* Image Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">{imageStats.total}</div>
            <p className="text-sm text-gray-600">Total Images</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{imageStats.verified}</div>
            <p className="text-sm text-gray-600">Verified</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{imageStats.pending}</div>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{imageStats.error}</div>
            <p className="text-sm text-gray-600">Errors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{imageStats.totalSize} MB</div>
            <p className="text-sm text-gray-600">Total Size</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Images Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Images ({filteredImages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Filename</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredImages.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{image.filename}</div>
                      <div className="text-sm text-gray-600">{image.originalName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{image.productName}</div>
                      <div className="text-sm text-gray-600">ID: {image.productId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{image.size}</TableCell>
                  <TableCell>{image.dimensions}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(image.status)}
                      {getStatusBadge(image.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{image.uploadedAt}</div>
                      <div className="text-gray-600">by {image.uploadedBy}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewImage(image)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVerifyImage(image.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Images</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Select Images</label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Upload files</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => e.target.files && handleUpload(e.target.files)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </div>
              </div>
            </div>
            
            {uploadProgress > 0 && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Upload Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Image Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Details - {selectedImage?.filename}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-gray-400" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Filename</label>
                    <p className="text-sm text-gray-900">{selectedImage.filename}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Product</label>
                    <p className="text-sm text-gray-900">{selectedImage.productName} ({selectedImage.productId})</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Size</label>
                      <p className="text-sm text-gray-900">{selectedImage.size}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Dimensions</label>
                      <p className="text-sm text-gray-900">{selectedImage.dimensions}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Alt Text</label>
                    <p className="text-sm text-gray-900">{selectedImage.altText}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedImage.status)}
                      {getStatusBadge(selectedImage.status)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => handleDownloadImage(selectedImage)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminImageManagement;

