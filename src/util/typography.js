import Typography from 'typography';

const options = {
  baseFontSize: '18px',
  baseLineHeight: '31px',
  modularScales: [
    {
      scale: 2.35,
    },
  ],
  headerFontFamily: [
    'Avenir Next',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
};

const typography = new Typography(options);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') { // eslint-disable-line
  typography.injectStyles();
}

// two different exports to avoid prefer-default while supporting named
// https://github.com/benmosher/eslint-plugin-import/issues/342

export const { rhythm } = typography;
export const { TypographyStyle } = typography;
export const { fontSizeToMS } = typography;
