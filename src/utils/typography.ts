import Typography from 'typography';
import Theme from 'typography-theme-moraga';

Theme.bodyFontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
];
Theme.headerFontFamily = Theme.bodyFontFamily;

Theme.overrideThemeStyles = () => ({
  '.js-system--apple': {
    fontFeatureSettings: 'case, ss01, ss02',
  },
  a: {
    color: '#3583fb',
  },
  '[lang=zh],[lang=ja]': {
    textAlign: 'start',
    header: {
      textAlign: 'start',
    },
  },
});

const typography = new Typography(Theme);

export default typography;
