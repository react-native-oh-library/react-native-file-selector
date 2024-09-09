import {
    RNPackage,
    TurboModulesFactory
  } from "@rnoh/react-native-openharmony/ts";
  import type {
    TurboModule,
    TurboModuleContext,
  } from "@rnoh/react-native-openharmony/ts";
  import { TM } from "@rnoh/react-native-openharmony/generated/ts";
  import { RNFileSelectorModule } from './RNFileSelectorTurboModule';
  
  class FileSelectorModulesFactory extends TurboModulesFactory {
    createTurboModule(name: string): TurboModule | null {
      if (name === TM.RNFileSelector.NAME) {
        return new RNFileSelectorModule(this.ctx);
      }
      return null;
    }
  
    hasTurboModule(name: string): boolean {
      return name === TM.RNFileSelector.NAME;
    }
  }
  
  export class RNFileSelectorPackage extends RNPackage {
    createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
      return new FileSelectorModulesFactory(ctx);
    }
  }