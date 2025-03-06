export class Article {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public author: string,
    public createeAt: number,
    public viewCount: number
  ) {}
}