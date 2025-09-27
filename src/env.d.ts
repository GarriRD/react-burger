declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.webp';

declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
};