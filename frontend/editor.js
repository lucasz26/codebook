// load monaco editor from CDN
require.config({
  paths: {
    vs: 'https://unpkg.com/monaco-editor@latest/min/vs'
  }
});

// load monaco and initialize the editor
require(['vs/editor/editor.main'], function () {
  window.editor = monaco.editor.create(document.getElementById('editor'), {
    // TODO: maybe authors should be able to set starter code?
    value: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "hello world!" << endl;\n  return 0;\n}',
    language: 'cpp', // hardcoding C++ for now
    theme: 'vs-light', // flashbang
    minimap: { enabled: false }
  });
});

