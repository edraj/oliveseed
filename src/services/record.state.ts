import { ListStateService } from '$core/state.abstract';
import type { IDmartRecord } from './record.model';

export class RecordListState extends ListStateService<IDmartRecord> {}

export const rootRecordList = new RecordListState();
