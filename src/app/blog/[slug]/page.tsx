import Post, { getPostBySlug, getPostSlugs, markdownToHtml } from "@/services/post-service";
import { notFound } from "next/navigation";

export function generateStaticParams(): { slug: string }[] {
  return getPostSlugs().map((slug: string) => {
    return {
      slug,
    };
  });
}

export default async function PostSingle({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;

  try {
    const post: Post = getPostBySlug(slug);
    const postHtml = await markdownToHtml(post.content);

    return (
      <main>
        <article className="container mx-auto relative prose mb-20">
          <h1 className="leading-relaxed">{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: postHtml }}></div>
        </article>
      </main>
    );
  } catch (error: any) {
    if (error.code === "ENOENT") {
      notFound();
    }
  }
}
