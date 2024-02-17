import { StylerModule } from "@/plugin/styler-module";
import { PluginDataModule } from "@/plugin/plugin-data-module";

const pluginDataModule = new PluginDataModule();
new StylerModule(pluginDataModule);
