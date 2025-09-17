import { PreferencesComponent } from './preferences.component';
import { PreferencesService } from './preferences.service';
import { Preferences } from './models';

describe('PreferencesComponent (shallow)', () => {
  let component: PreferencesComponent;
  let mockService: Partial<PreferencesService>;

  beforeEach(() => {
    mockService = {
      load: jest.fn().mockResolvedValue({ theme: 'light', autosave: true, itemsPerPage: 20 }),
      save: jest.fn().mockResolvedValue(undefined),
    };

    // Create component and inject mock service by overriding internal property
    component = new PreferencesComponent();
    // @ts-ignore
    component['service'] = mockService;
  });

  test('initial prefs set', () => {
    expect(component.prefs).toBeTruthy();
    expect(component.prefs?.theme).toBe('light');
  });

  test('onSourceChange updates source and url', () => {
    component.onSourceChange({ source: 'external-service', externalUrl: 'https://api' });
    // @ts-ignore
    expect(component.source).toBe('external-service');
    // @ts-ignore
    expect(component.externalUrl).toBe('https://api');
  });

  test('load calls service.load and updates prefs', async () => {
    // @ts-ignore
    mockService.load = jest
      .fn()
      .mockResolvedValue({ theme: 'dark', autosave: false, itemsPerPage: 10 });
    await component.load();
    expect(mockService.load).toHaveBeenCalled();
    expect(component.prefs?.theme).toBe('dark');
  });

  test('save calls service.save', async () => {
    component.prefs = { theme: 'light', autosave: true, itemsPerPage: 5 };
    await component.save();
    expect(mockService.save).toHaveBeenCalled();
  });
});
