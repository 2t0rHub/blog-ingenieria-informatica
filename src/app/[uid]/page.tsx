import { Metadata } from "next";
import { notFound } from "next/navigation";

import { asText, filter } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

type PageProps = {
  params: Params;
};

export default async function Page({ params }: PageProps) {
  const { uid } = params;
  const client = createClient();

  // Obtener la página desde Prismic
  const page = await client.getByUID("page", uid).catch(() => notFound());

  // Renderizar los slices de la página
  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { uid } = params;
  const client = createClient();
  const page = await client.getByUID("page", uid).catch(() => notFound());

  return {
    title: asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image?.url ?? "" }],
    },
  };
}

export async function generateStaticParams(): Promise<Params[]> {
  const client = createClient();

  // Obtener todas las páginas de Prismic excepto la home
  const pages = await client.getAllByType("page", {
    filters: [filter.not("my.page.uid", "home")],
  });

  return pages.map((page) => ({ uid: page.uid }));
}
