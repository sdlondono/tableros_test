// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.js$/,

//         use: {
//           loader: "babel-loader"
//         }
//       }
//     ]
//   },
//   devServer: { historyApiFallback: true, }
// }


// --- Path of the aplication
const path = require('path'),
  merge = require('merge')



const PATH = {
  app: path.join(__dirname, 'src'),
  appHtml: path.join(__dirname, 'src', 'index.html'),
  build: path.join(__dirname, 'build')
}

const TARGET = process.env.npm_lifecycle_event;


const CONFIG = {

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
}


if (TARGET == 'dev')
  module.exports = merge(CONFIG, {
    watch: true,

  })


if (TARGET == 'build')
  module.exports = merge(CONFIG, {

  })