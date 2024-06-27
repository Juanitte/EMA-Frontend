import { Injectable } from '@angular/core';

declare global {
  interface Window {
    process?: {
      type?: string;
    };
    require?: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  private shell: any;

  constructor() {
    if (this.isElectron()) {
      this.shell = window.require('electron').shell;
    }
  }

  isElectron = (): boolean => {
    return typeof window !== 'undefined' && !!window.process && window.process.type === 'renderer';
  };

  openExternal(url: string): boolean {
    if (this.shell) {
      this.shell.openExternal(url);
      return true;
    }
    return false;
  }
}