import { ui, defaultLang, showDefaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    if (l === defaultLang && !showDefaultLang) {
      //only for the blog path add the /en
      if (path.startsWith('/blog')) {
        return '/en' + path;
      }
      return path.replace(/^\/fr/, ''); // remove /fr from path
    } else {
      return `/${l}${path}`;
    }
  };
}