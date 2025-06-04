const mapRecord = (record: any) => {
  if (!record) return null;
  let body = record.attributes?.payload?.body;
  // if its text, dont expand
  if (typeof body === "string") body = { body };

  return {
    ...record,
    ...record.attributes,
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

export const mapResource = (data: any): any => {
  // use with the simplest form of data
  return {
    ...data,
    ...data.payload,
  };
};

export const mapRecords = (data: any): any => {
  const l = data.records?.length;
  if (!l) return null;

  return {
    status: data.status,
    records: data.records.map(mapRecord),
  };
};

export const mapAttachment = (data: any): any => {
  if (!data?.attachments?.json?.length) return null;

  // inside json[0] it has attrobutes.payload.body -> array of elements
  const root = data.attachments.json[0];

  return root.attributes.payload.body;
};

export const mapAttachments = (data: any): any[] => {
  if (!data?.attachments?.json?.length) return null;

  return data.attachments.json.map((n) => {
    return { ...n.attributes, ...n };
  });
};
