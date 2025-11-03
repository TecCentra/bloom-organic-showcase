import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { buildApiUrl, API_CONFIG } from '@/lib/config';
import { useMaterialToast } from '@/hooks/useMaterialToast';

const AdminBlogs: React.FC = () => {
  const { adminToken } = useAdminAuth();
  const { toast } = useMaterialToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'all' | 'published' | 'draft'>('published');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  
  // Create blog form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'published' as 'published' | 'draft'
  });
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [createdBlogId, setCreatedBlogId] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const handleUpload = async () => {
    if (!adminToken) {
      toast({ description: 'You must be logged in as admin', variant: 'destructive', duration: 3000 });
      return;
    }
    if (!file) {
      toast({ description: 'Please choose a PDF file', variant: 'destructive', duration: 3000 });
      return;
    }
    if (file.type !== 'application/pdf') {
      toast({ description: 'Only PDF files are allowed', variant: 'destructive', duration: 3000 });
      return;
    }
    try {
      setIsUploading(true);
      const form = new FormData();
      form.append('file', file);

      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.UPLOAD_PDF), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
        body: form,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to upload PDF');
      }

      toast({ description: 'Blog post created successfully from PDF', variant: 'success', duration: 3000 });
      setFile(null);
    } catch (e: any) {
      toast({ description: e?.message || 'Failed to upload PDF', variant: 'destructive', duration: 3000 });
    } finally {
      setIsUploading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', String(limit));
      if (status !== 'all') params.set('status', status);
      const res = await fetch(`${buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.LIST)}?${params.toString()}`);
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.success) {
        setPosts(data.data?.posts || []);
        setTotal(data.data?.pagination?.total || 0);
      } else {
        throw new Error(data.message || 'Failed to load posts');
      }
    } catch (e: any) {
      toast({ description: e?.message || 'Failed to load posts', variant: 'destructive', duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBlog = async () => {
    if (!adminToken) {
      toast({ description: 'You must be logged in as admin', variant: 'destructive', duration: 3000 });
      return;
    }
    
    if (!blogFormData.title.trim() || !blogFormData.content.trim()) {
      toast({ description: 'Title and content are required', variant: 'destructive', duration: 3000 });
      return;
    }

    try {
      setIsCreating(true);
      
      // Create blog post
      const payload = {
        title: blogFormData.title,
        content: blogFormData.content,
        excerpt: blogFormData.excerpt || blogFormData.content.substring(0, 150) + '...',
        status: blogFormData.status
      };

      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.CREATE), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to create blog post');
      }

      const blogId = data.data?.id || data.data?.post?.id || data.id;
      
      console.log('Blog creation response:', data);
      console.log('Extracted blog ID:', blogId);
      
      if (!blogId) {
        console.error('Full response structure:', JSON.stringify(data, null, 2));
        throw new Error('Blog ID not found in response');
      }

      setCreatedBlogId(blogId);

      // Upload image if provided
      if (blogImage) {
        try {
          const imageFormData = new FormData();
          // Try 'image' first, but also try 'file' as alternative
          imageFormData.append('image', blogImage);
          console.log('Image file details:', {
            name: blogImage.name,
            type: blogImage.type,
            size: blogImage.size
          });

          // Construct the image upload URL
          // Try both singular and plural endpoints
          let imageUrl = buildApiUrl(`${API_CONFIG.ENDPOINTS.BLOGS.LIST}/${blogId}/image`);
          console.log('📤 Attempting to upload image to:', imageUrl);
          console.log('Blog ID:', blogId);
          
          // If the endpoint fails, we can try the plural version
          // imageUrl = buildApiUrl(`${API_CONFIG.ENDPOINTS.BLOGS.LIST}/${blogId}/images`);
          
          const imageRes = await fetch(imageUrl, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${adminToken}`,
            },
            body: imageFormData,
          });

          console.log('Image upload response status:', imageRes.status);
          
          if (!imageRes.ok) {
            const imageData = await imageRes.json().catch(() => ({}));
            console.error('Image upload failed:', {
              status: imageRes.status,
              statusText: imageRes.statusText,
              data: imageData
            });
            toast({ 
              description: `Blog created but image upload failed: ${imageData.message || 'Unknown error'}`, 
              variant: 'destructive', 
              duration: 5000 
            });
          } else {
            const imageData = await imageRes.json().catch(() => ({}));
            console.log('✅ Image uploaded successfully:', imageData);
            toast({ 
              description: 'Blog post created successfully with image', 
              variant: 'success', 
              duration: 3000 
            });
          }
        } catch (imageError: any) {
          console.error('Image upload error:', imageError);
          toast({ 
            description: `Blog created but image upload failed: ${imageError.message || 'Network error'}`, 
            variant: 'destructive', 
            duration: 5000 
          });
        }
      } else {
        toast({ 
          description: 'Blog post created successfully', 
          variant: 'success', 
          duration: 3000 
        });
      }

      // Reset form
      setBlogFormData({ title: '', content: '', excerpt: '', status: 'published' });
      setBlogImage(null);
      setCreatedBlogId(null);
      setShowCreateForm(false);
      
      // Refresh posts list
      fetchPosts();
    } catch (e: any) {
      toast({ description: e?.message || 'Failed to create blog post', variant: 'destructive', duration: 3000 });
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-600 text-sm">Create blog posts by uploading PDF files or creating them manually</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          {showCreateForm ? 'Cancel' : 'Create New Blog'}
        </Button>
      </div>

      {/* Create Blog Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Blog Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter blog title"
                value={blogFormData.title}
                onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Enter a short excerpt (optional)"
                value={blogFormData.excerpt}
                onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from content</p>
            </div>
            
            <div>
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                placeholder="Enter blog content"
                value={blogFormData.content}
                onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                rows={10}
              />
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={blogFormData.status}
                onChange={(e) => setBlogFormData({ ...blogFormData, status: e.target.value as 'published' | 'draft' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="image">Featured Image (Optional)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setBlogImage(e.target.files?.[0] || null)}
              />
              {blogImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Selected: {blogImage.name}</p>
                  <img 
                    src={URL.createObjectURL(blogImage)} 
                    alt="Preview" 
                    className="mt-2 max-w-xs max-h-48 rounded"
                  />
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleCreateBlog} disabled={isCreating}>
                {isCreating ? 'Creating…' : 'Create Blog Post'}
              </Button>
              <Button variant="outline" onClick={() => {
                setShowCreateForm(false);
                setBlogFormData({ title: '', content: '', excerpt: '', status: 'published' });
                setBlogImage(null);
              }}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="file" accept="application/pdf" onChange={handleFileChange} />
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? 'Uploading…' : 'Upload PDF'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Status:</label>
              <select
                value={status}
                onChange={(e) => { setPage(1); setStatus(e.target.value as any); }}
                className="px-2 py-1 border rounded text-sm"
              >
                <option value="all">All</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <Button variant="outline" size="sm" onClick={fetchPosts} disabled={isLoading}>
              {isLoading ? 'Loading…' : 'Refresh'}
            </Button>
          </div>

          <div className="border rounded">
            <div className="grid grid-cols-5 gap-2 px-3 py-2 border-b text-xs font-medium text-gray-600">
              <div>Title</div>
              <div>Status</div>
              <div>Slug</div>
              <div>Published</div>
              <div>Created</div>
            </div>
            {isLoading ? (
              <div className="px-3 py-6 text-sm text-gray-600">Loading posts…</div>
            ) : posts.length === 0 ? (
              <div className="px-3 py-6 text-sm text-gray-500">No posts found.</div>
            ) : (
              posts.map((p) => (
                <div key={p.id} className="grid grid-cols-5 gap-2 px-3 py-2 border-b text-sm">
                  <div className="truncate" title={p.title}>{p.title}</div>
                  <div className="capitalize">{p.status}</div>
                  <div className="truncate" title={p.slug}>{p.slug}</div>
                  <div>{p.published_at ? new Date(p.published_at).toLocaleString() : '-'}</div>
                  <div>{p.created_at ? new Date(p.created_at).toLocaleString() : '-'}</div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              Page {page}, showing {posts.length} of {total}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={page<=1} onClick={() => setPage(p => Math.max(1, p-1))}>Previous</Button>
              <Button variant="outline" size="sm" disabled={posts.length < limit} onClick={() => setPage(p => p+1)}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogs;


