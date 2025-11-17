// @project
import { PAGE_PATH, SIGNIN_PATH, SIGNUP_PATH } from '@/path';

/***************************  DEFAULT - NAVBAR  ***************************/

export const navbar = {
  customization: true,
  primaryBtn: { children: 'SignUp', link: SIGNUP_PATH },
  secondaryBtn: { children: 'SignIn', link: SIGNIN_PATH },
  navItems: [
    { id: 'home', title: 'Home', link: '/' },
    { id: 'about', title: 'About', link: PAGE_PATH.about },
    { id: 'servicec', title: 'Service', link: PAGE_PATH.service },
    { id: 'portfolio', title: 'Porfolio', link: PAGE_PATH.portfolio },
    { id: 'blog', title: 'Blog', link: PAGE_PATH.blog }
  ]
};
