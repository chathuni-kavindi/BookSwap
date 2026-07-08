export type BookCondition='New' |'Good' |'Fair';
export type BookStatus='available' |'requested' |'borrowed';

export interface Book{
    id:string;
    owner_id:string;
    title:string;
    author:string;
    genre:string;
    condition:BookCondition;
    status:BookStatus;
    image_url:string |null;
    description:string |null;
    created_at:string;
}