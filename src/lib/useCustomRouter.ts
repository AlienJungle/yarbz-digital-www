import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter, useSearchParams } from "next/navigation";

export interface CustomRouterOptions {
  preserveQuery: boolean;
}

export function useCustomRouter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const push = (
    href: string,
    routerOptions?: CustomRouterOptions,
    options?: NavigateOptions,
  ) => {
    let url = href;

    if (routerOptions?.preserveQuery) {
      const searchParamsString = searchParams?.toString();
      if (searchParamsString) {
        url =
          href.indexOf("?") >= 0
            ? href + searchParamsString
            : href + "?" + searchParamsString;
      }
    }

    router.push(url, options);
  };

  return { push };
}
