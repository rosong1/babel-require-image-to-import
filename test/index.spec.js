const plugin = require('../src');
const babel = require('@babel/core');

it('simple', () => {
  const example = `
const img1 = require('./img/icon1.png');
`
  const { code } = babel.transform(example, { plugins: [plugin] })
  expect(code).toMatchSnapshot();
});

it('with array', () => {
  const example = `
const img1 = require('./img/icon1.png');

const list = [
  {
    label: "item1",
    value: require("@/img/item1.jpg"),
  },
  {
    label: "item2",
    value: require("@/img/item2.svg"),
  },
];
`
  const { code } = babel.transform(example, { plugins: [plugin] })
  expect(code).toMatchSnapshot();
});

it('with jsx', () => {
  const example = `
  const img1 = require("./img/icon1.webp");

  const list = [
    {
      label: "item1",
      value: require("@/img/item1.jpeg"),
    },
    {
      label: "item2",
      value: require("@/img/item2.png"),
    },
  ];
  
  const ImgComponent = (props) => {
    const { onError, defaultImg, ...rest } = props;
    return (
      <img
        {...rest}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImg || require("./img/default-avatar.png");
        }}
      />
    );
  }; 
`
  const { code } = babel.transform(example, { presets: ["@babel/preset-react"], plugins: [plugin] })
  expect(code).toMatchSnapshot();
});