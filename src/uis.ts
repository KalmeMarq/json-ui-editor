export const namespacedSources: Record<string, string> = {};

namespacedSources['common'] = `
{
  "namespace": "common",

  "base_screen": {
    "type": "screen"
  }
}
`;

namespacedSources['play'] = await (await fetch('./ui/play_screen.json')).text();

namespacedSources['start'] = await (await fetch('./ui/start_screen.json')).text();
