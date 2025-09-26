type BaseCookieProps = { expires?: number | Date | string, path?: string };
export type CookieProps =  Record<string, string | boolean | BaseCookieProps[keyof BaseCookieProps]>;
