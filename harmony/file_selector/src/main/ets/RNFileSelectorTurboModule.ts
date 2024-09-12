import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from "@rnoh/react-native-openharmony/generated/ts";
import { picker } from '@kit.CoreFileKit';
import { common } from '@kit.AbilityKit';

interface SelectOptions {
  path ?: string;
  filter ?: string;
}

export class RNFileSelectorModule extends TurboModule implements TM.RNFileSelector.Spec {
  private context: common.UIAbilityContext = this.ctx.uiAbilityContext;
  private documentPicker = new picker.DocumentViewPicker(this.context);
  Show(SelectOptions:SelectOptions,onDone ?: (res:string[])=>void, onCancel ?: ()=>void): void {
    let documentSelectOptions = new picker.DocumentSelectOptions();
    SelectOptions?.path ? documentSelectOptions.defaultFilePathUri = SelectOptions.path : null;
    SelectOptions?.filter ? documentSelectOptions.fileSuffixFilters =  SelectOptions?.filter.split(",") : null;

    try {
      this.documentPicker.select(documentSelectOptions).then((documentSelectResult: Array<string>) => {
        console.info('DocumentViewPicker.select successfully, documentSelectResult uri: ' +
        JSON.stringify(documentSelectResult));
        if (documentSelectResult.length != 0) {
          onDone ? onDone(documentSelectResult) : null;
        } else {
          onCancel ? onCancel() : null;
        }
      })
    } catch (error) {
      console.error('DocumentViewPicker failed with err: ' + JSON.stringify(error));
    }
  }
}