export type RequestStatus='pending'| 'accepted'| 'declined'| 'returned';

export interface BookRequest{
    id:string;
    book_id:string;
    borrower_id:string;
    status:RequestStatus;
    created_at:string;
}

export interface Message{
    id:string;
    request_id:string;
    sender_id:string;
    content:string;
    created_at:string;
}