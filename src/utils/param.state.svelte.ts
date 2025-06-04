import { StateService } from "$core/state.svelte";
import type { IParam } from "./param.model";

export class ParamState extends StateService<IParam> {}
