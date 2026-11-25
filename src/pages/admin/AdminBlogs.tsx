// // import React, { useEffect, useState } from 'react';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
// // import { Label } from '@/components/ui/label';
// // import { useAdminAuth } from '@/context/AdminAuthContext';
// // import { buildApiUrl, API_CONFIG } from '@/lib/config';
// // import { useMaterialToast } from '@/hooks/useMaterialToast';
// // import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';
// // import { Trash2 } from 'lucide-react';
// // import { useRef } from 'react';
// // import RichTextEditor from '@/components/RichTextEditor';
// // import { blogContentToText, sanitizeBlogHtml } from '@/lib/blogContent';

// // const AdminBlogs: React.FC = () => {
// //   const { adminToken } = useAdminAuth();
// //   const { toast } = useMaterialToast();
// //   const { confirm } = useMaterialConfirm();
// //   const [file, setFile] = useState<File | null>(null);
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [posts, setPosts] = useState<any[]>([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [status, setStatus] = useState<'all' | 'published' | 'draft'>('published');
// //   const [page, setPage] = useState(1);
// //   const [limit] = useState(10);
// //   const [total, setTotal] = useState(0);
  
// //   // Create blog form state
// //   const [showCreateForm, setShowCreateForm] = useState(false);
// //   const [isCreating, setIsCreating] = useState(false);
// //   const blogContentRef = useRef('');
// //   const [blogFormData, setBlogFormData] = useState({
// //     title: '',
// //     excerpt: '',
// //     status: 'published' as 'published' | 'draft'
// //   });
// //   const [blogImage, setBlogImage] = useState<File | null>(null);
// //   const [createdBlogId, setCreatedBlogId] = useState<string | null>(null);

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const f = e.target.files?.[0] || null;
// //     setFile(f);
// //   };

// //   const handleUpload = async () => {
// //     if (!adminToken) {
// //       toast({ description: 'You must be logged in as admin', variant: 'destructive', duration: 3000 });
// //       return;
// //     }
// //     if (!file) {
// //       toast({ description: 'Please choose a PDF file', variant: 'destructive', duration: 3000 });
// //       return;
// //     }
// //     if (file.type !== 'application/pdf') {
// //       toast({ description: 'Only PDF files are allowed', variant: 'destructive', duration: 3000 });
// //       return;
// //     }
// //     try {
// //       setIsUploading(true);
// //       const form = new FormData();
// //       form.append('file', file);

// //       const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.UPLOAD_PDF), {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${adminToken}`,
// //         },
// //         body: form,
// //       });

// //       const data = await res.json().catch(() => ({}));
// //       if (!res.ok || !data.success) {
// //         throw new Error(data.message || 'Failed to upload PDF');
// //       }

// //       toast({ description: 'Blog post created successfully from PDF', variant: 'success', duration: 3000 });
// //       setFile(null);
// //     } catch (e: any) {
// //       toast({ description: e?.message || 'Failed to upload PDF', variant: 'destructive', duration: 3000 });
// //     } finally {
// //       setIsUploading(false);
// //     }
// //   };

// //   const fetchPosts = async () => {
// //     try {
// //       setIsLoading(true);
// //       const params = new URLSearchParams();
// //       params.set('page', String(page));
// //       params.set('limit', String(limit));
// //       if (status !== 'all') params.set('status', status);
// //       const res = await fetch(`${buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.LIST)}?${params.toString()}`);
// //       const data = await res.json().catch(() => ({}));
// //       if (res.ok && data?.success) {
// //         setPosts(data.data?.posts || []);
// //         setTotal(data.data?.pagination?.total || 0);
// //       } else {
// //         throw new Error(data.message || 'Failed to load posts');
// //       }
// //     } catch (e: any) {
// //       toast({ description: e?.message || 'Failed to load posts', variant: 'destructive', duration: 3000 });
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleCreateBlog = async () => {
// //     if (!adminToken) {
// //       toast({ description: 'You must be logged in as admin', variant: 'destructive', duration: 3000 });
// //       return;
// //     }
    
// //     const content = sanitizeBlogHtml(blogContentRef.current);
// //     const plainContent = blogContentToText(content);
// //     if (!blogFormData.title.trim() || !plainContent) {
// //       toast({ description: 'Title and content are required', variant: 'destructive', duration: 3000 });
// //       return;
// //     }

// //     try {
// //       setIsCreating(true);
      
// //       // Create blog post
// //       const payload = {
// //         title: blogFormData.title,
// //         content,
// //         excerpt: blogFormData.excerpt || plainContent.substring(0, 150) + '...',
// //         status: blogFormData.status
// //       };

// //       const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.CREATE), {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${adminToken}`,
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await res.json().catch(() => ({}));
// //       if (!res.ok || !data.success) {
// //         throw new Error(data.message || 'Failed to create blog post');
// //       }

// //       const blogId = data.data?.id || data.data?.post?.id || data.id;
      
// //       console.log('Blog creation response:', data);
// //       console.log('Extracted blog ID:', blogId);
      
// //       if (!blogId) {
// //         console.error('Full response structure:', JSON.stringify(data, null, 2));
// //         throw new Error('Blog ID not found in response');
// //       }

// //       setCreatedBlogId(blogId);

// //       // Upload image if provided
// //       if (blogImage) {
// //         try {
// //           const imageFormData = new FormData();
// //           // Try 'image' first, but also try 'file' as alternative
// //           imageFormData.append('image', blogImage);
// //           console.log('Image file details:', {
// //             name: blogImage.name,
// //             type: blogImage.type,
// //             size: blogImage.size
// //           });

// //           // Construct the image upload URL
// //           // Try both singular and plural endpoints
// //           let imageUrl = buildApiUrl(`${API_CONFIG.ENDPOINTS.BLOGS.LIST}/${blogId}/image`);
// //           console.log('📤 Attempting to upload image to:', imageUrl);
// //           console.log('Blog ID:', blogId);
          
// //           // If the endpoint fails, we can try the plural version
// //           // imageUrl = buildApiUrl(`${API_CONFIG.ENDPOINTS.BLOGS.LIST}/${blogId}/images`);
          
// //           const imageRes = await fetch(imageUrl, {
// //             method: 'PUT',
// //             headers: {
// //               'Authorization': `Bearer ${adminToken}`,
// //             },
// //             body: imageFormData,
// //           });

// //           console.log('Image upload response status:', imageRes.status);
          
// //           if (!imageRes.ok) {
// //             const imageData = await imageRes.json().catch(() => ({}));
// //             console.error('Image upload failed:', {
// //               status: imageRes.status,
// //               statusText: imageRes.statusText,
// //               data: imageData
// //             });
// //             toast({ 
// //               description: `Blog created but image upload failed: ${imageData.message || 'Unknown error'}`, 
// //               variant: 'destructive', 
// //               duration: 5000 
// //             });
// //           } else {
// //             const imageData = await imageRes.json().catch(() => ({}));
// //             console.log('✅ Image uploaded successfully:', imageData);
// //             toast({ 
// //               description: 'Blog post created successfully with image', 
// //               variant: 'success', 
// //               duration: 3000 
// //             });
// //           }
// //         } catch (imageError: any) {
// //           console.error('Image upload error:', imageError);
// //           toast({ 
// //             description: `Blog created but image upload failed: ${imageError.message || 'Network error'}`, 
// //             variant: 'destructive', 
// //             duration: 5000 
// //           });
// //         }
// //       } else {
// //         toast({ 
// //           description: 'Blog post created successfully', 
// //           variant: 'success', 
// //           duration: 3000 
// //         });
// //       }

// //       // Reset form
// //       blogContentRef.current = '';
// //       setBlogFormData({ title: '', excerpt: '', status: 'published' });
// //       setBlogImage(null);
// //       setCreatedBlogId(null);
// //       setShowCreateForm(false);
      
// //       // Refresh posts list
// //       fetchPosts();
// //     } catch (e: any) {
// //       toast({ description: e?.message || 'Failed to create blog post', variant: 'destructive', duration: 3000 });
// //     } finally {
// //       setIsCreating(false);
// //     }
// //   };

// //   const handleDelete = async (blogId: string | number) => {
// //     const blog = posts.find(p => p.id === blogId);
// //     const blogTitle = blog?.title || 'this blog post';
    
// //     const confirmed = await confirm({
// //       title: 'Delete Blog Post',
// //       message: `Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`,
// //       confirmText: 'Delete',
// //       cancelText: 'Cancel',
// //       confirmColor: 'error',
// //     });

// //     if (!confirmed) return;

// //     try {
// //       const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.BLOGS.DELETE}/${blogId}`), {
// //         method: 'DELETE',
// //         headers: {
// //           'Authorization': `Bearer ${adminToken}`,
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({}));
// //         throw new Error(errorData.message || 'Failed to delete blog post');
// //       }

// //       // Remove blog from local state
// //       setPosts(prevPosts => prevPosts.filter(p => p.id !== blogId));
      
// //       // Update total count
// //       setTotal(prevTotal => Math.max(0, prevTotal - 1));

// //       toast({
// //         title: 'Blog Post Deleted',
// //         description: `${blogTitle} has been successfully deleted`,
// //         variant: 'success',
// //       });
// //     } catch (err: any) {
// //       console.error('Error deleting blog post:', err);
// //       toast({
// //         title: 'Delete Failed',
// //         description: err.message || 'Failed to delete blog post. Please try again.',
// //         variant: 'destructive',
// //         action: {
// //           label: 'Retry',
// //           onClick: () => handleDelete(blogId),
// //         },
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPosts();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [page, status]);

// //   return (
// //     <div className="space-y-4">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
// //           <p className="text-gray-600 text-sm">Create blog posts by uploading PDF files or creating them manually</p>
// //         </div>
// //         <Button onClick={() => setShowCreateForm(!showCreateForm)}>
// //           {showCreateForm ? 'Cancel' : 'Create New Blog'}
// //         </Button>
// //       </div>

// //       {/* Create Blog Form */}
// //       {showCreateForm && (
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Create New Blog Post</CardTitle>
// //           </CardHeader>
// //           <CardContent className="space-y-4">
// //             <div>
// //               <Label htmlFor="title">Title *</Label>
// //               <Input
// //                 id="title"
// //                 placeholder="Enter blog title"
// //                 value={blogFormData.title}
// //                 onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
// //               />
// //             </div>
            
// //             <div>
// //               <Label htmlFor="excerpt">Excerpt</Label>
// //               <Textarea
// //                 id="excerpt"
// //                 placeholder="Enter a short excerpt (optional)"
// //                 value={blogFormData.excerpt}
// //                 onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
// //                 rows={3}
// //               />
// //               <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from content</p>
// //             </div>
            
// //             <div>
// //               <Label>Content *</Label>
// //               <RichTextEditor
// //                 initialValue={blogContentRef.current}
// //                 onChange={(content) => { blogContentRef.current = content; }}
// //               />
// //               <p className="text-xs text-gray-500 mt-1">
// //                 Use the toolbar to format headings, paragraphs, alignment, and lists.
// //               </p>
// //             </div>
            
// //             <div>
// //               <Label htmlFor="status">Status</Label>
// //               <select
// //                 id="status"
// //                 value={blogFormData.status}
// //                 onChange={(e) => setBlogFormData({ ...blogFormData, status: e.target.value as 'published' | 'draft' })}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-md"
// //               >
// //                 <option value="published">Published</option>
// //                 <option value="draft">Draft</option>
// //               </select>
// //             </div>
            
// //             <div>
// //               <Label htmlFor="image">Featured Image (Optional)</Label>
// //               <Input
// //                 id="image"
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={(e) => setBlogImage(e.target.files?.[0] || null)}
// //               />
// //               {blogImage && (
// //                 <div className="mt-2">
// //                   <p className="text-sm text-gray-600">Selected: {blogImage.name}</p>
// //                   <img 
// //                     src={URL.createObjectURL(blogImage)} 
// //                     alt="Preview" 
// //                     className="mt-2 max-w-xs max-h-48 rounded"
// //                   />
// //                 </div>
// //               )}
// //             </div>
            
// //             <div className="flex gap-2">
// //               <Button onClick={handleCreateBlog} disabled={isCreating}>
// //                 {isCreating ? 'Creating…' : 'Create Blog Post'}
// //               </Button>
// //               <Button variant="outline" onClick={() => {
// //                 setShowCreateForm(false);
// //                 blogContentRef.current = '';
// //                 setBlogFormData({ title: '', excerpt: '', status: 'published' });
// //                 setBlogImage(null);
// //               }}>
// //                 Cancel
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       )}

// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Upload PDF</CardTitle>
// //         </CardHeader>
// //         <CardContent className="space-y-4">
// //           <Input type="file" accept="application/pdf" onChange={handleFileChange} />
// //           <Button onClick={handleUpload} disabled={isUploading}>
// //             {isUploading ? 'Uploading…' : 'Upload PDF'}
// //           </Button>
// //         </CardContent>
// //       </Card>

// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Posts</CardTitle>
// //         </CardHeader>
// //         <CardContent className="space-y-4">
// //           <div className="flex items-center justify-between gap-2">
// //             <div className="flex items-center gap-2">
// //               <label className="text-sm text-gray-600">Status:</label>
// //               <select
// //                 value={status}
// //                 onChange={(e) => { setPage(1); setStatus(e.target.value as any); }}
// //                 className="px-2 py-1 border rounded text-sm"
// //               >
// //                 <option value="all">All</option>
// //                 <option value="published">Published</option>
// //                 <option value="draft">Draft</option>
// //               </select>
// //             </div>
// //             <Button variant="outline" size="sm" onClick={fetchPosts} disabled={isLoading}>
// //               {isLoading ? 'Loading…' : 'Refresh'}
// //             </Button>
// //           </div>

// //           <div className="border rounded">
// //             <div className="grid grid-cols-6 gap-2 px-3 py-2 border-b text-xs font-medium text-gray-600">
// //               <div>Title</div>
// //               <div>Status</div>
// //               <div>Slug</div>
// //               <div>Published</div>
// //               <div>Created</div>
// //               <div>Actions</div>
// //             </div>
// //             {isLoading ? (
// //               <div className="px-3 py-6 text-sm text-gray-600">Loading posts…</div>
// //             ) : posts.length === 0 ? (
// //               <div className="px-3 py-6 text-sm text-gray-500">No posts found.</div>
// //             ) : (
// //               posts.map((p) => (
// //                 <div key={p.id} className="grid grid-cols-6 gap-2 px-3 py-2 border-b text-sm items-center">
// //                   <div className="truncate" title={p.title}>{p.title}</div>
// //                   <div className="capitalize">{p.status}</div>
// //                   <div className="truncate" title={p.slug}>{p.slug}</div>
// //                   <div>{p.published_at ? new Date(p.published_at).toLocaleString() : '-'}</div>
// //                   <div>{p.created_at ? new Date(p.created_at).toLocaleString() : '-'}</div>
// //                   <div className="flex items-center justify-start">
// //                     <Button
// //                       variant="ghost"
// //                       size="sm"
// //                       onClick={() => handleDelete(p.id)}
// //                       className="text-red-600 hover:text-red-700 hover:bg-red-50"
// //                     >
// //                       <Trash2 className="h-4 w-4" />
// //                     </Button>
// //                   </div>
// //                 </div>
// //               ))
// //             )}
// //           </div>

// //           <div className="flex items-center justify-between text-sm">
// //             <div>
// //               Page {page}, showing {posts.length} of {total}
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Button variant="outline" size="sm" disabled={page<=1} onClick={() => setPage(p => Math.max(1, p-1))}>Previous</Button>
// //               <Button variant="outline" size="sm" disabled={posts.length < limit} onClick={() => setPage(p => p+1)}>Next</Button>
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default AdminBlogs;


// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Pencil, Trash2 } from 'lucide-react';
// import { useAdminAuth } from '@/context/AdminAuthContext';
// import { buildApiUrl, API_CONFIG } from '@/lib/config';
// import { useMaterialToast } from '@/hooks/useMaterialToast';
// import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';
// import RichTextEditor from '@/components/RichTextEditor';
// import { blogContentToText, sanitizeBlogHtml } from '@/lib/blogContent';

// type BlogStatus = 'published' | 'draft' | 'archived';
// type StatusFilter = 'all' | BlogStatus;

// interface BlogRow {
//   id: string;
//   title: string;
//   content?: string;
//   excerpt?: string | null;
//   slug: string;
//   featured_image?: string | null;
//   status: BlogStatus;
//   published_at?: string | null;
//   created_at?: string | null;
// }

// const EMPTY_FORM = { title: '', excerpt: '', status: 'published' as BlogStatus };

// const AdminBlogs: React.FC = () => {
//   const { adminToken } = useAdminAuth();
//   const { toast } = useMaterialToast();
//   const { confirm } = useMaterialConfirm();

//   // List state
//   const [posts, setPosts] = useState<BlogRow[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10);
//   const [total, setTotal] = useState(0);

//   // Create / edit form state
//   const formRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef('');
//   const [formOpen, setFormOpen] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editorKey, setEditorKey] = useState(0); // remounts the editor when switching posts
//   const [form, setForm] = useState(EMPTY_FORM);
//   const [existingImage, setExistingImage] = useState<string | null>(null);
//   const [newImage, setNewImage] = useState<File | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [loadingEditId, setLoadingEditId] = useState<string | null>(null);

//   // PDF upload state
//   const [pdfFile, setPdfFile] = useState<File | null>(null);
//   const [pdfInputKey, setPdfInputKey] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);

//   const blogsBase = buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.LIST);

//   const newImagePreview = useMemo(
//     () => (newImage ? URL.createObjectURL(newImage) : null),
//     [newImage]
//   );
//   useEffect(() => {
//     return () => {
//       if (newImagePreview) URL.revokeObjectURL(newImagePreview);
//     };
//   }, [newImagePreview]);

//   /* ------------------------------------------------------------------ */
//   /* Helpers                                                            */
//   /* ------------------------------------------------------------------ */

//   const fail = (description: string, duration = 3000) =>
//     toast({ description, variant: 'destructive', duration });

//   // Authenticated request; throws on HTTP error or success === false
//   const api = useCallback(
//     async (url: string, init: RequestInit = {}) => {
//       const res = await fetch(url, {
//         ...init,
//         headers: {
//           Authorization: `Bearer ${adminToken}`,
//           ...(init.headers as Record<string, string> | undefined),
//         },
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok || data?.success === false) {
//         throw new Error(data?.message || `Request failed (${res.status})`);
//       }
//       return data;
//     },
//     [adminToken]
//   );

//   /* ------------------------------------------------------------------ */
//   /* List                                                               */
//   /* ------------------------------------------------------------------ */

//   const fetchPosts = useCallback(async () => {
//     // Drafts / archived / all require the admin token — wait until it's available
//     if (!adminToken) return;
//     try {
//       setIsLoading(true);
//       const params = new URLSearchParams({
//         page: String(page),
//         limit: String(limit),
//         status: statusFilter,
//       });
//       const data = await api(`${blogsBase}?${params.toString()}`);
//       setPosts(data.data?.posts || []);
//       setTotal(data.data?.pagination?.total || 0);
//     } catch (e: any) {
//       fail(e?.message || 'Failed to load posts');
//     } finally {
//       setIsLoading(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [adminToken, api, blogsBase, page, limit, statusFilter]);

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   /* ------------------------------------------------------------------ */
//   /* Form open / close                                                  */
//   /* ------------------------------------------------------------------ */

//   const resetForm = () => {
//     contentRef.current = '';
//     setForm(EMPTY_FORM);
//     setNewImage(null);
//     setExistingImage(null);
//     setEditingId(null);
//     setEditorKey((k) => k + 1);
//   };

//   const closeForm = () => {
//     resetForm();
//     setFormOpen(false);
//   };

//   const openCreate = () => {
//     resetForm();
//     setFormOpen(true);
//   };

//   const openEdit = async (post: BlogRow) => {
//     let full: BlogRow = post;

//     // Fallback: load the single post if the list didn't include content
//     if (!post.content) {
//       try {
//         setLoadingEditId(post.id);
//         const data = await api(`${blogsBase}/${post.id}`);
//         full = data.data || post;
//       } catch (e: any) {
//         return fail(e?.message || 'Failed to load post for editing');
//       } finally {
//         setLoadingEditId(null);
//       }
//     }

//     contentRef.current = full.content || '';
//     setForm({
//       title: full.title || '',
//       excerpt: full.excerpt || '',
//       status: full.status || 'draft',
//     });
//     setExistingImage(full.featured_image || null);
//     setNewImage(null);
//     setEditingId(String(full.id ?? post.id));
//     setEditorKey((k) => k + 1);
//     setFormOpen(true);
//     requestAnimationFrame(() =>
//       formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
//     );
//   };

//   /* ------------------------------------------------------------------ */
//   /* Create / update                                                    */
//   /* ------------------------------------------------------------------ */

//   const handleSave = async () => {
//     if (!adminToken) return fail('You must be logged in as admin');

//     const content = sanitizeBlogHtml(contentRef.current);
//     const plainContent = blogContentToText(content);
//     if (!form.title.trim() || !plainContent) return fail('Title and content are required');

//     const payload = {
//       title: form.title.trim(),
//       content,
//       excerpt: form.excerpt.trim() || plainContent.substring(0, 150) + '...',
//       status: form.status,
//     };

//     try {
//       setIsSaving(true);

//       const data = editingId
//         ? await api(`${blogsBase}/${editingId}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload),
//           })
//         : await api(buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.CREATE), {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(payload),
//           });

//       const blogId: string | undefined =
//         editingId || data.data?.id || data.data?.post?.id || data.id;
//       if (!blogId) throw new Error('Blog ID not found in response');

//       let imageError: string | null = null;
//       if (newImage) {
//         try {
//           const fd = new FormData();
//           fd.append('image', newImage);
//           await api(`${blogsBase}/${blogId}/image`, { method: 'PUT', body: fd });
//         } catch (err: any) {
//           imageError = err?.message || 'Unknown error';
//         }
//       }

//       const verb = editingId ? 'updated' : 'created';
//       if (imageError) {
//         toast({
//           description: `Blog ${verb}, but image upload failed: ${imageError}`,
//           variant: 'destructive',
//           duration: 5000,
//         });
//       } else {
//         toast({ description: `Blog post ${verb} successfully`, variant: 'success', duration: 3000 });
//       }

//       closeForm();
//       await fetchPosts();
//     } catch (e: any) {
//       fail(e?.message || `Failed to ${editingId ? 'update' : 'create'} blog post`);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   /* ------------------------------------------------------------------ */
//   /* Quick publish / unpublish                                          */
//   /* ------------------------------------------------------------------ */

//   const handleToggleStatus = async (post: BlogRow) => {
//     if (!adminToken) return fail('You must be logged in as admin');
//     const next: BlogStatus = post.status === 'published' ? 'draft' : 'published';
//     try {
//       await api(`${blogsBase}/${post.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: next }),
//       });
//       toast({
//         description: next === 'published' ? 'Post published' : 'Post moved to drafts',
//         variant: 'success',
//         duration: 3000,
//       });
//       await fetchPosts();
//     } catch (e: any) {
//       fail(e?.message || 'Failed to change status');
//     }
//   };

//   /* ------------------------------------------------------------------ */
//   /* Delete                                                             */
//   /* ------------------------------------------------------------------ */

//   const handleDelete = async (post: BlogRow) => {
//     if (!adminToken) return fail('You must be logged in as admin');

//     const confirmed = await confirm({
//       title: 'Delete Blog Post',
//       message: `Are you sure you want to delete "${post.title}"? This action cannot be undone.`,
//       confirmText: 'Delete',
//       cancelText: 'Cancel',
//       confirmColor: 'error',
//     });
//     if (!confirmed) return;

//     try {
//       await api(`${buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.DELETE)}/${post.id}`, {
//         method: 'DELETE',
//       });
//       if (editingId === String(post.id)) closeForm();
//       toast({
//         title: 'Blog Post Deleted',
//         description: `${post.title} has been successfully deleted`,
//         variant: 'success',
//       });
//       // Step back a page if we just removed the last row on this one
//       if (posts.length === 1 && page > 1) setPage(page - 1);
//       else await fetchPosts();
//     } catch (err: any) {
//       toast({
//         title: 'Delete Failed',
//         description: err?.message || 'Failed to delete blog post. Please try again.',
//         variant: 'destructive',
//         action: { label: 'Retry', onClick: () => handleDelete(post) },
//       });
//     }
//   };

//   /* ------------------------------------------------------------------ */
//   /* PDF upload                                                         */
//   /* ------------------------------------------------------------------ */

//   const handleUploadPdf = async () => {
//     if (!adminToken) return fail('You must be logged in as admin');
//     if (!pdfFile) return fail('Please choose a PDF file');
//     if (pdfFile.type !== 'application/pdf') return fail('Only PDF files are allowed');

//     try {
//       setIsUploading(true);
//       const fd = new FormData();
//       fd.append('file', pdfFile);
//       await api(buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.UPLOAD_PDF), { method: 'POST', body: fd });
//       toast({ description: 'Blog post created successfully from PDF', variant: 'success', duration: 3000 });
//       setPdfFile(null);
//       setPdfInputKey((k) => k + 1); // clears the file input
//       if (page !== 1) setPage(1);
//       else await fetchPosts();
//     } catch (e: any) {
//       fail(e?.message || 'Failed to upload PDF');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   /* ------------------------------------------------------------------ */
//   /* Render                                                             */
//   /* ------------------------------------------------------------------ */

//   const imageToShow = newImagePreview || existingImage;

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
//           <p className="text-gray-600 text-sm">
//             Create, edit, and manage blog posts, or generate one from a PDF
//           </p>
//         </div>
//         <Button onClick={formOpen ? closeForm : openCreate}>
//           {formOpen ? 'Cancel' : 'Create New Blog'}
//         </Button>
//       </div>

//       {/* Create / Edit form */}
//       {formOpen && (
//         <div ref={formRef}>
//           <Card>
//             <CardHeader>
//               <CardTitle>{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label htmlFor="title">Title *</Label>
//                 <Input
//                   id="title"
//                   placeholder="Enter blog title"
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="excerpt">Excerpt</Label>
//                 <Textarea
//                   id="excerpt"
//                   placeholder="Enter a short excerpt (optional)"
//                   value={form.excerpt}
//                   onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
//                   rows={3}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from content</p>
//               </div>

//               <div>
//                 <Label>Content *</Label>
//                 <RichTextEditor
//                   key={editorKey}
//                   initialValue={contentRef.current}
//                   onChange={(content) => {
//                     contentRef.current = content;
//                   }}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Use the toolbar to format headings, paragraphs, alignment, and lists.
//                 </p>
//               </div>

//               <div>
//                 <Label htmlFor="status">Status</Label>
//                 <select
//                   id="status"
//                   value={form.status}
//                   onChange={(e) => setForm({ ...form, status: e.target.value as BlogStatus })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 >
//                   <option value="published">Published</option>
//                   <option value="draft">Draft</option>
//                   <option value="archived">Archived</option>
//                 </select>
//               </div>

//               <div>
//                 <Label htmlFor="image">
//                   {editingId ? 'Replace Featured Image (Optional)' : 'Featured Image (Optional)'}
//                 </Label>
//                 <Input
//                   id="image"
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setNewImage(e.target.files?.[0] || null)}
//                 />
//                 {imageToShow && (
//                   <div className="mt-2">
//                     <p className="text-sm text-gray-600">
//                       {newImage ? `New image: ${newImage.name}` : 'Current image'}
//                     </p>
//                     <img src={imageToShow} alt="Preview" className="mt-2 max-w-xs max-h-48 rounded" />
//                   </div>
//                 )}
//               </div>

//               <div className="flex gap-2">
//                 <Button onClick={handleSave} disabled={isSaving}>
//                   {isSaving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Blog Post'}
//                 </Button>
//                 <Button variant="outline" onClick={closeForm} disabled={isSaving}>
//                   Cancel
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* PDF upload */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Upload PDF</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <Input
//             key={pdfInputKey}
//             type="file"
//             accept="application/pdf"
//             onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
//           />
//           <Button onClick={handleUploadPdf} disabled={isUploading || !pdfFile}>
//             {isUploading ? 'Uploading…' : 'Upload PDF'}
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Posts table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Posts</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center justify-between gap-2">
//             <div className="flex items-center gap-2">
//               <label className="text-sm text-gray-600">Status:</label>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => {
//                   setPage(1);
//                   setStatusFilter(e.target.value as StatusFilter);
//                 }}
//                 className="px-2 py-1 border rounded text-sm"
//               >
//                 <option value="all">All</option>
//                 <option value="published">Published</option>
//                 <option value="draft">Draft</option>
//                 <option value="archived">Archived</option>
//               </select>
//             </div>
//             <Button variant="outline" size="sm" onClick={fetchPosts} disabled={isLoading}>
//               {isLoading ? 'Loading…' : 'Refresh'}
//             </Button>
//           </div>

//           <div className="border rounded overflow-x-auto">
//             <div className="grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_2fr] gap-2 px-3 py-2 border-b text-xs font-medium text-gray-600 min-w-[800px]">
//               <div>Title</div>
//               <div>Status</div>
//               <div>Slug</div>
//               <div>Published</div>
//               <div>Created</div>
//               <div>Actions</div>
//             </div>

//             {isLoading ? (
//               <div className="px-3 py-6 text-sm text-gray-600">Loading posts…</div>
//             ) : posts.length === 0 ? (
//               <div className="px-3 py-6 text-sm text-gray-500">No posts found.</div>
//             ) : (
//               posts.map((p) => (
//                 <div
//                   key={p.id}
//                   className="grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_2fr] gap-2 px-3 py-2 border-b text-sm items-center min-w-[800px]"
//                 >
//                   <div className="truncate" title={p.title}>{p.title}</div>
//                   <div className="capitalize">{p.status}</div>
//                   <div className="truncate" title={p.slug}>{p.slug}</div>
//                   <div>{p.published_at ? new Date(p.published_at).toLocaleString() : '-'}</div>
//                   <div>{p.created_at ? new Date(p.created_at).toLocaleString() : '-'}</div>
//                   <div className="flex items-center gap-1">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => openEdit(p)}
//                       disabled={loadingEditId === p.id}
//                       title="Edit"
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </Button>
//                     {p.status !== 'archived' && (
//                       <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(p)}>
//                         {p.status === 'published' ? 'Unpublish' : 'Publish'}
//                       </Button>
//                     )}
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleDelete(p)}
//                       className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                       title="Delete"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <div>
//               Page {page}, showing {posts.length} of {total}
//             </div>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={page <= 1}
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//               >
//                 Previous
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={page * limit >= total}
//                 onClick={() => setPage((p) => p + 1)}
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminBlogs;
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2 } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { buildApiUrl, API_CONFIG } from '@/lib/config';
import { useMaterialToast } from '@/hooks/useMaterialToast';
import { useMaterialConfirm } from '@/hooks/useMaterialConfirm';
import RichTextEditor from '@/components/RichTextEditor';
import { blogContentToText, sanitizeBlogHtml } from '@/lib/blogContent';

type BlogStatus = 'published' | 'draft' | 'archived';
type StatusFilter = 'all' | BlogStatus;

interface BlogRow {
  id: string;
  title: string;
  content?: string;
  excerpt?: string | null;
  slug: string;
  featured_image?: string | null;
  status: BlogStatus;
  published_at?: string | null;
  created_at?: string | null;
}

const EMPTY_FORM = { title: '', excerpt: '', status: 'published' as BlogStatus };

const AdminBlogs: React.FC = () => {
  const { adminToken } = useAdminAuth();
  const { toast } = useMaterialToast();
  const { confirm } = useMaterialConfirm();

  // List state
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Create / edit form state
  const formRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorKey, setEditorKey] = useState(0); // remounts the editor when switching posts
  const [form, setForm] = useState(EMPTY_FORM);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [loadingEditId, setLoadingEditId] = useState<string | null>(null);

  // PDF upload state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfInputKey, setPdfInputKey] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const blogsBase = buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.LIST);

  const newImagePreview = useMemo(
    () => (newImage ? URL.createObjectURL(newImage) : null),
    [newImage]
  );
  useEffect(() => {
    return () => {
      if (newImagePreview) URL.revokeObjectURL(newImagePreview);
    };
  }, [newImagePreview]);

  /* ------------------------------------------------------------------ */
  /* Helpers                                                            */
  /* ------------------------------------------------------------------ */

  const fail = (description: string, duration = 3000) =>
    toast({ description, variant: 'destructive', duration });

  // Authenticated request; throws on HTTP error or success === false
  const api = useCallback(
    async (url: string, init: RequestInit = {}) => {
      const res = await fetch(url, {
        ...init,
        headers: {
          Authorization: `Bearer ${adminToken}`,
          ...(init.headers as Record<string, string> | undefined),
        },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || `Request failed (${res.status})`);
      }
      return data;
    },
    [adminToken]
  );

  // Featured image upload with full console logging for debugging
  const uploadFeaturedImage = async (blogId: string, file: File): Promise<string | null> => {
    const imageUrl = `${blogsBase}/${blogId}/image`;
    console.log('[blog image] uploading', {
      blogId,
      url: imageUrl,
      name: file.name,
      type: file.type,
      sizeKB: Math.round(file.size / 1024),
    });

    try {
      const fd = new FormData();
      fd.append('image', file);

      const res = await fetch(imageUrl, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${adminToken}` },
        body: fd,
      });
      const body = await res.json().catch(() => null);

      console.log('[blog image] response', res.status, body);

      if (!res.ok || body?.success === false) {
        throw new Error(body?.message || `Image upload failed (${res.status})`);
      }

      console.log('[blog image] saved', body?.data?.featured_image);
      return null;
    } catch (err: any) {
      console.error('[blog image] error', err);
      return err?.message || 'Unknown error';
    }
  };

  /* ------------------------------------------------------------------ */
  /* List                                                               */
  /* ------------------------------------------------------------------ */

  const fetchPosts = useCallback(async () => {
    // Drafts / archived / all require the admin token — wait until it's available
    if (!adminToken) return;
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        status: statusFilter,
      });
      const data = await api(`${blogsBase}?${params.toString()}`);
      setPosts(data.data?.posts || []);
      setTotal(data.data?.pagination?.total || 0);
    } catch (e: any) {
      console.error('[blog list] error', e);
      fail(e?.message || 'Failed to load posts');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, api, blogsBase, page, limit, statusFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  /* ------------------------------------------------------------------ */
  /* Form open / close                                                  */
  /* ------------------------------------------------------------------ */

  const resetForm = () => {
    contentRef.current = '';
    setForm(EMPTY_FORM);
    setNewImage(null);
    setExistingImage(null);
    setEditingId(null);
    setEditorKey((k) => k + 1);
  };

  const closeForm = () => {
    resetForm();
    setFormOpen(false);
  };

  const openCreate = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEdit = async (post: BlogRow) => {
    let full: BlogRow = post;

    // Fallback: load the single post if the list didn't include content
    if (!post.content) {
      try {
        setLoadingEditId(post.id);
        const data = await api(`${blogsBase}/${post.id}`);
        full = data.data || post;
      } catch (e: any) {
        return fail(e?.message || 'Failed to load post for editing');
      } finally {
        setLoadingEditId(null);
      }
    }

    contentRef.current = full.content || '';
    setForm({
      title: full.title || '',
      excerpt: full.excerpt || '',
      status: full.status || 'draft',
    });
    setExistingImage(full.featured_image || null);
    setNewImage(null);
    setEditingId(String(full.id ?? post.id));
    setEditorKey((k) => k + 1);
    setFormOpen(true);
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  /* ------------------------------------------------------------------ */
  /* Create / update                                                    */
  /* ------------------------------------------------------------------ */

  const handleSave = async () => {
    if (!adminToken) return fail('You must be logged in as admin');

    const content = sanitizeBlogHtml(contentRef.current);
    const plainContent = blogContentToText(content);
    if (!form.title.trim() || !plainContent) return fail('Title and content are required');

    const payload = {
      title: form.title.trim(),
      content,
      excerpt: form.excerpt.trim() || plainContent.substring(0, 150) + '...',
      status: form.status,
    };

    try {
      setIsSaving(true);

      const data = editingId
        ? await api(`${blogsBase}/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await api(buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.CREATE), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

      console.log(`[blog save] ${editingId ? 'update' : 'create'} response`, data);

      const blogId: string | undefined =
        editingId || data.data?.id || data.data?.post?.id || data.id;
      if (!blogId) throw new Error('Blog ID not found in response');

      const imageError = newImage ? await uploadFeaturedImage(blogId, newImage) : null;

      const verb = editingId ? 'updated' : 'created';
      if (imageError) {
        toast({
          description: `Blog ${verb}, but image upload failed: ${imageError}`,
          variant: 'destructive',
          duration: 8000,
        });
      } else {
        toast({ description: `Blog post ${verb} successfully`, variant: 'success', duration: 3000 });
      }

      closeForm();
      await fetchPosts();
    } catch (e: any) {
      console.error('[blog save] error', e);
      fail(e?.message || `Failed to ${editingId ? 'update' : 'create'} blog post`);
    } finally {
      setIsSaving(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* Quick publish / unpublish                                          */
  /* ------------------------------------------------------------------ */

  const handleToggleStatus = async (post: BlogRow) => {
    if (!adminToken) return fail('You must be logged in as admin');
    const next: BlogStatus = post.status === 'published' ? 'draft' : 'published';
    try {
      await api(`${blogsBase}/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      toast({
        description: next === 'published' ? 'Post published' : 'Post moved to drafts',
        variant: 'success',
        duration: 3000,
      });
      await fetchPosts();
    } catch (e: any) {
      fail(e?.message || 'Failed to change status');
    }
  };

  /* ------------------------------------------------------------------ */
  /* Delete                                                             */
  /* ------------------------------------------------------------------ */

  const handleDelete = async (post: BlogRow) => {
    if (!adminToken) return fail('You must be logged in as admin');

    const confirmed = await confirm({
      title: 'Delete Blog Post',
      message: `Are you sure you want to delete "${post.title}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmColor: 'error',
    });
    if (!confirmed) return;

    try {
      await api(`${buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.DELETE)}/${post.id}`, {
        method: 'DELETE',
      });
      if (editingId === String(post.id)) closeForm();
      toast({
        title: 'Blog Post Deleted',
        description: `${post.title} has been successfully deleted`,
        variant: 'success',
      });
      if (posts.length === 1 && page > 1) setPage(page - 1);
      else await fetchPosts();
    } catch (err: any) {
      toast({
        title: 'Delete Failed',
        description: err?.message || 'Failed to delete blog post. Please try again.',
        variant: 'destructive',
        action: { label: 'Retry', onClick: () => handleDelete(post) },
      });
    }
  };

  /* ------------------------------------------------------------------ */
  /* PDF upload                                                         */
  /* ------------------------------------------------------------------ */

  const handleUploadPdf = async () => {
    if (!adminToken) return fail('You must be logged in as admin');
    if (!pdfFile) return fail('Please choose a PDF file');
    if (pdfFile.type !== 'application/pdf') return fail('Only PDF files are allowed');

    try {
      setIsUploading(true);
      const fd = new FormData();
      fd.append('file', pdfFile);
      const data = await api(buildApiUrl(API_CONFIG.ENDPOINTS.BLOGS.UPLOAD_PDF), {
        method: 'POST',
        body: fd,
      });
      console.log('[blog pdf] response', data);

      if (data?.data?.upload_error) {
        toast({
          description: `Blog created from PDF, but storage failed: ${data.data.upload_error}`,
          variant: 'destructive',
          duration: 8000,
        });
      } else {
        toast({ description: 'Blog post created successfully from PDF', variant: 'success', duration: 3000 });
      }

      setPdfFile(null);
      setPdfInputKey((k) => k + 1);
      if (page !== 1) setPage(1);
      else await fetchPosts();
    } catch (e: any) {
      console.error('[blog pdf] error', e);
      fail(e?.message || 'Failed to upload PDF');
    } finally {
      setIsUploading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* Render                                                             */
  /* ------------------------------------------------------------------ */

  const imageToShow = newImagePreview || existingImage;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-600 text-sm">
            Create, edit, and manage blog posts, or generate one from a PDF
          </p>
        </div>
        <Button onClick={formOpen ? closeForm : openCreate}>
          {formOpen ? 'Cancel' : 'Create New Blog'}
        </Button>
      </div>

      {/* Create / Edit form */}
      {formOpen && (
        <div ref={formRef}>
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter blog title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Enter a short excerpt (optional)"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty to auto-generate from content</p>
              </div>

              <div>
                <Label>Content *</Label>
                <RichTextEditor
                  key={editorKey}
                  initialValue={contentRef.current}
                  onChange={(content) => {
                    contentRef.current = content;
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use the toolbar to format headings, paragraphs, alignment, and lists.
                </p>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as BlogStatus })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <Label htmlFor="image">
                  {editingId ? 'Replace Featured Image (Optional)' : 'Featured Image (Optional)'}
                </Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    if (file) {
                      console.log('[blog image] selected', {
                        name: file.name,
                        type: file.type,
                        sizeKB: Math.round(file.size / 1024),
                      });
                    }
                    setNewImage(file);
                  }}
                />
                {imageToShow && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      {newImage ? `New image: ${newImage.name}` : 'Current image'}
                    </p>
                    <img src={imageToShow} alt="Preview" className="mt-2 max-w-xs max-h-48 rounded" />
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving…' : editingId ? 'Save Changes' : 'Create Blog Post'}
                </Button>
                <Button variant="outline" onClick={closeForm} disabled={isSaving}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* PDF upload */}
      <Card>
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            key={pdfInputKey}
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
          />
          <Button onClick={handleUploadPdf} disabled={isUploading || !pdfFile}>
            {isUploading ? 'Uploading…' : 'Upload PDF'}
          </Button>
        </CardContent>
      </Card>

      {/* Posts table */}
      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setPage(1);
                  setStatusFilter(e.target.value as StatusFilter);
                }}
                className="px-2 py-1 border rounded text-sm"
              >
                <option value="all">All</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <Button variant="outline" size="sm" onClick={fetchPosts} disabled={isLoading}>
              {isLoading ? 'Loading…' : 'Refresh'}
            </Button>
          </div>

          <div className="border rounded overflow-x-auto">
            <div className="grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_2fr] gap-2 px-3 py-2 border-b text-xs font-medium text-gray-600 min-w-[800px]">
              <div>Title</div>
              <div>Status</div>
              <div>Slug</div>
              <div>Published</div>
              <div>Created</div>
              <div>Actions</div>
            </div>

            {isLoading ? (
              <div className="px-3 py-6 text-sm text-gray-600">Loading posts…</div>
            ) : posts.length === 0 ? (
              <div className="px-3 py-6 text-sm text-gray-500">No posts found.</div>
            ) : (
              posts.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_2fr] gap-2 px-3 py-2 border-b text-sm items-center min-w-[800px]"
                >
                  <div className="truncate" title={p.title}>{p.title}</div>
                  <div className="capitalize">{p.status}</div>
                  <div className="truncate" title={p.slug}>{p.slug}</div>
                  <div>{p.published_at ? new Date(p.published_at).toLocaleString() : '-'}</div>
                  <div>{p.created_at ? new Date(p.created_at).toLocaleString() : '-'}</div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEdit(p)}
                      disabled={loadingEditId === p.id}
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {p.status !== 'archived' && (
                      <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(p)}>
                        {p.status === 'published' ? 'Unpublish' : 'Publish'}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(p)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div>
              Page {page}, showing {posts.length} of {total}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page * limit >= total}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogs;