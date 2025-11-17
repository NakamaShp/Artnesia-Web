function path(urlChunks) {
  return urlChunks.join('/');
}

export const SECTION_PATH = '/sections';
export const SIGNIN_PATH = '/SignIn';
export const SIGNUP_PATH = '/SignUp';
export const ADMIN_PATH = 'https://free.admin.saasable.io/';
export const BUY_NOW_URL = 'https://mui.com/store/items/saasable-multipurpose-ui-kit-and-dashboard-template';
export const FREEBIES_URL = 'https://github.com/phoenixcoded/saasable-ui';
export const DOCS_URL = 'https://phoenixcoded.gitbook.io/saasable ';
export const BLOCK_PATH = '/blocks';
export const SOSIAL_MEDIA_URL = {
  instagram: 'https://www.instagram.com/aal.psd?igsh=MXA4NjF6c3Vqbnl5cQ==',
  facebook: 'https://www.facebook.com/artnesia.id',
  twitter: 'https://twitter.com/aal_psd',
  github: 'https://github.com/aalpsd',
  dribbble: 'https://dribbble.com/aalpsd',
  linkedin: 'https://www.linkedin.com/in/aalpsd/',
  youtube: 'https://www.youtube.com/@aalpsd',
  telegram: 'https://t.me/aalpsd',
  whatsapp: 'https://wa.me/62818889973'
};

export const PAGE_PATH = {
  about: path([SECTION_PATH, 'about']),
  service: path([SECTION_PATH, 'service']),
  portfolio: path([SECTION_PATH, 'portfolio']),
  blog: path([SECTION_PATH, 'blog']),
  contact: path([SECTION_PATH, 'contact'])
};
