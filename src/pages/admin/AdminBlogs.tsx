import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
        <p className="text-gray-600 text-sm">Create blog posts by uploading PDF files</p>
      </div>

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


