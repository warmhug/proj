var mv = require('mv');

mv('./build/index-inline.html', './scripts/index-inline.html', function (err) {
  // done. it tried fs.rename first, and then falls back to
  // piping the source file to the dest file and then unlinking
  // the source file.
  if (err) {
    console.error(err);
  }
});
