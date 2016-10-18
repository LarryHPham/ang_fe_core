import { RectangleImageData } from '../components/images/image-data';

export interface ArticleStackData{
    article_id: string,
    source: string,
    report_type: string,
    time_stamp: string,
    keywords: Array<string>,
    title: string,
    image_url: string,
    last_updated?: string,
    keyUrl?: any,
    author?: string,
    publisher?: string,
    teaser?: string
  }

export interface VideoStackData{
    id: string,
    time_stamp: number,
    keyword: string,
    title: string,
    video_thumbnail: string,
    keyUrl?: any,
    teaser?: string,
    video_url?: any,
    thumbnail_height?: string,
    thumbnail_width?: string
}

export interface SectionNameData{
  icon: string,
  title: string,
  route?: any
}
