
export interface SyndicateArticleData{
    articleId: number,
    title: string,
    keyword: string,
    publishedDate: string, // unix time in millisecond
    author: string, // author full name
    publisher: string, // publisher full name
    imagePathData: string,//for  >1 images in the carousel
    teaser: string, //description
    articleUrl: string, // link of the article source
    provider:string,//provider information
}

