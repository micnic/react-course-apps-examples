const color = {
 blue: '#273AE3',
 gray: '#f3f3f3',
 green: '#104835',
 red: '#ee2e31',
};

const theme = {
  breakpoints: {
    mobile: 0,
    mobileLandscape: 480,
    tablet: 768,
    desktop: 1280,
  },

  colors: {
    default: color.darkGray,
    primary: color.blue,
    secondary: color.gray,
    error: color.red,
  },

  bgColors: {
    default: color.gray,
    primary: color.blue,
    secondary: color.darkGray,
  },

  BgPattern: `repeating-linear-gradient( -45deg, transparent, transparent 4px, rgba(51, 62, 72, 0.5) 6px )`,
  BgGradient: `linear-gradient(313deg, #00b6d0, #02abe3);`
};

export default theme;
