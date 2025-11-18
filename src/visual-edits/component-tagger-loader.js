// Minimal component-tagger-loader.js to satisfy Turbopack/webpack requirements
// This is likely used for visual editing features in the original project.
// Providing a minimal pass-through loader to prevent build failures.

module.exports = function componentTaggerLoader(source) {
  // Pass through the source code unchanged
  // In a real visual editing setup, this might inject component metadata
  return source;
};

module.exports.raw = false;
