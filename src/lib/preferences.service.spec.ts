import { PreferencesService } from './preferences.service';
import { Preferences } from './models';

describe('PreferencesService', () => {
  let service: PreferencesService;

  beforeEach(() => {
    service = new PreferencesService();
    // @ts-ignore
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // @ts-ignore
    global.fetch.mockRestore && global.fetch.mockRestore();
    // cleanup FS API if set
    // @ts-ignore
    delete (global as any).showOpenFilePicker;
    // @ts-ignore
    delete (global as any).showSaveFilePicker;
  });

  test('load from external - happy path', async () => {
    const prefs: Preferences = { theme: 'dark', autosave: false, itemsPerPage: 10 };
    // @ts-ignore
    global.fetch.mockResolvedValue({ ok: true, json: async () => prefs });
    const res = await service.load('external-service', 'https://example.com/prefs');
    expect(res).toEqual(prefs);
  });

  test('save to external - happy path', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValue({ ok: true });
    await expect(service.save('external-service', { theme: 'light', autosave: true, itemsPerPage: 5 }, 'https://example.com/prefs')).resolves.toBeUndefined();
  });

  test('load external without url throws', async () => {
    await expect(service.load('external-service')).rejects.toThrow('External URL required');
  });

  test('save external without url throws', async () => {
    await expect(service.save('external-service', { theme: 'light', autosave: true, itemsPerPage: 5 })).rejects.toThrow('External URL required');
  });

  test('load from local file when FS API missing throws', async () => {
    // ensure FS API not available
    // @ts-ignore
    delete (global as any).showOpenFilePicker;
    await expect(service.load('local-file')).rejects.toThrow('File System Access API not available in this environment');
  });

  test('save to local file when FS API missing throws', async () => {
    // @ts-ignore
    delete (global as any).showSaveFilePicker;
    await expect(service.save('local-file', { theme: 'light', autosave: true, itemsPerPage: 5 })).rejects.toThrow('File System Access API not available in this environment');
  });
});
