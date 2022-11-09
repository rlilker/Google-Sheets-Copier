export class ChildSheet {

  readonly name: string;
  readonly url: string;
  readonly range: string;
  
  constructor(name: string, url: string, range: string) {
    this.name = name;
    this.url = url;
    this.range = range;
  }
}