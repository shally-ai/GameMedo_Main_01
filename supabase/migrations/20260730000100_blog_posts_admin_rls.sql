-- Allow authenticated users (admins) to manage blog posts
DROP POLICY IF EXISTS "Anyone can read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;

-- Policy 1: Anyone (anon or authenticated) can view published blog posts
CREATE POLICY "anyone_can_read_published_posts"
  ON public.blog_posts
  FOR SELECT
  USING (is_published = true);

-- Policy 2: Authenticated users (logged-in administrators) can manage all posts (even drafts)
CREATE POLICY "admins_can_manage_blog_posts"
  ON public.blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
