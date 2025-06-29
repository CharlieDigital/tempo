const defaultStyle =
  "background-color: seagreen; padding: 2px; border-radius: 4px; color: white";

export function log(...message: any[]) {
  console.log("%c[TEMPO]\x1B[m ", defaultStyle, ...message);
}

const highlightStyle =
  "background-color: yellow; padding: 2px; border-radius: 4px; color: DarkOrange";

export function highlight(...message: any[]) {
  console.log("%c[TEMPO]\x1B[m ", highlightStyle, ...message);
}

const mutedStyle =
  "background-color: PaleGoldenrod; padding: 2px; border-radius: 4px; color: DarkGoldenrod";

export function muted(...message: any[]) {
  console.log("%c[TEMPO]\x1B[m ", mutedStyle, ...message);
}

const warnStyle =
  "background-color: goldenrod; padding: 2px; border-radius: 4px; color: white";

export function warn(...message: any[]) {
  console.warn("%c[TEMPO]\x1B[m ", warnStyle, ...message);
}

const errorStyle =
  "background-color: crimson; padding: 2px; border-radius: 4px; color: white";

export function error(...message: any[]) {
  console.error("%c[TEMPO]\x1B[m ", errorStyle, ...message);
}

const noticeStyle =
  "background-color: deeppink; padding: 2px; border-radius: 4px; color: white";

export function notice(...message: any[]) {
  console.log("%c[TEMPO]\x1B[m ", noticeStyle, ...message);
}

const debugStyle =
  "background-color: powderblue; padding: 2px; border-radius: 4px; color: darkblue";

export function debug(...message: any[]) {
  console.log("%c[TEMPO]\x1B[m ", debugStyle, ...message);
}
