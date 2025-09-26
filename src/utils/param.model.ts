import { Config } from '../config';
import { cleanPath } from './common';

export type typeScope = 'managed' | 'public';

export enum EnumQueryType {
  aggregation = 'aggregation',
  search = 'search',
  subpath = 'subpath',
  events = 'events',
  history = 'history',
  tags = 'tags',
  spaces = 'spaces',
  counters = 'counters',
  reports = 'reports',
  attachments = 'attachments',
  attachments_aggregation = 'attachments_aggregation',
}

export enum EnumStatus {
  success = 'success',
  failed = 'failed',
}

export enum EnumResourceType {
  user = 'user',
  group = 'group',
  folder = 'folder',
  schema = 'schema',
  content = 'content',
  acl = 'acl',
  comment = 'comment',
  reaction = 'reaction',
  media = 'media',
  locator = 'locator',
  relationship = 'relationship',
  alteration = 'alteration',
  history = 'history',
  space = 'space',
  branch = 'branch',
  permission = 'permission',
  role = 'role',
  ticket = 'ticket',
  json = 'json',
  post = 'post',
  plugin_wrapper = 'plugin_wrapper',
  notification = 'notification',
  jsonl = 'jsonl',
  csv = 'csv',
  sqlite = 'sqlite',
  parquet = 'parquet',
}
export enum EnumRequestType {
  create = 'create',
  update = 'update',
  replace = 'replace',
  delete = 'delete',
  move = 'move',
  updateACL = 'update_acl',
  assign = 'assign',
}

export enum EnumContentType {
  text = 'text',
  html = 'html',
  markdown = 'markdown',
  json = 'json',
  image = 'image',
  python = 'python',
  pdf = 'pdf',
  audio = 'audio',
  video = 'video',
  jsonl = 'jsonl',
  csv = 'csv',
  sqlite = 'sqlite',
  parquet = 'parquet',
}

export enum EnumSort {
  ascending = 'ascending',
  descending = 'descending',
}

export interface IQueryRequest {
  type: EnumQueryType;
  space_name: string;
  subpath: string;
  search: string;
  filter_types?: Array<EnumResourceType>;
  filter_schema_names?: Array<string>;
  filter_shortnames?: Array<string>;
  from_date?: string;
  to_date?: string;
  sort_by?: string; // nothing?
  sort_type?: EnumSort;
  retrieve_json_payload?: boolean;
  retrieve_attachments?: boolean;
  validate_schema?: boolean;
  jq_filter?: string;
  exact_subpath?: boolean;
  limit?: number;
  offset?: number;
}

export interface IParam {
  total?: number;
  hasMore?: boolean;
  resourceType?: EnumResourceType;
  shortname?: string;

  type?: EnumQueryType;
  space?: string;
  subpath?: string;
  keyword?: string;
  forTypes?: EnumResourceType[];
  forSchemas?: string[];
  forShortnames?: string[];
  fromDate?: string;
  toDate?: string;
  sort?: { by: string; type?: EnumSort; };
  withPayload?: boolean;
  withAttachments?: boolean;
  validateSchema?: boolean;
  query?: string; // jq
  exactPath?: boolean;
  size?: number;
  page?: number;
  // aggregationData?: IAggregationType;
}

export interface IRequestParam {
  space?: string;
  type?: EnumRequestType;
  schema?: string;
  subpath?: string;
  workflow?: string;
  records?: any[];
}

export interface IEntryQuery {
  resource_type?: EnumResourceType;
  space_name: string;
  subpath: string;
  shortname: string;

  retrieve_json_payload?: boolean;
  retrieve_attachments?: boolean;
  validate_schema?: boolean;
}


export interface IParamKeyword {
  role?: string;
  roles?: string[];
  isActive?: boolean;
  keyword?: string; // used for shortname
}

export class Param {
  static MapQueryParams(options: IParam): IQueryRequest {
    // map each to its name in db, watch out for arrays
    // query folder content, unless type is not folder, change the path
    // the last part of the path is the shortname of the content

    let search = '';
    let path = options.subpath;
    let shortnames = options.shortname ? [options.shortname] : null;

    if (options.resourceType === EnumResourceType.content) {
      // content is the last element in subpath
      const _subpath = options.subpath.split('/');
      search = _subpath.slice(-1)[0];
      path = _subpath.slice(0, -1).join('/');
    }

    // @shortname:metafile keyword with resourceType: schema and subpath: /schema

    // resourceType does not exist, map it in filter_types
    let forTypes = [EnumResourceType.content, EnumResourceType.folder];
    if (options.resourceType && !options.forTypes) {
      forTypes = [options.resourceType];
    }

    const _limit = options.size || 100;
    const _offset = (options.page || 0) * _limit;

    return {
      type: options.type || EnumQueryType.search,
      space_name: options.space || Config.API.defaultSpace,
      subpath: cleanPath(path) || '/',
      search: options.keyword || search,
      limit: _limit,
      offset: _offset,
      exact_subpath: options.exactPath || false, // almost always true
      sort_type: options.sort?.type || EnumSort.ascending,
      sort_by: options.sort?.by || 'created_at',
      retrieve_json_payload: options.withPayload || false,
      retrieve_attachments: options.withAttachments || false,
      validate_schema: true,
      filter_types: forTypes,
      filter_schema_names: options.forSchemas || [],
      filter_shortnames: options.forShortnames || shortnames,
    };
  }

  static MapEntryParams(options: IParam): IEntryQuery {
    return {
      retrieve_json_payload: options.withPayload || false,
      retrieve_attachments: options.withAttachments || false,
      validate_schema: true,
      resource_type: options.resourceType || EnumResourceType.content,
      space_name: options.space,
      subpath: options.subpath,
      shortname: options.shortname,
    };
  }

  static MapRequest(options: IRequestParam): any {
    return {
      space_name: options.space || Config.API.defaultSpace,
      request_type: options.type || EnumRequestType.create,
      schema_name: options.schema,
      subpath: options.subpath,
      workflow_name: options.workflow,
      records: options.records || null,
    };
  }


  static MapKeyword(options: IParamKeyword): string {
    let keyword = '';
    if (options?.role) {
      keyword += `@roles:${options.role} `;
    }
    if (options?.roles) {
      keyword += `@roles:${options.roles.join('|')} `;
    }
    // example of payload with date
    // if (options?.startDate) {
    //   // till end of time 7258021200
    //   keyword += `@payload.body.expiry_date:[${Math.floor(options.startDate.valueOf() / 1000)},7258021200] `;
    // }
    if (options?.isActive) {
      keyword += `@is_active:${options.isActive} `;
    }
    if (options?.keyword) {
      keyword += `@shortname:*${options.keyword}* `;
    }

    return keyword;
  }
}
