module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./favicon.ico');
  eleventyConfig.addPassthroughCopy('./CNAME');

  return {
    templateFormats: [
      "md",
      "njk"
    ],
    passthroughFileCopy: true,
    dir: {
      input: 'src/views',
      output: 'dist'
    }
  }
}
