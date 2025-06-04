import { ListStateService } from "$core/state.svelte";
import type { IDmartRecord } from "./record.model";

export class RecordListState extends ListStateService<IDmartRecord> {


}

export const rootRecordList = new RecordListState();
