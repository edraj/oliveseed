import { cleanPath, makeDate } from '$src/utils/common';
import { EnumContentType, EnumResourceType } from '$src/utils/param.model';
import { WebResource, type IWebResource } from '$src/utils/webresources.model';

export enum EnumPathType {
  folder = 'folder',
  content = 'content'
}
export interface IResource {
  id?: string;
  shortname: string;
  created?: Date;
  updated?: Date;
  isActive?: boolean;
  tags?: string[];
  contentType?: EnumContentType;  // json, html...
  type?: EnumResourceType;
  pathType?: EnumPathType;

  schema?: string;
  subpath?: string;
  contentPath?: string;

  space?: string;
  path?: string;
  parent?: string;

  description?: string;
  displayname?: string;
  // for eding, bring back all languages
  displaynameInput?: IWebResource;
  descriptionInput?: IWebResource;
  isHidden?: boolean;

  body?: any; // for content
  // media?: IDmartFile[];
}


// TODO: response<T> for body

export class Resource {

  static NewInstance(resource: any, space?: string): IResource {

    if (!resource) return null;
    // WATCH: in one case the space name is missing, pass it
    const _space = resource.space_name || space;

    // return subpath is not a true representation of the path
    const _subpath = cleanPath(`/${resource.subpath}/${resource.shortname}`);

    // everything is content except folder
    const pathType = resource.resource_type === EnumResourceType.folder ? EnumPathType.folder : EnumPathType.content;

    // parent path is always a folder
    const _parentPath = cleanPath(`/${_space}/folder/${resource.subpath}`);


    return {
      contentType: resource.content_type || null,
      created: makeDate(resource.created_at),
      description: WebResource.MapLanguage(resource.description),
      descriptionInput: resource.description,
      displayname: WebResource.MapLanguage(resource.displayname) || resource.shortname, // calculate per language
      displaynameInput: resource.displayname,
      id: resource.uuid,
      isActive: resource.is_active || false,
      isHidden: resource.hide_space || false,
      path: `${_space}/${pathType}${_subpath}`,
      parent: _parentPath,
      schema: resource.schema_shortname,
      shortname: resource.shortname,
      space: _space,
      subpath: _subpath,
      tags: resource.tags,
      type: resource.resource_type,
      pathType: pathType,
      updated: makeDate(resource.updated_at),
      body: resource.body,
      // media: resource.media ? DmartFile.NewInstances(resource.media, _subpath, _space) : null,
    };
  }
  static NewInstances(resources: any[]): IResource[] {
    if (!resources) return [];
    return resources.map(n => Resource.NewInstance(n)).filter(n => !n.isHidden);
  }


  static PrepPost(resource: Partial<IResource>): any {

    let payload = null;

    if (resource.type === EnumResourceType.content) {
      payload = {
        payload: {
          body: resource.body || '',
          schema_shortname: null,
          content_type: resource.contentType || EnumContentType.text
        }
      };
    }

    return {
      resource_type: resource.type || EnumResourceType.space,
      shortname: resource.shortname,
      subpath: resource.subpath || '/',
      attributes: {
        is_active: true,
        displayname: resource.displaynameInput,
        description: resource.descriptionInput,
        tags: resource.tags || [],
        ...payload
      }
    };

  }

  static PrepDelete(resource: Partial<IResource>): any {
    // remove last part of subpath
    const _subpath = resource.subpath.split('/').slice(0, -1).join('/');

    return {
      resource_type: resource.type,
      shortname: resource.shortname,
      subpath: _subpath || '/',
      attributes: {}
    };
  }
}
