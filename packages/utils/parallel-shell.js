// https://chat.deepseek.com/a/chat/s/1f5fb9e7-6d26-4621-b959-df26dacf4d1f

const { spawn } = require('child_process');
const blessed = require('blessed');

const screen = blessed.screen({
  smartCSR: true,
  title: 'blessed screen (Ctrl+C)',
  dockBorders: true,
  debug: true,
});

const createPane = (position) => blessed.box({
  top: 0,
  left: position === 'left' ? 0 : '50%',
  width: '50%',
  height: '100%-1',
  tags: true,
  wrap: true,
  border: { type: 'line', fg: 'cyan' },
  style: {
    fg: 'white',
    bg: 'black',
    border: { fg: '#00ff00' }
  },
  mouse: true,
  scrollable: true,
  alwaysScroll: true,
  scrollbar: {
    ch: '█',
    inverse: true,
    position: 'right',
    track: { bg: 'gray' },
    style: { bg: 'white' },
  }
});

const leftPane = createPane('left');
const rightPane = createPane('right');
const statusBar = blessed.box({
  bottom: 0,
  left: 0,
  width: '100%',
  height: 1,
  content: ' Ctrl+C to exit ',
  style: {
    bg: 'blue',
    fg: 'white'
  }
});

screen.append(leftPane);
screen.append(rightPane);
screen.append(statusBar);

const createProcess = (cmd, args) => {
  const opts = {
    shell: true,
    env: { ...process.env, TERM: 'xterm-256color' },
    stdio: ['ignore', 'pipe', 'pipe'],
  };
  // return args ? spawn(cmd, args, opts) : spawn(cmd, opts);
  const finalCmd = args ? `${cmd} ${args.join(' ')}` : cmd;
  // console.log('log finalCmd: ', finalCmd);
  const shSyntax = `
  while true; do
    (${finalCmd}) 2>&1;
    echo $TERM;
    echo "---- last update: $(date '+%H:%M:%S') ----";
    sleep 1;
  done`
  .replace(/\n\s+/g, ' ');  // Turn more lines to one line
  // Need a '' , otherwise an error will be reported
  return spawn('sh', ['-c', `'${shSyntax}'`], opts);
  // return spawn('sh', ['-c', shSyntax], opts);
};

const processes = [
  {
    proc: createProcess('ls', ['-l']),
    pane: leftPane,
    title: 'dev'
  },
  {
    // proc: createProcess('top -l 1 -stats pid,cpu | head -n 20'),
    proc: createProcess('npm', ['-v']),
    pane: rightPane,
    title: 'start'
  }
];

processes.forEach(({ proc, pane, title }) => {
  let buffer = '';

  proc.stdout.on('data', (data) => {
    buffer += data.toString();
    // console.log('log buffer: ', buffer);
    const lines = buffer.split('\r?\n');
    const output = lines.slice(-20).join('\n');
    pane.setContent(`{bold}${title}{/bold}\n${output}`);
    pane.setScrollPerc(100); // Scroll to bottom
    screen.render();
    buffer = lines.slice(-1)[0];
  });

  proc.stderr?.on('data', (data) => {
    pane.setContent(`{red-fg}error: ${data.toString()}{/red-fg}`);
    screen.render();
  });
});

// setInterval(() => screen.render(), 500);

screen.key(['q', 'C-c'], () => {
  processes.forEach(({ proc }) => {
    proc.kill('SIGTERM');
  });
  process.nextTick(() => process.exit(0));
});

screen.render();
