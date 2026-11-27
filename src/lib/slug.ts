// "my-post-1795360620670" -> "my-post"
export const cleanSlug = (slug?: string | null) =>
  (slug || "").replace(/-\d{10,}$/, "");

// URL-friendly name for a post (falls back to the title, then the id)
export const blogUrlName = (blog: any) => {
  const fromSlug = cleanSlug(blog?.slug);
  if (fromSlug) return fromSlug;
  const fromTitle = (blog?.title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return fromTitle || blog?.id;
};

export const matchesBlog = (blog: any, param: string) =>
  !!blog &&
  (blog.id === param || blog.slug === param || blogUrlName(blog) === param);