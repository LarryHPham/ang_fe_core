import { RectangleImageData } from '../components/images/image-data';

export interface VideoStackData{
    id: string,
    timeStamp: number,
    keyword: string,
    title: string,
    teaser?: string,
    videoThumbnail: string,
    videoUrl?: any,
    thumbnailHeight?: string,
    thumbnailWidth?: string
}

export interface ArticleStackData{
    id: string,
    timeStamp: string,
    keyword: string,
    title: string,
    imageConfig: RectangleImageData,
    author?: string,
    articleUrl?: any,
    publisher?: string,
    teaser?: string,
}
