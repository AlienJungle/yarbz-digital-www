import Post, { getPostBySlug, getPostSlugs, markdownToHtml } from "@/services/post-service";
import { statics } from "@/static";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Params;
};

type Params = {
  slug: string;
};

export async function generateStaticParams(): Promise<Params[]> {
  return getPostSlugs().map((slug: string) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const post: Post = getPostBySlug(slug);

  return {
    title: `${post.title}`,
    authors: {
      name: "Aaron Yarborough",
      url: statics.siteURL,
    },
    openGraph: {
      images: [
        {
          url: `${statics.siteURL}${post.image}`.toLowerCase(),
        },
      ],
      type: "article",
      url: `${statics.siteURL}/blog/${post.slug}`.toLowerCase(),
      publishedTime: post.date.toString(),
    },
  };
}

export default async function PostSingle({ params }: Props) {
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
