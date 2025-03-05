import { ThemeColor, ThemeIcon, window, commands } from 'vscode';
import type { ExtensionContext, Terminal } from 'vscode';
// import terminalConfigs from "./terminal.json";
import { getConfig, createOutputChannel } from "./utils";

interface TerminalConfig {
  name: string;
  cwd: string;
  commands: string[];
  autoExecuteCommands?: boolean;
  // https://code.visualstudio.com/api/references/icons-in-labels#icon-listing
  icon?: string;
  // https://code.visualstudio.com/docs/getstarted/theme-color-reference
  color?: string;
}

// 获取所有具有指定名称的活动终端实例
async function getTerminalsByName(name: string): Promise<Terminal[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        window.terminals.filter(terminal => terminal.name === name)
      );
    }, 100); // 等待一段时间让终端准备好
  });
}

async function createTerminal(config: TerminalConfig, parentTerminal?: Terminal) {
  const terminal = window.createTerminal({
    name: config.name,
    cwd: config.cwd,
    iconPath: config.icon ? new ThemeIcon(config.icon) : undefined,
    color: config.color ? new ThemeColor(config.color) : undefined,
    location: parentTerminal ? { parentTerminal } : undefined,
  });
  config.commands?.forEach(command => {
    terminal.sendText(command, config?.autoExecuteCommands ?? false);
  });
  terminal.show();
  return terminal;
}

async function iteration(data: any, func: any, func1: any) {
  for (const item of data) {
    if (Array.isArray(item)) {
      const [first, ...rest] = item;
      const res = await func?.(first);
      for (const restItem of rest) {
        await func1?.(restItem, res);
      }
    } else {
      await func(item);
    }
  }
}

async function terminal() {
  const terminalConfigs = getConfig('terminal');
  // createOutputChannel({
	// 	content: `terminalConfigs ` + JSON.stringify(terminalConfigs, null, 2),
	// });
  // 先关闭 已有的 相同名称的终端
  const disposeFn = async (config: TerminalConfig) => {
    const existingTerminals = await getTerminalsByName(config.name);
    for (const item of existingTerminals) {
      // window.showInformationMessage(`exist: ${item.name}`);
      await item.dispose();
    }
  };
  await iteration(terminalConfigs, disposeFn, disposeFn);
  // await sleep(1000);
  await iteration(
    terminalConfigs,
    async (config: TerminalConfig) => {
      return await createTerminal(config);
    },
    async (config: TerminalConfig, preRes: any) => {
      // window.showInformationMessage(`exist1: ${preRes.name}`);
      await createTerminal(config, preRes);
    },
  );
}

export function activate(context: ExtensionContext) {
  // terminal();
  context.subscriptions.push(commands.registerCommand('warmhug.terminalInit', () => {
    terminal();
  }));
}

export function deactivate() {}
