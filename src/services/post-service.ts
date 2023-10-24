import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = join(process.cwd(), "./data/posts/");

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory).filter((p) => p.endsWith(".md"));
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts: Post[] = slugs.map((slug) => getPostBySlug(slug)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post {
  const realSlug: string = slug.replace(/\.md$/, "");
  const fullPath: string = join(postsDirectory, `${realSlug}.md`);
  const fileContents: string = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const post: Post = Object.assign({} as Post, data);
  post.slug = realSlug;
  post.content = content;

  if (!post.excerpt) post.excerpt = content.substr(0, 100);

  return post;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  return (await remark().use(html).process(markdown)).toString();
}

export type PostType = "work" | "blog";

export default interface Post {
  slug: string;
  title: string;
  type: PostType;
  date: Date;
  image?: string;
  backgroundImage?: string;
  content: string;
  excerpt: string;
  client?: string;
  testimonial?: string;
}
