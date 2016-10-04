import { RectangleImageData } from '../components/images/image-data';

export interface ArticleStackData{
    id: string,
    timeStamp: string,
    keyword: string,
    title: string,
    imageConfig: RectangleImageData,
    publishedDate?: string,
    keyUrl?: any,
    author?: string,
    articleUrl?: any,
    publisher?: string,
    teaser?: string,
}

export interface VideoStackData{
    id: string,
    timeStamp: number,
    keyword: string,
    title: string,
    videoThumbnail: string,
    keyUrl?: any,
    teaser?: string,
    videoUrl?: any,
    thumbnailHeight?: string,
    thumbnailWidth?: string
}

export interface SectionNameData{
  icon: string,
  title: string
}
