export const mapRecord = (record: any) => {
  if (!record) return null;
  let body = record.attributes?.payload?.body;
  // if its text, dont expand
  if (typeof body === "string") body = { body };

  return {
    ...record,
    ...record.attributes,
    ...record.attributes?.payload,
    ...record.attachments,
    ...body,
  };
};
// general as much as possible
export const mapResponse = (data: any): any => {
  // either return single record or multiple records
  const l = data.records?.length;
  if (!l) return null;

  if (l > 1) {
    return {
      status: data.status,
      records: data.records.map(mapRecord),
    };
  }
  // simplify
  const r = data.records[0];
  return mapRecord(r);
};


export const mapRecords = (data: any): any[] => {
  const l = data.records?.length;
  if (!l) return null;
  return data.records.map(mapRecord);
};


export const mapAttachments = (data: any): any[] => {
  if (!data?.length) return null;
  return data.map(mapRecord);
};
